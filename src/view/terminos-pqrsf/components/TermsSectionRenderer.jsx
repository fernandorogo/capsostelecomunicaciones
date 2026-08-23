import React from 'react';

import RequestTypeCard from './RequestTypeCard';
import TermsSection from './TermsSection';

const replaceCompanyName = (
  text,
  companyName
) => {
  if (typeof text !== 'string') {
    return text;
  }

  return text.replaceAll(
    '{companyName}',
    companyName
  );
};

const TermsSectionRenderer = ({
  section,
  blocks = [],
  companyName,
  requestTypes,
}) => (
  <TermsSection {...section}>
    {blocks.map((block, blockIndex) => {
      const key = `${section.id}-${block.type}-${blockIndex}`;

      if (block.type === 'paragraph') {
        return (
          <p key={key}>
            {replaceCompanyName(
              block.text,
              companyName
            )}
          </p>
        );
      }

      if (block.type === 'list') {
        return (
          <ul
            className="pqrsf-terms-list"
            key={key}
          >
            {block.items.map((item) => (
              <li key={item}>
                {replaceCompanyName(
                  item,
                  companyName
                )}
              </li>
            ))}
          </ul>
        );
      }

      if (block.type === 'requestTypes') {
        return (
          <div
            className="pqrsf-request-grid"
            key={key}
          >
            {requestTypes.map((requestType) => (
              <RequestTypeCard
                key={requestType.id}
                {...requestType}
              />
            ))}
          </div>
        );
      }

      if (block.type === 'alert') {
        return (
          <div
            className="pqrsf-inline-alert"
            key={key}
          >
            <i
              className={`fas ${
                block.icon || 'fa-circle-info'
              }`}
              aria-hidden="true"
            />

            <p>
              {replaceCompanyName(
                block.text,
                companyName
              )}
            </p>
          </div>
        );
      }

      return null;
    })}
  </TermsSection>
);

export default TermsSectionRenderer;
