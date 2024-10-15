import React from "react";
import { IoIosHeart } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full text-white text-center z-20">
      <p translate="no" className="text-xs md:text-base tracking-wide">
        Website created with{" "}
        <IoIosHeart className="inline text-red-500 mx-1 h-5 w-5" /> by{" "}
        <span className="text-gold">Karolina</span> &amp;{" "}
        <span className="text-gold">Emanuele</span>
      </p>
    </footer>
  );
};

export default Footer;
