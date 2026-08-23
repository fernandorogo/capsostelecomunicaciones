const WHATSAPP_NUMBER = '573044875527';

export const createWhatsAppUrl = (message = '') => {
  const encodedMessage = encodeURIComponent(message.trim());

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
