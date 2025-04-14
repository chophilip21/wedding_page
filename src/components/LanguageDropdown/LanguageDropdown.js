/**
 * @file LanguageDropdown.js
 * @description A component that displays a language selection dropdown, allowing users to switch between supported languages (English, Korean, Japanese).
 *              This component handles its own dropdown menu and selection behavior.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import images from "@/utils/imagesImport";

const LanguageDropdown = ({ detectedLanguage, setLanguage }) => {
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scrolling behaviour
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Supported languages
  const languages = [
    { code: "ko", label: "Korean", flag: images.korean },
    { code: "ja", label: "Japanese", flag: images.japanese },
    { code: "en", label: "English", flag: images.english },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Set the selected language based on detectedLanguage
  useEffect(() => {
    const initialLanguage = languages.find(
      (lang) => lang.code === detectedLanguage
    );
    setSelectedLanguage(initialLanguage);
  }, [detectedLanguage]);

  // Handle language change and update i18next
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);             // Update local state for dropdown UI
    setLanguage(lang.code);                // Update parent state if needed
    i18n.changeLanguage(lang.code);        // Update the i18next instance globally
    setIsOpen(false);                      // Close dropdown after selection
  };

  if (!selectedLanguage) {
    return null; // Prevent rendering until language is set
  }

  return (
    <div className="absolute right-4 inline-block text-left z-[9999]">
      {/* Closed dropdown display */}
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.label}
          width={25}
          height={25}
          className="brightness-95"
        />
        <FaChevronDown
          size={12}
          className={`ml-2 ${isScrolled ? "text-black" : "text-white"} max-lg:text-black`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 w-40 bg-cream shadow-lg drop-shadow-2xl rounded-md p-2"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gold gap-2 my-1 ${
                selectedLanguage.code === lang.code ? "bg-gold" : ""
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={25}
                height={25}
                className="brightness-95"
              />
              <span className={`ml-2 text-black`}>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
