import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from './SectionHeading';

const CategoriesSection = ({ categories }) => (
  <section className="tv-section tv-category-section">
    <div className="container">
      <SectionHeading
        centered
        label="Contenido para todos"
        title="Encuentra siempre algo para ver."
        description="La programación se organiza por temáticas para que cada persona pueda descubrir fácilmente el contenido que más disfruta."
      />

      <div className="tv-category-grid">
        {categories.map((category) => (
          <article className="tv-category-card" key={category.title}>
            <div className="tv-category-icon">
              <FontAwesomeIcon icon={category.icon} />
            </div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
