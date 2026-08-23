import React, { useMemo, useState } from 'react';

import capsosLogo from '../../../assets/logos/logo-capsoshg.png';
import {
  getChannelInitials,
  getChannelLogoUrl,
} from '../utils/channelLogos';

const ChannelLogo = ({ name }) => {
  const [hasError, setHasError] = useState(false);

  const isCapsos = /capsos\s*tv/i.test(name || '');

  const logoUrl = useMemo(
    () => (isCapsos ? capsosLogo : getChannelLogoUrl(name)),
    [isCapsos, name]
  );

  if (!logoUrl || hasError) {
    return (
      <span
        className="tv-channel-logo tv-channel-logo--fallback"
        aria-hidden="true"
      >
        {getChannelInitials(name)}
      </span>
    );
  }

  return (
    <span className="tv-channel-logo">
      <img
        src={logoUrl}
        alt={`Logo de ${name}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </span>
  );
};

export default ChannelLogo;
