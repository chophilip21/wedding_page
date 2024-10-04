import Link from "next/link";
import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";

const InfoSection = () => {
  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-12 flex flex-col relative"
    >
      {/* Title */}
      <div className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12">
        <Image
          src={images.bell}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex justify-center items-start">
          <h3 className=" font-bold z-20  -mr-8">THE</h3>
          <h3 className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light">
            Details
          </h3>
        </div>
      </div>

      <div className=" w-full text-center flex flex-col items-center gap-8 md:gap-12 z-10">
        {/* Top Detail*/}
        <div className="flex flex-col justify-center items-center">
          <h5 className="mb-4">When & Where</h5>
          <p className="">
            <span className="font-bold">Dates:</span> 26th and 27th of July 2025
          </p>
          <p className="mt-[-16px]">
            <span className="font-bold">Location:</span>{" "}
            <Link
              href={`https://maps.app.goo.gl/YXrKUt2u3ceWP4DJ8`}
              target="_blank"
              className="underline underline-offset-4"
            >
              Kolonia Łobudzice, Poland
            </Link>{" "}
          </p>
          <p className="">
            Ceremony, Party and Accommodations are hold in the same location.
          </p>
          <p className="">
            Please <span className="font-bold">No white dresses</span>
          </p>
        </div>

        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />

        {/* Middle Details (Left & Right) */}
        <div className="w-full flex flex-col md:flex-row md:justify-evenly max-md:items-center gap-8 md:gap-20">
          {/* Left Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 className="mb-4">Accomodations</h5>
            <p className="">
              For our out-of-town guests, we are pleased to offer accommodation
              at the venue for{" "}
              <span className="font-bold">
                Friday 25th July, Saturday 26th July, and Sunday 27th July
              </span>
              . If you need accommodation for additional days, please let us
              know, and we can help you arrange it, though the cost for extra
              nights will be at your own expense.
            </p>
            <p className=" mt-3">
              <span className="font-bold">Breakfast</span> is included with your
              stay and will be served from{" "}
              <span className="font-bold">7 AM to 11 AM</span> each morning
            </p>
          </div>
          <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
          {/* Right Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 className="mb-4">Travel & Transportation</h5>
            {/* <p className="">
              <span className="font-bold">Nearest Airport:</span> Katowice
              Wojciech Korfanty International Airport {"("}Katowice{")"}
            </p> */}
            <p className="">
              We are organizing transportation from{" "}
              <span className="font-bold">Katowice Airport</span> to the venue
              on <span className="font-bold">Friday, 25th July</span> and
              recommend all guests arrive by{" "}
              <span className="font-bold">3PM</span>. We’ll wait for everyone.
              On <span className="font-bold">Monday, 28th July,</span> we’ll
              provide transport back to the airport (time to be arranged).
            </p>
            <p className="">
              If you arrive at a different airport or outside the scheduled
              times, you’ll need to arrange your own transport. The easiest
              option is to take a train or bus to{" "}
              <span className="font-bold">Belchatow Central</span>, then a bus
              to <span className="font-bold">XXX Road</span>, just a 3-minute
              walk from the venue.
            </p>
          </div>
        </div>
        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
        {/* bottom Detail*/}
        <div className=" max-w-[700px] flex flex-col justify-center items-center">
          <p className="">
            We will let you know more information about the accomodation and
            transportation in private. Or you can always contact us to ask more
            details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
