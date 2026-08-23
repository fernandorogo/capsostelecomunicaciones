import React, { useEffect, useState } from 'react';

// IMPORTA TUS IMÁGENES
import banner1 from '../image/publicidad/banner-publicidad-1.jpg';
import banner2 from '../image/publicidad/banner-publicidad-2.jpg';
import banner3 from '../image/publicidad/banner-publicidad-3.jpg';

const banners = [banner1, banner2, banner3];

const PopupPublicidad = () => {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);

  // Mostrar 1 vez cada 24h
  useEffect(() => {
    const last = localStorage.getItem('popupAdsTime');
    const now = new Date().getTime();

    if (!last || now - Number(last) > 24 * 60 * 60 * 1000) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  // Slider automático
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visible]);

  const close = () => {
    setVisible(false);
    localStorage.setItem('popupAdsTime', new Date().getTime());
  };

  const next = () => setSlide((slide + 1) % banners.length);
  const prev = () => setSlide((slide - 1 + banners.length) % banners.length);

  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={close}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>

        {/* BOTÓN CERRAR */}
        <button className="popup-close" onClick={close}>
          ✕
        </button>

        {/* IMAGEN */}
        <img
          src={banners[slide]}
          alt="Publicidad"
          className="popup-image"
        />

        {/* CONTROLES */}
        <button className="popup-arrow left" onClick={prev}>‹</button>
        <button className="popup-arrow right" onClick={next}>›</button>

        {/* DOTS */}
        <div className="popup-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={slide === i ? 'active' : ''}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PopupPublicidad;