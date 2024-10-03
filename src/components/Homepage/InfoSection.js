import Link from "next/link";
import React from "react";

const InfoSection = () => {
  return (
    <section id="info-section" className="bg-cream px-12 py-12 flex flex-col">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8">The Details</h2>
      <div className=" w-full text-center flex flex-col items-center gap-12">
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

        {/* Middle Details (Left & Right) */}
        <div className="w-full flex justify-evenly gap-20">
          {/* Left Detail */}
          <div className="w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
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

          {/* Right Detail */}
          <div className="w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
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
