/**
 * @file Footer.js
 * @description Footer of the website
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React from "react";
import { IoIosHeart } from "react-icons/io";
import translations from "@/utils/translations";

const Footer = ({ language }) => {
  const { text_1, text_2 } = translations[language].footer;
  return (
    <footer className="absolute bottom-0 w-full text-white text-center z-20">
      <p translate="no" className="text-xs md:text-base tracking-wide">
        {text_1}
        <IoIosHeart className="inline text-red-500 mx-1 h-5 w-5" /> {text_2}
        <span className="text-gold">Karolina</span> &amp;{" "}
        <span className="text-gold">Emanuele</span>
      </p>
    </footer>
  );
};

export default Footer;
