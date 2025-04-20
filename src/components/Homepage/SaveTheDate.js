/**
 * @file SaveTheDate.js
 * @description This component renders the 'Save the Date' section. Multilingual!
 * @author  
 * @date   19 October 2024
 */

"use client";

import React from "react";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";
import ScrollingImages from "../ScrollingImages/ScrollingImages";
import { motion } from "framer-motion";
import { getCountdown } from "@/utils/countdownHelper";

const SaveTheDate = ({ language }) => {
  // Framer Motion variants
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const quartaryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.6, delay: 0.1 } },
  };

  // Get countdown message
  const countdown = getCountdown();

  // Destructure translations
  const {
    title,
    title_cursive,
    date,
    place,
    story_1,
    story_2,
    story_3_future,
    story_3_past,
  } = translations[language].saveTheDate_section;

  // Dashed line elements
  const dashedLine = Array(10)
    .fill()
    .map((_, idx) => (
      <div key={idx} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  // Story timeline
  const story = [
    { year: 2018, text: story_1, img: "/icons/met.svg" },
    { year: 2024, text: story_2, img: "/icons/engaged.svg" },
    {
      year: 2025,
      text: countdown.message ? story_3_past : story_3_future,
      img: "/icons/marry.svg",
    },
  ];

  return (
    <section id="savethedate-section" className="relative w-full flex flex-col items-center pt-16 lg:pt-20 z-10 bg-cream overflow-hidden">
      <ScrollingImages />
    </section>
  );
};

export default SaveTheDate;
