import {
  faBroadcastTower,
  faBullhorn,
  faCalendarAlt,
  faChalkboardTeacher,
  faChartLine,
  faHandshake,
  faLayerGroup,
  faLightbulb,
  faMicrophoneAlt,
  faShieldAlt,
  faSignal,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

import canalEstudioControl from '../../../assets/canal/canal-estudio-control.webp';
import canalPresentadoraInstitucional from '../../../assets/canal/canal-presentadora-institucional.webp';
import canalEntrevistaPrograma from '../../../assets/canal/canal-entrevista-programa.webp';
import canalComunidadEvento from '../../../assets/canal/canal-comunidad-evento.webp';

export const slides = [
  {
    eyebrow: 'Producción y señal digital',
    title: 'Tu historia merece su propio canal.',
    description:
      'Convertimos la identidad de tu organización en una señal profesional, con contenidos, formatos y una parrilla diseñada para conectar con tu audiencia.',
    image: canalEstudioControl,
    imageAlt:
      'Estudio profesional de televisión con set de noticias y sala de control',
    imagePosition: 'center center',
    icon: faBroadcastTower,
    feature: 'Producción integral',
    supporting: 'De la idea a la señal',
  },
  {
    eyebrow: 'Comunicación institucional',
    title: 'Tu mensaje merece más.',
    description:
      'Informa, orienta y fortalece la confianza de tu audiencia mediante una comunicación directa, clara y alineada con tu identidad institucional.',
    image: canalPresentadoraInstitucional,
    imageAlt:
      'Presentadora profesional frente a una cámara en un entorno institucional',
    imagePosition: '52% 18%',
    icon: faBullhorn,
    feature: 'Comunicación oficial',
    supporting: 'Mensajes bajo tu control',
  },
  {
    eyebrow: 'Formatos que conectan',
    title: 'Contenido con propósito.',
    description:
      'Creamos magazines, entrevistas, noticieros, espacios educativos y programas de participación que convierten cada emisión en una experiencia relevante.',
    image: canalEntrevistaPrograma,
    imageAlt:
      'Entrevista de televisión profesional realizada frente a una audiencia',
    imagePosition: 'center center',
    icon: faMicrophoneAlt,
    feature: 'Formatos profesionales',
    supporting: 'Contenido con propósito',
  },
  {
    eyebrow: 'Comunidad y territorio',
    title: 'Lo que transforma, se muestra.',
    description:
      'Lleva a la pantalla las iniciativas, talentos, eventos y voces que fortalecen a tu comunidad y construyen una identidad compartida.',
    image: canalComunidadEvento,
    imageAlt:
      'Equipo audiovisual grabando un evento cultural y comunitario al aire libre',
    imagePosition: 'center center',
    icon: faUsers,
    feature: 'Conexión territorial',
    supporting: 'Historias que sí importan',
  },
];

export const heroHighlights = [
  {
    icon: faLayerGroup,
    label: 'Parrilla estratégica',
    detail: 'Franjas y programación',
  },
  {
    icon: faVideo,
    label: 'Producción audiovisual',
    detail: 'Grabación y postproducción',
  },
  {
    icon: faSignal,
    label: 'Distribución digital',
    detail: 'Señal y monitoreo',
  },
];

export const journey = [
  {
    number: '01',
    icon: faLightbulb,
    title: 'Definimos el propósito',
    text: 'Aterrizamos objetivos, audiencia, identidad editorial y resultados esperados.',
  },
  {
    number: '02',
    icon: faCalendarAlt,
    title: 'Diseñamos la parrilla',
    text: 'Organizamos formatos, franjas, frecuencias y una programación coherente.',
  },
  {
    number: '03',
    icon: faVideo,
    title: 'Producimos el contenido',
    text: 'Acompañamos preproducción, grabación, edición y salida profesional.',
  },
  {
    number: '04',
    icon: faBroadcastTower,
    title: 'Llevamos tu señal al aire',
    text: 'Integramos distribución, monitoreo y continuidad técnica del canal.',
  },
];

export const benefits = [
  {
    icon: faBroadcastTower,
    number: '01',
    title: 'Presencia en señal digital',
    text: 'Una vitrina profesional y permanente para la identidad, los contenidos y los proyectos de tu organización.',
    accent: 'cyan',
  },
  {
    icon: faBullhorn,
    number: '02',
    title: 'Canal de comunicación oficial',
    text: 'Centraliza campañas, anuncios, contenidos internos y mensajes clave en un medio propio.',
    accent: 'blue',
  },
  {
    icon: faUsers,
    number: '03',
    title: 'Cercanía con la audiencia',
    text: 'Crea una relación más humana con colaboradores, clientes, estudiantes o comunidad.',
    accent: 'cyan',
  },
  {
    icon: faChartLine,
    number: '04',
    title: 'Valor y posicionamiento',
    text: 'Diferencia tu marca y cuenta tus historias con una estética y una voz completamente propias.',
    accent: 'blue',
  },
  {
    icon: faHandshake,
    number: '05',
    title: 'Alianzas y patrocinios',
    text: 'Abre posibilidades para pauta, contenidos patrocinados y alianzas con actores estratégicos.',
    accent: 'cyan',
  },
  {
    icon: faShieldAlt,
    number: '06',
    title: 'Control editorial',
    text: 'Define el enfoque, la calidad y los mensajes que representan a tu organización.',
    accent: 'blue',
  },
];

export const useCases = [
  {
    tag: 'Empresas y marcas',
    title: 'Canal corporativo',
    text: 'Cultura organizacional, logros, campañas internas, formación y comunicación con colaboradores.',
    image: canalEstudioControl,
    imageAlt: 'Producción profesional de un canal corporativo',
    icon: faChartLine,
  },
  {
    tag: 'Gobierno y entidades',
    title: 'Canal institucional',
    text: 'Programas, convocatorias, servicios, rendición de cuentas y comunicación con la ciudadanía.',
    image: canalPresentadoraInstitucional,
    imageAlt: 'Presentadora de un canal institucional',
    icon: faShieldAlt,
  },
  {
    tag: 'Educación y cultura',
    title: 'Canal educativo',
    text: 'Clases, cápsulas, entrevistas, divulgación cultural y experiencias formativas para nuevas audiencias.',
    image: canalEntrevistaPrograma,
    imageAlt: 'Programa educativo y cultural grabado con audiencia',
    icon: faChalkboardTeacher,
  },
  {
    tag: 'Comunidad y región',
    title: 'Canal comunitario',
    text: 'Líderes, iniciativas, eventos, talentos y proyectos que fortalecen el tejido social.',
    image: canalComunidadEvento,
    imageAlt: 'Producción audiovisual de un evento comunitario',
    icon: faUsers,
  },
];

export const formats = [
  {
    icon: faVideo,
    title: 'Magazines y entrevistas',
    text: 'Conversaciones, invitados, reportajes y secciones dinámicas que acercan tu marca a la audiencia.',
  },
  {
    icon: faMicrophoneAlt,
    title: 'Noticieros y boletines',
    text: 'Actualidad institucional, agenda regional, anuncios y contenidos informativos claros y oportunos.',
  },
  {
    icon: faChalkboardTeacher,
    title: 'Contenido educativo',
    text: 'Cápsulas, cursos, charlas y contenidos pedagógicos para aprender dentro y fuera de la organización.',
  },
  {
    icon: faUsers,
    title: 'Participación y opinión',
    text: 'Foros, mesas de diálogo y espacios donde la audiencia también puede tener voz.',
  },
];

export const techItems = [
  'Diseño de parrilla, franjas y lineamientos de programación.',
  'Asesoría técnica para producción, realización y postproducción.',
  'Integración con el servicio de televisión digital.',
  'Distribución, monitoreo y continuidad operativa de la señal.',
  'Articulación con plataformas digitales y redes sociales.',
];

export { canalEstudioControl };
