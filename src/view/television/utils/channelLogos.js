const normalizeChannelName = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/*
 * El mapa usa el sitio web de la marca/señal como fuente del icono.
 * Google S2 entrega el favicon público asociado al dominio. Esto evita
 * mantener decenas de imágenes repetidas dentro del bundle y permite
 * que la parrilla siga funcionando aunque un canal cambie su identidad.
 *
 * Si más adelante se agregan PNG/SVG locales, ChannelLogo.jsx puede
 * priorizarlos sin modificar la estructura de la parrilla.
 */
const CHANNEL_DOMAINS = {
  // Deportes
  espn: 'espn.com',
  'espn 2': 'espn.com',
  'espn 3': 'espn.com',
  'espn 4': 'espn.com',
  'espn 5': 'espn.com',
  'espn 6': 'espn.com',
  'espn 7': 'espn.com',

  // Nacionales, regionales y locales
  rcn: 'canalrcn.com',
  'rcn hd2': 'canalrcn.com',
  caracol: 'caracoltv.com',
  'caracol hd2': 'caracoltv.com',
  'caracol 2': 'caracoltv.com',
  'canal uno': 'canal1.com.co',
  'canal 1': 'canal1.com.co',
  telemedellin: 'telemedellin.tv',
  teleantioquia: 'teleantioquia.co',
  'teleantioquia go': 'teleantioquia.co',
  'canal institucional': 'canalinstitucional.tv',
  'city tv': 'citytv.com.co',
  citytv: 'citytv.com.co',
  zoom: 'canalzoom.org',
  congreso: 'canalcongreso.gov.co',
  'canal congreso': 'canalcongreso.gov.co',
  cosmovision: 'cosmovision.tv',
  'senal colombia': 'senalcolombia.tv',
  'canal capital': 'canalcapital.gov.co',
  telecafe: 'telecafe.gov.co',
  telepacifico: 'telepacifico.com',
  'canal tro': 'canaltro.com',
  'canal trece': 'canaltrece.com.co',
  teleisla: 'teleislas.com.co',
  cnc: 'canalcncmedellin.com',
  telecaribe: 'telecaribe.co',
  'tv agro': 'tvagro.tv',

  // Documentales, ciencia y hogar
  'love nature': 'lovenature.com',
  'discovery channel': 'discovery.com',
  'animal planet': 'animalplanet.com',
  natgeo: 'nationalgeographic.com',
  'nat geo': 'nationalgeographic.com',
  'discovery h and h': 'discovery.com',
  'investigation discovery': 'investigationdiscovery.com',
  'discovery id': 'investigationdiscovery.com',
  hgtv: 'hgtv.com',
  'food network': 'foodnetwork.com',
  food: 'foodnetwork.com',
  'discovery science': 'sciencechannel.com',
  'discovery turbo': 'discovery.com',
  turbo: 'discovery.com',
  history: 'history.com',
  'history 2': 'history.com',

  // Infantiles
  'discovery kids': 'discoverykidsplus.com',
  'disney channel': 'disney.com',
  'disney junior': 'disneyjunior.disney.com',
  'baby tv': 'babytv.com',
  plimplim: 'plimplim.tv',
  'baby first': 'babyfirsttv.com',
  'canal infantil': 'fridamedia.com',
  'cartoon network': 'cartoonnetwork.com',
  cartoonito: 'cartoonnetwork.com',
  'adult swim': 'adultswim.com',
  dreamworks: 'dreamworks.com',
  tooncast: 'tooncast.tv',

  // Religión
  televid: 'televid.tv',
  teleamiga: 'teleamiga.tv',
  ewtn: 'ewtn.com',
  sjtv: 'youtube.com',
  enlace: 'enlacetv.com',
  'canal luz': 'canalluz.org',
  cristovision: 'cristovision.co',
  mariavision: 'mariavision.com',
  'maria vision': 'mariavision.com',
  'sophia tv': 'sophiatv.com.br',

  // Música
  'la kalle': 'lakalle.bluradio.com',
  'mi musica salsa': 'fridamedia.com',
  'mi musica popular': 'fridamedia.com',
  'mi musica romantica': 'fridamedia.com',
  'mi musica reggaeton': 'fridamedia.com',
  'mi musica urbana': 'fridamedia.com',
  telenostalgia: 'canaltelenostalgia.com',
  'rumba tv': 'signaltv.co',
  'tv musical': 'youtube.com',
  htv: 'htv.com',

  // Cine, series y entretenimiento
  fx: 'fxnow.fxnetworks.com',
  'star channel': 'starplus.com',
  'tnt series': 'tntla.com',
  tnt: 'tntla.com',
  'tnt novelas': 'tntnovelas.com',
  space: 'canalspace.tv',
  'sony channel': 'la.sonychannel.com',
  'sony movies': 'la.sonychannel.com',
  axn: 'axn.com',
  'universal tv': 'universalplus.com',
  universal: 'universalplus.com',
  'studio universal': 'universalplus.com',
  'cine familiar': 'fridamedia.com',
  'cine espanol': 'fridamedia.com',
  'cine canal': 'cinecanal.com',
  'cinema +': 'fridamedia.com',
  amc: 'amc.com',
  'a and e': 'aetv.com',
  tlc: 'tlc.com',
  usa: 'usanetwork.com',
  telemundo: 'telemundo.com',
  'life time': 'mylifetime.com',
  dhe: 'dhe.tv',
  'e!': 'eonline.com',
  've plus': 'veplus.com',
  pasiones: 'pasiones.tv',
  sun: 'fridamedia.com',
  'hogar tv': 'signaltv.co',

  // Noticias
  ntn24: 'ntn24.com',
  'cable noticias': 'cablenoticias.tv',
  'cnn espanol': 'cnnespanol.cnn.com',
  telesur: 'telesurtv.net',
};

export const getChannelLogoDomain = (channelName) => {
  const normalized = normalizeChannelName(channelName);

  if (CHANNEL_DOMAINS[normalized]) {
    return CHANNEL_DOMAINS[normalized];
  }

  // Variantes previsibles: ESPN 2/3/4..., RCN/Caracol con sufijos, etc.
  if (/^espn(?:\s+\d+)?$/.test(normalized)) return 'espn.com';
  if (/^rcn(?:\s+hd2)?$/.test(normalized)) return 'canalrcn.com';
  if (/^caracol(?:\s+hd2|\s+2)?$/.test(normalized)) return 'caracoltv.com';
  if (/^mi musica\b/.test(normalized)) return 'fridamedia.com';
  if (/^discovery\b/.test(normalized)) return 'discovery.com';
  if (/^sony\b/.test(normalized)) return 'la.sonychannel.com';

  return null;
};

export const getChannelLogoUrl = (channelName, size = 128) => {
  const domain = getChannelLogoDomain(channelName);

  if (!domain) return null;

  return `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=${size}`;
};

export const getChannelInitials = (channelName = '') => {
  const words = channelName
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return 'TV';

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};
