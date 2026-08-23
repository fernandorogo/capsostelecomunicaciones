import { useEffect } from 'react';

const useDocumentMetadata = ({
  title,
  description,
}) => {
  useEffect(() => {
    const previousTitle = document.title;

    let descriptionMeta =
      document.querySelector(
        'meta[name="description"]'
      );

    const metaWasCreated = !descriptionMeta;

    if (!descriptionMeta) {
      descriptionMeta =
        document.createElement('meta');

      descriptionMeta.setAttribute(
        'name',
        'description'
      );

      document.head.appendChild(
        descriptionMeta
      );
    }

    const previousDescription =
      descriptionMeta.getAttribute('content') ||
      '';

    document.title = title;

    descriptionMeta.setAttribute(
      'content',
      description
    );

    return () => {
      document.title = previousTitle;

      if (metaWasCreated) {
        descriptionMeta?.remove();
        return;
      }

      descriptionMeta?.setAttribute(
        'content',
        previousDescription
      );
    };
  }, [
    title,
    description,
  ]);
};

export default useDocumentMetadata;
