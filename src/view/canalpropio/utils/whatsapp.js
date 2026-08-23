const WHATSAPP_NUMBER = '573044875527';

export const createWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const canalWhatsAppMessages = {
  create:
    'Hola, quiero crear un canal propio para mi organización.',
  technical:
    'Hola, quiero conocer el acompañamiento técnico para crear un canal propio.',
};
