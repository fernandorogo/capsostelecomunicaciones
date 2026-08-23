import { useEffect } from 'react';

const useDocumentMetadata = ({
  title,
  description,
}) => {
  useEffect(() => {
    const previousTitle = document.title;

    let meta =
      document.querySelector(
        'meta[name="description"]'
      );

    const wasCreated = !meta;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(
        'name',
        'description'
      );
      document.head.appendChild(meta);
    }

    const previousDescription =
      meta.getAttribute('content') || '';

    document.title = title;
    meta.setAttribute(
      'content',
      description
    );

    return () => {
      document.title = previousTitle;

      if (wasCreated) {
        meta?.remove();
        return;
      }

      meta?.setAttribute(
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
