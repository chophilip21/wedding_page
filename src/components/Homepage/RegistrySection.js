import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";

const RegistrySection = () => {
  const dashedLine = Array(3)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  return (
    <section
      id="gift-section"
      className="bg-[#233d74] px-4 sm:px-12 py-12 flex items-center flex-col relative overflow-hidden"
    >
      {/* Title */}
      <div className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12">
        <Image
          src={images.glass}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[90px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            GIFT
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            Registry
          </h3>
        </div>
      </div>

      <div className="relative w-full max-w-[700px] text-white text-center flex flex-col items-center z-10">
        <p translate="no" className="font-semibold text-center mb-4">
          Your presence at our wedding is the greatest gift we could ask for.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center my-4">
          However, if you wish to honor us with a gift, we would greatly
          appreciate a monetary contribution to help us build our future
          together.
        </p>
        {dashedLine}
        <p translate="no" className=" font-semibold text-center my-4">
          For our international guests, we kindly ask that you consider sending
          your gift via IBAN transfer or a similar method such as Revolut.
          Please contact us directly for our banking details.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center my-4">
          For our Polish guests, contributions can be made online or given in
          cash at the wedding, whichever is most convenient for you.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center mt-4 mb-12">
          In lieu of flowers, which we already have in abundance, we would be
          delighted to receive scratch cards or lottery tickets as a fun and
          exciting way to celebrate our new beginning.
        </p>
        <h5 translate="no" className="font-semibold text-center text-gold">
          THANK YOU
        </h5>
      </div>
    </section>
  );
};

export default RegistrySection;
