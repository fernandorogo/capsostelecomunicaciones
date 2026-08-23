import { useEffect, useRef, useState } from 'react';
import { TEVEO_CONFIG } from '../config/senalEnVivo.config';

const PLAYER_SELECTOR = [
  'iframe',
  'video',
  'object',
  'embed',
  'canvas',
  '[class*=player]',
  '[id*=player]',
].join(',');

const INITIAL_MESSAGE = 'Conectando con la señal en vivo...';

export const useTeveoPlayer = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let disposed = false;
    let observer = null;
    let createdScript = null;
    const timers = new Set();

    const schedule = (callback, delay) => {
      const timerId = window.setTimeout(() => {
        timers.delete(timerId);
        callback();
      }, delay);

      timers.add(timerId);
      return timerId;
    };

    const playerExists = () =>
      Boolean(
        container.querySelector(PLAYER_SELECTOR) ||
          container.children.length > 0
      );

    const markReady = () => {
      if (disposed) {
        return;
      }

      setStatus('ready');
      setMessage('Señal en vivo disponible.');
    };

    const markError = (errorMessage) => {
      if (disposed) {
        return;
      }

      setStatus('error');
      setMessage(errorMessage);
    };

    const previousScript =
      document.getElementById(TEVEO_CONFIG.scriptId);

    if (previousScript) {
      previousScript.remove();
    }

    container.replaceChildren();
    setStatus('loading');
    setMessage(INITIAL_MESSAGE);

    observer = new MutationObserver(() => {
      if (playerExists()) {
        markReady();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    schedule(() => {
      if (disposed) {
        return;
      }

      const script = document.createElement('script');
      createdScript = script;

      script.id = TEVEO_CONFIG.scriptId;
      script.src = TEVEO_CONFIG.playerUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.dataset.teveoPlayer = 'true';

      script.onload = () => {
        if (disposed) {
          return;
        }

        schedule(() => {
          if (playerExists()) {
            markReady();
            return;
          }

          if (!disposed) {
            setMessage('Inicializando reproductor de video...');
          }
        }, 250);
      };

      script.onerror = () => {
        markError(
          'No fue posible cargar el reproductor de la señal. Verifica la conexión o la autorización del dominio.'
        );
      };

      document.body.appendChild(script);
    }, TEVEO_CONFIG.initDelay);

    schedule(() => {
      if (disposed || playerExists()) {
        return;
      }

      markError(
        'La señal no respondió. Si estás en localhost, verifica que Teveo permita este dominio.'
      );
    }, TEVEO_CONFIG.loadTimeout);

    return () => {
      disposed = true;

      timers.forEach((timerId) => {
        window.clearTimeout(timerId);
      });
      timers.clear();

      if (observer) {
        observer.disconnect();
      }

      if (createdScript?.parentNode) {
        createdScript.parentNode.removeChild(createdScript);
      }

      container.replaceChildren();
    };
  }, []);

  return {
    containerRef,
    status,
    message,
  };
};
