import {
  faBalanceScale,
  faFileContract,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

export const VALIDITY_NOTICES = [
  {
    title: 'Resolución 57 de 2021',
    description:
      'Fue derogada por la Resolución 1549 de 2023. En la tarjeta encontrarás acceso tanto a la referencia histórica como a la disposición posterior.',
    icon: faInfoCircle,
  },
  {
    title: 'Normas históricas',
    description:
      'Se presentan para explicar la evolución de la regulación y no deben interpretarse automáticamente como disposiciones vigentes.',
    icon: faFileContract,
  },
  {
    title: 'Alcance informativo',
    description:
      'Los resúmenes facilitan la consulta, pero no sustituyen la lectura integral de la norma ni una asesoría jurídica especializada.',
    icon: faBalanceScale,
  },
];
