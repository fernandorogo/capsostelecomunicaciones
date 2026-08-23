import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import '../css/Slider.css';

/* =========================================================
   CONFIGURACIÓN DE WHATSAPP
========================================================= */

const WHATSAPP_NUMBER = '573044875527';

const createWhatsAppUrl = (message) => {
  const defaultMessage =
    'Hola, solicito información sobre los servicios de CAPSOS Telecomunicaciones.';

  const encodedMessage = encodeURIComponent(
    message || defaultMessage
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/* =========================================================
   CARGA AUTOMÁTICA DE VIDEOS E IMÁGENES

   Carpeta:
   src/assets/slider/
========================================================= */

const mediaContext = require.context(
  '../assets/slider',
  true,
  /\.(mp4|webm|ogg|jpg|jpeg|png|webp|avif|gif)$/i
);

/* =========================================================
   EXTENSIONES SOPORTADAS
========================================================= */

const VIDEO_EXTENSIONS = new Set([
  'mp4',
  'webm',
  'ogg',
]);

const IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'avif',
  'gif',
]);

/* =========================================================
   INTERVALOS
========================================================= */

/**
 * Tiempo que permanece una imagen.
 */
const IMAGE_INTERVAL = 6500;

/**
 * Intervalo utilizado si no existe multimedia.
 */
const EMPTY_MEDIA_INTERVAL = 6500;

/**
 * Tiempo de respaldo para videos.
 *
 * Normalmente el cambio se realiza
 * cuando termina el video.
 */
const VIDEO_FALLBACK_INTERVAL = 12000;

/* =========================================================
   FUNCIONES PARA ARCHIVOS
========================================================= */

const getFileName = (path) => {
  return path.split('/').pop() || path;
};

const getFileNameWithoutExtension = (path) => {
  return getFileName(path).replace(
    /\.[^.]+$/,
    ''
  );
};

const getFileExtension = (path) => {
  return (
    path
      .split('.')
      .pop()
      ?.toLowerCase() || ''
  );
};

/* =========================================================
   ORDEN NATURAL
========================================================= */

const naturalSort = (
  itemA,
  itemB
) => {
  return getFileName(
    itemA.path
  ).localeCompare(
    getFileName(itemB.path),
    'es',
    {
      numeric: true,
      sensitivity: 'base',
    }
  );
};

/* =========================================================
   IMPORTACIÓN AUTOMÁTICA
========================================================= */

const importedMediaFiles = mediaContext
  .keys()
  .map((path) => {
    const importedFile =
      mediaContext(path);

    const mediaUrl =
      importedFile?.default ||
      importedFile;

    const extension =
      getFileExtension(path);

    let type = null;

    if (
      VIDEO_EXTENSIONS.has(
        extension
      )
    ) {
      type = 'video';
    }

    if (
      IMAGE_EXTENSIONS.has(
        extension
      )
    ) {
      type = 'image';
    }

    return {
      id:
        getFileNameWithoutExtension(
          path
        ),

      path,

      media: mediaUrl,

      extension,

      type,
    };
  })
  .filter(
    (item) =>
      item.type !== null
  );

/* =========================================================
   VIDEOS
========================================================= */

const videos =
  importedMediaFiles
    .filter(
      (item) =>
        item.type === 'video'
    )
    .sort(naturalSort);

/* =========================================================
   IMÁGENES
========================================================= */

const images =
  importedMediaFiles
    .filter(
      (item) =>
        item.type === 'image'
    )
    .sort(naturalSort);

/* =========================================================
   INFORMACIÓN DE DESARROLLO
========================================================= */

if (
  process.env.NODE_ENV ===
  'development'
) {
  console.info(
    '[CAPSOS Slider] Multimedia encontrada:',
    {
      videos: videos.map(
        (item) => item.path
      ),

      imagenes: images.map(
        (item) => item.path
      ),
    }
  );
}

/* =========================================================
   CONTENIDO TEXTUAL

   IMPORTANTE:
   ESTE CONTENIDO SOLAMENTE SE MOSTRARÁ
   SOBRE LAS DIAPOSITIVAS DE IMAGEN.
========================================================= */

const slideContent = [
  {
    id: 'internet',

    position: 'center',

    category:
      'Internet por fibra óptica',

    title:
      'Conecta tu hogar',

    accent:
      'a otra velocidad',

    description:
      'Disfruta una conexión estable para trabajar, estudiar, comunicarte y vivir tus mejores momentos en línea.',

    features: [
      'Conexión estable',
      'Atención cercana',
    ],

    primaryButton: {
      text:
        'Conocer los planes',

      href:
        '/internet',
    },

    secondaryButton: {
      text:
        'Consultar cobertura',

      message:
        'Hola, solicito información de cobertura para el servicio de internet por fibra óptica.',
    },
  },

  {
    id: 'television',

    position: 'center',

    category:
      'Televisión para tu hogar',

    title:
      'Entretenimiento',

    accent:
      'para disfrutar juntos',

    description:
      'Programación, información y entretenimiento para compartir grandes momentos con toda la familia.',

    features: [
      'Contenido para todos',
      'Experiencia de calidad',
    ],

    primaryButton: {
      text:
        'Ver planes de televisión',

      href:
        '/television',
    },

    secondaryButton: {
      text:
        'Solicitar información',

      message:
        'Hola, solicito información sobre los planes y la disponibilidad del servicio de televisión.',
    },
  },

  {
    id: 'empresas',

    position: 'center',

    category:
      'Soluciones para empresas',

    title:
      'Tu empresa',

    accent:
      'siempre conectada',

    description:
      'Fortalece la comunicación, productividad y crecimiento de tu organización con soluciones de conectividad.',

    features: [
      'Soluciones empresariales',
      'Acompañamiento especializado',
    ],

    primaryButton: {
      text:
        'Conocer soluciones',

      href:
        '/canal',
    },

    secondaryButton: {
      text:
        'Hablar con un asesor',

      message:
        'Hola, deseo hablar con un asesor para recibir información sobre las soluciones de conectividad para empresas.',
    },
  },

  {
    id: 'audiovisual',

    position: 'center',

    category:
      'Producción audiovisual',

    title:
      'Contenido que conecta',

    accent:
      'con tu audiencia',

    description:
      'Creamos contenidos audiovisuales para comunicar, informar y fortalecer la identidad de tu organización.',

    features: [
      'Producción profesional',
      'Contenido estratégico',
    ],

    primaryButton: {
      text:
        'Conocer el servicio',

      href:
        '/canal',
    },

    secondaryButton: {
      text:
        'Solicitar una propuesta',

      message:
        'Hola, solicito información y una propuesta para el servicio de producción audiovisual.',
    },
  },
];

/* =========================================================
   CREACIÓN DE DIAPOSITIVAS
========================================================= */

const createSlides = () => {
  const hasVideos =
    videos.length > 0;

  const hasImages =
    images.length > 0;

  const generatedSlides = [];

  /* =======================================================
     SI TENEMOS VIDEOS E IMÁGENES
  ======================================================= */

  if (
    hasVideos &&
    hasImages
  ) {
    /**
     * Necesitamos como mínimo una imagen
     * por cada contenido textual.
     *
     * Si existen más imágenes o videos,
     * también las tendremos en cuenta.
     */
    const pairCount = Math.max(
      videos.length,
      images.length,
      slideContent.length
    );

    for (
      let index = 0;
      index < pairCount;
      index += 1
    ) {
      /* ===================================================
         VIDEO
         SIN TEXTO
      =================================================== */

      const video =
        videos[
          index %
            videos.length
        ];

      generatedSlides.push({
        id:
          `video-${video.id}-${index}`,

        type:
          'video',

        media:
          video.media,

        path:
          video.path,

        content:
          null,

        position:
          'center',

        poster:
          images[
            index %
              images.length
          ]?.media || '',

        interval:
          VIDEO_FALLBACK_INTERVAL,

        isSingleMedia:
          false,
      });

      /* ===================================================
         IMAGEN
         CON TEXTO
      =================================================== */

      const image =
        images[
          index %
            images.length
        ];

      const content =
        slideContent[
          index %
            slideContent.length
        ];

      generatedSlides.push({
        id:
          `image-${image.id}-${content.id}-${index}`,

        type:
          'image',

        media:
          image.media,

        path:
          image.path,

        content,

        position:
          content.position ||
          'center',

        poster:
          '',

        interval:
          IMAGE_INTERVAL,

        isSingleMedia:
          false,
      });
    }

    return generatedSlides;
  }

  /* =======================================================
     SI SOLO TENEMOS IMÁGENES
  ======================================================= */

  if (hasImages) {
    /**
     * Garantiza que aparezcan todos
     * los contenidos textuales aunque
     * haya menos imágenes que textos.
     */
    const imageSlideCount =
      Math.max(
        images.length,
        slideContent.length
      );

    for (
      let index = 0;
      index <
      imageSlideCount;
      index += 1
    ) {
      const image =
        images[
          index %
            images.length
        ];

      const content =
        slideContent[
          index %
            slideContent.length
        ];

      generatedSlides.push({
        id:
          `image-${image.id}-${content.id}-${index}`,

        type:
          'image',

        media:
          image.media,

        path:
          image.path,

        content,

        position:
          content.position ||
          'center',

        poster:
          '',

        interval:
          IMAGE_INTERVAL,

        isSingleMedia:
          imageSlideCount === 1,
      });
    }

    return generatedSlides;
  }

  /* =======================================================
     SI SOLO TENEMOS VIDEOS
  ======================================================= */

  if (hasVideos) {
    videos.forEach(
      (
        video,
        index
      ) => {
        generatedSlides.push({
          id:
            `video-${video.id}-${index}`,

          type:
            'video',

          media:
            video.media,

          path:
            video.path,

          /**
           * IMPORTANTE:
           * Video nunca tiene texto.
           */
          content:
            null,

          position:
            'center',

          poster:
            '',

          interval:
            VIDEO_FALLBACK_INTERVAL,

          isSingleMedia:
            videos.length === 1,
        });
      }
    );

    return generatedSlides;
  }

  /* =======================================================
     SIN MULTIMEDIA
  ======================================================= */

  return [
    {
      id:
        'slider-empty',

      type:
        'empty',

      media:
        '',

      content:
        null,

      position:
        'center',

      poster:
        '',

      interval:
        EMPTY_MEDIA_INTERVAL,

      isSingleMedia:
        true,
    },
  ];
};

/* =========================================================
   SLIDES DEFINITIVOS
========================================================= */

const slides =
  createSlides();

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const Slider = () => {
  /* =======================================================
     REFERENCIAS
  ======================================================= */

  const carouselRef =
    useRef(null);

  const videoRefs =
    useRef([]);

  const timerRef =
    useRef(null);

  /**
   * Preferencia actual de sonido.
   *
   * true = silenciado.
   */
  const videoMutedRef =
    useRef(true);

  /* =======================================================
     ESTADOS
  ======================================================= */

  const [
    activeSlideIndex,
    setActiveSlideIndex,
  ] = useState(0);

  const [
    isVideoMuted,
    setIsVideoMuted,
  ] = useState(true);

  /* =======================================================
     LIMPIAR TEMPORIZADOR
  ======================================================= */

  const clearTimer =
    useCallback(() => {
      if (
        !timerRef.current
      ) {
        return;
      }

      window.clearTimeout(
        timerRef.current
      );

      timerRef.current =
        null;
    }, []);

  /* =======================================================
     PAUSAR TODOS LOS VIDEOS
  ======================================================= */

  const pauseAllVideos =
    useCallback(() => {
      videoRefs.current.forEach(
        (video) => {
          if (!video) {
            return;
          }

          video.pause();

          try {
            video.currentTime =
              0;
          } catch (error) {
            console.warn(
              'No fue posible reiniciar el video.',
              error
            );
          }
        }
      );
    }, []);

  /* =======================================================
     ACTIVAR / DESACTIVAR SONIDO
  ======================================================= */

  const toggleVideoMute =
    useCallback(() => {
      const nextMutedState =
        !videoMutedRef.current;

      videoMutedRef.current =
        nextMutedState;

      setIsVideoMuted(
        nextMutedState
      );

      /**
       * Actualizar todos los elementos
       * de video ya renderizados.
       */
      videoRefs.current.forEach(
        (video) => {
          if (!video) {
            return;
          }

          video.muted =
            nextMutedState;
        }
      );

      /**
       * Obtener video activo.
       */
      const carousel =
        carouselRef.current;

      const activeVideo =
        carousel?.querySelector(
          '.carousel-item.active video'
        );

      if (!activeVideo) {
        return;
      }

      activeVideo.muted =
        nextMutedState;

      /**
       * Al activar sonido,
       * aseguramos que continúe
       * reproduciéndose.
       */
      if (!nextMutedState) {
        const playPromise =
          activeVideo.play();

        if (
          playPromise !==
          undefined
        ) {
          playPromise.catch(
            (error) => {
              console.warn(
                'No fue posible activar la reproducción con sonido.',
                error
              );
            }
          );
        }
      }
    }, []);

  /* =======================================================
     IR AL SIGUIENTE SLIDE
  ======================================================= */

  const goToNextSlide =
    useCallback(() => {
      const carousel =
        carouselRef.current;

      if (
        !carousel ||
        slides.length <= 1
      ) {
        return;
      }

      const nextButton =
        carousel.querySelector(
          '.capsos-slider-next'
        );

      nextButton?.click();
    }, []);

  /* =======================================================
     PREPARAR SLIDE ACTIVO
  ======================================================= */

  const prepareActiveSlide =
    useCallback(() => {
      const carousel =
        carouselRef.current;

      if (!carousel) {
        return;
      }

      clearTimer();

      pauseAllVideos();

      /* ---------------------------------------------------
         SLIDE ACTIVO
      --------------------------------------------------- */

      const activeSlide =
        carousel.querySelector(
          '.carousel-item.active'
        );

      if (!activeSlide) {
        return;
      }

      /* ---------------------------------------------------
         ÍNDICE
      --------------------------------------------------- */

      const carouselItems =
        Array.from(
          carousel.querySelectorAll(
            '.carousel-item'
          )
        );

      const currentSlideIndex =
        carouselItems.indexOf(
          activeSlide
        );

      if (
        currentSlideIndex >= 0
      ) {
        setActiveSlideIndex(
          currentSlideIndex
        );
      }

      /* ---------------------------------------------------
         TIPO
      --------------------------------------------------- */

      const mediaType =
        activeSlide.dataset
          .mediaType ||
        'empty';

      /* ---------------------------------------------------
         INTERVALO
      --------------------------------------------------- */

      const interval = Number(
        activeSlide.dataset
          .interval ||
          EMPTY_MEDIA_INTERVAL
      );

      /* ===================================================
         VIDEO
      =================================================== */

      if (
        mediaType ===
        'video'
      ) {
        const video =
          activeSlide.querySelector(
            'video'
          );

        if (!video) {
          timerRef.current =
            window.setTimeout(
              goToNextSlide,
              interval
            );

          return;
        }

        try {
          video.currentTime =
            0;
        } catch (error) {
          console.warn(
            'No fue posible reiniciar el video.',
            error
          );
        }

        /**
         * Mantener preferencia
         * de sonido del usuario.
         */
        video.muted =
          videoMutedRef.current;

        video.playsInline =
          true;

        const playPromise =
          video.play();

        if (
          playPromise !==
          undefined
        ) {
          playPromise.catch(
            () => {
              /**
               * Algunos navegadores no
               * permiten autoplay
               * con sonido.
               *
               * Si eso ocurre,
               * volver a silenciar.
               */
              if (!video.muted) {
                video.muted =
                  true;

                videoMutedRef.current =
                  true;

                setIsVideoMuted(
                  true
                );

                const retryPlay =
                  video.play();

                if (
                  retryPlay !==
                  undefined
                ) {
                  retryPlay.catch(
                    () => {
                      timerRef.current =
                        window.setTimeout(
                          goToNextSlide,
                          interval
                        );
                    }
                  );
                }

                return;
              }

              timerRef.current =
                window.setTimeout(
                  goToNextSlide,
                  interval
                );
            }
          );
        }

        return;
      }

      /* ===================================================
         IMAGEN
      =================================================== */

      timerRef.current =
        window.setTimeout(
          goToNextSlide,
          interval
        );
    }, [
      clearTimer,
      goToNextSlide,
      pauseAllVideos,
    ]);

  /* =======================================================
     ANTES DE CAMBIAR SLIDE
  ======================================================= */

  const handleBeforeSlide =
    useCallback(() => {
      clearTimer();

      pauseAllVideos();
    }, [
      clearTimer,
      pauseAllVideos,
    ]);

  /* =======================================================
     EVENTOS BOOTSTRAP
  ======================================================= */

  useEffect(() => {
    const carousel =
      carouselRef.current;

    if (!carousel) {
      return undefined;
    }

    carousel.addEventListener(
      'slide.bs.carousel',
      handleBeforeSlide
    );

    carousel.addEventListener(
      'slid.bs.carousel',
      prepareActiveSlide
    );

    /**
     * Preparar primer slide.
     */
    prepareActiveSlide();

    return () => {
      carousel.removeEventListener(
        'slide.bs.carousel',
        handleBeforeSlide
      );

      carousel.removeEventListener(
        'slid.bs.carousel',
        prepareActiveSlide
      );

      clearTimer();

      pauseAllVideos();
    };
  }, [
    clearTimer,
    handleBeforeSlide,
    pauseAllVideos,
    prepareActiveSlide,
  ]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="capsos-hero-slider"
      aria-label="Servicios destacados de CAPSOS Telecomunicaciones"
    >
      <div
        id="capsosMainSlider"
        ref={carouselRef}
        className="carousel slide carousel-fade capsos-carousel"
        data-bs-interval="false"
        data-bs-touch="true"
        data-bs-keyboard="true"
      >
        {/* =================================================
            SLIDES
        ================================================= */}

        <div className="carousel-inner">
          {slides.map(
            (
              slide,
              index
            ) => {
              const content =
                slide.content;

              const hasMedia =
                Boolean(
                  slide.media
                );

              const isVideo =
                slide.type ===
                'video';

              const isImage =
                slide.type ===
                'image';

              return (
                <div
                  key={
                    slide.id
                  }
                  className={`carousel-item ${
                    index === 0
                      ? 'active'
                      : ''
                  }`}
                  data-media-type={
                    slide.type
                  }
                  data-interval={
                    slide.interval
                  }
                >
                  <article
                    className={`capsos-slide-layout ${
                      isVideo
                        ? 'capsos-slide-layout-video'
                        : isImage
                          ? 'capsos-slide-layout-image'
                          : 'capsos-slide-empty'
                    }`}
                  >
                    {/* =====================================
                        MULTIMEDIA DE FONDO

                        Primero se renderiza la multimedia.
                        CSS controla su posición absoluta.
                    ===================================== */}

                    <div
                      className={`capsos-slide-media-panel ${
                        isVideo
                          ? 'capsos-slide-media-panel-video'
                          : ''
                      }`}
                      style={
                        !hasMedia
                          ? {
                              background:
                                'radial-gradient(circle at 72% 30%, rgba(22, 211, 243, 0.18), transparent 38%), linear-gradient(145deg, #07516f 0%, #03283f 100%)',
                            }
                          : undefined
                      }
                    >
                      {/* =================================
                          VIDEO
                      ================================= */}

                      {isVideo &&
                        hasMedia && (
                          <>
                            <video
                              ref={(
                                element
                              ) => {
                                videoRefs.current[
                                  index
                                ] =
                                  element;
                              }}
                              className="capsos-slide-media"
                              muted={
                                isVideoMuted
                              }
                              autoPlay={
                                index ===
                                0
                              }
                              loop={
                                slide.isSingleMedia
                              }
                              playsInline
                              preload={
                                index ===
                                0
                                  ? 'auto'
                                  : 'metadata'
                              }
                              poster={
                                slide.poster ||
                                undefined
                              }
                              onEnded={
                                slide.isSingleMedia
                                  ? undefined
                                  : goToNextSlide
                              }
                              style={{
                                objectPosition:
                                  slide.position,
                              }}
                            >
                              <source
                                src={
                                  slide.media
                                }
                              />

                              Tu navegador no
                              soporta la reproducción
                              de video.
                            </video>

                            {/* ===========================
                                BOTÓN SONIDO
                            =========================== */}

                            <button
                              type="button"
                              className="capsos-video-audio-control"
                              onClick={
                                toggleVideoMute
                              }
                              aria-label={
                                isVideoMuted
                                  ? 'Activar sonido del video'
                                  : 'Silenciar video'
                              }
                              title={
                                isVideoMuted
                                  ? 'Activar sonido'
                                  : 'Silenciar'
                              }
                              style={{
                                position:
                                  'absolute',

                                right:
                                  'clamp(18px, 3vw, 42px)',

                                bottom:
                                  'clamp(65px, 7vw, 95px)',

                                zIndex:
                                  20,

                                display:
                                  'flex',

                                alignItems:
                                  'center',

                                justifyContent:
                                  'center',

                                gap:
                                  '9px',

                                minWidth:
                                  '48px',

                                height:
                                  '48px',

                                padding:
                                  '0 16px',

                                border:
                                  '1px solid rgba(255, 255, 255, 0.24)',

                                borderRadius:
                                  '999px',

                                color:
                                  '#ffffff',

                                background:
                                  'rgba(2, 9, 22, 0.60)',

                                backdropFilter:
                                  'blur(12px)',

                                WebkitBackdropFilter:
                                  'blur(12px)',

                                boxShadow:
                                  '0 10px 30px rgba(0, 0, 0, 0.26)',

                                cursor:
                                  'pointer',

                                fontSize:
                                  '0.78rem',

                                fontWeight:
                                  '700',

                                letterSpacing:
                                  '0.02em',
                              }}
                            >
                              <i
                                className={
                                  isVideoMuted
                                    ? 'fas fa-volume-mute'
                                    : 'fas fa-volume-up'
                                }
                                aria-hidden="true"
                              />

                              <span>
                                {isVideoMuted
                                  ? 'Activar sonido'
                                  : 'Silenciar'}
                              </span>
                            </button>
                          </>
                        )}

                      {/* =================================
                          IMAGEN
                      ================================= */}

                      {isImage &&
                        hasMedia && (
                          <img
                            src={
                              slide.media
                            }
                            className="capsos-slide-media"
                            alt={
                              content
                                ? `${content.title} ${content.accent}`
                                : 'CAPSOS Telecomunicaciones'
                            }
                            loading={
                              index <= 1
                                ? 'eager'
                                : 'lazy'
                            }
                            style={{
                              objectPosition:
                                slide.position,
                            }}
                          />
                        )}

                      {/* =================================
                          CAPA DE COLOR
                      ================================= */}

                      <div className="capsos-media-overlay" />

                      {/* =================================
                          VIÑETA
                      ================================= */}

                      <div className="capsos-media-vignette" />

                      {/* =================================
                          MARCA CAPSOS

                          SOLO PARA IMÁGENES
                      ================================= */}

                      {isImage &&
                        hasMedia && (
                          <div className="capsos-media-brand">
                            <span className="capsos-media-brand-dot" />

                            CAPSOS
                            Telecomunicaciones
                          </div>
                        )}
                    </div>

                    {/* =====================================
                        CONTENIDO TEXTUAL

                        IMPORTANTE:
                        ÚNICAMENTE SE RENDERIZA
                        SI EL SLIDE ES UNA IMAGEN.
                    ===================================== */}

                    {isImage &&
                      content && (
                        <div className="capsos-slide-copy-panel">
                          <div className="capsos-slide-copy">

                            {/* ---------------------------
                                CATEGORÍA
                            --------------------------- */}

                            <span className="capsos-slide-category">
                              <span className="capsos-category-line" />

                              {
                                content.category
                              }
                            </span>

                            {/* ---------------------------
                                TÍTULO
                            --------------------------- */}

                            <h2 className="capsos-slide-title">
                              {
                                content.title
                              }

                              <span>
                                {
                                  content.accent
                                }
                              </span>
                            </h2>

                            {/* ---------------------------
                                DESCRIPCIÓN
                            --------------------------- */}

                            <p className="capsos-slide-description">
                              {
                                content.description
                              }
                            </p>

                            {/* ---------------------------
                                CARACTERÍSTICAS
                            --------------------------- */}

                            <div className="capsos-slide-features">
                              {content.features.map(
                                (
                                  feature
                                ) => (
                                  <span
                                    key={
                                      feature
                                    }
                                  >
                                    <i
                                      className="fas fa-check-circle"
                                      aria-hidden="true"
                                    />

                                    {
                                      feature
                                    }
                                  </span>
                                )
                              )}
                            </div>

                            {/* ---------------------------
                                ACCIONES
                            --------------------------- */}

                            <div className="capsos-slide-actions">

                              {/* BOTÓN PRINCIPAL */}

                              {content.primaryButton && (
                                <a
                                  href={
                                    content
                                      .primaryButton
                                      .href
                                  }
                                  className="capsos-slider-button capsos-slider-button-primary"
                                >
                                  {
                                    content
                                      .primaryButton
                                      .text
                                  }

                                  <i
                                    className="fas fa-arrow-right"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}

                              {/* WHATSAPP */}

                              {content.secondaryButton && (
                                <a
                                  href={createWhatsAppUrl(
                                    content
                                      .secondaryButton
                                      .message
                                  )}
                                  className="capsos-slider-button capsos-slider-button-secondary"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${content.secondaryButton.text} por WhatsApp`}
                                >
                                  <i
                                    className="fas fa-comment-dots"
                                    aria-hidden="true"
                                  />

                                  {
                                    content
                                      .secondaryButton
                                      .text
                                  }
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </article>
                </div>
              );
            }
          )}
        </div>

        {/* =================================================
            NAVEGACIÓN
        ================================================= */}

        {slides.length > 1 && (
          <div className="capsos-slider-navigation">

            {/* =============================================
                ANTERIOR
            ============================================= */}

            <button
              className="capsos-slider-arrow capsos-slider-prev"
              type="button"
              data-bs-target="#capsosMainSlider"
              data-bs-slide="prev"
              aria-label="Ver diapositiva anterior"
            >
              <i
                className="fas fa-arrow-left"
                aria-hidden="true"
              />
            </button>

            {/* =============================================
                INDICADORES

                AHORA HAY UN INDICADOR REAL
                POR CADA SLIDE.
            ============================================= */}

            <div className="carousel-indicators capsos-slider-indicators">
              {slides.map(
                (
                  slide,
                  index
                ) => (
                  <button
                    key={`indicator-${slide.id}`}
                    type="button"
                    data-bs-target="#capsosMainSlider"
                    data-bs-slide-to={
                      index
                    }
                    className={
                      activeSlideIndex ===
                      index
                        ? 'active'
                        : ''
                    }
                    aria-current={
                      activeSlideIndex ===
                      index
                        ? 'true'
                        : undefined
                    }
                    aria-label={`Ir a la diapositiva ${
                      index + 1
                    }`}
                  />
                )
              )}
            </div>

            {/* =============================================
                SIGUIENTE
            ============================================= */}

            <button
              className="capsos-slider-arrow capsos-slider-next"
              type="button"
              data-bs-target="#capsosMainSlider"
              data-bs-slide="next"
              aria-label="Ver siguiente diapositiva"
            >
              <i
                className="fas fa-arrow-right"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Slider;