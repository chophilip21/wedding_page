/**
 * @file Footer.js
 * @description Footer of the website, now in normal flow with solid background.
 */

import React from "react";
import { IoIosHeart } from "react-icons/io";
import translations from "@/utils/translations";

const Footer = ({ language }) => {
  const { footer_her, footer_him } = translations[language].couple;
  const { text_1, text_2, text_3 } = translations[language].footer;

  return (
    <footer className="w-full bg-blue-900 text-white text-center z-20 flex flex-wrap max-sm:flex-col-reverse justify-center px-4 py-4 gap-1">
      <p translate="no" className="text-xs md:text-base tracking-wide">
        {text_1}
        <IoIosHeart className="inline text-red-500 mx-1 h-5 w-5" />
        {text_2}
        <span className="text-gold font-semibold">{footer_her}</span> &amp;{" "}
        <span className="text-gold font-semibold">{footer_him}</span>
      </p>
      <p translate="no" className="text-xs md:text-base tracking-wide">
        <span className="text-white max-sm:hidden">-</span>{" "}
        <span className="text-white">
        </span>
      </p>
    </footer>
  );
};

export default Footer;
