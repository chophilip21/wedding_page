"use client";

import { useState, useEffect } from "react";

const LanguageDetector = () => {
  const [language, setLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    // Detect browser language
    const browserLanguage = navigator.language || navigator.userLanguage;

    // We're only supporting a few languages, so let's normalize it
    const supportedLanguages = ["en", "it", "pl"];
    const detectedLanguage = supportedLanguages.includes(
      browserLanguage.slice(0, 2)
    )
      ? browserLanguage.slice(0, 2)
      : "en"; // Default to English if unsupported

    setLanguage(detectedLanguage);

    // For now, just confirm it's working with a console log
    console.log("Detected Language:", detectedLanguage);
  }, []);

  return null; // This component is just for detection right now
};

export default LanguageDetector;
