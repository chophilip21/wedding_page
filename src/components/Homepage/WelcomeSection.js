/**
 * @file ScheduleSection.js
 * @description This component renders the Welcome section. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { getCountdown } from "@/utils/countdownHelper";
import { Link as ScrollLink } from "react-scroll";
import Tilt from "react-parallax-tilt";

const WelcomeSection = ({ language }) => {
  // Destructure translation strings
  const { her, him } = translations[language].couple;
  const { small_text, gratitude_message, button } = translations[language].welcome_section;

  return (
    <section
      id="welcome-section"
      className="h-svh min-h-svh w-full relative overflow-hidden"
    >
      {/* Text Section */}
      <div className="absolute w-full h-full min-h-svh flex flex-col justify-center items-center z-10 gap-0">
        <p
          translate="no"
          className="font-normal text-white tracking-widest mt-20 [font-variant-numeric:lining-nums]"
        >
          {small_text}
        </p>
        <Tilt
          glareEnable={false}
          glareColor="#ffffff00"
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          perspective={1000}
        >
          <div className="flex flex-col md:flex-row w-[240px] md:w-full h-[240px] md:h-auto justify-center md:gap-4 max-md:border max-md:border-[#eec87e] rounded-full max-md:p-4 cursor-default">
            <h1 translate="no" className="sloop-script welcome-names">
              {her}
            </h1>

            <h1 translate="no" className="alex-brush welcome-names text-gold">
              <span className="max-md:hidden">&nbsp;</span>&
            </h1>
            <h1 className="sloop-script welcome-names ">{him}</h1>
          </div>
        </Tilt>

        {/* Gratitude Message */}
        <div className="w-full max-w-md mx-auto mt-8 mb-8 px-6 py-8 bg-black/30 rounded-lg border-2 border-white/40 shadow-lg">
          <div className={`text-white text-center font-light tracking-wider
            ${language === 'ja' ? 'whitespace-pre-wrap text-sm md:text-base' : 'whitespace-pre-line text-base md:text-lg'}
            leading-relaxed
          `}>
            {gratitude_message}
          </div>
        </div>

        <ScrollLink
          to="rsvp-section"
          smooth={true}
          duration={1000}
          offset={-70}
          className="mt-20 btn btn-gold"
          translate="no"
        >
          {button}
        </ScrollLink>
      </div>

      {/* Background */}
      <div className="absolute md:fixed h-full w-full flex min-h-svh justify-center items-center z-0">
        <div className="overlay"></div>

        {/* First Image */}
        <div className="h-full flex-1 max-md:hidden z-0">
          <Image
            src={images.welcome_1}
            alt={`welcom_1`}
            width={500}
            height={700}
            quality={100}
            className="w-full h-full object-cover object-center z-0"
          />
        </div>

        {/* Second Image */}
        <div className="h-full flex-1 z-0">
          <Image
            src={images.welcome_2}
            alt={`welcom_2`}
            width={500}
            height={700}
            quality={100}
            className="w-full h-full object-cover object-center z-0"
          />
        </div>

        {/* Third Image */}
        <div className="h-full flex-1 max-md:hidden  z-0">
          <Image
            src={images.welcome_3}
            alt={`welcom_3`}
            width={500}
            height={700}
            quality={100}
            className="w-full h-full object-cover object-center z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
