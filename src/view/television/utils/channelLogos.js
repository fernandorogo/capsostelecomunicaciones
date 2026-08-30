/*
|--------------------------------------------------------------------------
| NORMALIZAR TEXTO
|--------------------------------------------------------------------------
*/

const normalizeChannelName = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();


/*
|--------------------------------------------------------------------------
| TEXTO COMPACTO
|--------------------------------------------------------------------------
|
| "Señal Colombia"
|
| se convierte en:
|
| "senalcolombia"
|
|--------------------------------------------------------------------------
*/

const compactChannelName = (value = '') =>
  normalizeChannelName(value)
    .replace(/\s+/g, '');


/*
|--------------------------------------------------------------------------
| LIMPIAR NOMBRE DEL ARCHIVO
|--------------------------------------------------------------------------
|
| Ejemplos:
|
| 21.ESPN_wordmark.webp
|      ↓
| espn
|
| 12.Señal_Colombia_logo.webp
|      ↓
| senal colombia
|
| 38.Star_Channel_2021.webp
|      ↓
| star channel
|
|--------------------------------------------------------------------------
*/

const cleanLogoFileName = (fileName = '') => {

  let value = String(fileName);


  /*
  |--------------------------------------------------------------------------
  | QUITAR EXTENSIÓN
  |--------------------------------------------------------------------------
  */

  value = value.replace(/\.webp$/i, '');


  /*
  |--------------------------------------------------------------------------
  | QUITAR NÚMERO DEL PRINCIPIO
  |--------------------------------------------------------------------------
  |
  | 21.ESPN
  | 22.ESPN2
  | 107.Canal CNC
  |
  |--------------------------------------------------------------------------
  */

  value = value.replace(/^\d+\s*[.\-_]?\s*/i, '');


  /*
  |--------------------------------------------------------------------------
  | QUITAR NÚMEROS ENTRE PARÉNTESIS AL FINAL
  |--------------------------------------------------------------------------
  |
  | RCN_logo_(2)
  |
  |--------------------------------------------------------------------------
  */

  value = value.replace(/\(\s*\d+\s*\)$/i, '');


  /*
  |--------------------------------------------------------------------------
  | NORMALIZAR
  |--------------------------------------------------------------------------
  */

  value = normalizeChannelName(value);


  /*
  |--------------------------------------------------------------------------
  | QUITAR PALABRAS QUE DESCRIBEN EL ARCHIVO,
  | PERO NO EL CANAL
  |--------------------------------------------------------------------------
  */

  value = value
    .replace(/\bwordmark\b/g, ' ')
    .replace(/\blogo\b/g, ' ')
    .replace(/\blogos\b/g, ' ')
    .replace(/\bcorporativo\b/g, ' ')
    .replace(/\bfondo\b/g, ' ')
    .replace(/\btransparente\b/g, ' ')
    .replace(/\bcopia\b/g, ' ')
    .replace(/\bpng\b/g, ' ')
    .replace(/\bsvg\b/g, ' ')
    .replace(/\bblanco\b/g, ' ')
    .replace(/\bonline\b/g, ' ')
    .replace(/\ben vivo\b/g, ' ')
    .replace(/\b19\d{2}\b/g, ' ')
    .replace(/\b20\d{2}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();


  return value;

};


/*
|--------------------------------------------------------------------------
| CARGAR LOGOS
|--------------------------------------------------------------------------
|
| channelLogos.js:
|
| src/view/television/utils/channelLogos.js
|
| logos:
|
| src/assets/logosCanales
|
|--------------------------------------------------------------------------
*/

const logosContext = require.context(
  '../../../assets/logosCanales',
  false,
  /\.webp$/i
);


/*
|--------------------------------------------------------------------------
| CREAR LISTADO DE LOGOS
|--------------------------------------------------------------------------
*/

const LOGO_ENTRIES = logosContext.keys().map((logoPath) => {

  const importedLogo = logosContext(logoPath);


  /*
  |--------------------------------------------------------------------------
  | URL GENERADA POR WEBPACK
  |--------------------------------------------------------------------------
  */

  const url =
    typeof importedLogo === 'string'
      ? importedLogo
      : importedLogo?.default || importedLogo;


  /*
  |--------------------------------------------------------------------------
  | NOMBRE REAL DEL ARCHIVO
  |--------------------------------------------------------------------------
  */

  const fileName = logoPath
    .replace(/^\.\//, '')
    .replace(/\.webp$/i, '');


  /*
  |--------------------------------------------------------------------------
  | QUITAR NÚMERO INICIAL
  |--------------------------------------------------------------------------
  */

  const withoutInitialNumber = fileName
    .replace(/^\d+\s*[.\-_]?\s*/i, '');


  /*
  |--------------------------------------------------------------------------
  | VERSIONES DEL NOMBRE
  |--------------------------------------------------------------------------
  */

  const normalized =
    normalizeChannelName(withoutInitialNumber);


  const compact =
    compactChannelName(withoutInitialNumber);


  const cleaned =
    cleanLogoFileName(fileName);


  const cleanedCompact =
    compactChannelName(cleaned);


  return {

    path: logoPath,

    fileName,

    normalized,

    compact,

    cleaned,

    cleanedCompact,

    url

  };

});


/*
|--------------------------------------------------------------------------
| ALIAS
|--------------------------------------------------------------------------
|
| Sirve para relacionar el nombre mostrado en la página con nombres
| diferentes utilizados en los archivos.
|
|--------------------------------------------------------------------------
*/

const CHANNEL_ALIASES = {

  /*
  |--------------------------------------------------------------------------
  | DEPORTES
  |--------------------------------------------------------------------------
  */

  espn: [
    'espn',
    'espn wordmark'
  ],

  'espn 2': [
    'espn2',
    'espn 2'
  ],

  'espn 3': [
    'espn3',
    'espn 3'
  ],

  'espn 4': [
    'espn4',
    'espn 4'
  ],

  'espn 5': [
    'espn5',
    'espn 5'
  ],

  'espn 6': [
    'espn6',
    'espn 6'
  ],

  'espn 7': [
    'espn7',
    'espn 7'
  ],


  /*
  |--------------------------------------------------------------------------
  | NACIONALES
  |--------------------------------------------------------------------------
  */

  rcn: [
    'rcn'
  ],

  'rcn hd2': [
    'rcn hd2',
    'rcnhd2'
  ],

  caracol: [
    'caracol',
    'caracol television'
  ],

  'caracol hd2': [
    'caracol hd2',
    'caracolhd2'
  ],

  'caracol 2': [
    'caracol 2',
    'caracol2',
    'caracol'
  ],

  'canal uno': [
    'canal uno',
    'canal 1'
  ],

  'canal 1': [
    'canal 1',
    'canal uno'
  ],

  telemedellin: [
    'telemedellin'
  ],

  teleantioquia: [
    'teleantioquia'
  ],

  'teleantioquia go': [
    'teleantioquia go',
    'teleantioquiago'
  ],

  'canal institucional': [
    'senal institucional',
    'canal institucional'
  ],

  'city tv': [
    'city tv',
    'citytv',
    'city tv bogota'
  ],

  citytv: [
    'city tv',
    'citytv',
    'city tv bogota'
  ],

  zoom: [
    'canal zoom',
    'zoom'
  ],

  congreso: [
    'canal congreso',
    'congreso'
  ],

  'canal congreso': [
    'canal congreso',
    'congreso'
  ],

  cosmovision: [
    'cosmovision'
  ],

  'senal colombia': [
    'senal colombia'
  ],

  'canal capital': [
    'canal capital'
  ],

  telecafe: [
    'telecafe'
  ],

  telepacifico: [
    'telepacifico'
  ],

  'canal tro': [
    'canal tro'
  ],

  'canal trece': [
    'canal trece'
  ],

  teleisla: [
    'teleisla',
    'teleislas'
  ],

  cnc: [
    'cnc',
    'canal cnc'
  ],

  telecaribe: [
    'telecaribe'
  ],

  'tv agro': [
    'tv agro'
  ],


  /*
  |--------------------------------------------------------------------------
  | DOCUMENTALES
  |--------------------------------------------------------------------------
  */

  'love nature': [
    'love nature'
  ],

  'discovery channel': [
    'discovery channel'
  ],

  'animal planet': [
    'animal planet'
  ],

  natgeo: [
    'national geographic',
    'nat geo',
    'natgeo'
  ],

  'nat geo': [
    'national geographic',
    'nat geo',
    'natgeo'
  ],

  'discovery h and h': [
    'discovery home and health',
    'discovery home health',
    'discovery h and h'
  ],

  'investigation discovery': [
    'investigation discovery',
    'investigationdiscovery'
  ],

  'discovery id': [
    'investigation discovery',
    'investigationdiscovery',
    'discovery id'
  ],

  hgtv: [
    'hgtv us',
    'hgtv'
  ],

  'food network': [
    'food network'
  ],

  food: [
    'food network',
    'food'
  ],

  'discovery science': [
    'discovery science channel',
    'discovery science'
  ],

  'discovery turbo': [
    'discovery turbo'
  ],

  turbo: [
    'discovery turbo',
    'turbo'
  ],

  history: [
    'history'
  ],

  'history 2': [
    'history 2',
    'history2'
  ],


  /*
  |--------------------------------------------------------------------------
  | INFANTILES
  |--------------------------------------------------------------------------
  */

  'discovery kids': [
    'discovery kids'
  ],

  'disney channel': [
    'disney channel'
  ],

  'disney junior': [
    'disney junior'
  ],

  'baby tv': [
    'babytv',
    'baby tv'
  ],

  plimplim: [
    'plim plim',
    'plimplim'
  ],

  'baby first': [
    'babyfirst tv',
    'baby first',
    'babyfirst'
  ],

  'canal infantil': [
    'canal infantil'
  ],

  'cartoon network': [
    'cartoon network'
  ],

  cartoonito: [
    'cartoonito'
  ],

  'adult swim': [
    'adult swim'
  ],

  dreamworks: [
    'dreamworks channel',
    'dreamworks'
  ],

  tooncast: [
    'tooncast'
  ],


  /*
  |--------------------------------------------------------------------------
  | RELIGIÓN
  |--------------------------------------------------------------------------
  */

  televid: [
    'tele vid',
    'televid'
  ],

  teleamiga: [
    'canal teleamiga',
    'teleamiga'
  ],

  ewtn: [
    'ewtn'
  ],

  sjtv: [
    'sjtv',
    'ejtv'
  ],

  enlace: [
    'enlace television',
    'enlace'
  ],

  'canal luz': [
    'canal la luz',
    'canal luz'
  ],

  cristovision: [
    'cristovision'
  ],

  mariavision: [
    'mariavision'
  ],

  'maria vision': [
    'mariavision'
  ],

  'sophia tv': [
    'sophia tv'
  ],


  /*
  |--------------------------------------------------------------------------
  | MÚSICA
  |--------------------------------------------------------------------------
  */

  'la kalle': [
    'la kalle'
  ],

  'mi musica salsa': [
    'mi musica salsa'
  ],

  'mi musica popular': [
    'mi musica popular'
  ],

  'mi musica romantica': [
    'mi musica romantica'
  ],

  'mi musica reggaeton': [
    'mi musica reggaeton'
  ],

  'mi musica urbana': [
    'mi musica urbana'
  ],

  telenostalgia: [
    'telenostalgia'
  ],

  'rumba tv': [
    'rumba tv'
  ],

  'tv musical': [
    'tv musical'
  ],

  htv: [
    'htv'
  ],


  /*
  |--------------------------------------------------------------------------
  | CINE / SERIES
  |--------------------------------------------------------------------------
  */

  fx: [
    'fx international',
    'fx'
  ],

  'star channel': [
    'star channel'
  ],

  'tnt series': [
    'tnt series'
  ],

  tnt: [
    'tnt'
  ],

  'tnt novelas': [
    'tnt novelas'
  ],

  space: [
    'space'
  ],

  'sony channel': [
    'sony channel'
  ],

  'sony movies': [
    'sony movies'
  ],

  axn: [
    'axn'
  ],

  'universal tv': [
    'universal tv'
  ],

  universal: [
    'universal tv',
    'universal'
  ],

  'studio universal': [
    'studio universal'
  ],

  'cine familiar': [
    'cine familiar'
  ],

  'cine espanol': [
    'cine hispano',
    'cine espanol'
  ],

  'cine canal': [
    'cinecanal la',
    'cinecanal',
    'cine canal'
  ],

  'cinema +': [
    'cinema plus',
    'cinema'
  ],

  amc: [
    'amc'
  ],

  'a and e': [
    'a and e network',
    'a and e'
  ],

  tlc: [
    'tlc'
  ],

  usa: [
    'usa network',
    'usa'
  ],

  telemundo: [
    'telemundo'
  ],

  'life time': [
    'lifetime',
    'life time'
  ],

  dhe: [
    'canal dhe',
    'dhe'
  ],

  'e!': [
    'e'
  ],

  've plus': [
    've plus'
  ],

  pasiones: [
    'pasiones tv',
    'pasiones'
  ],

  sun: [
    'sun channel',
    'sun'
  ],

  'hogar tv': [
    'hogar tv'
  ],


  /*
  |--------------------------------------------------------------------------
  | NOTICIAS
  |--------------------------------------------------------------------------
  */

  ntn24: [
    'ntn24'
  ],

  'cable noticias': [
    'cable noticias'
  ],

  'cnn espanol': [
    'cnn en espanol',
    'cnn espanol'
  ],

  telesur: [
    'telesur'
  ]

};


/*
|--------------------------------------------------------------------------
| ENCONTRAR COINCIDENCIA EXACTA
|--------------------------------------------------------------------------
*/

const findExactLogo = (candidate = '') => {

  const normalizedCandidate =
    normalizeChannelName(candidate);


  const compactCandidate =
    compactChannelName(candidate);


  if (!normalizedCandidate) {

    return null;

  }


  const result = LOGO_ENTRIES.find((logo) =>

    logo.normalized === normalizedCandidate ||

    logo.compact === compactCandidate ||

    logo.cleaned === normalizedCandidate ||

    logo.cleanedCompact === compactCandidate

  );


  return result || null;

};


/*
|--------------------------------------------------------------------------
| ENCONTRAR COINCIDENCIA PARCIAL
|--------------------------------------------------------------------------
|
| Se usa después de intentar las coincidencias exactas.
|
|--------------------------------------------------------------------------
*/

const findPartialLogo = (candidate = '') => {

  const normalizedCandidate =
    normalizeChannelName(candidate);


  const compactCandidate =
    compactChannelName(candidate);


  if (
    !normalizedCandidate ||
    compactCandidate.length < 3
  ) {

    return null;

  }


  /*
  |--------------------------------------------------------------------------
  | PRIMERA OPCIÓN:
  | NOMBRE LIMPIO EMPIEZA EXACTAMENTE POR EL CANAL
  |--------------------------------------------------------------------------
  */

  let result = LOGO_ENTRIES.find((logo) => {

    if (!logo.cleanedCompact) {

      return false;

    }


    return (
      logo.cleanedCompact.startsWith(
        compactCandidate
      ) ||
      compactCandidate.startsWith(
        logo.cleanedCompact
      )
    );

  });


  if (result) {

    return result;

  }


  /*
  |--------------------------------------------------------------------------
  | SEGUNDA OPCIÓN:
  | EL NOMBRE CONTIENE LA CADENA COMPLETA
  |--------------------------------------------------------------------------
  */

  result = LOGO_ENTRIES.find((logo) => {

    if (!logo.cleanedCompact) {

      return false;

    }


    return (
      logo.cleanedCompact.includes(
        compactCandidate
      ) ||
      compactCandidate.includes(
        logo.cleanedCompact
      )
    );

  });


  return result || null;

};


/*
|--------------------------------------------------------------------------
| BUSCAR LOGO DEL CANAL
|--------------------------------------------------------------------------
*/

const findChannelLogo = (channelName = '') => {

  const normalized =
    normalizeChannelName(channelName);


  if (!normalized) {

    return null;

  }


  /*
  |--------------------------------------------------------------------------
  | 1. NOMBRE DIRECTO
  |--------------------------------------------------------------------------
  */

  let logo =
    findExactLogo(channelName);


  if (logo) {

    return logo.url;

  }


  /*
  |--------------------------------------------------------------------------
  | 2. ALIAS
  |--------------------------------------------------------------------------
  */

  const aliases =
    CHANNEL_ALIASES[normalized] || [];


  for (const alias of aliases) {

    logo = findExactLogo(alias);


    if (logo) {

      return logo.url;

    }

  }


  /*
  |--------------------------------------------------------------------------
  | 3. ALIAS CON COINCIDENCIA PARCIAL
  |--------------------------------------------------------------------------
  */

  for (const alias of aliases) {

    logo = findPartialLogo(alias);


    if (logo) {

      return logo.url;

    }

  }


  /*
  |--------------------------------------------------------------------------
  | 4. COINCIDENCIA PARCIAL DEL NOMBRE ORIGINAL
  |--------------------------------------------------------------------------
  */

  logo = findPartialLogo(channelName);


  if (logo) {

    return logo.url;

  }


  /*
  |--------------------------------------------------------------------------
  | 5. QUITAR HD / HD2 / HD3...
  |--------------------------------------------------------------------------
  */

  const withoutHd =
    normalized
      .replace(/\s+hd\s*\d*$/i, '')
      .trim();


  if (
    withoutHd &&
    withoutHd !== normalized
  ) {

    logo = findExactLogo(withoutHd);


    if (logo) {

      return logo.url;

    }


    logo = findPartialLogo(withoutHd);


    if (logo) {

      return logo.url;

    }

  }


  /*
  |--------------------------------------------------------------------------
  | NO ENCONTRADO
  |--------------------------------------------------------------------------
  |
  | Durante desarrollo mostramos en consola qué canal no encontró logo.
  |
  |--------------------------------------------------------------------------
  */

  if (
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'
  ) {

    console.warn(
      `[TV] No se encontró logo local para: ${channelName}`
    );

  }


  return null;

};


/*
|--------------------------------------------------------------------------
| COMPATIBILIDAD CON CÓDIGO ANTERIOR
|--------------------------------------------------------------------------
|
| La función permanece exportada para no romper imports anteriores.
|
|--------------------------------------------------------------------------
*/

export const getChannelLogoDomain = (
  channelName
) => {

  void channelName;

  return null;

};


/*
|--------------------------------------------------------------------------
| OBTENER LOGO
|--------------------------------------------------------------------------
|
| Esta función conserva el mismo nombre que ya estaba utilizando
| el componente ChannelLogo.
|
|--------------------------------------------------------------------------
*/

export const getChannelLogoUrl = (
  channelName,
  size = 128
) => {

  /*
  |--------------------------------------------------------------------------
  | size YA NO ES NECESARIO CON IMÁGENES LOCALES,
  | PERO LO CONSERVAMOS POR COMPATIBILIDAD
  |--------------------------------------------------------------------------
  */

  void size;


  return findChannelLogo(
    channelName
  );

};


/*
|--------------------------------------------------------------------------
| INICIALES
|--------------------------------------------------------------------------
|
| Se conserva el comportamiento que ya funcionaba.
|
|--------------------------------------------------------------------------
*/

export const getChannelInitials = (
  channelName = ''
) => {

  const words =
    String(channelName)
      .replace(
        /[^\p{L}\p{N}]+/gu,
        ' '
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  if (!words.length) {

    return 'TV';

  }


  if (words.length === 1) {

    return words[0]
      .slice(0, 3)
      .toUpperCase();

  }


  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

};


/*
|--------------------------------------------------------------------------
| FUNCIÓN DE DEPURACIÓN
|--------------------------------------------------------------------------
|
| Puedes usarla temporalmente desde otro archivo si quieres revisar
| qué logos reconoció Webpack.
|
|--------------------------------------------------------------------------
*/

export const getLoadedChannelLogos = () => {

  return LOGO_ENTRIES.map((logo) => ({

    fileName: logo.fileName,

    cleaned: logo.cleaned,

    url: logo.url

  }));

};