import React from 'react';

const SectionHeading = ({ label, title, description, centered = false }) => (
  <div className={`tv-section-heading ${centered ? 'centered' : ''}`.trim()}>
    <span className="tv-section-label">{label}</span>
    <h2 className="tv-section-title">{title}</h2>
    <p className="tv-section-description">{description}</p>
  </div>
);

export default SectionHeading;
