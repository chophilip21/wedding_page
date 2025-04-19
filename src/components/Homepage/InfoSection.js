/**
 * @file InfoSection.js
 * @description Renders wedding details, travel info, and updated contact methods (Line/Kakao).
 * @author  
 * @date   19 October 2024
 */

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import images from "@/utils/imagesImport";
import translations from "@/utils/translations";

const InfoSection = ({ language }) => {
  // Framer‑Motion variants
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Pull in translations
  const {
    title,
    details,
    travel_transport,
    contact: { title: contactTitle, email_label, line_label, kakao_label },
  } = translations[language].info_section;

  // Environment IDs
  const coupleEmail = process.env.NEXT_PUBLIC_EMAIL;
  const tamakoLineId = process.env.NEXT_PUBLIC_TAMAKO_LINE_ID;
  const philipKakaoId = process.env.NEXT_PUBLIC_PHILIP_KAKAO_ID;

  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-12 flex flex-col relative"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center mb-8"
      >
        <Image
          src={images.bell}
          alt="Bell icon"
          width={95}
          height={95}
          className="mb-4 brightness-95"
        />
        <div className="flex justify-center items-start">
          <h3 className="font-bold -mr-8">{title.main}</h3>
          <h3 className="text-gold text-6xl sm:text-8xl alex-brush font-light">
            {title.sub}
          </h3>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full flex flex-col items-center gap-12 z-10">
        {/* When & Where */}
        <div className="text-center">
          <h5 className="mb-4">{details.when_where}</h5>
          <p>
            {details.dates.map((item, idx) =>
              typeof item === "string" ? (
                item
              ) : (
                <span key={idx} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>
          <p className="mt-[-16px]">
            {details.location.map((item, idx) =>
              typeof item === "string" ? (
                <span key={idx}>{item}</span>
              ) : (
                <span key={idx} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>
          <Link
            href="https://www.hotelgajoen-tokyo.com/"
            target="_blank"
            className="inline-flex items-center gap-1 border border-gold rounded-lg px-2 py-1 mt-2 font-light text-sm"
          >
            <Image
              src={images.location}
              alt="Location icon"
              width={20}
              height={20}
              className="brightness-95"
            />
            {details.button_loc}
          </Link>
        </div>

        {/* Divider on mobile */}
        <div className="h-px w-[50px] bg-black opacity-50 md:hidden" />

        {/* Travel & Transportation | Contact Us */}
        <div className="w-full flex flex-col md:flex-row md:justify-between items-start gap-8">
          {/* Travel & Transportation */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h5 className="mb-4">{travel_transport.title}</h5>
            {[ 
                travel_transport.description_1,
                travel_transport.description_2,
                travel_transport.description_3,
                travel_transport.description_4
             ].map((descArray, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {descArray.map((item, idx) =>
                  typeof item === "string" ? (
                    item
                  ) : (
                    <span key={idx} className="font-bold">{item.text}</span>
                  )
                )}
              </p>
            ))}
          </div>

          {/* Divider on mobile */}
          <div className="h-px w-[50px] bg-black opacity-50 md:hidden" />

          {/* Contact Us */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <h5 className="mb-4">{contactTitle}</h5>
            {/* Email */}
            <p>
              <span className="font-bold">{email_label}: </span>
              <a
                href={`mailto:${coupleEmail}`}
                className="underline underline-offset-4"
              >
                {coupleEmail}
              </a>
            </p>
            {/* Tamako: Line */}
            <p className="mt-2">
              <span className="font-bold">{line_label}: </span>
              <a
                href={`https://line.me/R/ti/p/${tamakoLineId}`}
                target="_blank"
                className="underline underline-offset-4"
              >
                {tamakoLineId}
              </a>
            </p>
            {/* Philip: KakaoTalk */}
            <p className="mt-2">
              <span className="font-bold">{kakao_label}: </span>
              <a
                href={`https://open.kakao.com/o/${philipKakaoId}`}
                target="_blank"
                className="underline underline-offset-4"
              >
                {philipKakaoId}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
