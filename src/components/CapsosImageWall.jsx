import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import '../css/CapsosImageWall.css';

/* =========================================================
   CARGA AUTOMÁTICA DE IMÁGENES
   Compatible con React + Create React App / Webpack

   Ubicación del componente:
   src/components/home/CapsosImageWall.jsx

   Ubicación de las imágenes:
   src/assets/capsos-gallery-optimized/
========================================================= */

const imageContext = require.context(
  '../assets/capsos-gallery-optimized',
  true,
  /\.(jpg|jpeg|png|webp|avif|gif)$/i
);

/**
 * Obtiene el nombre del archivo desde una ruta.
 */
const getFileName = (path) => {
  return path.split('/').pop() || path;
};

/**
 * Elimina la extensión del archivo.
 */
const getNameWithoutExtension = (path) => {
  return getFileName(path).replace(/\.[^.]+$/, '');
};

/**
 * Convierte el nombre del archivo
 * en un texto alternativo.
 */
const createAltText = (path) => {
  return getNameWithoutExtension(path)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
};

/* =========================================================
   IMPORTACIÓN AUTOMÁTICA DE IMÁGENES
========================================================= */

/**
 * Importa automáticamente todas las imágenes
 * de la carpeta.
 */
const importedImages = imageContext
  .keys()
  .map((path) => {
    const importedFile = imageContext(path);

    const imageUrl =
      importedFile?.default || importedFile;

    return {
      id: path,
      path,
      src: imageUrl,
      fileName: getFileName(path),
      alt: createAltText(path),
    };
  })
  .filter((image) => Boolean(image.src))
  .sort((firstImage, secondImage) =>
    firstImage.fileName.localeCompare(
      secondImage.fileName,
      'es',
      {
        numeric: true,
        sensitivity: 'base',
      }
    )
  );

/* =========================================================
   LOGO CAPSOS
========================================================= */

/**
 * Busca una imagen que pueda utilizarse
 * como logo.
 */
const logoImage =
  importedImages.find((image) =>
    /logo/i.test(image.fileName)
  ) ||
  importedImages.find((image) =>
    /capsos/i.test(image.fileName)
  ) ||
  null;

/**
 * Excluye el logo de las imágenes
 * de la galería.
 */
const galleryImages = logoImage
  ? importedImages.filter(
      (image) =>
        image.id !== logoImage.id
    )
  : importedImages;

/* =========================================================
   CONFIGURACIÓN DEL MOSAICO
========================================================= */

const VISIBLE_IMAGES = 66;

const CHANGE_INTERVAL = 100;

const FADE_DURATION = 120;

/* =========================================================
   FUNCIONES GENERALES
========================================================= */

/**
 * Mezcla aleatoriamente las imágenes.
 */
const shuffleImages = (images) => {
  const shuffled = [...images];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [
      shuffled[index],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

/**
 * Crea las imágenes iniciales visibles.
 */
const createInitialImages = () => {
  if (!galleryImages.length) {
    return [];
  }

  const shuffled =
    shuffleImages(galleryImages);

  return Array.from(
    {
      length: VISIBLE_IMAGES,
    },
    (_, index) => ({
      ...shuffled[
        index % shuffled.length
      ],
      version: 0,
    })
  );
};

/* =========================================================
   COMPONENTE
========================================================= */

const CapsosImageWall = () => {
  /* =======================================================
     ESTADO DEL WALL
  ======================================================= */

  const [
    visibleImages,
    setVisibleImages,
  ] = useState(createInitialImages);

  const [
    changingIndex,
    setChangingIndex,
  ] = useState(null);

  const [
    hoverPaused,
    setHoverPaused,
  ] = useState(false);

  /* =======================================================
     ESTADO DE LA GALERÍA AMPLIADA
  ======================================================= */

  /**
   * null:
   * No existe una imagen abierta.
   *
   * number:
   * Índice de la imagen actualmente
   * abierta dentro de galleryImages.
   */
  const [
    selectedImageIndex,
    setSelectedImageIndex,
  ] = useState(null);

  /* =======================================================
     REFERENCIAS
  ======================================================= */

  const previousIndexRef =
    useRef(-1);

  const timeoutRef =
    useRef(null);

  const changingRef =
    useRef(false);

  /* =======================================================
     INFORMACIÓN DEL LIGHTBOX
  ======================================================= */

  const isLightboxOpen =
    selectedImageIndex !== null;

  const selectedImage =
    isLightboxOpen
      ? galleryImages[
          selectedImageIndex
        ]
      : null;

  /* =======================================================
     ABRIR GALERÍA
  ======================================================= */

  const openLightbox =
    useCallback((image) => {
      /**
       * Busca la imagen real dentro
       * de galleryImages.
       *
       * Esto permite que posteriormente
       * podamos navegar por TODA
       * la colección.
       */
      const imageIndex =
        galleryImages.findIndex(
          (galleryImage) =>
            galleryImage.id ===
            image.id
        );

      if (imageIndex === -1) {
        return;
      }

      setSelectedImageIndex(
        imageIndex
      );
    }, []);

  /* =======================================================
     CERRAR GALERÍA
  ======================================================= */

  const closeLightbox =
    useCallback(() => {
      setSelectedImageIndex(
        null
      );
    }, []);

  /* =======================================================
     IMAGEN ANTERIOR
  ======================================================= */

  const showPreviousImage =
    useCallback(() => {
      if (
        galleryImages.length === 0
      ) {
        return;
      }

      setSelectedImageIndex(
        (currentIndex) => {
          if (
            currentIndex === null
          ) {
            return null;
          }

          return (
            currentIndex -
            1 +
            galleryImages.length
          ) % galleryImages.length;
        }
      );
    }, []);

  /* =======================================================
     IMAGEN SIGUIENTE
  ======================================================= */

  const showNextImage =
    useCallback(() => {
      if (
        galleryImages.length === 0
      ) {
        return;
      }

      setSelectedImageIndex(
        (currentIndex) => {
          if (
            currentIndex === null
          ) {
            return null;
          }

          return (
            currentIndex + 1
          ) % galleryImages.length;
        }
      );
    }, []);

  /* =======================================================
     CAMBIO AUTOMÁTICO DE FOTOGRAFÍAS
  ======================================================= */

  useEffect(() => {
    /**
     * Detiene el cambio de imágenes cuando:
     *
     * - El cursor está sobre la galería.
     * - La galería ampliada está abierta.
     * - No hay suficientes imágenes.
     * - No existen posiciones visibles.
     */
    if (
      hoverPaused ||
      isLightboxOpen ||
      galleryImages.length < 2 ||
      visibleImages.length === 0
    ) {
      return undefined;
    }

    /**
     * Cambia una imagen aleatoria
     * del mosaico.
     */
    const changeRandomImage = () => {
      if (
        changingRef.current
      ) {
        return;
      }

      let selectedIndex =
        Math.floor(
          Math.random() *
            visibleImages.length
        );

      /**
       * Evita cambiar consecutivamente
       * la misma posición.
       */
      if (
        visibleImages.length >
          1 &&
        selectedIndex ===
          previousIndexRef.current
      ) {
        selectedIndex =
          (selectedIndex + 1) %
          visibleImages.length;
      }

      previousIndexRef.current =
        selectedIndex;

      changingRef.current =
        true;

      setChangingIndex(
        selectedIndex
      );

      timeoutRef.current =
        window.setTimeout(
          () => {
            setVisibleImages(
              (
                currentImages
              ) =>
                currentImages.map(
                  (
                    currentImage,
                    index
                  ) => {
                    if (
                      index !==
                      selectedIndex
                    ) {
                      return currentImage;
                    }

                    /**
                     * Evita reemplazar
                     * una imagen por
                     * la misma.
                     */
                    const alternatives =
                      galleryImages.filter(
                        (image) =>
                          image.id !==
                          currentImage.id
                      );

                    const source =
                      alternatives.length >
                      0
                        ? alternatives
                        : galleryImages;

                    const randomImageIndex =
                      Math.floor(
                        Math.random() *
                          source.length
                      );

                    const replacement =
                      source[
                        randomImageIndex
                      ];

                    return {
                      ...replacement,

                      version:
                        currentImage.version +
                        1,
                    };
                  }
                )
            );

            /**
             * Espera un ciclo de
             * renderizado antes de
             * retirar la clase
             * de transición.
             */
            window.requestAnimationFrame(
              () => {
                setChangingIndex(
                  null
                );

                changingRef.current =
                  false;
              }
            );
          },
          FADE_DURATION
        );
    };

    const intervalId =
      window.setInterval(
        changeRandomImage,
        CHANGE_INTERVAL
      );

    /**
     * Limpieza del efecto.
     */
    return () => {
      window.clearInterval(
        intervalId
      );

      if (
        timeoutRef.current
      ) {
        window.clearTimeout(
          timeoutRef.current
        );

        timeoutRef.current =
          null;
      }

      changingRef.current =
        false;
    };
  }, [
    hoverPaused,
    isLightboxOpen,
    visibleImages.length,
  ]);

  /* =======================================================
     CONTROL DEL TECLADO
  ======================================================= */

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const handleKeyDown = (
      event
    ) => {
      /**
       * Cerrar.
       */
      if (
        event.key ===
        'Escape'
      ) {
        closeLightbox();

        return;
      }

      /**
       * Imagen anterior.
       */
      if (
        event.key ===
        'ArrowLeft'
      ) {
        showPreviousImage();

        return;
      }

      /**
       * Imagen siguiente.
       */
      if (
        event.key ===
        'ArrowRight'
      ) {
        showNextImage();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [
    isLightboxOpen,
    closeLightbox,
    showPreviousImage,
    showNextImage,
  ]);

  /* =======================================================
     BLOQUEAR SCROLL DE LA PÁGINA
  ======================================================= */

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isLightboxOpen]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* ===================================================
          WALL ORIGINAL
      =================================================== */}

      <section
        className="capsos-image-wall"
        id="galeria-capsos"
        aria-labelledby="capsos-wall-title"
      >
        <div
          className="capsos-mosaic-shell"
          onMouseEnter={() =>
            setHoverPaused(true)
          }
          onMouseLeave={() =>
            setHoverPaused(false)
          }
        >
          {visibleImages.length >
          0 ? (
            <div className="capsos-mosaic-grid">

              {/* =========================================
                  LOGO CENTRAL
              ========================================= */}

              <div className="capsos-mosaic-logo">
                <div className="capsos-logo-panel">

                  {logoImage ? (
                    <img
                      src={
                        logoImage.src
                      }
                      alt="Logo de CAPSOS"
                      className="capsos-logo-image"
                    />
                  ) : (
                    <strong className="capsos-logo-fallback">
                      CAPSOS
                    </strong>
                  )}

                  <span>
                    Conectamos nuestra
                    región
                  </span>
                </div>
              </div>

              {/* =========================================
                  FOTOGRAFÍAS
              ========================================= */}

              {visibleImages.map(
                (
                  image,
                  index
                ) => (
                  <figure
                    className={`capsos-mosaic-tile ${
                      changingIndex ===
                      index
                        ? 'is-changing'
                        : ''
                    }`}
                    key={`capsos-position-${index}`}
                    style={{
                      '--motion-delay': `${
                        (index % 8) *
                        -0.5
                      }s`,

                      '--motion-duration': `${
                        9 +
                        (index % 5)
                      }s`,
                    }}

                    /**
                     * ÚNICA MODIFICACIÓN
                     * VISUAL DEL WALL:
                     *
                     * Al hacer clic,
                     * abre la fotografía.
                     */
                    onClick={() =>
                      openLightbox(
                        image
                      )
                    }
                  >
                    <img
                      key={`${image.id}-${image.version}`}
                      src={
                        image.src
                      }
                      alt={
                        image.alt
                      }
                      className="capsos-mosaic-image"
                      loading={
                        index < 12
                          ? 'eager'
                          : 'lazy'
                      }
                      decoding="async"
                      draggable="false"
                    />

                    <span
                      className="capsos-tile-light"
                      aria-hidden="true"
                    />
                  </figure>
                )
              )}
            </div>
          ) : (
            /* =========================================
               SIN IMÁGENES
            ========================================= */

            <div
              className="capsos-gallery-empty"
              role="status"
            >
              <i
                className="fas fa-images"
                aria-hidden="true"
              />

              <strong>
                No se encontraron
                imágenes.
              </strong>

              <span>
                Revisa la carpeta{' '}

                <code>
                  src/assets/capsos-gallery-optimized
                </code>

                .
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          GALERÍA AMPLIADA / LIGHTBOX
      =================================================== */}

      {isLightboxOpen &&
        selectedImage && (
          <div
            className="capsos-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galería de imágenes CAPSOS"

            /**
             * Permite cerrar haciendo clic
             * directamente fuera
             * de la fotografía.
             */
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeLightbox();
              }
            }}
          >
            {/* =========================================
                FONDO
            ========================================= */}

            <div
              className="capsos-lightbox-background"
              aria-hidden="true"
              onClick={
                closeLightbox
              }
            />

            {/* =========================================
                CONTADOR
            ========================================= */}

            <div className="capsos-lightbox-counter">
              {selectedImageIndex +
                1}

              {' / '}

              {
                galleryImages.length
              }
            </div>

            {/* =========================================
                CERRAR
            ========================================= */}

            <button
              type="button"
              className="capsos-lightbox-close"
              onClick={
                closeLightbox
              }
              aria-label="Cerrar galería"
            >
              <i
                className="fas fa-times"
                aria-hidden="true"
              />
            </button>

            {/* =========================================
                IMAGEN ANTERIOR
            ========================================= */}

            {galleryImages.length >
              1 && (
              <button
                type="button"
                className="
                  capsos-lightbox-navigation
                  capsos-lightbox-previous
                "
                onClick={(
                  event
                ) => {
                  event.stopPropagation();

                  showPreviousImage();
                }}
                aria-label="Imagen anterior"
              >
                <i
                  className="fas fa-chevron-left"
                  aria-hidden="true"
                />
              </button>
            )}

            {/* =========================================
                IMAGEN AMPLIADA
            ========================================= */}

            <div
              className="capsos-lightbox-content"
              onMouseDown={(
                event
              ) => {
                event.stopPropagation();
              }}
            >
              <figure className="capsos-lightbox-figure">
                <img
                  key={
                    selectedImage.id
                  }
                  src={
                    selectedImage.src
                  }
                  alt={
                    selectedImage.alt
                  }
                  className="capsos-lightbox-image"
                  draggable="false"
                />

                <figcaption className="capsos-lightbox-caption">
                  {
                    selectedImage.alt
                  }
                </figcaption>
              </figure>
            </div>

            {/* =========================================
                IMAGEN SIGUIENTE
            ========================================= */}

            {galleryImages.length >
              1 && (
              <button
                type="button"
                className="
                  capsos-lightbox-navigation
                  capsos-lightbox-next
                "
                onClick={(
                  event
                ) => {
                  event.stopPropagation();

                  showNextImage();
                }}
                aria-label="Imagen siguiente"
              >
                <i
                  className="fas fa-chevron-right"
                  aria-hidden="true"
                />
              </button>
            )}

            {/* =========================================
                AYUDA
            ========================================= */}

            <div className="capsos-lightbox-help">
              <span>
                <i
                  className="fas fa-arrow-left"
                  aria-hidden="true"
                />

                <i
                  className="fas fa-arrow-right"
                  aria-hidden="true"
                />

                Navegar
              </span>

              <span>
                ESC para cerrar
              </span>
            </div>
          </div>
        )}
    </>
  );
};

export default CapsosImageWall;