import React from 'react';

import InformationCard from './InformationCard';
import PolicySection from './PolicySection';

const resolveText = (
  text,
  context
) => {
  if (typeof text !== 'string') {
    return text;
  }

  return Object.entries(context).reduce(
    (result, [key, value]) =>
      result.replaceAll(
        `{${key}}`,
        value ?? ''
      ),
    text
  );
};

const renderGrid = (
  items,
  className
) => (
  <div className={className}>
    {items.map((item) => (
      <InformationCard
        key={item.title}
        {...item}
      />
    ))}
  </div>
);

const PolicySectionRenderer = ({
  section,
  blocks = [],
  context,
  definitions,
  dataCategories,
  purposes,
  holderRights,
}) => (
  <PolicySection {...section}>
    {blocks.map((block, index) => {
      const key =
        `${section.id}-${block.type}-${index}`;

      if (block.type === 'paragraph') {
        return (
          <p key={key}>
            {resolveText(block.text, context)}
          </p>
        );
      }

      if (block.type === 'list') {
        return (
          <ul
            className="data-policy-list"
            key={key}
          >
            {block.items.map((item) => (
              <li key={item}>
                {resolveText(item, context)}
              </li>
            ))}
          </ul>
        );
      }

      if (block.type === 'definitions') {
        return (
          <div
            className="data-policy-definition-grid"
            key={key}
          >
            {definitions.map((item) => (
              <InformationCard
                key={item.title}
                {...item}
              />
            ))}
          </div>
        );
      }

      if (block.type === 'dataCategories') {
        return (
          <React.Fragment key={key}>
            {renderGrid(
              dataCategories,
              'data-policy-card-grid'
            )}
          </React.Fragment>
        );
      }

      if (block.type === 'purposes') {
        return (
          <React.Fragment key={key}>
            {renderGrid(
              purposes,
              'data-policy-card-grid'
            )}
          </React.Fragment>
        );
      }

      if (block.type === 'holderRights') {
        return (
          <ul
            className="data-policy-list"
            key={key}
          >
            {holderRights.map((right) => (
              <li key={right}>
                {right}
              </li>
            ))}
          </ul>
        );
      }

      if (block.type === 'infoGrid') {
        return (
          <dl
            className="data-policy-section-grid"
            key={key}
          >
            {block.items.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {resolveText(
                    item.value,
                    context
                  )}
                </dd>
              </div>
            ))}
          </dl>
        );
      }

      if (block.type === 'alert') {
        return (
          <div
            className={`data-policy-alert data-policy-alert--${
              block.variant || 'info'
            }`}
            key={key}
          >
            <span
              className="data-policy-alert__icon"
              aria-hidden="true"
            >
              <i
                className={`fas ${
                  block.icon ||
                  'fa-circle-info'
                }`}
              />
            </span>

            <p>
              {resolveText(
                block.text,
                context
              )}
            </p>
          </div>
        );
      }

      return null;
    })}
  </PolicySection>
);

export default PolicySectionRenderer;
