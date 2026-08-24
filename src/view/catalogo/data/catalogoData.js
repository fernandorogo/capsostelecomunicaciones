import {
  createWhatsAppUrl,
} from '../utils/whatsapp';

/* =========================================================
   HERO
========================================================= */

import catalogSlider
  from '../../../assets/catalogo/Slider.png';


/* =========================================================
   IMÁGENES DE PRODUCTOS
========================================================= */

import extensorTplink300
  from '../../../assets/catalogo/Extensor WiFi TP-Link 300 Mbps.png';

import microsdImou64
  from '../../../assets/catalogo/Memoria MicroSD IMOU 64 GB.png';

import tplinkDecoM5
  from '../../../assets/catalogo/TP-Link Deco M5.png';

import imouCruiserDual8mp
  from '../../../assets/catalogo/Cámara IMOU Cruiser Dual 8 MP.png';

import imouRanger2Dual6mp
  from '../../../assets/catalogo/Cámara IMOU Ranger 2 Dual 6 MP.png';

import imouIpcK2mn
  from '../../../assets/catalogo/Cámara IMOU IPC-K2MN.png';

import imouRanger2K2en
  from '../../../assets/catalogo/Cámara IMOU Ranger 2 IPC-K2EN.png';

import imouFullColorK7fn
  from '../../../assets/catalogo/Cámara IMOU Full Color IPC-K7FN.png';

import mercusysMr30g
  from '../../../assets/catalogo/Mercusys AC1200 MR30G.png';

import tplinkArcherC20
  from '../../../assets/catalogo/TP-Link Archer C20 AC750.png';

import tplinkArcherC64
  from '../../../assets/catalogo/TP-Link Archer C64 AC1200.png';

import tplinkArcherAx1500
  from '../../../assets/catalogo/TP-Link Archer AX1500.png';

import tplinkEap110
  from '../../../assets/catalogo/TP-Link EAP110.png';


/* =========================================================
   CATEGORÍAS
========================================================= */

export const catalogCategories = [
  {
    id: 'todos',
    label: 'Todos',
    icon: 'fas fa-border-all',
  },
  {
    id: 'camaras',
    label: 'Cámaras',
    icon: 'fas fa-video',
  },
  {
    id: 'wifi',
    label: 'WiFi y routers',
    icon: 'fas fa-wifi',
  },
  {
    id: 'mesh',
    label: 'WiFi Mesh',
    icon: 'fas fa-project-diagram',
  },
  {
    id: 'almacenamiento',
    label: 'Almacenamiento',
    icon: 'fas fa-memory',
  },
  {
    id: 'empresarial',
    label: 'Empresarial',
    icon: 'fas fa-building',
  },
];


/* =========================================================
   PRODUCTOS
========================================================= */

export const catalogProducts = [
  {
    id: 'extensor-tplink-300',
    order: 1,
    category: 'wifi',
    categoryLabel:
      'WiFi y routers',
    name:
      'Extensor WiFi TP-Link 300 Mbps',
    price: 95000,
    image:
      extensorTplink300,
    icon:
      'fas fa-wifi',
    description:
      'Amplía la señal WiFi para que llegue a habitaciones donde el internet es débil.',
    idealFor: [
      'Casas pequeñas y medianas',
      'Eliminar zonas sin cobertura',
    ],
    features: [
      'Hasta 300 Mbps',
      'Se conecta directamente al tomacorriente',
      'Fácil instalación',
      'Compatible con cualquier operador de internet',
    ],
  },

  {
    id:
      'microsd-imou-64',
    order: 2,
    category:
      'almacenamiento',
    categoryLabel:
      'Almacenamiento',
    name:
      'Memoria MicroSD IMOU 64 GB',
    price: 72500,
    image:
      microsdImou64,
    icon:
      'fas fa-memory',
    description:
      'Permite guardar las grabaciones de la cámara sin pagar almacenamiento en la nube.',
    idealFor: [],
    features: [
      'Capacidad de 64 GB',
      'Permite almacenar varios días de grabación',
      'La duración depende de la configuración',
    ],
  },

  {
    id:
      'tplink-deco-m5-x3',
    order: 3,
    category:
      'mesh',
    categoryLabel:
      'WiFi Mesh',
    name:
      'TP-Link Deco M5',
    variant:
      'Paquete x3',
    price: 685000,
    image:
      tplinkDecoM5,
    icon:
      'fas fa-project-diagram',
    description:
      'Crea una sola red WiFi potente para ampliar la cobertura en toda la casa u oficina.',
    idealFor: [
      'Casas grandes',
      'Viviendas de dos o más pisos',
      'Oficinas',
    ],
    features: [
      'Cobertura hasta 500 m² aproximadamente',
      'Una sola red WiFi',
      'Cambio automático entre equipos sin perder conexión',
      'Control parental',
      'Seguridad integrada',
    ],
  },

  {
    id:
      'imou-cruiser-dual-8mp',
    order: 4,
    category:
      'camaras',
    categoryLabel:
      'Cámaras',
    name:
      'Cámara IMOU Cruiser Dual 8 MP',
    variant:
      'Exterior',
    price: 245000,
    image:
      imouCruiserDual8mp,
    icon:
      'fas fa-video',
    description:
      'Solución de videovigilancia para proteger entradas, patios y otros espacios exteriores.',
    idealFor: [
      'Fachadas',
      'Parqueaderos',
      'Empresas',
      'Bodegas',
    ],
    features: [
      'Resolución 8 MP',
      'Resistente al agua y al polvo',
      'Imagen Full Color incluso de noche',
      'Sirena integrada',
      'Reflectores LED',
      'Detección inteligente de personas',
      'Control desde el celular',
    ],
  },

  {
    id:
      'imou-ranger-2-dual-6mp',
    order: 5,
    category:
      'camaras',
    categoryLabel:
      'Cámaras',
    name:
      'Cámara IMOU Ranger 2 Dual 6 MP',
    variant:
      'Interior',
    price: 191000,
    image:
      imouRanger2Dual6mp,
    icon:
      'fas fa-video',
    description:
      'Cámara interior de doble lente para obtener mayor cobertura y monitoreo remoto.',
    idealFor: [
      'Casas',
      'Oficinas',
      'Negocios',
      'Niños',
      'Adultos mayores',
      'Mascotas',
    ],
    features: [
      'Resolución 6 MP',
      'Doble lente para mayor cobertura',
      'Movimiento horizontal y vertical',
      'Visión nocturna',
      'Micrófono y parlante',
      'Visualización desde el celular',
    ],
  },

  {
    id:
      'imou-ipc-k2mn',
    order: 6,
    category:
      'camaras',
    categoryLabel:
      'Cámaras',
    name:
      'Cámara IMOU IPC-K2MN',
    variant:
      'Interna',
    price: 137000,
    image:
      imouIpcK2mn,
    icon:
      'fas fa-video',
    description:
      'Cámara interna con alta definición, visión nocturna, monitoreo desde el celular y audio bidireccional.',
    idealFor: [],
    features: [
      'Alta definición',
      'Visión nocturna',
      'Resistente al clima',
      'Monitoreo desde el celular',
      'Audio bidireccional',
    ],
  },

  {
    id:
      'imou-ranger-2-ipc-k2en',
    order: 7,
    category:
      'camaras',
    categoryLabel:
      'Cámaras',
    name:
      'Cámara IMOU Ranger 2 IPC-K2EN',
    variant:
      'Interna',
    price: 106000,
    image:
      imouRanger2K2en,
    icon:
      'fas fa-video',
    description:
      'Cámara interior con giro horizontal y vertical, visión nocturna y control desde la aplicación.',
    idealFor: [
      'Casas',
      'Apartamentos',
      'Oficinas',
    ],
    features: [
      'Imagen Full HD',
      'Giro horizontal y vertical',
      'Visión nocturna',
      'Audio bidireccional',
      'Control desde la App',
    ],
  },

  {
    id:
      'imou-ipc-k7fn',
    order: 8,
    category:
      'camaras',
    categoryLabel:
      'Cámaras',
    name:
      'Cámara IMOU Full Color IPC-K7FN',
    variant:
      'Externa',
    price: 196000,
    image:
      imouFullColorK7fn,
    icon:
      'fas fa-video',
    description:
      'Cámara exterior con imagen a color durante la noche, detección de movimiento y acceso remoto.',
    idealFor: [],
    features: [
      'Imagen a color durante la noche',
      'Alta resolución',
      'Detección de movimiento',
      'Luz integrada',
      'Resistente al agua',
      'Acceso remoto',
    ],
  },

  {
    id:
      'mercusys-mr30g',
    order: 9,
    category:
      'wifi',
    categoryLabel:
      'WiFi y routers',
    name:
      'Mercusys AC1200 MR30G',
    price: 130000,
    image:
      mercusysMr30g,
    icon:
      'fas fa-wifi',
    description:
      'Router AC1200 de doble banda orientado a streaming, videollamadas y juegos en línea.',
    idealFor: [
      'Streaming',
      'Videollamadas',
      'Juegos en línea',
    ],
    features: [
      'Hasta 1200 Mbps',
      'Doble banda 2.4 y 5 GHz',
      'Mayor estabilidad',
    ],
  },

  {
    id:
      'tplink-archer-c20',
    order: 10,
    category:
      'wifi',
    categoryLabel:
      'WiFi y routers',
    name:
      'TP-Link Archer C20 AC750',
    price: 110000,
    image:
      tplinkArcherC20,
    icon:
      'fas fa-wifi',
    description:
      'Router de doble banda con hasta 750 Mbps, ideal para casas pequeñas.',
    idealFor: [
      'Casas pequeñas',
    ],
    features: [
      'Hasta 750 Mbps',
      'Doble banda',
      'Excelente relación calidad-precio',
    ],
  },

  {
    id:
      'tplink-archer-c64',
    order: 11,
    category:
      'wifi',
    categoryLabel:
      'WiFi y routers',
    name:
      'TP-Link Archer C64 AC1200',
    price: 130000,
    image:
      tplinkArcherC64,
    icon:
      'fas fa-wifi',
    description:
      'Router AC1200 con tecnología MU-MIMO para mejorar el rendimiento cuando varias personas usan internet al mismo tiempo.',
    idealFor: [
      'Hogares con muchos dispositivos',
    ],
    features: [
      'Hasta 1200 Mbps',
      'Tecnología MU-MIMO',
      'Mejor rendimiento con varios usuarios simultáneos',
    ],
  },

  {
    id:
      'tplink-archer-ax1500',
    order: 12,
    category:
      'wifi',
    categoryLabel:
      'WiFi y routers',
    name:
      'TP-Link Archer AX1500',
    variant:
      'WiFi 6',
    price: 150000,
    image:
      tplinkArcherAx1500,
    icon:
      'fas fa-wifi',
    recommended:
      true,
    description:
      'Equipo de nueva generación con WiFi 6, mayor velocidad y mejor eficiencia para múltiples dispositivos.',
    idealFor: [
      'Televisores inteligentes',
      'Consolas',
      'Computadores',
      'Casas con muchos usuarios',
    ],
    features: [
      'WiFi 6',
      'Hasta 1500 Mbps',
      'Soporta muchos dispositivos conectados',
      'Menor latencia',
      'Mayor velocidad',
      'Más eficiencia energética',
    ],
  },

  {
    id:
      'tplink-eap110',
    order: 13,
    category:
      'empresarial',
    categoryLabel:
      'Empresarial',
    name:
      'TP-Link EAP110',
    variant:
      'Equipo profesional',
    price: 400000,
    image:
      tplinkEap110,
    icon:
      'fas fa-building',
    description:
      'Solución profesional de conectividad diseñada para operación continua y múltiples usuarios.',
    idealFor: [
      'Empresas',
      'Hoteles',
      'Restaurantes',
      'Oficinas',
    ],
    features: [
      'Cobertura amplia',
      'Soporta muchos usuarios conectados',
      'Administración profesional',
      'Diseñado para uso continuo',
    ],
  },
];


/* =========================================================
   ESTADÍSTICAS
========================================================= */

export const catalogStats = [
  {
    value:
      String(
        catalogProducts.length
      ),
    label:
      'Equipos',
  },
  {
    value:
      String(
        catalogCategories.length -
          1
      ),
    label:
      'Categorías',
  },
  {
    value:
      'WiFi 6',
    label:
      'Nueva generación',
  },
];


/* =========================================================
   HERO
========================================================= */

export const heroContent = {
  image:
    catalogSlider,

  kicker:
    'CATÁLOGO CAPSOS',

  title:
    'Tecnología para conectar, proteger y ',

  highlight:
    'potenciar tus espacios.',

  description:
    'Soluciones de conectividad y seguridad seleccionadas para hogares, negocios y empresas, con asesoría directa de CAPSOS Telecomunicaciones.',

  primaryActionLabel:
    'Explorar equipos',

  secondaryActionLabel:
    'Hablar con un asesor',

  secondaryActionUrl:
    createWhatsAppUrl(
      'Hola, quisiera recibir asesoría sobre el catálogo de equipos de CAPSOS Telecomunicaciones.'
    ),
};


/* =========================================================
   CTA FINAL
========================================================= */

export const finalCtaContent = {
  kicker:
    'ASESORÍA PERSONALIZADA',

  title:
    'No tienes que elegir el equipo solo.',

  description:
    'Cuéntanos el tamaño del espacio, la cantidad de usuarios o lo que deseas proteger. Te orientamos para encontrar una solución acorde con tu necesidad.',

  whatsappMessage:
    'Hola, necesito asesoría para elegir un equipo del catálogo de CAPSOS Telecomunicaciones.',

  primaryActionLabel:
    'Solicitar asesoría',

  secondaryActionLabel:
    'Volver arriba',
};
