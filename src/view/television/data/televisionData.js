import {
  faChild,
  faCogs,
  faFilm,
  faFutbol,
  faGlobe,
  faHeadset,
  faIdCard,
  faLocationDot,
  faHome,
  faMusic,
  faPrayingHands,
  faFileSignature,
  faCreditCard,
  faSignal,
  faTv,
  faUtensils,
  faPhone,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';

import tvHogar from '../../../assets/television/tv-hogar.png';
import tvDeportes from '../../../assets/television/tv-deportes.png';
import tvCineSeries from '../../../assets/television/tv-cine-series.png';
import tvEmpresarial from '../../../assets/television/tv-empresarial.png';

export const heroSlides = [
  {
    eyebrow: 'Televisión digital para el hogar',
    title: 'Entretenimiento para compartir.',
    description:
      'Disfruta más de 108 canales digitales con programación para toda la familia, señal estable y acompañamiento técnico cuando lo necesites.',
    image: tvHogar,
    imageAlt:
      'Familia disfrutando televisión digital en una sala moderna',
    imagePosition: 'center center',
    highlight: '108+',
    highlightLabel: 'canales digitales',
    features: ['Contenido familiar', 'Señal digital estable', 'Soporte cercano'],
    ctaText: 'Quiero televisión para mi hogar',
    whatsappText:
      'Hola, quiero información sobre el servicio de televisión digital para mi hogar.',
  },
  {
    eyebrow: 'Deportes en vivo',
    title: 'Vívelo como en el estadio.',
    description:
      'Sigue fútbol, ligas, competencias y programación deportiva con una experiencia visual pensada para los momentos que no quieres perderte.',
    image: tvDeportes,
    imageAlt:
      'Amigos celebrando un partido de fútbol frente a un televisor',
    imagePosition: 'center center',
    highlight: '7',
    highlightLabel: 'señales deportivas',
    features: ['Fútbol y competencias', 'Programación deportiva', 'Emoción en familia'],
    ctaText: 'Consultar canales deportivos',
    whatsappText:
      'Hola, quiero conocer los canales deportivos disponibles en el servicio de televisión digital.',
  },
  {
    eyebrow: 'Cine, series y entretenimiento',
    title: 'Convierte tu sala en tu lugar favorito.',
    description:
      'Películas, series y canales de entretenimiento para maratones, noches de cine y planes en familia sin salir de casa.',
    image: tvCineSeries,
    imageAlt:
      'Familia disfrutando una noche de cine en casa',
    imagePosition: 'center center',
    highlight: '15',
    highlightLabel: 'canales de cine y series',
    features: ['Películas y series', 'Contenido para compartir', 'Entretenimiento continuo'],
    ctaText: 'Conocer la oferta de cine',
    whatsappText:
      'Hola, quiero conocer los canales de cine y series incluidos en el servicio de televisión digital.',
  },
  {
    eyebrow: 'Televisión para negocios',
    title: 'Una mejor experiencia.',
    description:
      'Soluciones de televisión para hoteles, salas de espera, restaurantes, oficinas y espacios comerciales que buscan ofrecer mayor comodidad.',
    image: tvEmpresarial,
    imageAlt:
      'Televisor en una habitación moderna para uso empresarial y hotelero',
    imagePosition: 'center center',
    highlight: '24/7',
    highlightLabel: 'entretenimiento disponible',
    features: ['Hoteles y comercios', 'Ambientes más atractivos', 'Asesoría personalizada'],
    ctaText: 'Solicitar asesoría empresarial',
    whatsappText:
      'Hola, quiero información sobre televisión digital para un negocio, hotel u oficina.',
  },
];

export const contentCategories = [
  {
    title: 'Nacionales y regionales',
    description:
      'Información, entretenimiento y contenidos cercanos a tu ciudad y a las regiones de Colombia.',
    icon: faTv,
  },
  {
    title: 'Documentales y naturaleza',
    description:
      'Ciencia, historia, cultura, viajes, exploración y vida animal para aprender viendo.',
    icon: faGlobe,
  },
  {
    title: 'Cocina y hogar',
    description:
      'Recetas, decoración, estilo de vida, hogar y contenidos prácticos para todos los días.',
    icon: faUtensils,
  },
  {
    title: 'Niños y jóvenes',
    description:
      'Programación infantil y juvenil con entretenimiento, animación y contenidos educativos.',
    icon: faChild,
  },
  {
    title: 'Deportes',
    description:
      'Fútbol, competencias, análisis y programación deportiva para seguir tu pasión.',
    icon: faFutbol,
  },
  {
    title: 'Religión',
    description:
      'Celebraciones, mensajes de reflexión y contenidos espirituales para distintas comunidades.',
    icon: faPrayingHands,
  },
  {
    title: 'Música',
    description:
      'Ritmos tropicales, populares, urbanos, románticos, retro y mucho más.',
    icon: faMusic,
  },
  {
    title: 'Cine y entretenimiento',
    description:
      'Películas, series y programas para disfrutar solo, en pareja o con toda la familia.',
    icon: faFilm,
  },
];

export const tvFeatures = [
  {
    icon: faTv,
    number: '108+',
    title: 'Canales digitales',
    description:
      'Una parrilla diversa organizada por categorías para encontrar fácilmente lo que deseas ver.',
  },
  {
    icon: faSignal,
    number: 'Digital',
    title: 'Señal estable',
    description:
      'Una experiencia de televisión diseñada para mantener una reproducción clara y confiable.',
  },
  {
    icon: faCogs,
    number: 'Soporte',
    title: 'Mantenimiento',
    description:
      'Revisión de equipos, ajustes y acompañamiento para conservar el servicio en buenas condiciones.',
  },
  {
    icon: faHeadset,
    number: 'Cercano',
    title: 'Atención oportuna',
    description:
      'Canales de contacto para reportar novedades y recibir orientación técnica cuando la necesites.',
  },
];


export const serviceRequirements = [
  {
    id: 'coverage',
    icon: faLocationDot,
    step: '01',
    title: 'Cobertura disponible',
    description:
      'La dirección de instalación debe estar ubicada dentro de una zona donde CAPSOS tenga disponibilidad del servicio de televisión.',
  },
  {
    id: 'identity',
    icon: faIdCard,
    step: '02',
    title: 'Documento de identidad',
    description:
      'Documento de identificación vigente de la persona que quedará registrada como titular del servicio.',
  },
  {
    id: 'contact',
    icon: faPhone,
    step: '03',
    title: 'Datos de contacto',
    description:
      'Número de celular y, cuando esté disponible, correo electrónico para gestionar la solicitud y coordinar la instalación.',
  },
  {
    id: 'address',
    icon: faHome,
    step: '04',
    title: 'Dirección de instalación',
    description:
      'Dirección completa del lugar donde se instalará el servicio, incluyendo barrio, sector, vereda o referencias cuando sean necesarias. Incluir una factura de Servicio Publico preferiblemente EPM',
  },
  {
    id: 'technical',
    icon: faScrewdriverWrench,
    step: '05',
    title: 'Validación técnica',
    description:
      'CAPSOS verificará que el inmueble cuente con las condiciones técnicas necesarias para realizar la conexión e instalación.',
  },
  {
    id: 'conditions',
    icon: faFileSignature,
    step: '06',
    title: 'Aceptación de condiciones',
    description:
      'El titular debe conocer y aceptar las condiciones del servicio, tarifa, instalación y demás términos aplicables a la contratación.',
  },
  {
    id: 'payments',
    icon: faCreditCard,
    step: '07',
    title: 'Pagos correspondientes',
    description:
      'Cuando aplique, se deberán realizar los pagos asociados a instalación, activación, mensualidad o equipos según el servicio contratado. Precio Mensual $35.000; Precio por Instalación $40.000',
  },
];

export const channelGroups = [
  {
    category: 'Deportivos',
    icon: faFutbol,
    items: [
      ['19', 'ESPN'],
      ['20', 'ESPN 2'],
      ['21', 'ESPN 3'],
      ['22', 'ESPN 4'],
      ['23', 'ESPN 5'],
      ['24', 'ESPN 6'],
      ['25', 'ESPN 7'],
    ],
  },
  {
    category: 'Nacionales',
    icon: faTv,
    items: [
      ['1', 'RCN'],
      ['2', 'Caracol'],
      ['3', 'Canal Uno'],
      ['4', 'Telemedellín'],
      ['11', 'Caracol HD2'],
      ['70', 'RCN HD2'],
      ['81', 'Canal Institucional'],
      ['83', 'City TV'],
      ['104', 'Zoom'],
      ['106', 'Congreso'],
      ['108', 'Cosmovisión'],
    ],
  },
  {
    category: 'Regionales y locales',
    icon: faHome,
    items: [
      ['3', 'Teleantioquia'],
      ['14', 'CAPSOS TV'],
      ['52', 'Señal Colombia'],
      ['74', 'Canal Capital'],
      ['75', 'Telecafé'],
      ['76', 'Telepacífico'],
      ['77', 'Canal TRO'],
      ['78', 'Canal Trece'],
      ['79', 'Teleantioquia GO'],
      ['87', 'Teleisla'],
      ['107', 'CNC'],
    ],
  },
  {
    category: 'Documentales y naturaleza',
    icon: faGlobe,
    items: [
      ['7', 'Love Nature'],
      ['8', 'Discovery Channel'],
      ['9', 'Animal Planet'],
      ['10', 'NatGeo'],
      ['11', 'Discovery H&H'],
      ['12', 'Investigation Discovery'],
      ['13', 'HGTV'],
      ['14', 'Food Network'],
      ['15', 'Discovery Science'],
      ['16', 'Discovery Turbo'],
      ['17', 'History'],
      ['18', 'History 2'],
    ],
  },
  {
    category: 'Infantiles',
    icon: faChild,
    items: [
      ['44', 'Discovery Kids'],
      ['45', 'Disney Channel'],
      ['46', 'Disney Junior'],
      ['47', 'Baby TV'],
      ['48', 'Plimplim'],
      ['49', 'Baby First'],
      ['50', 'Canal Infantil'],
      ['51', 'Cartoon Network'],
      ['52', 'Cartoonito'],
      ['53', 'Adult Swim'],
      ['54', 'Dreamworks'],
      ['55', 'Tooncast'],
    ],
  },
  {
    category: 'Religiosos',
    icon: faPrayingHands,
    items: [
      ['82', 'Televid'],
      ['83', 'Teleamiga'],
      ['84', 'EWTN'],
      ['85', 'SJTV'],
      ['86', 'Enlace'],
      ['87', 'Canal Luz'],
      ['88', 'Cristovisión'],
      ['89', 'Mariavisión'],
      ['90', 'Sophia TV'],
    ],
  },
  {
    category: 'Musicales',
    icon: faMusic,
    items: [
      ['94', 'La Kalle'],
      ['95', 'Mi Música Salsa'],
      ['96', 'Mi Música Popular'],
      ['97', 'Mi Música Romántica'],
      ['98', 'Telenostalgia'],
      ['99', 'Rumba TV'],
      ['100', 'TV Musical'],
      ['102', 'Mi Música Reggaeton'],
      ['103', 'Mi Música Urbana'],
    ],
  },
  {
    category: 'Cine y series',
    icon: faFilm,
    items: [
      ['26', 'FX'],
      ['27', 'Star Channel'],
      ['28', 'TNT Series'],
      ['29', 'Space'],
      ['30', 'Sony Channel'],
      ['31', 'AXN'],
      ['32', 'Universal TV'],
      ['33', 'Studio Universal'],
      ['34', 'Cine Familiar'],
      ['35', 'Cine Español'],
      ['36', 'Cinema +'],
      ['37', 'AMC'],
      ['41', 'A&E'],
      ['42', 'TLC'],
      ['43', 'USA'],
    ],
  },
];


export const analogChannels = [
  { number: '2', name: 'Telemedellín', category: 'Nacionales y regionales' },
  { number: '3', name: 'TV Agro', category: 'Nacionales y regionales' },
  { number: '4', name: 'Canal 1', category: 'Nacionales y regionales' },
  { number: '5', name: 'Teleantioquia', category: 'Nacionales y regionales' },
  { number: '6', name: 'TV Musical', category: 'Música' },
  { number: '7', name: 'Caracol', category: 'Nacionales y regionales' },
  { number: '8', name: 'CAPSOS TV Canal Local', category: 'Nacionales y regionales' },
  { number: '9', name: 'RCN', category: 'Nacionales y regionales' },
  { number: '10', name: 'Telemundo', category: 'Cine y entretenimiento' },
  { number: '11', name: 'Televid', category: 'Religión' },
  { number: '12', name: 'Señal Colombia', category: 'Nacionales y regionales' },
  { number: '13', name: 'Canal Trece', category: 'Nacionales y regionales' },
  { number: '14', name: 'Discovery Kids', category: 'Infantiles' },
  { number: '15', name: 'Disney Channel', category: 'Infantiles' },
  { number: '16', name: 'Disney Junior', category: 'Infantiles' },
  { number: '17', name: 'DreamWorks', category: 'Infantiles' },
  { number: '18', name: 'Tooncast', category: 'Infantiles' },
  { number: '19', name: 'Cartoon Network', category: 'Infantiles' },
  { number: '20', name: 'Adult Swim', category: 'Cine y entretenimiento' },
  { number: '21', name: 'ESPN', category: 'Deportivos' },
  { number: '22', name: 'ESPN 2', category: 'Deportivos' },
  { number: '23', name: 'ESPN 3', category: 'Deportivos' },
  { number: '24', name: 'ESPN 7', category: 'Deportivos' },
  { number: '25', name: 'History', category: 'Documentales y naturaleza' },
  { number: '26', name: 'History 2', category: 'Documentales y naturaleza' },
  { number: '27', name: 'Discovery Science', category: 'Documentales y naturaleza' },
  { number: '28', name: 'Turbo', category: 'Documentales y naturaleza' },
  { number: '29', name: 'Love Nature', category: 'Documentales y naturaleza' },
  { number: '30', name: 'Discovery Channel', category: 'Documentales y naturaleza' },
  { number: '31', name: 'Animal Planet', category: 'Documentales y naturaleza' },
  { number: '32', name: 'Nat Geo', category: 'Documentales y naturaleza' },
  { number: '33', name: 'Food', category: 'Hogar y estilo de vida' },
  { number: '34', name: 'Discovery H&H', category: 'Hogar y estilo de vida' },
  { number: '35', name: 'Discovery ID', category: 'Documentales y naturaleza' },
  { number: '36', name: 'Sony Movies', category: 'Cine y entretenimiento' },
  { number: '37', name: 'Sony Channel', category: 'Cine y entretenimiento' },
  { number: '38', name: 'Star Channel', category: 'Cine y entretenimiento' },
  { number: '39', name: 'TNT Series', category: 'Cine y entretenimiento' },
  { number: '40', name: 'TNT', category: 'Cine y entretenimiento' },
  { number: '41', name: 'Space', category: 'Cine y entretenimiento' },
  { number: '42', name: 'FX', category: 'Cine y entretenimiento' },
  { number: '43', name: 'Cine Canal', category: 'Cine y entretenimiento' },
  { number: '44', name: 'Cine Familiar', category: 'Cine y entretenimiento' },
  { number: '45', name: 'Life Time', category: 'Cine y entretenimiento' },
  { number: '46', name: 'DHE', category: 'Cine y entretenimiento' },
  { number: '47', name: 'Universal', category: 'Cine y entretenimiento' },
  { number: '48', name: 'Studio Universal', category: 'Cine y entretenimiento' },
  { number: '49', name: 'USA', category: 'Cine y entretenimiento' },
  { number: '50', name: 'A&E', category: 'Cine y entretenimiento' },
  { number: '51', name: 'E!', category: 'Cine y entretenimiento' },
  { number: '52', name: 'Ve Plus', category: 'Cine y entretenimiento' },
  { number: '53', name: 'Pasiones', category: 'Cine y entretenimiento' },
  { number: '54', name: 'Telecaribe', category: 'Nacionales y regionales' },
  { number: '55', name: 'HTV', category: 'Música' },
  { number: '56', name: 'Telenostalgia', category: 'Cine y entretenimiento' },
  { number: '57', name: 'La Kalle', category: 'Música' },
  { number: '58', name: 'NTN24', category: 'Noticias' },
  { number: '59', name: 'Cable Noticias', category: 'Noticias' },
  { number: '60', name: 'CNN Español', category: 'Noticias' },
  { number: '61', name: 'EWTN', category: 'Religión' },
  { number: '62', name: 'Enlace', category: 'Religión' },
  { number: '63', name: 'Teleamiga', category: 'Religión' },
  { number: '64', name: 'Cristovisión', category: 'Religión' },
  { number: '65', name: 'Caracol 2', category: 'Nacionales y regionales' },
  { number: '66', name: 'Rumba TV', category: 'Música' },
  { number: '67', name: 'TNT Novelas', category: 'Cine y entretenimiento' },
  { number: '68', name: 'Canal Congreso', category: 'Nacionales y regionales' },
  { number: '69', name: 'Telecafé', category: 'Nacionales y regionales' },
  { number: '70', name: 'Canal Capital', category: 'Nacionales y regionales' },
  { number: '71', name: 'Telesur', category: 'Noticias' },
  { number: '72', name: 'Sun', category: 'Cine y entretenimiento' },
  { number: '73', name: 'Hogar TV', category: 'Hogar y estilo de vida' },
  { number: '74', name: 'Telepacífico', category: 'Nacionales y regionales' },
  { number: '75', name: 'Teleisla', category: 'Nacionales y regionales' },
  { number: '76', name: 'Zoom', category: 'Nacionales y regionales' },
  { number: '77', name: 'Canal TRO', category: 'Nacionales y regionales' },
  { number: '78', name: 'María Visión', category: 'Religión' },
  { number: '79', name: 'CityTV', category: 'Nacionales y regionales' },
];

export const faqs = [
  {
    question: '¿Cuántos canales incluye el servicio?',
    answer:
      'El servicio incluye más de 108 canales digitales organizados en categorías como nacionales, regionales, deportes, cine, infantiles, documentales, música y religión.',
  },
  {
    question: '¿La programación incluye contenido familiar?',
    answer:
      'Sí. La parrilla combina programación infantil, cine, series, música, documentales, cocina, hogar y entretenimiento para diferentes edades.',
  },
  {
    question: '¿Qué ocurre si tengo problemas con la señal?',
    answer:
      'Puedes comunicarte con el equipo de atención para reportar la novedad. Se realizan revisiones, ajustes y mantenimiento cuando el servicio lo requiere.',
  },
  {
    question: '¿Puedo solicitar televisión para un negocio?',
    answer:
      'Sí. Puedes solicitar orientación para hoteles, restaurantes, oficinas, salas de espera y otros espacios comerciales.',
  },
];
