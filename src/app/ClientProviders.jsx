// src/app/ClientProviders.jsx
'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // adjust the path if necessary
import LanguageDetector from '@/components/LanguageDetector/LanguageDetector';
import { Toaster } from '@/components/ui/toaster';

export default function ClientProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* Client-only components */}
      <LanguageDetector />
      {children}
      <Toaster />
    </I18nextProvider>
  );
}
