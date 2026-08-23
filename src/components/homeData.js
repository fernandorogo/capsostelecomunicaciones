import Capsos1 from '../assets/Nosotros/Nosotros01.jpg';
import Capsos2 from '../assets/Nosotros/Nosotros02.jpg';
import Capsos3 from '../assets/Nosotros/Nosotros03.jpg';
import Capsos4 from '../assets/Nosotros/Nosotros04.jpg';

import imagen1 from '../assets/canales/Citytv.png';
import imagen2 from '../assets/canales/Canal-Uno.png';
import imagen3 from '../assets/canales/Canal-RCN.png';
import imagen4 from '../assets/canales/Discovery.png';
import imagen5 from '../assets/canales/ESPN.png';
import imagen6 from '../assets/canales/Canal-caracol.png';
import imagen7 from '../assets/canales/teleantioquia.png';
import imagen8 from '../assets/canales/Capsos-1.png';
import imagen9 from '../assets/canales/TNT.png';
import imagen10 from '../assets/canales/Star-Channel.png';

/* ======================================================
   SLIDER DE SERVICIOS
====================================================== */

export const sliderImages = [
  {
    
    title: 'Internet por Fibra Óptica',
    subtitle:
      'Elige entre velocidades de 300, 500 y 600 Mbps para conectar tu hogar o empresa.',
    cta: 'Conocer Planes',
    link: '#servicios',
  },
  {
    image: Capsos1,
    title: 'Televisión en Alta Definición',
    subtitle:
      'Disfruta 108 canales con entretenimiento, información y contenido para toda la familia.',
    cta: 'Conocer el Servicio',
    link: '#canales',
  },
  {
    image: Capsos2,
    title: 'Producción Audiovisual',
    subtitle:
      'Transformamos tus ideas en contenidos audiovisuales profesionales. Solicita una cotización personalizada.',
    cta: 'Cotizar Proyecto',
    link: '#contacto',
  },
];

/* ======================================================
   SERVICIOS PRINCIPALES
====================================================== */

export const services = [
  {
    id: 'internet',
    icon: 'fa-wifi',
    title: 'Internet por Fibra Óptica',
    badge: 'VELOCIDAD Y ESTABILIDAD',
    description:
      'Conexión confiable para estudiar, trabajar, disfrutar contenido en línea, realizar videollamadas y conectar múltiples dispositivos.',

    highlight: {
      icon: 'fa-gauge-high',
      label: 'Velocidades disponibles',
      values: ['300 Mbps', '500 Mbps', '600 Mbps'],
    },

    features: [
      'Conexión por fibra óptica',
      'Planes para hogares y empresas',
      'Navegación estable',
      'Conexión para múltiples dispositivos',
      'Atención y soporte técnico',
    ],

    color: 'blue',
    buttonText: 'Mas información',
    link: '/internet',
  },

  {
    id: 'television',
    icon: 'fa-tv',
    title: 'Televisión en Alta Definición',
    badge: 'ENTRETENIMIENTO',
    description:
      'Programación para toda la familia con contenido local, regional, nacional e internacional en alta definición.',

    highlight: {
      icon: 'fa-display',
      label: 'Programación disponible',
      values: ['108 canales', 'Alta definición'],
    },

    features: [
      'Contenido en alta definición',
      'Canales nacionales y regionales',
      'Noticias, deportes y entretenimiento',
      'Programación para toda la familia',
    ],

    color: 'red',
    buttonText: 'Mas información',
    link: '/television',
  },

  {
    id: 'produccion-audiovisual',
    icon: 'fa-video',
    title: 'Producción Audiovisual',
    badge: 'HAZ REALIDAD TU IDEA',
    description:
      'Creamos contenido audiovisual profesional para empresas, organizaciones, instituciones, eventos, proyectos y marcas.',

    highlight: {
      icon: 'fa-comments',
      label: 'Cotización personalizada',
      values: ['Cuéntanos tu proyecto'],
    },

    features: [
      'Producción de video profesional',
      'Transmisión de eventos en vivo',
      'Edición y posproducción',
      'Contenido para redes sociales',
      'Propuestas adaptadas a cada proyecto',
    ],

    color: 'dark',
    buttonText: 'Mas información',
    link: '/canal',
  },
];

/* ======================================================
   CANALES DE TELEVISIÓN
====================================================== */

export const canales = [
  imagen1,
  imagen2,
  imagen3,
  imagen4,
  imagen5,
  imagen6,
  imagen7,
  imagen8,
  imagen9,
  imagen10,
];

/* ======================================================
   INFORMACIÓN CORPORATIVA
====================================================== */

export const aboutCards = [
  {
    id: 'quienes-somos',
    icon: 'fa-building',
    badge: 'Quiénes somos',
    title: 'Una empresa cercana a la comunidad',
    content:
      'CAPSOS Telecomunicaciones es una corporación patrimonio de la comunidad santarrosana, enfocada en conectar, informar y fortalecer los procesos de comunicación de la región.',
    image: Capsos1,
    stat: '15+',
    statLabel: 'Años de experiencia',
  },
  {
    id: 'mision',
    icon: 'fa-bullseye',
    badge: 'Nuestra misión',
    title: 'Conectividad con sentido social',
    content:
      'Brindamos servicios de internet, televisión y producción audiovisual con calidad, cercanía y compromiso con el desarrollo regional.',
    image: Capsos2,
    stat: '5K+',
    statLabel: 'Clientes conectados',
  },
  {
    id: 'vision',
    icon: 'fa-eye',
    badge: 'Nuestra visión',
    title: 'Crecimiento e innovación regional',
    content:
      'Buscamos consolidarnos como una organización innovadora, autosostenible y reconocida por la calidad de sus servicios y su impacto social.',
    image: Capsos3,
    stat: '2030',
    statLabel: 'Proyección corporativa',
  },
  {
    id: 'experiencia',
    icon: 'fa-network-wired',
    badge: 'Experiencia y cobertura',
    title: 'Más de 15 años conectando la región',
    content:
      'Nuestra experiencia nos permite ofrecer soluciones de conectividad, entretenimiento y comunicación adaptadas a las necesidades de hogares, empresas y organizaciones.',
    image: Capsos4,
    stat: '100%',
    statLabel: 'Compromiso local',
  },
];