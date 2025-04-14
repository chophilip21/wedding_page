// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files; adjust paths as needed.
import enTranslations from '../../public/locales/en/common.json';
import koTranslations from '../../public/locales/ko/common.json';
import jaTranslations from '../../public/locales/ja/common.json';

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass i18n instance to react-i18next.
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko', 'ja'],
    resources: {
      en: { common: enTranslations },
      ko: { common: koTranslations },
      ja: { common: jaTranslations },
    },
    defaultNS: 'common',
    interpolation: { escapeValue: false }, // React already escapes values
  });

export default i18n;
