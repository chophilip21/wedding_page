/**
 * @file page.js
 * @description Homepage structure including various sections like welcome, save the date, RSVP, and more for the wedding website, now with a footer at the bottom.  
 * @author  
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
  Footer,
} from "@/components";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";

// Dynamically import the RSVPSection named-export to avoid SSR mismatch
const RSVPSection = dynamic(
  () =>
    import("@/components").then((mod) => {
      return mod.RSVPSection;
    }),
  { ssr: false }
);

export default function Home() {
  const [language, setLanguage] = useState("en");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detect browser language once
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ["en", "ko", "ja"];
    const detected = supportedLanguages.includes(browserLanguage.slice(0, 2))
      ? browserLanguage.slice(0, 2)
      : "en";
    setLanguage(detected);
  }, []);

  return (
  <main className="min-h-screen flex flex-col">
{/* Splash and language setup */}
      <SplashScreen />
      <LanguageDetector />

      {/* Navbar */}
      <Navbar
        language={language}
        detectedLanguage={language}
        setLanguage={setLanguage}
      />

      {/* Hero */}
      <WelcomeSection language={language} />

      {/* Main content */}
      <div className="relative z-10 flex-grow">
        <RSVPSection language={language} />
        {/* You can re-enable ScheduleSection when ready */}
        {/* <ScheduleSection language={language} /> */}
        <InfoSection language={language} />
        <SaveTheDate language={language} />
      </div>

      {/* Footer */}
      <Footer language={language} />
    </main>
  );
}
