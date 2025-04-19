// src/app/ClientProviders.jsx
'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // adjust the path if necessary
import LanguageDetector from '@/components/LanguageDetector/LanguageDetector';
import { Toaster } from '@/components/ui/toaster';

export default function ClientProviders({ children }) {
  useEffect(() => {
    const applyFonts = () => {
      const root = document.body;
      // Japanese font
      if (i18n.language === 'ja') {
        root.classList.add('honoka-font');
      } else {
        root.classList.remove('honoka-font');
      }
      // Korean font
      if (i18n.language === 'ko') {
        root.classList.add('korean-font');
      } else {
        root.classList.remove('korean-font');
      }
    };
    applyFonts();
    i18n.on('languageChanged', applyFonts);
    return () => i18n.off('languageChanged', applyFonts);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* Client-only components */}
      <LanguageDetector />
      {children}
      <Toaster />
    </I18nextProvider>
  );
}
