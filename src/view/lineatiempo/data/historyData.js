import inicioImg from '../../../image/ImgGeneral/InicioCapsos.jpg';
import presenteImg from '../../../image/ImgGeneral/PresenteCapsos.jpg';
import sigloImg from '../../../image/ImgGeneral/NuevoSigloCapsos.jpg';

export const historySection = {
  label: '01 / NUESTRA HISTORIA',
  title: 'Tres décadas de servicio a la comunidad',
  description: 'Una trayectoria que comenzó con la televisión comunitaria y que evolucionó hacia una oferta integral de telecomunicaciones.',
};

export const historyItems = [
  {
    id: '1994',
    marker: '1994',
    dateTime: '1994',
    titleId: 'historia-1994-title',
    kicker: 'EL INICIO',
    title: 'Nace TV Osos',
    image: inicioImg,
    imageAlt: 'Inicio de TV Osos',
    imagePosition: 'left',
    reverse: false,
    paragraphs: [
      {
        before:
          'Fue el 14 de agosto de 1994, durante la celebración de los 180 años de vida municipal de Santa Rosa, cuando nació TV Osos. Su primer programa se tituló ',
        strong: 'Lo Nuestro',
        after:
          ', seguido por TV Osos Espectacular y Fantasías.',
      },
      'En sus inicios, la programación se transmitía en diferido los lunes y sábados a través del canal 7. Desde entonces, TV Osos se convirtió en una ventana que transformó el concepto de televisión en Santa Rosa: la comunidad ya no solo quería ver televisión, quería verse en televisión.',
      'Uno de los mayores orgullos del canal han sido las Fiestas del Atardecer. En 1996 se marcó un hito al transmitir por primera vez las fiestas en directo, comenzando con la conmemoración de los 15 años del grupo de danzas.',
    ],
  },
  {
    id: '2000',
    marker: '2000',
    dateTime: '2000',
    titleId: 'historia-2000-title',
    kicker: 'NUEVO SIGLO',
    title: 'Transformación y crecimiento',
    image: sigloImg,
    imageAlt: 'Nuevo siglo de Capsos',
    imagePosition: 'right',
    reverse: true,
    paragraphs: [
      'La licencia de funcionamiento, tanto de la Corporación como del Canal, fue otorgada por la Comisión Nacional de Televisión en el año 2000, tras cumplir con los requisitos establecidos.',
      'Con la llegada del nuevo siglo, inició un camino de constante mejoramiento. Gracias al esfuerzo, la honestidad y la dedicación de su equipo humano, se logró la implementación de nuevas tecnologías de distribución, especialmente en redes troncales mediante fibra óptica.',
      'También se avanzó en la tecnificación de procesos, la adquisición de equipos modernos y proyectos de ampliación de cobertura que fortalecieron el patrimonio de la corporación.',
    ],
  },
  {
    id: 'hoy',
    marker: 'HOY',
    titleId: 'historia-hoy-title',
    kicker: 'EL PRESENTE',
    title:
      'Una empresa de telecomunicaciones para la comunidad',
    image: presenteImg,
    imageAlt:
      'Capsos Telecomunicaciones actualmente',
    imagePosition: 'left',
    reverse: false,
    paragraphs: [
      'Actualmente, Capsos Telecomunicaciones es una corporación que mantiene con orgullo su identidad como organización sin ánimo de lucro, al tiempo que lidera la operación de televisión por cable y provee servicios de internet de banda ancha a través de fibra óptica.',
      'Contamos con modernas instalaciones, redes de última tecnología y más de 30 años de experiencia, lo que nos permite integrar de manera eficiente los servicios de televisión por cable, internet por fibra óptica y televisión local.',
      'Hoy somos una alternativa de conectividad, tecnología, entretenimiento y registro audiovisual de los hechos que marcan la vida de Santa Rosa de Osos.',
    ],
  },
];

export const originHighlight = {
  label: 'ORIGEN DE TV OSOS',
  title:
    'Una televisión construida por y para los santarrosanos',
  content:
    'Los inicios de la televisión comunitaria no fueron fáciles. Los estudios se instalaron inicialmente en la residencia de uno de los fundadores y muchos equipos eran de propiedad personal de amigos cercanos al canal. A pesar de las dificultades, TV Osos se consolidó como un medio comunitario construido por y para los santarrosanos.',
};
