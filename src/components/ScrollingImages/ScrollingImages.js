// import React, { useEffect, useState } from "react";
// import images from "@/utils/imagesImport";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { FaHeart } from "react-icons/fa";

// const ScrollingImages = () => {
//   const [scrollY, setScrollY] = useState(0);

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const group1 = [
//     images.g_1_1,
//     images.g_1_2,
//     images.g_1_3,
//     images.g_1_4,
//     images.g_1_5,
//     images.g_1_6,
//     images.g_4_1,
//     images.g_4_2,
//     images.g_4_3,
//     images.g_4_4,
//     images.g_4_5,
//     images.g_4_6,
//   ];

//   const group2 = [
//     images.g_2_1,
//     images.g_2_2,
//     images.g_2_3,
//     images.g_2_4,
//     images.g_2_5,
//     images.g_2_6,
//     images.g_4_1,
//     images.g_4_2,
//     images.g_4_3,
//     images.g_4_4,
//     images.g_4_5,
//     images.g_4_6,
//   ];

//   const group3 = [
//     images.g_3_1,
//     images.g_3_2,
//     images.g_3_3,
//     images.g_3_4,
//     images.g_3_5,
//     images.g_3_6,
//     images.g_4_1,
//     images.g_4_2,
//     images.g_4_3,
//     images.g_4_4,
//     images.g_4_5,
//     images.g_4_6,
//   ];

//   const group4 = [
//     images.g_4_1,
//     images.g_4_2,
//     images.g_4_3,
//     images.g_4_4,
//     images.g_4_5,
//     images.g_4_6,
//     images.g_4_1, // Repeat
//     images.g_4_2,
//     images.g_4_3,
//     images.g_4_4,
//     images.g_4_5,
//     images.g_4_6,
//   ];

//   const group5 = [
//     images.g_1_1,
//     images.g_1_2,
//     images.g_1_3,
//     images.g_2_2,
//     images.g_2_3,
//     images.g_4_6,
//     images.g_1_1, // Repeat
//     images.g_1_2,
//     images.g_1_3,
//     images.g_2_2,
//     images.g_2_3,
//     images.g_4_6,
//   ];

//   return (
//     <div className="relative w-full flex flex-col items-center mt-12 sm:mt-16 lg:mt-20 z-[2]">
//       <div className="relative flex flex-col justify-center gap-1 md:gap-4 xl:gap-6  z-[1]">
//         <div className="w-[4000px] h-full absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cream z-[2] opacity-40" />
//         {[group1, group2, group3].map((group, index) => (
//           <div
//             key={index}
//             className="flex justify-center gap-1 md:gap-4 xl:gap-6 z-[1]"
//             style={{
//               transform: `translateX(${
//                 scrollY * (index % 2 === 0 ? -0.2 : 0.2)
//               }px)`,
//               transition: "transform 0.1s ease-out",
//             }}
//           >
//             {group.map((img, i) => (
//               <Image
//                 key={i}
//                 src={img}
//                 alt={`image ${index + 1} ${i + 1}`}
//                 width={400}
//                 height={400}
//                 quality={100}
//                 className="w-auto h-[140px] md:h-[180px] lg:h-[220px]  xl:h-[250px] object-cover object-center grayscale-[0.2] "
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="absolute z-[2] left-1/2 top-[120%] md:top-[100%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center opacity-70">
//         <h1
//           className="text-gold font-bold  text-[280px] lg:text-[500px] "
//           style={{
//             transform: `translateY(${scrollY * -0.3}px)`,
//             transition: "transform 0.1s ease-out",
//           }}
//         >
//           E
//         </h1>
//         <FaHeart
//           className="w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] text-gold"
//           style={{
//             transform: `translateY(${scrollY * -0.3}px)`,
//             transition: "transform 0.1s ease-out",
//           }}
//         />
//         <h1
//           className="text-gold font-bold text-[280px] lg:text-[500px]"
//           style={{
//             transform: `translateY(${scrollY * -0.3}px)`,
//             transition: "transform 0.1s ease-out",
//           }}
//         >
//           K
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default ScrollingImages;

import React, { useRef } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const ScrollingImages = () => {
  const ref = useRef(null);

  // Use useScroll with a ref to the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for different layers using scrollYProgress (0 to 1)
  const layer1X = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer2X = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer3X = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Parallax effect for text
  const textX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const group1 = [
    images.g_1_1,
    images.g_1_2,
    images.g_1_3,
    images.g_1_4,
    images.g_1_5,
    images.g_1_6,
  ];

  const group2 = [
    images.g_2_1,
    images.g_2_2,
    images.g_2_3,
    images.g_2_4,
    images.g_2_5,
    images.g_2_6,
  ];

  const group3 = [
    images.g_3_1,
    images.g_3_2,
    images.g_3_3,
    images.g_3_4,
    images.g_3_5,
    images.g_3_6,
  ];

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col items-center mt-12 sm:mt-16 lg:mt-20 z-[2] overflow-hidden"
    >
      {/* Image Layers */}
      <div className="w-full relative flex flex-col justify-center gap-2 md:gap-6 xl:gap-8 z-[2]">
        {/* Layer 1 */}
        <motion.div
          className="w-full flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer1X }}
        >
          {group1.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>

        {/* Layer 2 */}
        <motion.div
          className="flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer2X }}
        >
          {group2.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>

        {/* Layer 3 */}
        <motion.div
          className="flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer3X }}
        >
          {group3.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated Text */}
      <motion.div
        className="absolute bottom-[-12%]  md:bottom-[-15%] lg:bottom-[-16%] xl:bottom-[-18%] right-0 z-[3] flex items-center opacity-90"
        style={{ x: textX }}
      >
        <h1 className="text-gold font-bold text-[180px] md:text-[280px] lg:text-[380px] xl:text-[480px] drop-shadow-lg">
          E
        </h1>
        <FaHeart className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] text-gold mx-2 drop-shadow-lg animate-bounce" />
        <h1 className="text-gold font-bold text-[180px] md:text-[280px] lg:text-[380px] xl:text-[480px] drop-shadow-lg">
          K
        </h1>
      </motion.div>
    </div>
  );
};

export default ScrollingImages;
