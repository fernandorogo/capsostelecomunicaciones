import React from 'react';

import '../css/HomeRedesign.css';
import './politica-datos/styles/PoliticaTratamientoDatos.css';

import {
  DataPolicyHeader,
  DataPolicySidebar,
  DocumentActions,
  InstitutionalInfo,
  PolicyIndex,
  PolicySectionRenderer,
  RelatedDocuments,
  SummaryGrid,
} from './politica-datos/components';

import {
  DATA_CATEGORIES,
  DEFINITIONS,
  HOLDER_RIGHTS,
  MAIN_PURPOSES,
  POLICY_SECTIONS,
  POLICY_SUMMARY,
  POLICY_SIDEBAR_FACTS,
  POLICY_CONTENT,
} from './politica-datos/data';

import {
  useDocumentMetadata,
  usePolicyNavigation,
} from './politica-datos/hooks';

const PoliticaTratamientoDatos = ({
  companyName = 'CAPSOS Telecomunicaciones',
  companyLegalName = '',
  companyNit = '',
  companyAddress = 'Santa Rosa de Osos, Antioquia, Colombia',
  companyPhone = '+57 304 487 5527',
  companyEmail = 'info@capsos.com.co',
  privacyEmail = 'info@capsos.com.co',
  companyWebsite = 'www.capsos.com.co',
  responsibleArea = 'Área administrativa y de atención al usuario',
  documentVersion = '1.0',
  effectiveDate = '30 de julio de 2026',
  lastUpdated = '30 de julio de 2026',
  termsPath = '/terminos-y-condiciones',
  contactPath = '/contacto',
}) => {
  const responsibleName =
    companyLegalName || companyName;

  useDocumentMetadata({
    title: `Política de tratamiento de datos | ${companyName}`,
    description:
      `Consulta la política de tratamiento y protección de datos personales de ${companyName}.`,
  });

  const {
    activeSection,
    scrollToSection,
  } = usePolicyNavigation(POLICY_SECTIONS);

  const context = {
    companyName,
    companyLegalName,
    companyNit,
    companyAddress,
    companyPhone,
    companyEmail,
    privacyEmail,
    companyWebsite,
    responsibleArea,
    responsibleName,
    documentVersion,
    effectiveDate,
    lastUpdated,
  };

  return (
    <main
      className="data-policy-page"
      id="politica-tratamiento-datos"
    >
      <div className="data-policy-shell">
        <DataPolicySidebar
          companyName={companyName}
          documentVersion={documentVersion}
          effectiveDate={effectiveDate}
          lastUpdated={lastUpdated}
          facts={POLICY_SIDEBAR_FACTS}
          sections={POLICY_SECTIONS}
          activeSection={activeSection}
          onSelectSection={scrollToSection}
        />

        <article className="data-policy-document">
          <DataPolicyHeader
            companyName={companyName}
            documentVersion={documentVersion}
            lastUpdated={lastUpdated}
          />

          <div className="data-policy-body">
            <InstitutionalInfo {...context} />

            <div className="data-policy-commitment">
              <span
                className="data-policy-commitment__icon"
                aria-hidden="true"
              >
                <i className="fas fa-circle-check" />
              </span>

              <div>
                <strong>Compromiso institucional</strong>
                <p>
                  {companyName} reconoce la importancia de la privacidad y
                  adopta esta política para orientar el tratamiento
                  responsable, seguro y transparente de los datos personales.
                </p>
              </div>
            </div>

            <SummaryGrid items={POLICY_SUMMARY} />

            <PolicyIndex
              sections={POLICY_SECTIONS}
              activeSection={activeSection}
              onSelectSection={scrollToSection}
            />

            <div className="data-policy-sections">
              {POLICY_SECTIONS.map((section) => (
                <PolicySectionRenderer
                  key={section.id}
                  section={section}
                  blocks={POLICY_CONTENT[section.id]}
                  context={context}
                  definitions={DEFINITIONS}
                  dataCategories={DATA_CATEGORIES}
                  purposes={MAIN_PURPOSES}
                  holderRights={HOLDER_RIGHTS}
                />
              ))}
            </div>

            <RelatedDocuments
              termsPath={termsPath}
              contactPath={contactPath}
            />
          </div>

          <DocumentActions
            onPrint={() => window.print()}
            onClose={() => window.close()}
          />
        </article>
      </div>
    </main>
  );
};

export default PoliticaTratamientoDatos;
