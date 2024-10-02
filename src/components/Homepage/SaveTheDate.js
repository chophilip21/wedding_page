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

  const { title, date, place, story_1, story_2, story_3_future, story_3_past } =
    translations[language].saveTheDate_section;

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
    .map((_, index) => <div className="w-[2px] h-[5px] my-[3px] bg-gold" />);

  const story = [
    { year: 2018, text: story_1, img: images.hands },
    { year: 2022, text: story_2, img: images.engaged },
    {
      year: 2025,
      text: countdown.message ? story_3_past : story_3_future,
      img: images.rings,
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
        <h3>{title}</h3>
        {dashedLine}
        <h1 className="sloop-script tracking-wider text-black mt-4">{date}</h1>
        <p>{place}</p>
      </div>
      <motion.div
        ref={ref}
        className="w-full flex flex-col sm:flex-row  justify-center items-center gap-4 sm:gap-8 md:gap-20 lg:gap-24 mt-12 sm:mt-16 lg:mt-20 px-4 z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {story.map((item, index) => (
          <motion.div
            key={`${item.year} ${index}`}
            className="flex flex-col justify-center items-center z-10"
            variants={childVariants}
          >
            <h6>{item.year}</h6>
            <div className="relative">
              <div className="w-[140px] sm:w-[80px] md:w-[100px] lg:w-[120px] h-[140px]  sm:h-[80px] md:h-[100px] lg:h-[120px] p-6 sm:p-4 border border-gold rounded-full flex justify-center items-center ">
                <Image
                  src={item.img}
                  alt={item.text}
                  width={85}
                  height={85}
                  quality={100}
                  className={`w-[105px] h-[105px] sm:w-[45px] sm:h-[45px] md:w-[65px] md:h-[65px] lg:w-[85px] lg:h-[85px] relative mb-4 transform ${
                    index === 2 &&
                    "md:brightness-150 md:grayscale md:opacity-95 max-md:scale-75"
                  } ${
                    index === 0 && "brightness-0 contrast-100 saturate-200"
                  } ${index === 1 && "mt-2"} z-10`}
                />
              </div>
            </div>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
      <ScrollingImages />
    </section>
  );
};

export default SaveTheDate;
