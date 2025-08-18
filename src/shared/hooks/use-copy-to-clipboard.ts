'use client';

import React from 'react';
import { tryCatch } from '../lib/try-catch';

export const useCopyToClipboard = (): [
  string | null,
  (value: string) => void,
] => {
  const [state, setState] = React.useState<string | null>(null);

  const copyToClipboard = React.useCallback((value: string) => {
    const handleCopy = async () => {
      if (!navigator?.clipboard?.writeText) {
        throw new Error('Clipboard API not supported');
      }

      const { error } = await tryCatch(navigator.clipboard.writeText(value));
      setState(value);

      if (error) {
        return;
      }
    };

    handleCopy();
  }, []);

  return [state, copyToClipboard];
};
