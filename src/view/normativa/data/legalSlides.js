import {
  faBalanceScale,
  faChild,
  faShieldAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import normativaCumplimiento from '../../../assets/normativa/normativa-cumplimiento.png';
import normativaDatos from '../../../assets/normativa/normativa-datos.png';
import normativaUsuario from '../../../assets/normativa/normativa-usuario.png';
import normativaPrivacidad from '../../../assets/normativa/normativa-privacidad.png';

export const SLIDE_DURATION = 7000;

export const LEGAL_SLIDES = [
  {
    eyebrow: 'Cumplimiento regulatorio',
    title: 'Normas que respaldan una',
    highlight: 'conectividad clara y confiable.',
    description:
      'Consulta el marco legal relacionado con servicios TIC, protección de usuarios, privacidad y cumplimiento regulatorio.',
    image: normativaCumplimiento,
    imageAlt:
      'Profesional revisando documentación de cumplimiento normativo',
    imagePosition: 'center center',
    icon: faBalanceScale,
    metric: '7',
    metricLabel: 'disposiciones',
    features: [
      'Marco general del sector TIC',
      'Fuentes oficiales',
      'Consulta organizada',
    ],
  },
  {
    eyebrow: 'Protección de datos',
    title: 'Información protegida durante',
    highlight: 'todo su ciclo de tratamiento.',
    description:
      'Conoce las disposiciones sobre autorización, privacidad, políticas de tratamiento y derechos de los titulares.',
    image: normativaDatos,
    imageAlt:
      'Equipo profesional revisando políticas de protección de datos',
    imagePosition: 'center center',
    icon: faShieldAlt,
    metric: '1581',
    metricLabel: 'ley principal',
    features: [
      'Autorización del titular',
      'Tratamiento responsable',
      'Derechos sobre la información',
    ],
  },
  {
    eyebrow: 'Derechos del usuario',
    title: 'Condiciones transparentes para',
    highlight: 'usuarios mejor informados.',
    description:
      'Revisa normas relacionadas con contratos, facturación, peticiones, quejas, recursos y terminación del servicio.',
    image: normativaUsuario,
    imageAlt:
      'Asesora explicando derechos y contratos de telecomunicaciones',
    imagePosition: 'center center',
    icon: faUsers,
    metric: 'PQR',
    metricLabel: 'y contratos',
    features: [
      'Información contractual',
      'Atención al usuario',
      'Terminación del servicio',
    ],
  },
  {
    eyebrow: 'Internet seguro',
    title: 'Conectividad responsable para',
    highlight: 'hogares y entornos digitales.',
    description:
      'Accede a lineamientos sobre protección de menores, uso responsable de Internet y seguridad de los servicios digitales.',
    image: normativaPrivacidad,
    imageAlt:
      'Familia utilizando Internet con herramientas de protección digital',
    imagePosition: 'center center',
    icon: faChild,
    metric: '100%',
    metricLabel: 'prevención',
    features: [
      'Protección de menores',
      'Uso responsable de Internet',
      'Prevención de riesgos',
    ],
  },
];
