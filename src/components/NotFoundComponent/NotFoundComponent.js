"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";
import translations from "@/utils/translations";

export default function NotFoundComponent() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ["en", "it", "pl"];
    const detectedLanguage = supportedLanguages.includes(
      browserLanguage.slice(0, 2)
    )
      ? browserLanguage.slice(0, 2)
      : "en";

    setLanguage(detectedLanguage);
  }, []);

  const { message, button } = translations[language].not_found;

  return (
    <>
      {/* Detect Language */}
      <LanguageDetector />
      <div className="w-full h-svh bg-blue p-6 flex flex-col justify-center items-center">
        {/* Error message indicating the page was not found */}
        <h1 className="uppercase text-center text-gold mb-4">
          Oops!{" "}
          <span className="font-serif font-bold text-5xl sm:text-9xl">404</span>
        </h1>
        <h3 className="uppercase text-center text-white mb-6">{message}</h3>
        {/* Link to return to the homepage */}
        <Link href="/" className="btn btn-gold">
          {button}
        </Link>
      </div>
    </>
  );
}
