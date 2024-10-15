import React, { useRef } from "react";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";
import ScrollingImages from "../ScrollingImages/ScrollingImages";
import { motion, useInView } from "framer-motion";
import { getCountdown } from "@/utils/countdownHelper";

const SaveTheDate = ({ language }) => {
  // Ref for tracking visibility
  const ref = useRef(null);
  const isInView = useInView(ref); // Animation triggers when in view
  //const isInView = useInView(ref, { once: true }); //repeat once

  const countdown = getCountdown();

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

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between children animations
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const dashedLine = Array(10)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  const story = [
    { year: 2018, text: story_1, img: images.met },
    { year: 2022, text: story_2, img: images.engaged },
    {
      year: 2025,
      text: countdown.message ? story_3_past : story_3_future,
      img: images.marry,
    },
  ];

  return (
    <section
      id="savethedate-section"
      className="relative w-full flex flex-col items-center pt-16 lg:pt-20 z-10 bg-cream overflow-hidden"
    >
      <div className="w-full flex flex-col items-center px-4 z-10">
        <Image
          src={images.dove}
          alt="rings"
          width={95}
          height={95}
          quality={100}
          className="mb-4 "
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className=" font-bold z-20 ">
            {title}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title_cursive}
          </h3>
        </div>

        {dashedLine}
        <h1
          translate="no"
          className="sloop-script tracking-wider text-black mt-4"
        >
          {date}
        </h1>
        <p translate="no">{place}</p>
      </div>

      <div className="w-full flex flex-col sm:flex-row  justify-center items-center gap-8 md:gap-20 lg:gap-24 mt-12 sm:mt-16 lg:mt-20 px-4 z-10">
        {story.map((item, index) => (
          <div
            key={`${item.year} ${index}`}
            className="flex flex-col justify-center items-center z-10"
          >
            <h4 translate="no" className="max-sm:hidden">
              {item.year}
            </h4>
            <div className="w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] border-4 border-gold rounded-full flex justify-center items-center mb-3">
              <Image
                src={item.img}
                alt={item.text}
                width={85}
                height={85}
                quality={100}
                className={`w-[80px] sm:w-[100px] h-[80px] sm:h-[100px]   z-10`}
              />
            </div>
            <h4 translate="no" className="sm:hidden mb-0">
              {item.year}
            </h4>
            <p translate="no">{item.text}</p>
          </div>
        ))}
      </div>
      <ScrollingImages />
    </section>
  );
};

export default SaveTheDate;
