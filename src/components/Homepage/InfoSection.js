/**
 * @file InfoSection.js
 * @description Renders wedding details, travel info, and updated contact methods (Line/Kakao).  
 *              Fixed spacing between the main and sub titles so they no longer overlap.  
 * @author  
 * @date   19 October 2024
 */

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import images from "@/utils/imagesImport";
import translations from "@/utils/translations";
import { getCountdown } from "@/utils/countdownHelper";

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
  } = translations[language].info_section;

  // Environment ID
  const coupleEmail = process.env.NEXT_PUBLIC_EMAIL;

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
        <div className="flex justify-center items-baseline space-x-4">
          <h3 translate="no" className="font-bold text-3xl sm:text-4xl">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush font-light"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full flex flex-col items-center gap-12 z-10">
        {/* More Info Message */}
        <p className="text-center max-w-2xl px-4">
          {details.more_info}
        </p>
        
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
          <div className="mt-[-16px] px-4">
            <p className="text-center break-words" style={{ wordBreak: 'keep-all' }}>
              {details.location.map((item, idx) =>
                typeof item === "string" ? (
                  <span key={idx} className="inline">{item}</span>
                ) : (
                  <span key={idx} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
          </div>
          <Link
            href={language === 'ja' ? 'https://www.hotelgajoen-tokyo.com/access' : 'https://en.hotelgajoen-tokyo.com/access/'}
            target="_blank"
            className="inline-flex items-center gap-2 border-2 border-gold rounded-lg px-4 py-2 mt-3 font-medium text-base hover:bg-gold hover:bg-opacity-10 transition-colors duration-200"
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
          
          {/* Google Maps */}
          <div className="flex justify-center w-full mt-4">
            <div className="w-full max-w-md h-[250px] rounded-lg overflow-hidden shadow-md relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.4780445825424!2d139.7004115!3d35.6500833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5df600af57%3A0x94e4adcff5fb7bb5!2sHotel%20Gajoen%20Tokyo!5e0!3m2!1sen!2sus!4v1717017267158!5m2!1sen!2sus&z=17&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Gajoen Tokyo Map"
              ></iframe>
              
              {/* Transparent overlay to make the entire map clickable */}
              <a 
                href="https://www.google.com/maps/place/Hotel+Gajoen+Tokyo/@35.6317881,139.7112133,17z/data=!3m1!4b1!4m9!3m8!1s0x60188b1e513116f9:0x2f76f0da5a3ba9dc!5m2!4m1!1i2!8m2!3d35.6317881!4d139.7137936!16s%2Fg%2F122nzdk6?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 bg-transparent flex items-center justify-center hover:bg-black/10 transition-colors duration-200"
                aria-label="View Hotel Gajoen Tokyo on Google Maps"
              >
                <span className="sr-only">View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Schedule */}
          {details.schedule && (
            <div className="mt-6">
              <p>
                {details.schedule.map((item, idx) =>
                  typeof item === "string" ? (
                    <span key={idx} className="whitespace-pre-line">{item}</span>
                  ) : (
                    <span key={idx} className="font-bold">
                      {item.text}
                    </span>
                  )
                )}
              </p>
            </div>
          )}
        </div>

        {/* Divider on mobile */}
        <div className="h-px w-[50px] bg-black opacity-50 md:hidden" />

        {/* Travel & Transportation */}
        <div className="w-full text-center">
          <h5 className="mb-4">{travel_transport.title}</h5>
          {[
            travel_transport.description_1,
            travel_transport.description_2,
            travel_transport.description_3,
            travel_transport.description_4,
          ].map((descArray, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>
              {descArray.map((item, idx) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={idx} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
          ))}
        </div>

        {/* Countdown Section */}
        <CountdownTimer language={language} />
      </div>
    </section>
  );
};

const CountdownTimer = ({ language }) => {
  const [countdown, setCountdown] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCountdown(getCountdown());

    const intervalId = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isClient || !countdown) return null;

  const { days, day, hours, hour, minutes, minute, seconds, second } = 
    translations[language].welcome_section;

  if (countdown.message) return null; // Don't show countdown if wedding has passed

  return (
    <div className="w-full mt-12 text-center">
      <h5 className="mb-6">
        {language === 'en' ? 'Counting Down' : language === 'ko' ? '카운트다운' : 'カウントダウン'}
      </h5>
      <div className="flex justify-center gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{countdown.days}</span>
          <span className="text-sm">
            {countdown.days === 1 ? day : days}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{countdown.hours}</span>
          <span className="text-sm">
            {countdown.hours === 1 ? hour : hours}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{countdown.minutes}</span>
          <span className="text-sm">
            {countdown.minutes === 1 ? minute : minutes}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{countdown.seconds}</span>
          <span className="text-sm">
            {countdown.seconds === 1 ? second : seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
