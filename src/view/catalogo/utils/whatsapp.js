const WHATSAPP_NUMBER =
  '573044875527';

export const createWhatsAppUrl = (
  message = ''
) => {
  const defaultMessage =
    'Hola, solicito información sobre los equipos de CAPSOS Telecomunicaciones.';

  const encodedMessage =
    encodeURIComponent(
      (
        message ||
        defaultMessage
      ).trim()
    );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
