const WHATSAPP_BASE_URL = 'https://wa.me/573044875527';

export const createWhatsAppUrl = (message) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
