"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import images from "@/utils/imagesImport";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";

const Navbar = ({ language, detectedLanguage, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const { welcome, save_the_date, schedule, info, rsvp, registry, comment } =
    translations[language].navbar;

  const navElements = [
    { name: welcome, link: "welcome-section" },
    { name: save_the_date, link: "savethedate-section" },
    { name: schedule, link: "schedule-section" },
    { name: info, link: "info-section" },
    { name: rsvp, link: "rsvp-section" },
    { name: registry, link: "gift-section" },
    { name: comment, link: "comment-section" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-20 flex justify-center items-center py-4 transition-colors duration-300 ${
        isScrolled
          ? "bg-cream text-black shadow-md"
          : "bg-transparent text-white"
      } max-lg:bg-cream max-lg:text-black`}
    >
      <ul className="w-full hidden lg:flex justify-center max-[1130px]:justify-start px-4 gap-5 xl:gap-8">
        {navElements.map((el) => (
          <li key={el.link}>
            <ScrollLink
              to={el.link}
              smooth={true}
              duration={800}
              offset={-70}
              // spy={true}
              // activeClass="text-gold-nav"
              className="cursor-pointer tracking-widest hover:text-gold max-xl:text-[18px]"
            >
              {el.name}
            </ScrollLink>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden text-black`}
      >
        <RxHamburgerMenu size={18} />
      </button>
      <LanguageDropdown
        detectedLanguage={detectedLanguage}
        setLanguage={setLanguage}
      />
      {/* mobile */}
      <div
        className={`absolute w-full h-screen min-h-screen bg-cream transition-all duration-700 ease-in-out transform z-[999] lg:hidden ${
          !isMenuOpen ? "translate-y-[-52%]" : " translate-y-[48%]"
        }`}
      >
        <div className="relative w-full h-full flex flex-col justify-start items-center pt-2 z-[999]">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={` text-black absolute top-3`}
          >
            <TfiClose size={18} />
          </button>
          <ul className="flex flex-col gap-12 justify-center items-center mt-20">
            {navElements.map((el) => (
              <li key={el.link}>
                <ScrollLink
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  to={el.link}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  // spy={true}
                  // activeClass="text-gold-nav"
                  className="cursor-pointer tracking-widest hover:text-gold max-xl:text-[18px]"
                >
                  {el.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
