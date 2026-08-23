import React from 'react';

import '../css/HomeRedesign.css';
import './terminos-pqrsf/styles/TerminosCondicionesPQRSF.css';

import {
  DocumentActions,
  DocumentHeader,
  DocumentIndex,
  InstitutionalInfo,
  RelatedDocuments,
  SummaryGrid,
  TermsSectionRenderer,
  TermsSidebar,
} from './terminos-pqrsf/components';

import {
  DOCUMENT_SECTIONS,
  REQUEST_TYPES,
  SIDEBAR_FACTS,
  SUMMARY_CARDS,
  TERMS_CONTENT,
} from './terminos-pqrsf/data';

import { useDocumentMetadata } from './terminos-pqrsf/hooks';

const TerminosCondicionesPQRSF = ({
  companyName = 'CAPSOS Telecomunicaciones',
  companyLegalName = '',
  companyNit = '',
  documentVersion = '1.0',
  lastUpdated = '30 de julio de 2026',
  privacyPolicyPath = '/politica-tratamiento-datos',
  contactPath = '/contacto',
}) => {
  useDocumentMetadata({
    title: `Términos y condiciones PQRSF | ${companyName}`,
    description: `Consulta los términos y condiciones del canal PQRSF de ${companyName}.`,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <main
      className="pqrsf-terms-page"
      id="terminos-pqrsf"
    >
      <div className="pqrsf-terms-shell">
        <TermsSidebar
          companyName={companyName}
          documentVersion={documentVersion}
          lastUpdated={lastUpdated}
          facts={SIDEBAR_FACTS}
          sections={DOCUMENT_SECTIONS}
        />

        <article className="pqrsf-document">
          <DocumentHeader
            companyName={companyName}
            documentVersion={documentVersion}
            lastUpdated={lastUpdated}
          />

          <div className="pqrsf-document-body">
            <InstitutionalInfo
              companyName={companyName}
              companyLegalName={companyLegalName}
              companyNit={companyNit}
              documentVersion={documentVersion}
              lastUpdated={lastUpdated}
            />

            <div className="pqrsf-attention-guarantee">
              <span
                className="pqrsf-attention-guarantee__icon"
                aria-hidden="true"
              >
                <i className="fas fa-circle-check" />
              </span>

              <div>
                <strong>Garantía de atención</strong>
                <p>
                  Toda solicitud presentada de forma respetuosa será recibida,
                  clasificada y gestionada según su contenido, naturaleza y la
                  normatividad que corresponda.
                </p>
              </div>
            </div>

            <SummaryGrid items={SUMMARY_CARDS} />

            <DocumentIndex sections={DOCUMENT_SECTIONS} />

            <div className="pqrsf-sections">
              {DOCUMENT_SECTIONS.map((section) => (
                <TermsSectionRenderer
                  key={section.id}
                  section={section}
                  blocks={TERMS_CONTENT[section.id]}
                  companyName={companyName}
                  requestTypes={REQUEST_TYPES}
                />
              ))}
            </div>

            <RelatedDocuments
              privacyPolicyPath={privacyPolicyPath}
              contactPath={contactPath}
            />
          </div>

          <DocumentActions
            onPrint={handlePrint}
            onClose={handleCloseWindow}
          />
        </article>
      </div>
    </main>
  );
};

export default TerminosCondicionesPQRSF;
