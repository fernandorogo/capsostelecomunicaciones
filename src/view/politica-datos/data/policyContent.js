export const POLICY_CONTENT = {
  'identificacion-responsable': [
    {
      type: 'paragraph',
      text: 'El responsable del tratamiento de los datos personales es:',
    },
    {
      type: 'infoGrid',
      items: [
        { label: 'Responsable', value: '{responsibleName}' },
        { label: 'NIT', value: '{companyNit}' },
        { label: 'Domicilio', value: '{companyAddress}' },
        { label: 'Correo para solicitudes', value: '{privacyEmail}' },
        { label: 'Teléfono', value: '{companyPhone}' },
        { label: 'Área responsable', value: '{responsibleArea}' },
      ],
    },
  ],

  objetivo: [
    {
      type: 'paragraph',
      text: 'La presente política tiene como objetivo establecer los criterios, procedimientos, responsabilidades y condiciones institucionales para el tratamiento y la protección de los datos personales recolectados por {companyName}.',
    },
    {
      type: 'paragraph',
      text: 'También busca garantizar que los titulares conozcan las finalidades del tratamiento, los derechos que les asisten y los canales disponibles para ejercerlos.',
    },
  ],

  alcance: [
    {
      type: 'paragraph',
      text: 'Esta política aplica a los datos personales contenidos en bases de datos, archivos, documentos y sistemas administrados por {companyName}.',
    },
    {
      type: 'paragraph',
      text: 'Comprende información relacionada con:',
    },
    {
      type: 'list',
      items: [
        'Clientes y usuarios.',
        'Suscriptores de servicios.',
        'Solicitantes y comunidad general.',
        'Empleados y aspirantes.',
        'Contratistas y proveedores.',
        'Representantes legales.',
        'Aliados y terceros relacionados.',
        'Personas que utilicen los canales digitales o de atención.',
      ],
    },
    {
      type: 'paragraph',
      text: 'La política es de obligatorio cumplimiento para las personas que intervengan en la recolección, almacenamiento, consulta, modificación, uso, circulación, transferencia, transmisión o eliminación de información personal.',
    },
  ],

  definiciones: [
    { type: 'definitions' },
  ],

  principios: [
    {
      type: 'paragraph',
      text: 'El tratamiento de datos personales se realizará conforme a los siguientes principios:',
    },
    {
      type: 'list',
      items: [
        'Legalidad: el tratamiento estará sujeto a la legislación aplicable.',
        'Finalidad: los datos serán tratados para propósitos legítimos e informados al titular.',
        'Libertad: el tratamiento requerirá consentimiento previo, expreso e informado, salvo las excepciones legales.',
        'Veracidad: la información deberá ser completa, exacta, actualizada, comprobable y comprensible.',
        'Transparencia: el titular podrá obtener información sobre la existencia y uso de sus datos.',
        'Acceso restringido: la información no estará disponible de manera indiscriminada.',
        'Seguridad: se adoptarán medidas para evitar pérdida, alteración, consulta o acceso no autorizado.',
        'Confidencialidad: las personas que intervengan en el tratamiento deberán mantener reserva sobre la información.',
      ],
    },
  ],

  'datos-tratados': [
    {
      type: 'paragraph',
      text: 'Dependiendo de la relación con el titular, podrán tratarse las siguientes categorías de información:',
    },
    { type: 'dataCategories' },
  ],

  finalidades: [
    {
      type: 'paragraph',
      text: 'Los datos personales podrán ser tratados para las siguientes finalidades:',
    },
    { type: 'purposes' },
    {
      type: 'alert',
      icon: 'fa-circle-info',
      variant: 'info',
      text: 'El envío de publicidad, promociones o campañas comerciales se realizará únicamente cuando exista una autorización válida o una base legal que lo permita.',
    },
  ],

  autorizacion: [
    {
      type: 'paragraph',
      text: 'Cuando resulte necesaria, la autorización será obtenida antes o al momento de recolectar los datos personales.',
    },
    {
      type: 'paragraph',
      text: 'La autorización podrá obtenerse mediante:',
    },
    {
      type: 'list',
      items: [
        'Documentos físicos.',
        'Formularios electrónicos.',
        'Casillas de aceptación.',
        'Correos electrónicos.',
        'Mensajes de datos.',
        'Grabaciones autorizadas.',
        'Conductas inequívocas que permitan concluir razonablemente que el titular autorizó el tratamiento.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Antes de otorgar la autorización, el titular será informado sobre:',
    },
    {
      type: 'list',
      items: [
        'El tratamiento que se realizará.',
        'Las finalidades correspondientes.',
        'El carácter facultativo de responder preguntas sobre datos sensibles o datos de menores.',
        'Los derechos que le asisten.',
        'La identificación y los canales del responsable.',
      ],
    },
    {
      type: 'paragraph',
      text: 'La autorización y la evidencia de su otorgamiento podrán conservarse por medios físicos o electrónicos.',
    },
  ],

  'datos-sensibles': [
    {
      type: 'paragraph',
      text: 'El suministro de datos sensibles es facultativo, salvo que exista una obligación legal o que resulten indispensables para una finalidad legítima expresamente informada.',
    },
    {
      type: 'paragraph',
      text: 'Cuando sea necesario tratar datos sensibles:',
    },
    {
      type: 'list',
      items: [
        'Se informará al titular que no está obligado a autorizar su tratamiento.',
        'Se identificarán claramente los datos considerados sensibles.',
        'Se informará la finalidad específica.',
        'Se solicitará consentimiento expreso cuando corresponda.',
        'Se aplicarán controles reforzados de seguridad y confidencialidad.',
      ],
    },
  ],

  menores: [
    {
      type: 'paragraph',
      text: 'El tratamiento de datos personales de niños, niñas y adolescentes respetará sus derechos prevalentes y su interés superior.',
    },
    {
      type: 'paragraph',
      text: 'Cuando resulte procedente:',
    },
    {
      type: 'list',
      items: [
        'Se verificará que el tratamiento responda al interés superior del menor.',
        'Se garantizará el respeto de sus derechos fundamentales.',
        'Se solicitará autorización del representante legal.',
        'Se tendrá en cuenta la opinión del menor de acuerdo con su edad, madurez y capacidad para comprender el tratamiento.',
      ],
    },
  ],

  derechos: [
    {
      type: 'paragraph',
      text: 'Los titulares de datos personales podrán ejercer los siguientes derechos:',
    },
    { type: 'holderRights' },
  ],

  deberes: [
    {
      type: 'paragraph',
      text: 'En su calidad de responsable del tratamiento, {companyName} deberá:',
    },
    {
      type: 'list',
      items: [
        'Garantizar el ejercicio de los derechos de los titulares.',
        'Solicitar y conservar copia de la autorización cuando sea requerida.',
        'Informar las finalidades del tratamiento.',
        'Conservar la información bajo condiciones adecuadas de seguridad.',
        'Mantener la información actualizada, completa y comprensible.',
        'Rectificar los datos cuando sean incorrectos.',
        'Tramitar oportunamente consultas y reclamos.',
        'Informar al encargado cuando un dato se encuentre en discusión.',
        'Informar al titular sobre el uso dado a sus datos cuando lo solicite.',
        'Adoptar procedimientos internos para garantizar el cumplimiento de esta política.',
        'Cumplir las instrucciones de la autoridad de protección de datos.',
      ],
    },
  ],

  circulacion: [
    {
      type: 'paragraph',
      text: 'Los datos personales podrán ser compartidos únicamente cuando resulte necesario, esté autorizado o exista una obligación legal.',
    },
    {
      type: 'paragraph',
      text: 'La información podrá ser entregada a:',
    },
    {
      type: 'list',
      items: [
        'El titular o sus representantes.',
        'Autoridades administrativas, judiciales o regulatorias competentes.',
        'Proveedores tecnológicos o encargados que apoyen la operación.',
        'Entidades financieras, contables, tributarias o de pago cuando resulte necesario.',
        'Aliados o contratistas vinculados con la prestación del servicio.',
        'Terceros autorizados por el titular.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Los encargados deberán tratar la información conforme a las instrucciones impartidas por el responsable y aplicar medidas apropiadas de confidencialidad y seguridad.',
    },
    {
      type: 'paragraph',
      text: 'Las transferencias internacionales se realizarán conforme a los requisitos, excepciones y garantías establecidos por la legislación aplicable.',
    },
  ],

  seguridad: [
    {
      type: 'paragraph',
      text: '{companyName} adoptará medidas administrativas, técnicas y organizacionales razonables para reducir los riesgos relacionados con:',
    },
    {
      type: 'list',
      items: [
        'Pérdida de información.',
        'Alteración no autorizada.',
        'Consulta indebida.',
        'Divulgación no permitida.',
        'Acceso fraudulento.',
        'Suplantación de identidad.',
        'Uso contrario a las finalidades.',
        'Incidentes de seguridad.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Entre las medidas aplicables podrán encontrarse:',
    },
    {
      type: 'list',
      items: [
        'Controles de acceso.',
        'Contraseñas y autenticación.',
        'Copias de seguridad.',
        'Actualización de sistemas.',
        'Restricción de privilegios.',
        'Acuerdos de confidencialidad.',
        'Gestión de incidentes.',
        'Capacitación del personal autorizado.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Ningún sistema ofrece seguridad absoluta. Sin embargo, se aplicarán controles proporcionales a la naturaleza de la información y a los riesgos identificados.',
    },
  ],

  'canales-digitales': [
    {
      type: 'paragraph',
      text: 'Al utilizar el sitio web o los canales digitales, podrán generarse datos técnicos necesarios para su funcionamiento, seguridad, diagnóstico y mejoramiento.',
    },
    {
      type: 'paragraph',
      text: 'El portal podrá incorporar enlaces, botones o componentes de servicios externos como redes sociales, plataformas de mensajería y proveedores tecnológicos.',
    },
    {
      type: 'paragraph',
      text: 'Cuando el usuario interactúe con un servicio externo, el tercero podrá tratar información conforme a sus propias políticas y condiciones.',
    },
    {
      type: 'paragraph',
      text: 'Se recomienda revisar las políticas de privacidad de los servicios externos antes de suministrar información o utilizar sus funcionalidades.',
    },
  ],

  consultas: [
    {
      type: 'paragraph',
      text: 'El titular, sus causahabientes, representantes o personas autorizadas podrán consultar la información personal que repose en las bases de datos.',
    },
    {
      type: 'paragraph',
      text: 'La consulta deberá contener como mínimo:',
    },
    {
      type: 'list',
      items: [
        'Nombre e identificación del solicitante.',
        'Datos de contacto para recibir respuesta.',
        'Descripción clara de la información solicitada.',
        'Documentos que acrediten la calidad en la que actúa, cuando corresponda.',
      ],
    },
    {
      type: 'alert',
      icon: 'fa-clock',
      variant: 'info',
      text: 'Las consultas serán atendidas en un término máximo de diez días hábiles contados desde su recepción.',
    },
    {
      type: 'paragraph',
      text: 'Cuando no sea posible atender la consulta dentro de ese término, se informarán las razones de la demora y la nueva fecha de respuesta. El término adicional no podrá superar cinco días hábiles.',
    },
    {
      type: 'paragraph',
      text: 'Las consultas podrán presentarse mediante el correo {privacyEmail} o a través de los canales institucionales habilitados.',
    },
  ],

  reclamos: [
    {
      type: 'paragraph',
      text: 'El titular podrá presentar un reclamo cuando considere que la información debe ser corregida, actualizada o eliminada, o cuando advierta un posible incumplimiento de las normas de protección de datos.',
    },
    {
      type: 'paragraph',
      text: 'El reclamo deberá contener:',
    },
    {
      type: 'list',
      items: [
        'Identificación del titular o solicitante.',
        'Descripción clara de los hechos que dan lugar al reclamo.',
        'Dirección o medio para recibir respuesta.',
        'Documentos que soporten la solicitud, cuando sean necesarios.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Cuando el reclamo esté incompleto, se solicitará su corrección dentro de los cinco días siguientes a su recepción.',
    },
    {
      type: 'paragraph',
      text: 'Si transcurren dos meses desde el requerimiento sin que el solicitante aporte la información, se entenderá que ha desistido del reclamo.',
    },
    {
      type: 'alert',
      icon: 'fa-clock',
      variant: 'info',
      text: 'El término máximo para atender el reclamo será de quince días hábiles contados desde el día siguiente a su recepción completa.',
    },
    {
      type: 'paragraph',
      text: 'Cuando no sea posible responder dentro de ese término, se informarán las razones y la nueva fecha de respuesta. El término adicional no podrá superar ocho días hábiles.',
    },
    {
      type: 'paragraph',
      text: 'Una vez recibido un reclamo completo, se incluirá en la base de datos la anotación correspondiente mientras se adopta una decisión.',
    },
  ],

  supresion: [
    {
      type: 'paragraph',
      text: 'El titular podrá solicitar la revocatoria de la autorización o la supresión de sus datos cuando:',
    },
    {
      type: 'list',
      items: [
        'Considere que el tratamiento no respeta los principios, derechos o garantías aplicables.',
        'Los datos ya no sean necesarios para la finalidad informada.',
        'Haya finalizado la relación que dio origen al tratamiento y no exista deber de conservación.',
      ],
    },
    {
      type: 'paragraph',
      text: 'La supresión o revocatoria no procederá cuando exista una obligación legal, contractual, contable, tributaria, administrativa o judicial que requiera conservar la información.',
    },
    {
      type: 'paragraph',
      text: 'La revocatoria podrá ser total o estar limitada a determinadas finalidades.',
    },
  ],

  conservacion: [
    {
      type: 'paragraph',
      text: 'Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades informadas y las obligaciones legales, regulatorias, contables, tributarias, contractuales o judiciales aplicables.',
    },
    {
      type: 'paragraph',
      text: 'Finalizado el período de conservación, la información podrá:',
    },
    {
      type: 'list',
      items: [
        'Ser eliminada de forma segura.',
        'Ser anonimizada.',
        'Ser conservada de manera restringida cuando exista un deber legal.',
      ],
    },
    {
      type: 'paragraph',
      text: 'La duración de cada base de datos estará relacionada con la finalidad para la cual fue creada y con los períodos de conservación obligatorios.',
    },
  ],

  actualizaciones: [
    {
      type: 'paragraph',
      text: 'La política podrá modificarse cuando cambien:',
    },
    {
      type: 'list',
      items: [
        'Las finalidades del tratamiento.',
        'Los procesos institucionales.',
        'Los canales de atención.',
        'Las tecnologías utilizadas.',
        'Los riesgos de seguridad.',
        'La legislación o regulación aplicable.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Las modificaciones sustanciales que afecten el contenido de la autorización serán comunicadas a los titulares por un medio adecuado.',
    },
    {
      type: 'paragraph',
      text: 'La versión vigente estará publicada en el sitio web institucional e indicará su fecha de actualización.',
    },
  ],

  vigencia: [
    {
      type: 'infoGrid',
      items: [
        { label: 'Versión', value: '{documentVersion}' },
        { label: 'Entrada en vigencia', value: '{effectiveDate}' },
        { label: 'Última actualización', value: '{lastUpdated}' },
        { label: 'Vigencia de las bases', value: 'Durante el tiempo necesario para cumplir sus finalidades y las obligaciones aplicables' },
      ],
    },
  ],

  'marco-normativo': [
    {
      type: 'paragraph',
      text: 'Esta política se interpreta y aplica de acuerdo con la legislación colombiana vigente, especialmente:',
    },
    {
      type: 'list',
      items: [
        'Constitución Política de Colombia, artículo 15.',
        'Ley Estatutaria 1581 de 2012.',
        'Decreto 1074 de 2015, Decreto Único Reglamentario del Sector Comercio, Industria y Turismo.',
        'Ley 1266 de 2008, cuando resulte aplicable al tratamiento de información financiera, crediticia, comercial o de servicios.',
        'Instrucciones y circulares expedidas por la Superintendencia de Industria y Comercio.',
        'Normas que modifiquen, adicionen, reglamenten o sustituyan las anteriores.',
      ],
    },
    {
      type: 'paragraph',
      text: 'En caso de contradicción entre esta política y una norma obligatoria, prevalecerá la disposición legal o regulatoria aplicable.',
    },
  ],
};
