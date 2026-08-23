import inicioImg from '../../../image/ImgGeneral/InicioCapsos.jpg';
import presenteImg from '../../../image/ImgGeneral/PresenteCapsos.jpg';
import sigloImg from '../../../image/ImgGeneral/NuevoSigloCapsos.jpg';

export const navItems = [
  { id: 'historia', label: 'Historia' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'principios', label: 'Principios' },
  { id: 'calidad', label: 'Calidad' },
  { id: 'proyeccion', label: 'Proyección' },
];

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

export const aboutItems = [
  {
    title: 'QUIÉNES SOMOS',
    content:
      'CAPSOS Telecomunicaciones es una corporación que pertenece al patrimonio de la comunidad santarrosana. Su objeto social es contribuir al desarrollo regional mediante la implementación de tecnologías en telecomunicaciones que fomenten la interacción, el acceso a la información y, en general, los procesos de comunicación. Actualmente, la organización ofrece servicios de televisión por cable e internet de banda ancha a través de fibra óptica. Además, como parte de su compromiso con la responsabilidad social, CAPSOS produce y emite contenido audiovisual que promueve la cultura local y la formación de los ciudadanos.',
  },
  {
    title: 'MISIÓN',
    content:
      'Nuestra misión es conectar a Santa Rosa de Osos con el mundo mediante servicios confiables de internet de banda ancha y televisión internacional a través de redes de cable. Trabajamos para garantizar el acceso oportuno a la información y compartir los acontecimientos más representativos de la región, produciendo y difundiendo contenidos audiovisuales con enfoque social y de interés local. De esta manera, fortalecemos la cultura, promovemos la participación comunitaria y contribuimos a la formación y al bienestar de los ciudadanos.',
  },
  {
    title: 'VISIÓN',
    content:
      'Nuestra visión es consolidar a Capsos Telecomunicaciones como una organización empresarial sin ánimo de lucro, autosostenible y reconocida por ofrecer diferentes servicios de telecomunicaciones con altos estándares de calidad. Buscamos avanzar técnicamente, fortalecer una estructura y contar con un equipo humano capacitado profesionalmente. Asimismo, aspiramos a desarrollar nuevos modelos de producción y distribución de televisión propia en Antioquia y Colombia, contribuyendo al progreso social de Santa Rosa de Osos y al mejoramiento de la calidad de vida de sus habitantes.',
  },
];

export const principles = [
  {
    title: 'PRINCIPIOS',
    content:
      'Capsos Telecomunicaciones, fundada en 1994, se ha consolidado como un referente en conectividad y entretenimiento. Ofrecemos Internet de alta velocidad por Fibra Óptica, Televisión por suscripción y un Canal Local, asegurando calidad e innovación. Nuestra misión es proporcionar soluciones tecnológicas eficientes y confiables, adaptadas a las necesidades del mercado y de la comunidad. Creemos en la conectividad como motor de desarrollo, por eso invertimos continuamente en infraestructura y tecnología para ofrecer un servicio estable, seguro y de alto rendimiento.',
  },
  {
    title: 'SERVICIO',
    content:
      'Capsos Telecomunicaciones ofrece soluciones avanzadas en telecomunicaciones, priorizando la calidad del servicio al cliente. Garantizamos atención personalizada y eficiente, respaldada por un equipo altamente capacitado que responde con rapidez y eficacia. La inmediatez es clave, por lo que optimizamos cada proceso, desde instalaciones hasta soporte técnico. Nos enfocamos en minimizar tiempos de respuesta ante cualquier inconveniente, asegurando continuidad y estabilidad en nuestros servicios. Implementamos protocolos eficientes para resolver incidencias de manera proactiva, brindando a nuestros clientes una experiencia confiable y sin interrupciones.',
  },
  {
    title: 'COMPROMISO',
    content:
      'En Capsos Telecomunicaciones, el compromiso es la base de nuestra identidad. Más que prestar servicios, construimos relaciones de confianza, transparencia y responsabilidad social. Priorizamos el bienestar de clientes y empleados, garantizando calidad, eficiencia y atención personalizada. Nos esforzamos por ofrecer soluciones innovadoras y accesibles, entendiendo las necesidades individuales de cada usuario. Optimizamos nuestros procesos para brindar un servicio fluido, desde la instalación hasta el soporte postventa, asegurando una experiencia confiable y mejorando la calidad de vida de nuestros clientes.',
  },
  {
    title: 'CALIDAD',
    content:
      'En Capsos Telecomunicaciones, la calidad es nuestra prioridad. Nos enfocamos en la mejora continua, innovando y optimizando nuestros servicios para superar las expectativas de nuestros clientes. Verificamos constantemente la eficiencia de nuestras soluciones, asegurando estabilidad y confianza. Implementamos estrategias para adaptarnos a los avances tecnológicos, brindando experiencias óptimas y personalizadas. No solo ofrecemos servicios, sino que nos convertimos en aliados estratégicos en conectividad y entretenimiento, garantizando excelencia, eficiencia y compromiso en cada interacción.',
  },
  {
    title: 'RESPETO',
    content:
      'En Capsos Telecomunicaciones, el respeto es la base de nuestra relación con clientes y colaboradores. Nos comprometemos a superar expectativas a través de la innovación, la excelencia y la mejora continua. Garantizamos servicios confiables mediante un monitoreo constante y procesos de optimización. Evolucionamos junto a las necesidades de nuestros usuarios, fortaleciendo nuestra infraestructura y ofreciendo soluciones personalizadas. Fomentamos una cultura organizacional basada en la cercanía, la confianza y la atención de calidad, asegurando que cada cliente reciba un servicio adaptado a sus necesidades.',
  },
  {
    title: 'RESPONSABILIDAD',
    content:
      'En Capsos Telecomunicaciones, asumimos la responsabilidad de generar un impacto positivo en la comunidad. Más allá de brindar servicios de telecomunicaciones, impulsamos el desarrollo social y económico a través de empleo, infraestructura y acceso a la conectividad. Nuestra inversión en tecnología fortalece la competitividad local y abre oportunidades para empresas, emprendedores y hogares. A través de nuestra oferta de Internet de Fibra Óptica, Televisión por suscripción y Canal Local, promovemos la educación, la información y la identidad cultural, consolidándonos como un aliado estratégico en el progreso de nuestra región.',
  },
];

export const qualityItems = [
  {
    title: 'Compromiso con nuestros invitados',
    content:
      'En Capsos Telecomunicaciones, estamos comprometidos en entregar servicios como internet, parabólica y un canal de alta calidad.',
  },
  {
    title: '1. Compromiso con la calidad',
    content:
      'En Capsos Telecomunicaciones, estamos comprometidos en entregar servicios de internet banda ancha, televisión por cable y contenidos audiovisuales pertinentes al contexto y de la más alta calidad a nuestra comunidad. Nos esforzamos por cumplir y superar las expectativas de nuestros asociados, usuarios y televidentes de manera confiable, segura y eficiente. Nuestras redes son 100% estructuradas y diseñadas bajo principios de ingeniería actual, además de contar con materiales y tecnología de última generación.',
  },
  {
    title: '2. Satisfacción de la comunidad',
    content:
      'Nuestros asociados, usuarios y televidentes son nuestra máxima prioridad. Nos comprometemos a entender sus necesidades y expectativas, y a buscar soluciones que cumplan con sus requerimientos. Valoramos las sugerencias y comentarios como un insumo para mejorar continuamente nuestros servicios.',
  },
  {
    title: '3. Mejora continua',
    content:
      'En Capsos Telecomunicaciones nos esforzamos por mejorar constantemente nuestros procesos, tecnologías y servicios, así mismo nos capacitamos para fomentar la innovación y la adopción de nuevas tecnologías para mantenernos a la vanguardia de la industria de las telecomunicaciones, con un enfoque regional, pero con estándares globales.',
  },
  {
    title: '4. Cumplimiento legal y normativo',
    content:
      'Durante 30 años, en Capsos Telecomunicaciones hemos cumplido con la normatividad y regulaciones aplicables a la prestación de nuestros servicios, así en 1994 recibimos nuestra personería jurídica, en el año 2000 nuestra licencia de TV comunitaria para la operación de TV, y actualmente hacemos parte del grupo Cable Mio para la operación de la TV por cable, y estamos habilitados con registro TIC por el Ministerio TIC para la prestación de servicios de telecomunicaciones como Internet Banda Ancha. Nos comprometemos a continuar al día y ajustar nuestras prácticas para cumplir con los requisitos legales en la medida que se vayan presentando cambios.',
  },
  {
    title: '5. Formación y desarrollo del personal',
    content:
      'Reconocemos que nuestro talento humano y colaboradores realizan un aporte invaluable, por ello proporcionamos formación continua, oportunidades de desarrollo para mejorar las habilidades y competencias de nuestros empleados y nos esforzamos en proporcionar un ambiente de trabajo respetuoso, que enaltezca la dignidad humana, con comunicación asertiva y en el que se desarrolla constantemente el trabajo en equipo.',
  },
  {
    title: '6. Gestión de adquisiciones',
    content:
      'Gestionamos y monitoreamos los insumos y materiales para adquirir productos y servicios que cumplan con nuestros estándares de calidad. Establecemos relaciones de cooperación con instituciones, entidades y establecimientos del municipio para maximizar la adquisición de bienes y servicios de la zona y así dinamizar la economía local.',
  },
  {
    title:
      '7. Responsabilidad social y comunicación transparente',
    content:
      'Mantenemos una comunicación abierta y transparente con la comunidad, sus representantes, colaboradores, empleados, instituciones y asociados, así como el compromiso de aportar a la construcción de una sociedad cívica desde el respeto, la promoción de los valores de nuestra cultura y el fortalecimiento de nuestra idiosincrasia santarrosana.',
  },
  {
    title: '8. Revisión y actualización',
    content:
      'La presente política de calidad se revisa periódicamente para asegurar su pertinencia y efectividad. Estamos comprometidos con la mejora continua y ajustaremos esta política según sea necesario para cumplir con nuestros objetivos de calidad.',
  },
];

export const projections = [
  {
    number: '01',
    title: 'Primera línea de proyección',
    content:
      'Servicio de Televisión por Cable: Conectividad a través de Fibra Óptica: Brindamos a nuestros asociados acceso a una red de cable convergente, capaz de transmitir múltiples formatos de información, incluyendo señal de televisión analógica, digital y servicios adicionales. Nuestra parrilla de programación ofrece más de 80 canales de diversas temáticas y géneros, pensada para satisfacer las necesidades de información, educación y entretenimiento de nuestros usuarios. El servicio está disponible mediante un aporte mensual por parte de los asociados, en cumplimiento con la normativa vigente.',
  },
  {
    number: '02',
    title: 'Segunda línea de proyección',
    content:
      'Conectividad a través de Fibra Óptica: Mediante el despliegue de modernas redes de fibra óptica en el municipio, transportamos datos de forma eficiente y ofrecemos servicios de conectividad de banda ancha con altos estándares de calidad. Esta infraestructura nos permite proyectar y desarrollar soluciones tecnológicas alineadas con los desafíos y oportunidades de la Cuarta Revolución Industrial, facilitando el acceso a nuevas aplicaciones, servicios inteligentes y avances en transformación digital.',
  },
  {
    number: '03',
    title: 'Tercera línea de proyección',
    content:
      'Producción Audiovisual Comunitaria – CAPSOS TV: A través del canal de producción propia CAPSOS TV, promovemos espacios de comunicación que reflejan la identidad cultural, la historia y la vida cotidiana de Santa Rosa de Osos. Este medio comunitario fortalece la memoria audiovisual del municipio, da voz a sus habitantes y fomenta la participación ciudadana. Con contenidos locales, CAPSOS TV actúa como una alternativa a los medios masivos, impulsando el desarrollo desde una perspectiva comunitaria.',
  },
];
