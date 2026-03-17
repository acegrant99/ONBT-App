'use client';

import React, { type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';

type MiniAppExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  openInMiniApp?: boolean;
};

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export function MiniAppExternalLink({
  href,
  onClick,
  openInMiniApp = true,
  rel = 'noopener noreferrer',
  target = '_blank',
  children,
  ...props
}: MiniAppExternalLinkProps) {
  const openUrl = useOpenUrl();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || !openInMiniApp || isModifiedEvent(event)) {
      return;
    }

    event.preventDefault();
    openUrl(href);
  };

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}