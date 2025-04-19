/**
 * @file SplashScreen.js
 * @description This component renders the Splash Screen, visible when opening/reloading the website.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Homepage.module.scss";

const SplashScreen = () => {
  // Disable scrolling when splash screen is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable scrolling after the splash animation is done (e.g., 4 seconds)
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 4000); // Match this to the total animation time of the splash screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled in cleanup
    };
  }, []);

  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
    const lang = ['en', 'ko', 'ja'].includes(browserLang) ? browserLang : 'en';
    let msg = 'Loading...';
    if (lang === 'ko') msg = '로딩 중...';
    else if (lang === 'ja') msg = '読み込み中...';
    setLoadingText(msg);
  }, []);

  return (
    <>
      <div className={styles.splashScreen}>
        <p translate="no" className={`${styles.word} alex-brush`}>{loadingText}</p>
        <p translate="no" className={`${styles.word_mobile} alex-brush`}>{loadingText}</p>
      </div>
    </>
  );
};

export default SplashScreen;
