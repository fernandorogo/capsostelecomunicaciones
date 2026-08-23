import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'No se encontró el elemento con id="root" en public/index.html.'
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

/**
 * Registra el Service Worker:
 * - En producción.
 * - En localhost para pruebas.
 */
const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    console.warn(
      'Este navegador no es compatible con Service Workers.'
    );

    return;
  }

  const hostname = window.location.hostname;

  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]';

  const canRegister =
    process.env.NODE_ENV === 'production' ||
    isLocalhost;

  if (!canRegister) {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const publicUrl = process.env.PUBLIC_URL || '';

      const serviceWorkerUrl =
        `${publicUrl}/service-worker.js`;

      const registration =
        await navigator.serviceWorker.register(
          serviceWorkerUrl
        );

      console.log(
        'PWA Capsos registrada correctamente:',
        registration.scope
      );

      registration.addEventListener(
        'updatefound',
        () => {
          const newWorker = registration.installing;

          if (!newWorker) {
            return;
          }

          newWorker.addEventListener(
            'statechange',
            () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log(
                  'Existe una nueva versión de Capsos disponible.'
                );
              }
            }
          );
        }
      );
    } catch (error) {
      console.error(
        'No fue posible registrar la PWA de Capsos:',
        error
      );
    }
  });
};

registerServiceWorker();