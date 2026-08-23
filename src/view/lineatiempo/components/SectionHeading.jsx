import React from 'react';

const SectionHeading = ({
  label,
  title,
  description,
  light = false,
}) => (
  <div
    className={`capsos-section-heading ${
      light ? 'light' : ''
    }`}
  >
    <span>{label}</span>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default SectionHeading;
