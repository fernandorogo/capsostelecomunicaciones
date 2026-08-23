import React from 'react';

const InstitutionalNav = ({
  items = [],
  activeSection,
  onSelect,
}) => (
  <nav
    className="capsos-nav"
    aria-label="Navegación institucional"
  >
    <div className="capsos-nav-inner">
      <div className="capsos-brand">CAPSOS</div>

      <div className="capsos-nav-links">
        {items.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={
              activeSection === id ? 'active' : ''
            }
            onClick={() => onSelect(id)}
            aria-current={
              activeSection === id
                ? 'page'
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default InstitutionalNav;
