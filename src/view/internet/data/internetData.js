import {
  faBolt,
  faBuilding,
  faChartLine,
  faCloud,
  faHeadset,
  faHome,
  faIdCard,
  faNetworkWired,
  faMapMarkerAlt,
  faPhoneAlt,
  faRocket,
  faServer,
  faTools,
  faCreditCard,
  faListAlt,
  faShieldAlt,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';

import planHogar from '../../../assets/internet/plan-hogar.png';
import planHogarPlus from '../../../assets/internet/plan-hogar-plus.png';
import planEmpresa from '../../../assets/internet/plan-empresa.png';
import planCorporativo from '../../../assets/internet/plan-corporativo.png';

export const iconMap = {
  'Sin contrato obligatorio': faShieldAlt,
  'Instalación gratuita': faRocket,
  'Soporte técnico 24/7': faHeadset,
  'Streaming en 4K sin interrupciones': faWifi,
  'Router Wi-Fi incluido': faNetworkWired,
  'Atención preferencial': faHeadset,
  'Baja latencia para juegos online': faBolt,
  'Velocidades simétricas': faRocket,
  'Backup de conexión': faCloud,
  'Soporte técnico dedicado': faHeadset,
  'IP fija opcional': faNetworkWired,
  'Prioridad en la red': faShieldAlt,
};

export const textSlides = [
  {
    segment: 'Internet para tu hogar',
    title: 'Conectividad que acompaña tu día',
    planTitle: 'Plan Fibra 300 Mbps',
    headline: 'Todo lo que disfrutas, siempre más cerca.',
    image: planHogar,
    imageAlt:
      'Familia utilizando internet residencial de fibra óptica en diferentes dispositivos',
    imagePosition: 'center center',
    description:
      'Estudia, trabaja, conversa y comparte en familia con una conexión estable diseñada para acompañar cada momento de tu hogar.',
    speed: '300 Mbps',
    price: '$60.000 / mes',
    showInPlans: true,
    isFeatured: true,
    badge: 'Más vendido',
    features: [
      'Sin contrato obligatorio',
      'Instalación gratuita',
      'Soporte técnico 24/7',
    ],
  },
  {
    segment: 'Experiencia Residencial',
    title: 'Fibra 300 Mbps para más dispositivos',
    headline: 'Más dispositivos. Cero interrupciones.',
    image: planHogarPlus,
    imageAlt:
      'Hogar conectado con varios usuarios disfrutando streaming, videojuegos y navegación',
    imagePosition: 'center center',
    description:
      'Ideal para hogares con varios dispositivos en streaming, videollamadas, juegos en línea y clases virtuales.',
    speed: '300 Mbps',
    price: '$60.000 / mes',
    showInPlans: false,
    isFeatured: false,
    features: [
      'Streaming en 4K sin interrupciones',
      'Router Wi-Fi incluido',
      'Atención preferencial',
    ],
  },
  {
    segment: 'Internet para Negocios',
    title: 'Plan Empresarial 500 Mbps',
    headline: 'Tu negocio siempre conectado.',
    image: planEmpresa,
    imageAlt:
      'Equipo de trabajo usando internet empresarial en un negocio moderno',
    imagePosition: 'center center',
    description:
      'Pensado para pequeñas y medianas empresas que usan sistemas en la nube, POS, cámaras y teletrabajo.',
    speed: '500 Mbps',
    price: 'Desde $150.000 / mes',
    showInPlans: true,
    isFeatured: false,
    features: [
      'Baja latencia para juegos online',
      'Velocidades simétricas',
      'Backup de conexión',
    ],
  },
  {
    segment: 'Internet Corporativo',
    title: 'Enlace Dedicado 600 Mbps',
    headline: 'Conectividad para operaciones críticas.',
    image: planCorporativo,
    imageAlt:
      'Especialista supervisando infraestructura tecnológica en un centro de datos corporativo',
    imagePosition: 'center center',
    description:
      'Conexión de alta disponibilidad para empresas, sedes administrativas y operaciones críticas.',
    speed: '600 Mbps',
    price: 'Desde $275.000 / mes',
    showInPlans: true,
    isFeatured: false,
    features: [
      'Soporte técnico dedicado',
      'IP fija opcional',
      'Prioridad en la red',
    ],
  },
];

export const internetPlans = textSlides.filter((slide) => slide.showInPlans);

export const storyMetrics = [
  { value: 'Fibra óptica', label: 'Mayor estabilidad' },
  { value: 'Hasta 600 Mbps', label: 'Opciones escalables' },
  { value: 'Soporte técnico', label: 'Acompañamiento cercano' },
  { value: 'Hogar y empresa', label: 'Soluciones a la medida' },
];

export const experienceBenefits = [
  {
    icon: faChartLine,
    title: 'Rendimiento estable',
    text: 'Una red preparada para varios dispositivos, videollamadas, plataformas y tráfico simultáneo.',
  },
  {
    icon: faShieldAlt,
    title: 'Conectividad más segura',
    text: 'Opciones de control, segmentación e infraestructura adecuada según el tipo de servicio.',
  },
  {
    icon: faCloud,
    title: 'Preparado para la nube',
    text: 'Ideal para colaboración, educación virtual, sistemas empresariales y servicios digitales.',
  },
  {
    icon: faHeadset,
    title: 'Atención que acompaña',
    text: 'Orientación antes de contratar y soporte técnico para mantener tu conexión funcionando.',
  },
  {
    icon: faRocket,
    title: 'Instalación organizada',
    text: 'Coordinación clara del proceso, validación técnica y puesta en marcha del servicio.',
  },
];

export const audienceSegments = [
  {
    icon: faWifi,
    image: planHogar,
    imageAlt: 'Familia disfrutando internet residencial',
    title: 'Hogares conectados',
    description:
      'Para familias que combinan entretenimiento, estudio, teletrabajo y varios dispositivos conectados.',
    features: [
      'Streaming y televisión en línea',
      'Clases y videollamadas',
      'Cobertura Wi-Fi para el hogar',
    ],
  },
  {
    icon: faBuilding,
    image: planEmpresa,
    imageAlt: 'Negocio utilizando conectividad empresarial',
    title: 'Empresas y negocios',
    description:
      'Para facturación, puntos de venta, cámaras, atención al cliente y herramientas de operación diaria.',
    features: [
      'Sistemas y servicios en línea',
      'IP fija opcional',
      'Atención preferencial',
    ],
  },
  {
    icon: faServer,
    image: planCorporativo,
    imageAlt: 'Infraestructura tecnológica corporativa',
    title: 'Operaciones críticas',
    description:
      'Para sedes, centros de operación y organizaciones que requieren continuidad, prioridad y mayor disponibilidad.',
    features: [
      'Enlaces dedicados',
      'Prioridad en la red',
      'Soporte técnico especializado',
    ],
  },
];

export const processSteps = [
  {
    title: 'Cuéntanos cómo usas internet',
    description:
      'Revisamos usuarios, dispositivos, actividades y nivel de demanda.',
  },
  {
    title: 'Validamos cobertura',
    description:
      'Confirmamos disponibilidad técnica y condiciones para tu ubicación.',
  },
  {
    title: 'Recomendamos la solución',
    description:
      'Elegimos una alternativa coherente con tu uso y posibilidad de crecimiento.',
  },
  {
    title: 'Coordinamos la instalación',
    description:
      'Programamos la puesta en marcha y te acompañamos durante el proceso.',
  },
];

export const serviceRequirements = [
  {
    id: 'coverage',
    step: '01',
    icon: faMapMarkerAlt,
    title: 'Cobertura disponible',
    description:
      'La dirección de instalación debe encontrarse dentro de una zona con disponibilidad del servicio de internet.',
  },
  {
    id: 'identity',
    step: '02',
    icon: faIdCard,
    title: 'Documento de identidad',
    description:
      'Ten disponible un documento válido del titular que realizará la solicitud del servicio.',
  },
  {
    id: 'contact',
    step: '03',
    icon: faPhoneAlt,
    title: 'Datos de contacto',
    description:
      'Registra un número celular y, si dispones de él, un correo electrónico para mantener comunicación durante el proceso.',
  },
  {
    id: 'address',
    step: '04',
    icon: faHome,
    title: 'Dirección de instalación',
    description:
      'Indica municipio, barrio, sector, vereda, dirección y referencias que permitan ubicar correctamente el lugar.',
  },
  {
    id: 'technical-validation',
    step: '05',
    icon: faTools,
    title: 'Validación técnica',
    description:
      'CAPSOS verificará la infraestructura disponible y las condiciones técnicas necesarias para realizar la instalación.',
  },
  {
    id: 'plan',
    step: '06',
    icon: faWifi,
    title: 'Seleccionar el plan de internet',
    description:
      'Elige la velocidad que mejor responda a tus necesidades entre los planes disponibles para tu ubicación.',
  },
  {
    id: 'conditions',
    step: '07',
    icon: faListAlt,
    title: 'Aceptar las condiciones del servicio',
    description:
      'El titular debe conocer y aceptar las condiciones comerciales, técnicas, tarifas y demás términos aplicables.',
  },
  {
    id: 'payments',
    step: '08',
    icon: faCreditCard,
    title: 'Pagos correspondientes',
    description:
      'Cuando aplique, se cancelarán los valores relacionados con instalación, activación, mensualidad o equipos del plan contratado.',
  },
];

