import { useState, useEffect } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";

const ScheduleSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const tertiaryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

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
          description: "Join us as we say 'I do' in a beautiful ceremony.",
          icon: images.ceremony,
        },
        {
          time: "5:00 PM",
          title: "Dinner Served",
          description: "Indulge in a delicious feast with family and friends.",
          icon: images.dinner,
        },
        {
          time: "10:00 PM",
          title: "Cake Cutting",
          description: "Savor the sweetness as we cut the cake together.",
          icon: images.cake,
        },
        {
          time: "All Night",
          title: "Eat, Drink, Dance, Repeat!",
          description: "Celebrate the night away with music, drinks, and joy!",
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
          description:
            "Continue the festivities with more food, drinks, and dancing.",
          icon: images.dance,
        },
      ],
    },
  ];

  return (
    <section
      id="schedule-section"
      className="py-12 px-4 sm:px-6 bg-blue relative flex justify-center items-center flex-col"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10"
      >
        <Image
          src={images.glasses}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            WEDDING
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            Timeline
          </h3>
        </div>
        <p translate="no" className=" text-center text-white ">
          The wedding will be 2 days, 26th and 27th of July
        </p>
      </motion.div>
      {/* Timeline */}
      <div className="relative w-full flex flex-col items-center gap-12 mt-12">
        <div className="absolute  top-0 w-px h-[90%] border border-gold border-dashed z-0"></div>
        {timelineData.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="w-full flex flex-col items-center gap-12 z-10"
          >
            <div className="w-[95px] h-[95px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] flex justify-center items-center rounded-full border border-gold bg-blue">
              <h3 translate="no" className="alex-brush mt-2 text-white">
                {day.day}
              </h3>
            </div>
            {day.events.map((ev, evIndex) => (
              <div
                key={evIndex}
                className="w-full flex flex-col max-md:bg-blue max-md:pt-4"
              >
                <div
                  className={`flex justify-center items-center max-md:flex-col-reverse ${
                    evIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-[50%] xl:w-[600px] flex ${
                      evIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } items-center`}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={
                        evIndex % 2 === 0 ? tertiaryVariants : secondaryVariants
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      className={`flex flex-1 flex-col ${
                        evIndex % 2 === 0
                          ? "md:items-end md:mr-6"
                          : "md:items-start md:ml-6"
                      } max-md:items-center justify-start max-md:pt-4`}
                    >
                      <p
                        translate="no"
                        className="md:hidden text-center bg-white text-blue rounded-xl px-2 flex justify-center items-center"
                      >
                        {ev.time}
                      </p>

                      <h5 translate="no" className="leading-3 text-gold">
                        {ev.title}
                      </h5>
                      <p
                        translate="no"
                        className={`text-white max-md:text-center ${
                          evIndex % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        {ev.description}
                      </p>
                    </motion.div>
                    <div
                      className={`max-lg:hidden h-px w-[50px] xl:w-[120px] bg-gold flex items-center ${
                        evIndex % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div className="h-[7px] w-[7px] rounded-full bg-gold"></div>
                    </div>
                  </div>
                  <div className="relative w-[90px] h-[90px]  xl:w-[100px] xl:h-[100px] rounded-full bg-gold flex justify-center items-center">
                    <div className="w-full h-full bg-gold absolute rounded-full z-[1]" />
                    <Image
                      src={ev.icon}
                      alt={ev.title}
                      width={85}
                      height={85}
                      quality={100}
                      className=" w-[50px] xl:w-[65px] h-auto z-10"
                    />
                  </div>
                  <div
                    className={`max-md:hidden w-[50%] xl:w-[600px] ${
                      evIndex % 2 === 0 ? "items-start" : "items-end"
                    }`}
                  >
                    <p
                      translate="no"
                      className={`font-semibold text-white ${
                        evIndex % 2 !== 0 ? "text-right mr-4" : "text-left ml-4"
                      } m-0`}
                    >
                      {ev.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
