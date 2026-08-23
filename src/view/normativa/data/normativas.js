import {
  faBalanceScale,
  faChild,
  faDatabase,
  faFileContract,
  faNetworkWired,
  faShieldAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const NORMATIVAS = [
  {
    id: 'ley-1581-2012',
    type: 'Ley',
    number: '1581',
    year: '2012',
    title: 'Protección de datos personales',
    authority: 'Congreso de Colombia',
    category: 'Datos personales',
    categoryKey: 'datos',
    summary:
      'Establece el régimen general de protección de datos personales y reconoce los derechos de los titulares sobre la información almacenada en bases de datos o archivos.',
    status: 'Norma principal',
    statusType: 'active',
    accent: 'blue',
    icon: faShieldAlt,
    links: [
      {
        label: 'Consultar norma',
        format: 'web',
        url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981',
      },
    ],
  },
  {
    id: 'circular-6-2011',
    type: 'Circular Externa',
    number: '6',
    year: '2011',
    title: 'Terminación de contratos de telecomunicaciones',
    authority: 'Superintendencia de Industria y Comercio',
    category: 'Derechos del usuario',
    categoryKey: 'usuarios',
    summary:
      'Imparte instrucciones a los proveedores de telecomunicaciones sobre el trámite de las solicitudes de terminación de contratos presentadas por los usuarios.',
    status: 'Consulta oficial',
    statusType: 'official',
    accent: 'cyan',
    icon: faFileContract,
    links: [
      {
        label: 'Consultar circular',
        format: 'web',
        url: 'https://normograma.crcom.gov.co/crc/compilacion/docs/circular_superindustria_0006_2011.htm',
      },
    ],
  },
  {
    id: 'decreto-1377-2013',
    type: 'Decreto',
    number: '1377',
    year: '2013',
    title: 'Reglamentación del tratamiento de datos',
    authority: 'Presidencia de la República',
    category: 'Datos personales',
    categoryKey: 'datos',
    summary:
      'Reglamenta parcialmente la Ley 1581 de 2012 y desarrolla aspectos como autorización, políticas de tratamiento, avisos de privacidad y ejercicio de derechos.',
    status: 'Reglamentario',
    statusType: 'active',
    accent: 'blue',
    icon: faDatabase,
    links: [
      {
        label: 'Consultar decreto',
        format: 'web',
        url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646',
      },
    ],
  },
  {
    id: 'resolucion-57-2021',
    type: 'Resolución MinTIC',
    number: '57',
    year: '2021',
    title: 'Política Pública de Vigilancia Preventiva',
    authority:
      'Ministerio de Tecnologías de la Información y las Comunicaciones',
    category: 'Vigilancia preventiva',
    categoryKey: 'vigilancia',
    summary:
      'Modificó la política PrevenTIC para promover el cumplimiento de obligaciones legales, reglamentarias y regulatorias del sector TIC.',
    status: 'Derogada',
    statusType: 'repealed',
    accent: 'red',
    icon: faBalanceScale,
    notice:
      'La propia página identifica esta disposición como derogada y enlaza la Resolución 1549 de 2023 como norma posterior.',
    links: [
      {
        label: 'Ver resolución histórica',
        format: 'historical',
        url: 'https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_0057_2021.htm',
      },
      {
        label: 'Ver norma posterior',
        format: 'replacement',
        url: 'https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_1549_2023.htm',
      },
    ],
  },
  {
    id: 'resolucion-crc-3066-2011',
    type: 'Resolución CRC',
    number: '3066',
    year: '2011',
    title: 'Régimen de protección de usuarios',
    authority: 'Comisión de Regulación de Comunicaciones',
    category: 'Derechos del usuario',
    categoryKey: 'usuarios',
    summary:
      'Estableció un régimen integral sobre información, contratos, facturación, atención de peticiones, quejas y recursos de los usuarios de comunicaciones.',
    status: 'Referencia histórica',
    statusType: 'historical',
    accent: 'gold',
    icon: faUsers,
    notice:
      'Se conserva como referencia histórica. La vigencia debe confirmarse en la fuente oficial antes de utilizarla como fundamento normativo.',
    links: [
      {
        label: 'Consultar resolución',
        format: 'historical',
        url: 'https://normograma.crcom.gov.co/crc/compilacion/docs/resolucion_crc_3066_2011.htm',
      },
    ],
  },
  {
    id: 'decreto-1524-2002',
    type: 'Decreto',
    number: '1524',
    year: '2002',
    title: 'Protección de menores en Internet',
    authority: 'Presidencia de la República',
    category: 'Internet seguro',
    categoryKey: 'seguridad',
    summary:
      'Establece medidas administrativas y técnicas orientadas a prevenir el acceso de menores de edad a contenidos ilegales disponibles en Internet.',
    status: 'Consulta oficial',
    statusType: 'official',
    accent: 'navy',
    icon: faChild,
    links: [
      {
        label: 'Consultar decreto',
        format: 'web',
        url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5551',
      },
    ],
  },
  {
    id: 'ley-1341-2009',
    type: 'Ley',
    number: '1341',
    year: '2009',
    title: 'Marco general del sector TIC',
    authority: 'Congreso de Colombia',
    category: 'Sector TIC',
    categoryKey: 'sector',
    summary:
      'Define principios y conceptos sobre la sociedad de la información, organiza el sector TIC y establece reglas generales para la intervención del Estado.',
    status: 'Marco sectorial',
    statusType: 'active',
    accent: 'cyan',
    icon: faNetworkWired,
    links: [
      {
        label: 'Consultar ley',
        format: 'web',
        url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=36913',
      },
    ],
  },
];

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'sector', label: 'Sector TIC' },
  { value: 'usuarios', label: 'Usuarios' },
  { value: 'datos', label: 'Datos personales' },
  { value: 'vigilancia', label: 'Vigilancia' },
  { value: 'seguridad', label: 'Internet seguro' },
];
