"use client";

import React, { useState, useEffect } from "react";
import {
  SplashScreen,
  Navbar,
  WelcomeSection,
  SaveTheDate,
  ScheduleSection,
  InfoSection,
  RSVPSection,
  RegistrySection,
  CommentsSongSection,
  Footer,
} from "@/components";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <main className={`relative w-full h-full`}>
      {/* Splash Screen */}
      <SplashScreen />

      {/* Detect Language */}
      <LanguageDetector />

      {/* Navbar */}
      <Navbar
        language={language}
        detectedLanguage={language}
        setLanguage={setLanguage}
      />

      {/* Welcome Section */}
      <WelcomeSection language={language} />

      <div className="relative z-10">
        {/* Save the Date Section */}
        <SaveTheDate language={language} />

        {/* Wedding Agenda / Schedule Section */}
        <ScheduleSection />

        {/* Information Section */}
        <InfoSection />

        {/* RSVP Section */}
        <RSVPSection />

        {/* Gift Registry Section */}
        <RegistrySection />

        {/* Guest Comments and Song Requests Section */}
        <CommentsSongSection />

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </main>
  );
}
