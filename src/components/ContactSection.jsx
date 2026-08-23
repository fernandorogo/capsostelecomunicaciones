import React, {
  useMemo,
  useRef,
  useState,
} from 'react';

import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

const WHATSAPP_NUMBER = '573177089554';

/* =========================================================
   FECHAS Y RADICACIÓN
========================================================= */

const getBogotaDate = () => {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const dateValues = Object.fromEntries(
    dateParts.map(({ type, value }) => [
      type,
      value,
    ])
  );

  return (
    `${dateValues.year}` +
    `${dateValues.month}` +
    `${dateValues.day}`
  );
};

const getBogotaDateTime = () =>
  new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());

/**
 * Genera un identificador criptográfico de 128 bits.
 *
 * No utiliza consecutivos ni localStorage.
 *
 * Ejemplo:
 * EB77FC8FB2BB47A63C404DBB35880DC8
 */
const createSecureIdentifier = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto
      .randomUUID()
      .replace(/-/g, '')
      .toUpperCase();
  }

  if (window.crypto?.getRandomValues) {
    const randomBytes = new Uint8Array(16);

    window.crypto.getRandomValues(randomBytes);

    return Array.from(randomBytes)
      .map((byte) =>
        byte
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
      .toUpperCase();
  }

  throw new Error(
    'El navegador no permite generar identificadores seguros.'
  );
};

/**
 * Crea el código único de radicación.
 *
 * Formato:
 * PQRSF-FECHA-CÓDIGO
 *
 * Ejemplo:
 * PQRSF-20260725-EB77FC8FB2BB47A63C404DBB35880DC8
 */
const createUniqueRadicado = () => {
  const date = getBogotaDate();
  const secureIdentifier =
    createSecureIdentifier();

  return (
    `PQRSF-${date}-` +
    `${secureIdentifier}`
  );
};

/* =========================================================
   RUTAS INTERNAS
========================================================= */

/**
 * Construye una URL compatible con HashRouter,
 * desarrollo local y GitHub Pages.
 *
 * Desarrollo:
 * http://localhost:3000/#/terminos-y-condiciones
 *
 * GitHub Pages:
 * https://fernandorogo.github.io/
 * capsostelecomunicaciones/#/terminos-y-condiciones
 */
const createInternalHashUrl = (route) => {
  const normalizedRoute =
    route.startsWith('/')
      ? route
      : `/${route}`;

  const publicBase = (
    process.env.PUBLIC_URL || ''
  ).replace(/\/+$/, '');

  return (
    `${window.location.origin}` +
    `${publicBase}${normalizedRoute}`
  );
};

/* =========================================================
   CONFIGURACIÓN DEL PDF
========================================================= */

const PDF_COLORS = {
  primary: [7, 66, 101],
  secondary: [10, 145, 173],
  text: [36, 45, 52],
  muted: [103, 117, 126],
  light: [241, 247, 249],
  border: [205, 218, 224],
  white: [255, 255, 255],
};

const normalizePdfValue = (
  value,
  fallback = 'No registrado'
) => {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  const normalizedValue =
    String(value).trim();

  return normalizedValue || fallback;
};

const downloadBlob = (
  blob,
  filename
) => {
  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1500);
};

/**
 * Construye el comprobante PDF de la PQRSF
 * completamente en el navegador.
 */
const createPqrsfPdf = ({
  radicado,
  fechaRegistro,
  formData,
  archivos,
  tipoLabel,
  categoriaLabel,
  medioRespuestaLabel,
  formatFileSize,
}) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  const margin = 15;
  const contentWidth =
    pageWidth - margin * 2;

  const footerLimit =
    pageHeight - 18;

  let currentY = 18;

  const setTextColor = (color) => {
    pdf.setTextColor(...color);
  };

  const drawContinuationHeader = () => {
    pdf.setFillColor(
      ...PDF_COLORS.primary
    );

    pdf.rect(
      0,
      0,
      pageWidth,
      12,
      'F'
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(8.5);

    pdf.setTextColor(
      ...PDF_COLORS.white
    );

    pdf.text(
      `CAPSOS TELECOMUNICACIONES - PQRSF ${radicado}`,
      margin,
      7.8
    );

    currentY = 19;
  };

  const addPage = () => {
    pdf.addPage();
    drawContinuationHeader();
  };

  const ensureSpace = (
    requiredHeight
  ) => {
    if (
      currentY + requiredHeight >
      footerLimit
    ) {
      addPage();
    }
  };

  const addSectionTitle = (title) => {
    ensureSpace(11);

    pdf.setFillColor(
      ...PDF_COLORS.light
    );

    pdf.roundedRect(
      margin,
      currentY,
      contentWidth,
      8,
      1.5,
      1.5,
      'F'
    );

    pdf.setDrawColor(
      ...PDF_COLORS.border
    );

    pdf.roundedRect(
      margin,
      currentY,
      contentWidth,
      8,
      1.5,
      1.5,
      'S'
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(10);

    setTextColor(
      PDF_COLORS.primary
    );

    pdf.text(
      title.toUpperCase(),
      margin + 3,
      currentY + 5.3
    );

    currentY += 11;
  };

  const addField = (
    label,
    value
  ) => {
    const safeValue =
      normalizePdfValue(value);

    const labelWidth = 43;

    const valueWidth =
      contentWidth -
      labelWidth -
      3;

    const valueLines =
      pdf.splitTextToSize(
        safeValue,
        valueWidth
      );

    const lineHeight = 4.4;

    const requiredHeight =
      Math.max(
        6,
        valueLines.length *
          lineHeight +
          1
      );

    ensureSpace(requiredHeight);

    pdf.setFontSize(9);

    pdf.setFont(
      'helvetica',
      'bold'
    );

    setTextColor(
      PDF_COLORS.text
    );

    pdf.text(
      `${label}:`,
      margin,
      currentY
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.text(
      valueLines,
      margin + labelWidth,
      currentY
    );

    currentY += requiredHeight;
  };

  const addLongField = (
    label,
    value
  ) => {
    const safeValue =
      normalizePdfValue(value);

    const textLines =
      pdf.splitTextToSize(
        safeValue,
        contentWidth - 8
      );

    const lineHeight = 4.6;

    const boxHeight =
      textLines.length *
        lineHeight +
      13;

    ensureSpace(
      Math.min(
        boxHeight,
        footerLimit - 25
      )
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(9.5);

    setTextColor(
      PDF_COLORS.text
    );

    pdf.text(
      `${label}:`,
      margin,
      currentY
    );

    currentY += 4;

    let remainingLines = [
      ...textLines,
    ];

    while (
      remainingLines.length > 0
    ) {
      const availableHeight =
        footerLimit -
        currentY -
        5;

      const maxLines = Math.max(
        1,
        Math.floor(
          (availableHeight - 7) /
            lineHeight
        )
      );

      const pageLines =
        remainingLines.splice(
          0,
          maxLines
        );

      const currentBoxHeight =
        pageLines.length *
          lineHeight +
        7;

      pdf.setFillColor(
        252,
        253,
        253
      );

      pdf.setDrawColor(
        ...PDF_COLORS.border
      );

      pdf.roundedRect(
        margin,
        currentY,
        contentWidth,
        currentBoxHeight,
        1.5,
        1.5,
        'FD'
      );

      pdf.setFont(
        'helvetica',
        'normal'
      );

      pdf.setFontSize(9);

      setTextColor(
        PDF_COLORS.text
      );

      pdf.text(
        pageLines,
        margin + 4,
        currentY + 5
      );

      currentY +=
        currentBoxHeight + 3;

      if (
        remainingLines.length > 0
      ) {
        addPage();
      }
    }
  };

  /* =======================================================
     ENCABEZADO PRINCIPAL
  ======================================================= */

  pdf.setFillColor(
    ...PDF_COLORS.primary
  );

  pdf.rect(
    0,
    0,
    pageWidth,
    35,
    'F'
  );

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(18);

  pdf.setTextColor(
    ...PDF_COLORS.white
  );

  pdf.text(
    'CAPSOS TELECOMUNICACIONES',
    margin,
    15
  );

  pdf.setFontSize(10.5);

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.text(
    'Comprobante de radicación - Peticiones, Quejas, Reclamos, Solicitudes y Felicitaciones',
    margin,
    23,
    {
      maxWidth: contentWidth,
    }
  );

  currentY = 43;

  /* =======================================================
     CAJA DE RADICADO
  ======================================================= */

  pdf.setFillColor(
    ...PDF_COLORS.light
  );

  pdf.setDrawColor(
    ...PDF_COLORS.secondary
  );

  pdf.setLineWidth(0.6);

  pdf.roundedRect(
    margin,
    currentY,
    contentWidth,
    28,
    2,
    2,
    'FD'
  );

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(9);

  setTextColor(
    PDF_COLORS.muted
  );

  pdf.text(
    'NÚMERO DE RADICADO',
    margin + 5,
    currentY + 7
  );

  pdf.setFontSize(12.5);

  setTextColor(
    PDF_COLORS.primary
  );

  const radicadoLines =
    pdf.splitTextToSize(
      radicado,
      contentWidth - 10
    );

  pdf.text(
    radicadoLines,
    margin + 5,
    currentY + 14
  );

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(8.8);

  setTextColor(
    PDF_COLORS.text
  );

  pdf.text(
    `Estado: Recibida | Fecha de registro: ${fechaRegistro}`,
    margin + 5,
    currentY + 23
  );

  currentY += 34;

  const documento =
    formData.tipoPersona ===
    'natural'
      ? `${formData.tipoDocumento} ${formData.numeroDocumento}`.trim()
      : `NIT ${formData.nit}`.trim();

  addSectionTitle(
    'Información del solicitante'
  );

  addField(
    'Tipo de persona',
    formData.tipoPersona ===
      'natural'
      ? 'Persona natural'
      : 'Persona jurídica'
  );

  addField(
    'Nombre',
    formData.nombreCompleto
  );

  addField(
    'Documento',
    documento
  );

  addField(
    'Razón social',
    formData.tipoPersona ===
      'juridica'
      ? formData.razonSocial
      : 'No aplica'
  );

  addField(
    'Relación',
    formData.relacionEmpresa
  );

  addSectionTitle(
    'Información de contacto'
  );

  addField(
    'Teléfono',
    formData.telefono
  );

  addField(
    'Correo electrónico',
    formData.email
  );

  addField(
    'Ubicación',
    `${formData.municipio}, ${formData.departamento}`
  );

  addField(
    'Dirección',
    formData.direccion ||
      'No registrada'
  );

  addField(
    'Medio de respuesta',
    medioRespuestaLabel
  );

  addSectionTitle(
    'Clasificación de la PQRSF'
  );

  addField(
    'Tipo',
    tipoLabel
  );

  addField(
    'Categoría',
    categoriaLabel
  );

  addField(
    'Número de referencia',
    formData.numeroReferencia ||
      'No registrado'
  );

  addField(
    'Fecha de los hechos',
    formData.fechaHechos ||
      'No registrada'
  );

  addField(
    'Lugar de los hechos',
    formData.lugarHechos ||
      'No registrado'
  );

  addSectionTitle(
    'Detalle de la comunicación'
  );

  addLongField(
    'Asunto',
    formData.asunto
  );

  addLongField(
    'Descripción detallada de los hechos',
    formData.descripcion
  );

  addLongField(
    'Respuesta o solución esperada',
    formData.solicitudConcreta
  );

  addSectionTitle(
    'Documentos o evidencias'
  );

  if (archivos.length > 0) {
    archivos.forEach(
      (archivo, index) => {
        addField(
          `Archivo ${index + 1}`,
          `${archivo.name} (${formatFileSize(
            archivo.size
          )})`
        );
      }
    );
  } else {
    addField(
      'Archivos',
      'Sin archivos seleccionados'
    );
  }

  addLongField(
    'Nota sobre los archivos',
    'El formulario registra únicamente el nombre y el tamaño de los archivos. Las evidencias deben adjuntarse manualmente en la conversación de WhatsApp.'
  );

  addSectionTitle(
    'Autorizaciones y confirmación'
  );

  addField(
    'Términos y condiciones',
    formData.aceptaTerminos
      ? 'Aceptados'
      : 'No aceptados'
  );

  addField(
    'Tratamiento de datos',
    formData.aceptaDatos
      ? 'Autorizado'
      : 'No autorizado'
  );

  addField(
    'Veracidad de la información',
    formData.confirmaInformacion
      ? 'Confirmada'
      : 'No confirmada'
  );

  ensureSpace(20);

  currentY += 3;

  pdf.setDrawColor(
    ...PDF_COLORS.border
  );

  pdf.line(
    margin,
    currentY,
    pageWidth - margin,
    currentY
  );

  currentY += 7;

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(8.5);

  setTextColor(
    PDF_COLORS.muted
  );

  pdf.text(
    'Este documento es un comprobante generado automáticamente desde el formulario web de CAPSOS Telecomunicaciones.',
    margin,
    currentY,
    {
      maxWidth: contentWidth,
    }
  );

  /* =======================================================
     PIE DE PÁGINA
  ======================================================= */

  const totalPages =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page += 1
  ) {
    pdf.setPage(page);

    pdf.setDrawColor(
      ...PDF_COLORS.border
    );

    pdf.line(
      margin,
      pageHeight - 13,
      pageWidth - margin,
      pageHeight - 13
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(7.5);

    setTextColor(
      PDF_COLORS.muted
    );

    pdf.text(
      'CAPSOS Telecomunicaciones - Santa Rosa de Osos, Antioquia',
      margin,
      pageHeight - 8
    );

    pdf.text(
      `Página ${page} de ${totalPages}`,
      pageWidth - margin,
      pageHeight - 8,
      {
        align: 'right',
      }
    );
  }

  const safeRadicado =
    radicado.replace(
      /[^a-zA-Z0-9_-]/g,
      '_'
    );

  return {
    blob: pdf.output('blob'),
    filename:
      `Comprobante_` +
      `${safeRadicado}.pdf`,
  };
};

/* =========================================================
   ESTADO INICIAL
========================================================= */

const initialFormData = {
  tipoPersona: 'natural',
  nombreCompleto: '',
  tipoDocumento: '',
  numeroDocumento: '',
  razonSocial: '',
  nit: '',
  relacionEmpresa: '',

  telefono: '',
  email: '',
  municipio: '',
  departamento: 'Antioquia',
  direccion: '',
  medioRespuesta: '',

  tipo: '',
  categoria: '',
  numeroReferencia: '',
  fechaHechos: '',
  lugarHechos: '',

  asunto: '',
  descripcion: '',
  solicitudConcreta: '',

  aceptaTerminos: false,
  aceptaDatos: false,
  confirmaInformacion: false,
};

const steps = [
  {
    id: 1,
    title: 'Identificación',
    description:
      'Información del solicitante',
    icon: 'fas fa-user',
  },
  {
    id: 2,
    title: 'Contacto',
    description:
      'Datos para recibir respuesta',
    icon: 'fas fa-address-book',
  },
  {
    id: 3,
    title: 'Clasificación',
    description:
      'Tipo y categoría de la PQRSF',
    icon: 'fas fa-list-alt',
  },
  {
    id: 4,
    title: 'Descripción',
    description:
      'Detalle, solicitud y evidencias',
    icon: 'fas fa-file-alt',
  },
  {
    id: 5,
    title: 'Confirmación',
    description:
      'Revisión y autorizaciones',
    icon: 'fas fa-check-circle',
  },
];

const MAX_FILES = 5;

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const allowedExtensions = [
  'pdf',
  'jpg',
  'jpeg',
  'png',
  'doc',
  'docx',
];

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const ContactSection = () => {
  const fileInputRef =
    useRef(null);

  const sendingRef =
    useRef(false);

  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);

  const [
    formData,
    setFormData,
  ] = useState(initialFormData);

  const [
    archivos,
    setArchivos,
  ] = useState([]);

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState({});

  const [
    generalError,
    setGeneralError,
  ] = useState('');

  const [
    resultado,
    setResultado,
  ] = useState(null);

  const [
    enviando,
    setEnviando,
  ] = useState(false);

  const progressPercentage =
    useMemo(() => {
      return (
        ((currentStep - 1) /
          (steps.length - 1)) *
        100
      );
    }, [currentStep]);

  const termsPageUrl =
    useMemo(() => {
      return createInternalHashUrl(
        '/terminos-y-condiciones'
      );
    }, []);

  const privacyPolicyUrl =
    useMemo(() => {
      return createInternalHashUrl(
        '/politica-tratamiento-datos'
      );
    }, []);

  const today =
    new Date()
      .toISOString()
      .split('T')[0];

  /* =======================================================
     CAMBIOS DEL FORMULARIO
  ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    const formattedValue =
      name === 'nombreCompleto'
        ? value.toLocaleUpperCase(
            'es-CO'
          )
        : value;

    setFormData(
      (previousData) => {
        const updatedData = {
          ...previousData,
          [name]:
            type === 'checkbox'
              ? checked
              : formattedValue,
        };

        if (
          name === 'tipoPersona'
        ) {
          if (
            value === 'natural'
          ) {
            updatedData.razonSocial =
              '';

            updatedData.nit = '';
          }

          if (
            value === 'juridica'
          ) {
            updatedData.tipoDocumento =
              '';

            updatedData.numeroDocumento =
              '';
          }
        }

        return updatedData;
      }
    );

    setFieldErrors(
      (previousErrors) => ({
        ...previousErrors,
        [name]: '',
      })
    );

    setGeneralError('');
    setResultado(null);
  };

  /* =======================================================
     ARCHIVOS
  ======================================================= */

  const getFileExtension = (
    filename
  ) => {
    return (
      filename
        .split('.')
        .pop()
        ?.toLowerCase() || ''
    );
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    }

    if (
      size <
      1024 * 1024
    ) {
      return (
        `${(size / 1024).toFixed(
          1
        )} KB`
      );
    }

    return (
      `${(
        size /
        (1024 * 1024)
      ).toFixed(1)} MB`
    );
  };

  const handleFileChange = (
    event
  ) => {
    const selectedFiles =
      Array.from(
        event.target.files || []
      );

    setGeneralError('');

    setFieldErrors(
      (previousErrors) => ({
        ...previousErrors,
        archivos: '',
      })
    );

    if (
      selectedFiles.length >
      MAX_FILES
    ) {
      setFieldErrors(
        (previousErrors) => ({
          ...previousErrors,
          archivos:
            `Solo puedes adjuntar un máximo de ` +
            `${MAX_FILES} archivos.`,
        })
      );

      event.target.value = '';

      return;
    }

    const invalidFile =
      selectedFiles.find((file) => {
        const extension =
          getFileExtension(
            file.name
          );

        return !allowedExtensions.includes(
          extension
        );
      });

    if (invalidFile) {
      setFieldErrors(
        (previousErrors) => ({
          ...previousErrors,
          archivos:
            `El archivo "${invalidFile.name}" ` +
            'no tiene un formato permitido.',
        })
      );

      event.target.value = '';

      return;
    }

    const oversizedFile =
      selectedFiles.find(
        (file) =>
          file.size >
          MAX_FILE_SIZE
      );

    if (oversizedFile) {
      setFieldErrors(
        (previousErrors) => ({
          ...previousErrors,
          archivos:
            `El archivo "${oversizedFile.name}" ` +
            'supera el tamaño máximo de 10 MB.',
        })
      );

      event.target.value = '';

      return;
    }

    setArchivos(selectedFiles);
  };

  const removeFile = (
    fileIndex
  ) => {
    setArchivos(
      (previousFiles) =>
        previousFiles.filter(
          (_, index) =>
            index !== fileIndex
        )
    );

    if (fileInputRef.current) {
      fileInputRef.current.value =
        '';
    }
  };

  /* =======================================================
     VALIDACIÓN
  ======================================================= */

  const validateStep = (
    stepNumber
  ) => {
    const errors = {};

    if (stepNumber === 1) {
      if (
        !formData.tipoPersona
      ) {
        errors.tipoPersona =
          'Selecciona el tipo de solicitante.';
      }

      if (
        !formData.nombreCompleto.trim()
      ) {
        errors.nombreCompleto =
          'Ingresa el nombre completo.';
      }

      if (
        formData.tipoPersona ===
        'natural'
      ) {
        if (
          !formData.tipoDocumento
        ) {
          errors.tipoDocumento =
            'Selecciona el tipo de documento.';
        }

        if (
          !formData.numeroDocumento.trim()
        ) {
          errors.numeroDocumento =
            'Ingresa el número de documento.';
        }
      }

      if (
        formData.tipoPersona ===
        'juridica'
      ) {
        if (
          !formData.razonSocial.trim()
        ) {
          errors.razonSocial =
            'Ingresa la razón social.';
        }

        if (
          !formData.nit.trim()
        ) {
          errors.nit =
            'Ingresa el NIT.';
        }
      }

      if (
        !formData.relacionEmpresa
      ) {
        errors.relacionEmpresa =
          'Selecciona tu relación con la empresa.';
      }
    }

    if (stepNumber === 2) {
      const phonePattern =
        /^[0-9+\s()-]{7,20}$/;

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !formData.telefono.trim()
      ) {
        errors.telefono =
          'Ingresa un número de teléfono.';
      } else if (
        !phonePattern.test(
          formData.telefono
        )
      ) {
        errors.telefono =
          'Ingresa un teléfono válido.';
      }

      if (
        !formData.email.trim()
      ) {
        errors.email =
          'Ingresa un correo electrónico.';
      } else if (
        !emailPattern.test(
          formData.email
        )
      ) {
        errors.email =
          'Ingresa un correo electrónico válido.';
      }

      if (
        !formData.municipio.trim()
      ) {
        errors.municipio =
          'Ingresa el municipio.';
      }

      if (
        !formData.departamento.trim()
      ) {
        errors.departamento =
          'Ingresa el departamento.';
      }

      if (
        !formData.medioRespuesta
      ) {
        errors.medioRespuesta =
          'Selecciona el medio para recibir la respuesta.';
      }

      if (
        formData.medioRespuesta ===
          'direccion' &&
        !formData.direccion.trim()
      ) {
        errors.direccion =
          'La dirección es obligatoria para recibir correspondencia física.';
      }
    }

    if (stepNumber === 3) {
      if (!formData.tipo) {
        errors.tipo =
          'Selecciona el tipo de PQRSF.';
      }

      if (!formData.categoria) {
        errors.categoria =
          'Selecciona una categoría.';
      }

      if (
        formData.fechaHechos &&
        formData.fechaHechos >
          today
      ) {
        errors.fechaHechos =
          'La fecha de los hechos no puede ser futura.';
      }
    }

    if (stepNumber === 4) {
      if (
        !formData.asunto.trim()
      ) {
        errors.asunto =
          'Ingresa el asunto de la PQRSF.';
      } else if (
        formData.asunto
          .trim()
          .length < 5
      ) {
        errors.asunto =
          'El asunto debe contener al menos 5 caracteres.';
      }

      if (
        !formData.descripcion.trim()
      ) {
        errors.descripcion =
          'Describe detalladamente los hechos.';
      } else if (
        formData.descripcion
          .trim()
          .length < 30
      ) {
        errors.descripcion =
          'La descripción debe contener al menos 30 caracteres.';
      }

      if (
        !formData.solicitudConcreta.trim()
      ) {
        errors.solicitudConcreta =
          'Indica qué respuesta o solución esperas.';
      } else if (
        formData.solicitudConcreta
          .trim()
          .length < 10
      ) {
        errors.solicitudConcreta =
          'La solicitud debe contener al menos 10 caracteres.';
      }
    }

    if (stepNumber === 5) {
      if (
        !formData.aceptaTerminos
      ) {
        errors.aceptaTerminos =
          'Debes aceptar los términos y condiciones.';
      }

      if (
        !formData.aceptaDatos
      ) {
        errors.aceptaDatos =
          'Debes autorizar el tratamiento de datos personales.';
      }

      if (
        !formData.confirmaInformacion
      ) {
        errors.confirmaInformacion =
          'Debes confirmar que la información es correcta.';
      }
    }

    setFieldErrors(errors);

    return (
      Object.keys(errors).length ===
      0
    );
  };

  /* =======================================================
     NAVEGACIÓN DEL FORMULARIO
  ======================================================= */

  const scrollToForm = () => {
    window.scrollTo({
      top:
        document.getElementById(
          'pqrsf'
        )?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    setGeneralError('');
    setResultado(null);

    const isValid =
      validateStep(currentStep);

    if (!isValid) {
      setGeneralError(
        'Revisa los campos señalados antes de continuar.'
      );

      return;
    }

    setCurrentStep(
      (previousStep) =>
        Math.min(
          previousStep + 1,
          steps.length
        )
    );

    scrollToForm();
  };

  const handlePrevious = () => {
    setGeneralError('');
    setFieldErrors({});
    setResultado(null);

    setCurrentStep(
      (previousStep) =>
        Math.max(
          previousStep - 1,
          1
        )
    );

    scrollToForm();
  };

  const goToStep = (
    stepNumber
  ) => {
    if (
      stepNumber <
      currentStep
    ) {
      setCurrentStep(stepNumber);
      setFieldErrors({});
      setGeneralError('');
      setResultado(null);
      scrollToForm();
    }
  };

  /* =======================================================
     ABRIR TÉRMINOS EN UNA PESTAÑA NUEVA
  ======================================================= */

  const handleOpenTerms = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    /*
     * La pestaña se abre mediante JavaScript.
     * Esto permite que el componente de términos
     * pueda cerrarla usando window.close().
     *
     * El nombre fijo evita abrir múltiples
     * pestañas con el mismo documento.
     */
    const termsWindow =
      window.open(
        termsPageUrl,
        'capsosTerminosPQRSF'
      );

    if (!termsWindow) {
      Swal.fire({
        icon: 'warning',
        title:
          'Ventana emergente bloqueada',
        text:
          'El navegador bloqueó la pestaña de términos y condiciones. Autoriza las ventanas emergentes para este sitio e intenta nuevamente.',
        confirmButtonText:
          'Aceptar',
        confirmButtonColor:
          '#074265',
      });

      return;
    }

    termsWindow.focus();
  };

  /* =======================================================
     ETIQUETAS
  ======================================================= */

  const getTipoLabel = () => {
    const labels = {
      peticion: 'Petición',
      queja: 'Queja',
      reclamo: 'Reclamo',
      solicitud: 'Solicitud',
      felicitacion:
        'Felicitación',
    };

    return (
      labels[formData.tipo] ||
      'No seleccionado'
    );
  };

  const getCategoriaLabel = () => {
    const labels = {
      atencion:
        'Atención al cliente',
      servicio:
        'Prestación del servicio',
      facturacion:
        'Facturación o pagos',
      contratos:
        'Contratos o convenios',
      personal:
        'Comportamiento del personal',
      datos:
        'Tratamiento de datos personales',
      informacion:
        'Solicitud de información',
      otro:
        'Otro asunto',
    };

    return (
      labels[
        formData.categoria
      ] || 'No seleccionada'
    );
  };

  const getMedioRespuestaLabel =
    () => {
      const labels = {
        correo:
          'Correo electrónico',
        telefono:
          'Llamada telefónica',
        whatsapp: 'WhatsApp',
        direccion:
          'Correspondencia física',
      };

      return (
        labels[
          formData.medioRespuesta
        ] || 'No seleccionado'
      );
    };

  /* =======================================================
     ENVÍO
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      sendingRef.current ||
      enviando
    ) {
      return;
    }

    setGeneralError('');
    setResultado(null);

    const isLastStepValid =
      validateStep(5);

    if (!isLastStepValid) {
      setGeneralError(
        'Debes aceptar las autorizaciones obligatorias antes de enviar.'
      );

      return;
    }

    sendingRef.current = true;

    try {
      setEnviando(true);

      const radicado =
        createUniqueRadicado();

      const fechaRegistro =
        getBogotaDateTime();

      const tipoLabel =
        getTipoLabel();

      const categoriaLabel =
        getCategoriaLabel();

      const medioRespuestaLabel =
        getMedioRespuestaLabel();

      const pdfDocument =
        createPqrsfPdf({
          radicado,
          fechaRegistro,
          formData,
          archivos,
          tipoLabel,
          categoriaLabel,
          medioRespuestaLabel,
          formatFileSize,
        });

      downloadBlob(
        pdfDocument.blob,
        pdfDocument.filename
      );

      const documento =
        formData.tipoPersona ===
        'natural'
          ? `${formData.tipoDocumento} ${formData.numeroDocumento}`.trim()
          : `NIT ${formData.nit}`.trim();

      const empresa =
        formData.tipoPersona ===
        'juridica'
          ? formData.razonSocial
          : 'No aplica';

      const archivosTexto =
        archivos.length > 0
          ? archivos
              .map(
                (
                  archivo,
                  index
                ) =>
                  `${index + 1}. ` +
                  `${archivo.name} ` +
                  `(${formatFileSize(
                    archivo.size
                  )})`
              )
              .join('\n')
          : 'Sin archivos seleccionados';

      const mensajeWhatsApp = [
        '📌 *NUEVA PQRSF - CAPSOS*',
        '',
        `*Radicado:* ${radicado}`,
        '*Estado:* Recibida',
        `*Fecha de registro:* ${fechaRegistro}`,
        '',
        '👤 *SOLICITANTE*',
        `*Tipo de persona:* ${
          formData.tipoPersona ===
          'natural'
            ? 'Persona natural'
            : 'Persona jurídica'
        }`,
        `*Nombre:* ${formData.nombreCompleto}`,
        `*Documento:* ${documento}`,
        `*Razón social:* ${empresa}`,
        `*Relación con la empresa:* ${formData.relacionEmpresa}`,
        '',
        '📞 *CONTACTO*',
        `*Teléfono:* ${formData.telefono}`,
        `*Correo:* ${formData.email}`,
        `*Ubicación:* ${formData.municipio}, ${formData.departamento}`,
        `*Dirección:* ${
          formData.direccion ||
          'No registrada'
        }`,
        `*Medio de respuesta:* ${medioRespuestaLabel}`,
        '',
        '📂 *CLASIFICACIÓN*',
        `*Tipo:* ${tipoLabel}`,
        `*Categoría:* ${categoriaLabel}`,
        `*Número de referencia:* ${
          formData.numeroReferencia ||
          'No registrado'
        }`,
        `*Fecha de los hechos:* ${
          formData.fechaHechos ||
          'No registrada'
        }`,
        `*Lugar de los hechos:* ${
          formData.lugarHechos ||
          'No registrado'
        }`,
        '',
        '📝 *DETALLE*',
        `*Asunto:* ${formData.asunto}`,
        `*Descripción:* ${formData.descripcion}`,
        `*Solución esperada:* ${formData.solicitudConcreta}`,
        '',
        '📎 *ARCHIVOS SELECCIONADOS*',
        archivosTexto,
        '',
        '✅ *AUTORIZACIONES*',
        `*Aceptó términos:* ${
          formData.aceptaTerminos
            ? 'Sí'
            : 'No'
        }`,
        `*Autorizó tratamiento de datos:* ${
          formData.aceptaDatos
            ? 'Sí'
            : 'No'
        }`,
        `*Confirmó información:* ${
          formData.confirmaInformacion
            ? 'Sí'
            : 'No'
        }`,
        '',
        '_Mensaje generado desde el formulario web de CAPSOS._',
      ].join('\n');

      const whatsappUrl =
        `https://wa.me/` +
        `${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(
          mensajeWhatsApp
        )}`;

      const whatsappWindow =
        window.open(
          whatsappUrl,
          '_blank'
        );

      if (whatsappWindow) {
        whatsappWindow.opener =
          null;
      } else {
        window.location.assign(
          whatsappUrl
        );
      }

      setResultado({
        mensaje:
          'Se generó el radicado, se descargó el comprobante PDF y se abrió WhatsApp con toda la información. Revisa el mensaje y pulsa Enviar.',
        radicado,
      });

      await Swal.fire({
        icon: 'success',
        title:
          '¡PQRSF registrada!',
        html: `
          <p>
            La información fue procesada correctamente.
          </p>

          <p>
            Tu número de radicado es:
          </p>

          <strong style="font-size: 18px;">
            ${radicado}
          </strong>

          <p style="margin-top: 15px;">
            El comprobante PDF fue descargado en tu dispositivo.
          </p>

          <p>
            También se abrió WhatsApp con la información registrada.
            Revisa el mensaje y pulsa <strong>Enviar</strong>.
          </p>
        `,
        confirmButtonText:
          'Aceptar',
        confirmButtonColor:
          '#198754',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      setFormData({
        ...initialFormData,
      });

      setArchivos([]);
      setFieldErrors({});
      setGeneralError('');
      setResultado(null);
      setCurrentStep(1);

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          '';
      }

      scrollToForm();
    } catch (error) {
      console.error(
        'Error registrando la PQRSF:',
        error
      );

      setGeneralError(
        'No fue posible completar el registro, generar el PDF o abrir WhatsApp. Verifica los permisos de descarga y ventanas emergentes del navegador.'
      );
    } finally {
      sendingRef.current = false;
      setEnviando(false);
    }
  };

  /* =======================================================
     ERRORES
  ======================================================= */

  const renderError = (
    fieldName
  ) => {
    if (
      !fieldErrors[fieldName]
    ) {
      return null;
    }

    return (
      <small className="field-error">
        <i className="fas fa-exclamation-circle" />

        {fieldErrors[fieldName]}
      </small>
    );
  };

  /* =======================================================
     CONTENIDO DE CADA PASO
  ======================================================= */

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step-content">
            <div className="step-heading">
              <span className="step-number">
                1
              </span>

              <div>
                <h3>
                  Información del solicitante
                </h3>

                <p>
                  Indica quién presenta la petición, queja,
                  reclamo, solicitud o felicitación.
                </p>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="tipoPersona">
                  Tipo de solicitante *
                </label>

                <select
                  id="tipoPersona"
                  name="tipoPersona"
                  className={`form-control-corporate ${
                    fieldErrors.tipoPersona
                      ? 'is-invalid'
                      : ''
                  }`}
                  value={
                    formData.tipoPersona
                  }
                  onChange={handleChange}
                >
                  <option value="natural">
                    Persona natural
                  </option>

                  <option value="juridica">
                    Persona jurídica
                  </option>
                </select>

                {renderError(
                  'tipoPersona'
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="nombreCompleto">
                  {formData.tipoPersona ===
                  'juridica'
                    ? 'Nombre de la persona de contacto *'
                    : 'Nombre completo *'}
                </label>

                <input
                  id="nombreCompleto"
                  type="text"
                  name="nombreCompleto"
                  className={`form-control-corporate ${
                    fieldErrors.nombreCompleto
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="ESCRIBE EL NOMBRE COMPLETO"
                  value={
                    formData.nombreCompleto
                  }
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength="120"
                  style={{
                    textTransform:
                      'uppercase',
                  }}
                />

                {renderError(
                  'nombreCompleto'
                )}
              </div>

              {formData.tipoPersona ===
                'natural' && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="tipoDocumento">
                      Tipo de documento *
                    </label>

                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      className={`form-control-corporate ${
                        fieldErrors.tipoDocumento
                          ? 'is-invalid'
                          : ''
                      }`}
                      value={
                        formData.tipoDocumento
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="">
                        Selecciona una opción
                      </option>

                      <option value="CC">
                        Cédula de ciudadanía
                      </option>

                      <option value="CE">
                        Cédula de extranjería
                      </option>

                      <option value="TI">
                        Tarjeta de identidad
                      </option>

                      <option value="pasaporte">
                        Pasaporte
                      </option>

                      <option value="otro">
                        Otro documento
                      </option>
                    </select>

                    {renderError(
                      'tipoDocumento'
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="numeroDocumento">
                      Número de documento *
                    </label>

                    <input
                      id="numeroDocumento"
                      type="text"
                      name="numeroDocumento"
                      className={`form-control-corporate ${
                        fieldErrors.numeroDocumento
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder="Número de identificación"
                      value={
                        formData.numeroDocumento
                      }
                      onChange={
                        handleChange
                      }
                      maxLength="30"
                    />

                    {renderError(
                      'numeroDocumento'
                    )}
                  </div>
                </>
              )}

              {formData.tipoPersona ===
                'juridica' && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="razonSocial">
                      Razón social *
                    </label>

                    <input
                      id="razonSocial"
                      type="text"
                      name="razonSocial"
                      className={`form-control-corporate ${
                        fieldErrors.razonSocial
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder="Nombre de la empresa u organización"
                      value={
                        formData.razonSocial
                      }
                      onChange={
                        handleChange
                      }
                      maxLength="150"
                    />

                    {renderError(
                      'razonSocial'
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="nit">
                      NIT *
                    </label>

                    <input
                      id="nit"
                      type="text"
                      name="nit"
                      className={`form-control-corporate ${
                        fieldErrors.nit
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder="Ejemplo: 900123456-7"
                      value={formData.nit}
                      onChange={
                        handleChange
                      }
                      maxLength="30"
                    />

                    {renderError('nit')}
                  </div>
                </>
              )}

              <div className="col-12">
                <label htmlFor="relacionEmpresa">
                  Relación con la empresa *
                </label>

                <select
                  id="relacionEmpresa"
                  name="relacionEmpresa"
                  className={`form-control-corporate ${
                    fieldErrors.relacionEmpresa
                      ? 'is-invalid'
                      : ''
                  }`}
                  value={
                    formData.relacionEmpresa
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="cliente">
                    Cliente
                  </option>

                  <option value="usuario">
                    Usuario
                  </option>

                  <option value="proveedor">
                    Proveedor
                  </option>

                  <option value="contratista">
                    Contratista
                  </option>

                  <option value="empleado">
                    Empleado
                  </option>

                  <option value="comunidad">
                    Comunidad general
                  </option>

                  <option value="otro">
                    Otro
                  </option>
                </select>

                {renderError(
                  'relacionEmpresa'
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step-content">
            <div className="step-heading">
              <span className="step-number">
                2
              </span>

              <div>
                <h3>
                  Información de contacto
                </h3>

                <p>
                  Estos datos serán utilizados para comunicar la
                  respuesta y el número de radicado.
                </p>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="telefono">
                  Teléfono *
                </label>

                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  className={`form-control-corporate ${
                    fieldErrors.telefono
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Ejemplo: 300 123 4567"
                  value={
                    formData.telefono
                  }
                  onChange={handleChange}
                  autoComplete="tel"
                  maxLength="20"
                />

                {renderError(
                  'telefono'
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="email">
                  Correo electrónico *
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`form-control-corporate ${
                    fieldErrors.email
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="nombre@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength="120"
                />

                {renderError('email')}
              </div>

              <div className="col-md-6">
                <label htmlFor="municipio">
                  Municipio *
                </label>

                <input
                  id="municipio"
                  type="text"
                  name="municipio"
                  className={`form-control-corporate ${
                    fieldErrors.municipio
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Ejemplo: Santa Rosa de Osos"
                  value={
                    formData.municipio
                  }
                  onChange={handleChange}
                  maxLength="100"
                />

                {renderError(
                  'municipio'
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="departamento">
                  Departamento *
                </label>

                <input
                  id="departamento"
                  type="text"
                  name="departamento"
                  className={`form-control-corporate ${
                    fieldErrors.departamento
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Ejemplo: Antioquia"
                  value={
                    formData.departamento
                  }
                  onChange={handleChange}
                  maxLength="100"
                />

                {renderError(
                  'departamento'
                )}
              </div>

              <div className="col-12">
                <label htmlFor="direccion">
                  Dirección de residencia o correspondencia
                </label>

                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  className={`form-control-corporate ${
                    fieldErrors.direccion
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Dirección, barrio, vereda o sector"
                  value={
                    formData.direccion
                  }
                  onChange={handleChange}
                  autoComplete="street-address"
                  maxLength="150"
                />

                {renderError(
                  'direccion'
                )}
              </div>

              <div className="col-12">
                <label htmlFor="medioRespuesta">
                  Medio preferido para recibir la respuesta *
                </label>

                <select
                  id="medioRespuesta"
                  name="medioRespuesta"
                  className={`form-control-corporate ${
                    fieldErrors.medioRespuesta
                      ? 'is-invalid'
                      : ''
                  }`}
                  value={
                    formData.medioRespuesta
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="correo">
                    Correo electrónico
                  </option>

                  <option value="telefono">
                    Llamada telefónica
                  </option>

                  <option value="whatsapp">
                    WhatsApp
                  </option>

                  <option value="direccion">
                    Correspondencia física
                  </option>
                </select>

                {renderError(
                  'medioRespuesta'
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step-content">
            <div className="step-heading">
              <span className="step-number">
                3
              </span>

              <div>
                <h3>
                  Clasificación de la PQRSF
                </h3>

                <p>
                  Selecciona el tipo de comunicación y el tema
                  principal relacionado.
                </p>
              </div>
            </div>

            <div className="pqrsf-types">
              {[
                {
                  value: 'peticion',
                  title: 'Petición',
                  text:
                    'Solicitud respetuosa de información o actuación.',
                  icon:
                    'fas fa-hand-paper',
                },
                {
                  value: 'queja',
                  title: 'Queja',
                  text:
                    'Inconformidad relacionada con la atención recibida.',
                  icon:
                    'fas fa-comment-alt',
                },
                {
                  value: 'reclamo',
                  title: 'Reclamo',
                  text:
                    'Inconformidad por un servicio o resultado obtenido.',
                  icon:
                    'fas fa-exclamation-triangle',
                },
                {
                  value: 'solicitud',
                  title: 'Solicitud',
                  text:
                    'Requerimiento específico dirigido a la empresa.',
                  icon:
                    'fas fa-clipboard-list',
                },
                {
                  value:
                    'felicitacion',
                  title:
                    'Felicitación',
                  text:
                    'Reconocimiento por una buena atención o servicio.',
                  icon:
                    'fas fa-star',
                },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`pqrsf-type-card ${
                    formData.tipo ===
                    item.value
                      ? 'selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo"
                    value={
                      item.value
                    }
                    checked={
                      formData.tipo ===
                      item.value
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span className="pqrsf-card-icon">
                    <i
                      className={
                        item.icon
                      }
                    />
                  </span>

                  <span className="pqrsf-card-text">
                    <strong>
                      {item.title}
                    </strong>

                    <small>
                      {item.text}
                    </small>
                  </span>
                </label>
              ))}
            </div>

            {renderError('tipo')}

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label htmlFor="categoria">
                  Categoría relacionada *
                </label>

                <select
                  id="categoria"
                  name="categoria"
                  className={`form-control-corporate ${
                    fieldErrors.categoria
                      ? 'is-invalid'
                      : ''
                  }`}
                  value={
                    formData.categoria
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Selecciona una categoría
                  </option>

                  <option value="atencion">
                    Atención al cliente
                  </option>

                  <option value="servicio">
                    Prestación del servicio
                  </option>

                  <option value="facturacion">
                    Facturación o pagos
                  </option>

                  <option value="contratos">
                    Contratos o convenios
                  </option>

                  <option value="personal">
                    Comportamiento del personal
                  </option>

                  <option value="datos">
                    Tratamiento de datos personales
                  </option>

                  <option value="informacion">
                    Solicitud de información
                  </option>

                  <option value="otro">
                    Otro asunto
                  </option>
                </select>

                {renderError(
                  'categoria'
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="numeroReferencia">
                  Número de factura, contrato o radicado
                </label>

                <input
                  id="numeroReferencia"
                  type="text"
                  name="numeroReferencia"
                  className="form-control-corporate"
                  placeholder="Campo opcional"
                  value={
                    formData.numeroReferencia
                  }
                  onChange={handleChange}
                  maxLength="60"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="fechaHechos">
                  Fecha de los hechos
                </label>

                <input
                  id="fechaHechos"
                  type="date"
                  name="fechaHechos"
                  className={`form-control-corporate ${
                    fieldErrors.fechaHechos
                      ? 'is-invalid'
                      : ''
                  }`}
                  value={
                    formData.fechaHechos
                  }
                  onChange={handleChange}
                  max={today}
                />

                {renderError(
                  'fechaHechos'
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="lugarHechos">
                  Lugar de los hechos
                </label>

                <input
                  id="lugarHechos"
                  type="text"
                  name="lugarHechos"
                  className="form-control-corporate"
                  placeholder="Sede, oficina, municipio o lugar"
                  value={
                    formData.lugarHechos
                  }
                  onChange={handleChange}
                  maxLength="150"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step-content">
            <div className="step-heading">
              <span className="step-number">
                4
              </span>

              <div>
                <h3>
                  Descripción de la PQRSF
                </h3>

                <p>
                  Explica los hechos claramente y señala la
                  respuesta o solución que esperas.
                </p>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="asunto">
                  Asunto *
                </label>

                <input
                  id="asunto"
                  type="text"
                  name="asunto"
                  className={`form-control-corporate ${
                    fieldErrors.asunto
                      ? 'is-invalid'
                      : ''
                  }`}
                  placeholder="Resume el motivo de tu comunicación"
                  value={
                    formData.asunto
                  }
                  onChange={handleChange}
                  maxLength="150"
                />

                <div className="field-information">
                  <span>
                    {
                      formData.asunto
                        .length
                    }
                    /150
                  </span>
                </div>

                {renderError(
                  'asunto'
                )}
              </div>

              <div className="col-12">
                <label htmlFor="descripcion">
                  Descripción detallada de los hechos *
                </label>

                <textarea
                  id="descripcion"
                  name="descripcion"
                  className={`form-control-corporate ${
                    fieldErrors.descripcion
                      ? 'is-invalid'
                      : ''
                  }`}
                  rows="6"
                  placeholder="Describe qué ocurrió, cuándo ocurrió, dónde ocurrió y quiénes estuvieron involucrados."
                  value={
                    formData.descripcion
                  }
                  onChange={handleChange}
                  maxLength="3000"
                />

                <div className="field-information">
                  <span>
                    Mínimo 30 caracteres
                  </span>

                  <span>
                    {
                      formData
                        .descripcion
                        .length
                    }
                    /3000
                  </span>
                </div>

                {renderError(
                  'descripcion'
                )}
              </div>

              <div className="col-12">
                <label htmlFor="solicitudConcreta">
                  Respuesta o solución esperada *
                </label>

                <textarea
                  id="solicitudConcreta"
                  name="solicitudConcreta"
                  className={`form-control-corporate ${
                    fieldErrors.solicitudConcreta
                      ? 'is-invalid'
                      : ''
                  }`}
                  rows="4"
                  placeholder="Indica claramente qué respuesta, solución o acción esperas de la empresa."
                  value={
                    formData.solicitudConcreta
                  }
                  onChange={handleChange}
                  maxLength="1500"
                />

                <div className="field-information">
                  <span>
                    Mínimo 10 caracteres
                  </span>

                  <span>
                    {
                      formData
                        .solicitudConcreta
                        .length
                    }
                    /1500
                  </span>
                </div>

                {renderError(
                  'solicitudConcreta'
                )}
              </div>

              <div className="col-12">
                <label htmlFor="archivos">
                  Documentos o evidencias
                </label>

                <div
                  className={`file-upload-area ${
                    fieldErrors.archivos
                      ? 'file-error'
                      : ''
                  }`}
                >
                  <i className="fas fa-cloud-upload-alt" />

                  <strong>
                    Adjuntar archivos
                  </strong>

                  <p>
                    PDF, JPG, PNG, DOC o DOCX. En el mensaje de
                    WhatsApp se incluirán el nombre y el tamaño
                    del archivo. Debes adjuntar los archivos
                    manualmente en el chat.
                  </p>

                  <input
                    ref={
                      fileInputRef
                    }
                    id="archivos"
                    type="file"
                    name="archivos"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={
                      handleFileChange
                    }
                    multiple
                  />
                </div>

                {renderError(
                  'archivos'
                )}

                {archivos.length >
                  0 && (
                  <div className="selected-files-list">
                    {archivos.map(
                      (
                        archivo,
                        index
                      ) => (
                        <div
                          className="selected-file-item"
                          key={
                            `${archivo.name}-` +
                            `${archivo.size}-` +
                            `${index}`
                          }
                        >
                          <div className="selected-file-info">
                            <i className="fas fa-file" />

                            <div>
                              <strong>
                                {
                                  archivo.name
                                }
                              </strong>

                              <span>
                                {formatFileSize(
                                  archivo.size
                                )}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="remove-file-button"
                            onClick={() =>
                              removeFile(
                                index
                              )
                            }
                            aria-label={`Eliminar ${archivo.name}`}
                          >
                            <i className="fas fa-times" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step-content">
            <div className="step-heading">
              <span className="step-number">
                5
              </span>

              <div>
                <h3>
                  Revisión y confirmación
                </h3>

                <p>
                  Verifica la información antes de registrar la
                  PQRSF.
                </p>
              </div>
            </div>

            <div className="review-container">
              <div className="review-section">
                <div className="review-section-header">
                  <h4>
                    Solicitante
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      goToStep(1)
                    }
                  >
                    Editar
                  </button>
                </div>

                <div className="review-grid">
                  <div>
                    <span>
                      Tipo de persona
                    </span>

                    <strong>
                      {formData.tipoPersona ===
                      'natural'
                        ? 'Persona natural'
                        : 'Persona jurídica'}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Nombre
                    </span>

                    <strong>
                      {formData.nombreCompleto ||
                        'Sin registrar'}
                    </strong>
                  </div>

                  {formData.tipoPersona ===
                  'natural' ? (
                    <div>
                      <span>
                        Documento
                      </span>

                      <strong>
                        {
                          formData.tipoDocumento
                        }{' '}
                        {
                          formData.numeroDocumento
                        }
                      </strong>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span>
                          Razón social
                        </span>

                        <strong>
                          {
                            formData.razonSocial
                          }
                        </strong>
                      </div>

                      <div>
                        <span>
                          NIT
                        </span>

                        <strong>
                          {formData.nit}
                        </strong>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="review-section">
                <div className="review-section-header">
                  <h4>
                    Contacto
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      goToStep(2)
                    }
                  >
                    Editar
                  </button>
                </div>

                <div className="review-grid">
                  <div>
                    <span>
                      Teléfono
                    </span>

                    <strong>
                      {
                        formData.telefono
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Correo
                    </span>

                    <strong>
                      {formData.email}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Ubicación
                    </span>

                    <strong>
                      {
                        formData.municipio
                      }
                      ,{' '}
                      {
                        formData.departamento
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Medio de respuesta
                    </span>

                    <strong>
                      {getMedioRespuestaLabel()}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="review-section">
                <div className="review-section-header">
                  <h4>
                    Clasificación
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      goToStep(3)
                    }
                  >
                    Editar
                  </button>
                </div>

                <div className="review-grid">
                  <div>
                    <span>
                      Tipo
                    </span>

                    <strong>
                      {getTipoLabel()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Categoría
                    </span>

                    <strong>
                      {getCategoriaLabel()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Referencia
                    </span>

                    <strong>
                      {formData.numeroReferencia ||
                        'No registrada'}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Fecha de los hechos
                    </span>

                    <strong>
                      {formData.fechaHechos ||
                        'No registrada'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="review-section">
                <div className="review-section-header">
                  <h4>
                    Descripción
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      goToStep(4)
                    }
                  >
                    Editar
                  </button>
                </div>

                <div className="review-description">
                  <div>
                    <span>
                      Asunto
                    </span>

                    <strong>
                      {formData.asunto}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Descripción
                    </span>

                    <p>
                      {
                        formData.descripcion
                      }
                    </p>
                  </div>

                  <div>
                    <span>
                      Respuesta esperada
                    </span>

                    <p>
                      {
                        formData.solicitudConcreta
                      }
                    </p>
                  </div>

                  <div>
                    <span>
                      Archivos seleccionados
                    </span>

                    <strong>
                      {archivos.length >
                      0
                        ? `${archivos.length} archivo(s) registrado(s) por nombre`
                        : 'Sin archivos seleccionados'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================
                AUTORIZACIONES
            ============================================= */}

            <div className="authorization-container">
              <div
                className={`authorization-item ${
                  fieldErrors.aceptaTerminos
                    ? 'authorization-error'
                    : ''
                }`}
              >
                <input
                  id="aceptaTerminos"
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={
                    formData.aceptaTerminos
                  }
                  onChange={handleChange}
                />

                <label htmlFor="aceptaTerminos">
                  He leído y acepto los{' '}

                  <a
                    href={
                      termsPageUrl
                    }
                    target="capsosTerminosPQRSF"
                    onClick={
                      handleOpenTerms
                    }
                    aria-label="Abrir los términos y condiciones del canal PQRSF en una pestaña nueva"
                  >
                    términos y condiciones
                  </a>{' '}

                  para el registro y gestión de la PQRSF. *
                </label>
              </div>

              {renderError(
                'aceptaTerminos'
              )}

              <div
                className={`authorization-item ${
                  fieldErrors.aceptaDatos
                    ? 'authorization-error'
                    : ''
                }`}
              >
                <input
                  id="aceptaDatos"
                  type="checkbox"
                  name="aceptaDatos"
                  checked={
                    formData.aceptaDatos
                  }
                  onChange={handleChange}
                />

                <label htmlFor="aceptaDatos">
                  Autorizo el tratamiento de mis datos personales
                  de acuerdo con la{' '}

                  <a
                    href={
                      privacyPolicyUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    política de tratamiento de datos personales
                  </a>{' '}

                  de la empresa. *
                </label>
              </div>

              {renderError(
                'aceptaDatos'
              )}

              <div
                className={`authorization-item ${
                  fieldErrors.confirmaInformacion
                    ? 'authorization-error'
                    : ''
                }`}
              >
                <input
                  id="confirmaInformacion"
                  type="checkbox"
                  name="confirmaInformacion"
                  checked={
                    formData.confirmaInformacion
                  }
                  onChange={handleChange}
                />

                <label htmlFor="confirmaInformacion">
                  Confirmo que la información registrada es
                  verdadera, clara y completa. *
                </label>
              </div>

              {renderError(
                'confirmaInformacion'
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* =======================================================
     RENDERIZADO
  ======================================================= */

  return (
    <section
      className="contact-corporate"
      id="pqrsf"
    >
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <span className="section-label">
              Atención al ciudadano
            </span>

            <h2 className="section-title">
              Centro de Atención
            </h2>

            <p className="section-desc">
              Registra tus peticiones, quejas, reclamos,
              solicitudes o felicitaciones. Proporciona
              información clara y completa para facilitar la
              gestión y respuesta de tu caso.
            </p>

            <div className="contact-info-corporate">
              <div className="info-box">
                <div className="info-icon-box">
                  <i
                    className="fas fa-map-marker-alt"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h5>
                    Ubicación
                  </h5>

                  <p>
                    Santa Rosa de Osos, Antioquia, Colombia
                  </p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon-box">
                  <i
                    className="fas fa-phone-alt"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h5>
                    WhatsApp de Atención
                  </h5>

                  <p>
                    <a
                      href="https://wa.me/573044875527"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +57 304 487 5527
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon-box">
                  <i
                    className="fas fa-envelope"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h5>
                    Correo Electrónico
                  </h5>

                  <p>
                    <a href="mailto:info@capsos.com.co">
                      info@capsos.com.co
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon-box">
                  <i
                    className="fas fa-clock"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h5>
                    Horario de Atención
                  </h5>

                  <p>
                    Lunes a Viernes:
                  </p>

                  <p>
                    8:00 a. m. – 12:00 m. y 2:00 p. m. – 5:00 p. m.
                  </p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon-box">
                  <i
                    className="fas fa-shield-alt"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h5>
                    Protección de la información
                  </h5>

                  <p>
                    Tus datos serán utilizados exclusivamente
                    para registrar, gestionar y responder la
                    PQRSF.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="multi-step-form-wrapper">
              <div className="form-main-header">
                <div>
                  <span>
                    Formulario en línea
                  </span>

                  <h2>
                    Registrar una PQRSF
                  </h2>
                </div>

                <div className="current-step-indicator">
                  Paso {currentStep} de {steps.length}
                </div>
              </div>

              {/* ===========================================
                  STEPPER ESCRITORIO
              =========================================== */}

              <div className="desktop-stepper">
                <div className="stepper-progress-background">
                  <div
                    className="stepper-progress-value"
                    style={{
                      width:
                        `${progressPercentage}%`,
                    }}
                  />
                </div>

                {steps.map((step) => {
                  const isActive =
                    currentStep ===
                    step.id;

                  const isCompleted =
                    currentStep >
                    step.id;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`stepper-item ${
                        isActive
                          ? 'active'
                          : ''
                      } ${
                        isCompleted
                          ? 'completed'
                          : ''
                      }`}
                      onClick={() =>
                        goToStep(
                          step.id
                        )
                      }
                      disabled={
                        step.id >
                        currentStep
                      }
                    >
                      <span className="stepper-circle">
                        {isCompleted ? (
                          <i className="fas fa-check" />
                        ) : (
                          step.id
                        )}
                      </span>

                      <span className="stepper-label">
                        <strong>
                          {step.title}
                        </strong>

                        <small>
                          {
                            step.description
                          }
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ===========================================
                  STEPPER MÓVIL
              =========================================== */}

              <div className="mobile-stepper">
                <div className="mobile-progress-info">
                  <span>
                    {
                      steps[
                        currentStep -
                          1
                      ].title
                    }
                  </span>

                  <strong>
                    {Math.round(
                      (currentStep /
                        steps.length) *
                        100
                    )}
                    %
                  </strong>
                </div>

                <div className="mobile-progress-bar">
                  <div
                    style={{
                      width:
                        `${
                          (currentStep /
                            steps.length) *
                          100
                        }%`,
                    }}
                  />
                </div>
              </div>

              {/* ===========================================
                  MENSAJES
              =========================================== */}

              {generalError && (
                <div className="alert-message error-message">
                  <i className="fas fa-exclamation-circle" />

                  <span>
                    {generalError}
                  </span>
                </div>
              )}

              {resultado && (
                <div className="alert-message success-message">
                  <i className="fas fa-check-circle" />

                  <div>
                    <strong>
                      {
                        resultado.mensaje
                      }
                    </strong>

                    {resultado.radicado && (
                      <p>
                        Número de radicado:{' '}

                        <b>
                          {
                            resultado.radicado
                          }
                        </b>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ===========================================
                  FORMULARIO
              =========================================== */}

              <form
                onSubmit={
                  handleSubmit
                }
                noValidate
              >
                {renderStepContent()}

                <div className="form-navigation">
                  <button
                    type="button"
                    className="navigation-button secondary-button"
                    onClick={
                      handlePrevious
                    }
                    disabled={
                      currentStep === 1 ||
                      enviando
                    }
                  >
                    <i className="fas fa-arrow-left" />

                    Anterior
                  </button>

                  {currentStep <
                  steps.length ? (
                    <button
                      type="button"
                      className="navigation-button primary-button"
                      onClick={
                        handleNext
                      }
                    >
                      Siguiente

                      <i className="fas fa-arrow-right" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="navigation-button submit-button"
                      disabled={
                        enviando
                      }
                    >
                      {enviando ? (
                        <>
                          <span className="button-spinner" />

                          Abriendo WhatsApp...
                        </>
                      ) : (
                        <>
                          <i className="fab fa-whatsapp" />

                          Enviar por WhatsApp
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;