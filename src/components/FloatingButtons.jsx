import React, { useEffect, useState } from 'react';

const FloatingButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/573044875527"
        className="float-whatsapp-corporate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="float-text">¿Necesitas ayuda?</span>
      </a>

      <button
        className={`float-top-corporate ${visible ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default FloatingButtons;