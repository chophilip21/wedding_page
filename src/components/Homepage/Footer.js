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
    <footer className="w-full bg-blue-900 text-white text-center z-20 flex justify-center px-4 py-4">
    </footer>
  );
};

export default Footer;
