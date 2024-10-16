import Link from "next/link";
import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";
import translations from "@/utils/translations";

const InfoSection = ({ language }) => {
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const { title, details, accommodations, travel_transport, additional_info } =
    translations[language].info_section;

  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-12 flex flex-col relative"
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12"
      >
        <Image
          src={images.bell}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex justify-center items-start">
          <h3 translate="no" className=" font-bold z-20  -mr-8">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div
        translate="no"
        className=" w-full text-center flex flex-col items-center gap-8 md:gap-12 z-10"
      >
        {/* Top Detail*/}
        <div className="flex flex-col justify-center items-center">
          <h5 translate="no" className="mb-4">
            {details.when_where}
          </h5>
          <p translate="no">
            {details.dates.map((item, index) =>
              typeof item === "string" ? (
                item
              ) : (
                <span key={index} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>
          <p translate="no" className="mt-[-16px]">
            {details.location.map((item, index) =>
              typeof item === "string" ? (
                item
              ) : (
                <span key={index} className="font-bold">
                  <Link
                    href={`https://maps.app.goo.gl/YXrKUt2u3ceWP4DJ8`}
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    {item.text}
                  </Link>
                </span>
              )
            )}
          </p>
          <p translate="no">{details.same_location}</p>
          <p translate="no">
            {details.no_white_dresses.map((item, index) =>
              typeof item === "string" ? (
                item
              ) : (
                <span key={index} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>
        </div>

        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />

        {/* Middle Details (Left & Right) */}
        <div className="w-full flex flex-col md:flex-row md:justify-evenly max-md:items-center gap-8 md:gap-20">
          {/* Left Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 translate="no" className="mb-4">
              {accommodations.title}
            </h5>
            <p translate="no">
              {accommodations.description_1.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
            <p translate="no" className=" mt-3">
              {accommodations.breakfast.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
          </div>
          <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
          {/* Right Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 translate="no" className="mb-4">
              {travel_transport.title}
            </h5>

            <p translate="no">
              {travel_transport.description_1.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
            <p translate="no">
              {travel_transport.description_2.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
          </div>
        </div>
        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
        {/* bottom Detail*/}
        <div className=" max-w-[700px] flex flex-col justify-center items-center">
          <p translate="no">{additional_info}</p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
