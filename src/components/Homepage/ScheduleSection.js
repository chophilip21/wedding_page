import { useState, useEffect } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";

const ScheduleSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const timelineData = [
    {
      day: "Day 1",
      events: [
        {
          time: "4:00 PM",
          title: "Ceremony Begins",
          icon: images.ceremony,
        },
        {
          time: "5:00 PM",
          title: "Dinner Served",
          icon: images.dinner,
        },
        {
          time: "10:00 PM",
          title: "Cake Cutting",
          icon: images.cake,
        },
        {
          time: "All Night",
          title: "Eat, Drink, Dance, Repeat!",
          icon: images.drink,
        },
      ],
    },
    {
      day: "Day 2",
      events: [
        {
          time: "2:00 PM - 10:00 PM",
          title: "Eat, Drink, Dance, Repeat!",
          icon: images.food,
        },
      ],
    },
  ];

  return (
    <section
      id="schedule-section"
      className="py-20 px-4 bg-[#233d74] relative flex justify-center items-center flex-col"
    >
      <div className="w-full flex flex-col items-center px-4 z-10">
        <Image
          src={images.glasses}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <h3 className="text-3xl font-bold mb-4 text-white">WEDDING TIMELINE</h3>
        <p className="text-lg text-center text-white ">
          The wedding will be 2 days, 26th and 27th of July
        </p>
      </div>
      <div className="w-full min-[425px]:w-[90%] sm:w-[500px] md:w-full mt-8 md:mt-12 relative flex flex-col justify-center items-center">
        <div className="absolute max-md:left-0 top-0 w-px h-full sm:border sm:border-gold border-dashed max-sm:bg-gradient-to-b from-transparent via-gold to-transparent"></div>
        {timelineData.map((dayData, dayIndex) => (
          <div
            key={dayIndex}
            className="w-full flex flex-col justify-center items-center "
          >
            <div
              className={`w-[100px] md:w-[140px] h-[100px] md:h-[140px] flex justify-center items-center  bg-[#233d74] rounded-full border border-gold relative z-10  ${
                dayIndex === 0 ? "md:mb-6" : "md:my-6"
              }`}
            >
              <h3 className="alex-brush mt-2 text-white">{dayData.day}</h3>
            </div>
            {dayData.events.map((timeline, index) => (
              <div
                key={index}
                className={`w-full flex justify-center items-center  my-6 md:my-0  ${
                  index % 2 === 0 ? "flex-row" : "flex-row md:flex-row-reverse"
                }`}
              >
                <div
                  className={`w-full md:w-1/2 flex ${
                    index % 2 !== 0
                      ? "justify-start"
                      : "justify-start md:justify-end"
                  }`}
                >
                  <div
                    className={`w-full relative flex justify-end items-center  ${
                      index % 2 !== 0
                        ? "flex-row-reverse ml-[-7px]"
                        : "flex-row-reverse md:flex-row ml-[-7px] md:mr-[-7px]"
                    } gap-4 sm:gap-8 `}
                  >
                    <motion.div
                      whileInView={
                        isMobile
                          ? null
                          : index % 2 !== 0
                          ? { opacity: [0, 1], x: [150, 0] }
                          : { opacity: [0, 1], x: [-150, 0] }
                      }
                      transition={{ duration: 0.5 }}
                      className={`max-md:w-full flex gap-8 justify-between items-center p-4 xl:p-6 shadow-sm shadow-white bg-cream rounded-sm  ${
                        index % 2 !== 0
                          ? "flex-row md:flex-row-reverse ml-[-7px]"
                          : "flex-row mr-[-7px]"
                      }`}
                    >
                      <div
                        className={`flex flex-col ${
                          index % 2 !== 0
                            ? "items-start"
                            : "items-start md:items-end"
                        }`}
                      >
                        <h6
                          className={` ${
                            index % 2 !== 0 ? "text-left" : "text-right"
                          }`}
                        >
                          {timeline.time}
                        </h6>
                        <p
                          className={` ${
                            index % 2 !== 0 ? "text-left" : "text-right"
                          }`}
                        >
                          {timeline.title}
                        </p>
                      </div>
                      <Image
                        src={timeline.icon}
                        alt={timeline.title}
                        width={85}
                        height={85}
                        quality={100}
                        className=" w-[60px] sm:w-[80px] md:w-[100px] xl:w-[120px] h-auto "
                      />
                    </motion.div>
                    <div className="w-[14px] h-[14px] rounded-full bg-gold" />
                    <div
                      className={`absolute max-md:hidden ${
                        index % 2 !== 0 ? "left-0" : "right-0"
                      } w-[14px] h-[14px] rounded-full bg-gold animate-ping duration-[2000ms]`}
                    />
                    <div
                      className={`absolute md:hidden left-0 w-[14px] h-[14px] rounded-full bg-gold animate-ping duration-[2000ms]`}
                    />
                  </div>
                </div>
                <div className="w-1/2 hidden md:flex"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
