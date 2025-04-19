/**
 * @file page.js
 * @description Homepage structure including various sections like welcome, save the date, RSVP, and more for the wedding website.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  SplashScreen,
  Navbar,
  WelcomeSection,
  SaveTheDate,
  ScheduleSection,
  InfoSection,
} from "@/components";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";

// Dynamically import the RSVPSection named-export from your components bundle
const RSVPSection = dynamic(
  () =>
    import("@/components").then((mod) => {
      return mod.RSVPSection;
    }),
  { ssr: false }
);

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ["en", "ko", "ja"];
    const detected = supportedLanguages.includes(browserLanguage.slice(0, 2))
      ? browserLanguage.slice(0, 2)
      : "en";
    setLanguage(detected);
  }, []);

  return (
    <main className="relative w-full h-full">
      <SplashScreen />
      <LanguageDetector />
      <Navbar
        language={language}
        detectedLanguage={language}
        setLanguage={setLanguage}
      />
      <WelcomeSection language={language} />

      <div className="relative z-10">
        {/* RSVPSection is now client-only, so no hydration mismatch */}
        <RSVPSection language={language} />
        {/* <ScheduleSection language={language} /> */}
        <InfoSection language={language} />
        <SaveTheDate language={language} />
      </div>
    </main>
  );
}
