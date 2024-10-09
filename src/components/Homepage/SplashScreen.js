"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Homepage.module.scss";

const SplashScreen = () => {
  useEffect(() => {
    // Disable scrolling when splash screen is mounted
    document.body.style.overflow = "hidden";

    // Re-enable scrolling after the splash animation is done (e.g., 6 seconds)
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 4000); // Match this to the total animation time of the splash screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled in cleanup
    };
  }, []);
  return (
    <>
      <div className={styles.splashScreen}>
        {/* Italian, Polish and English */}
        {["Ciao", "Cześć", "Hello"].map((text, index) => (
          <div key={index} className={styles.textContainer}>
            <p translate="no" className={`${styles.word} alex-brush`}>
              {text}
            </p>
          </div>
        ))}
        {/* Italian, Polish and English */}
        {["Ciao", "Cześć", "Hello"].map((text, index) => (
          <p
            key={index}
            translate="no"
            className={`${styles.word_mobile} alex-brush`}
          >
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default SplashScreen;
