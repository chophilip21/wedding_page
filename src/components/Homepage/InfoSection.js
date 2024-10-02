import React from "react";

const InfoSection = () => {
  return (
    <section id="info-section" className="py-12">
      <h2 className="text-3xl text-center">
        Accommodation & Travel Information
      </h2>
      <p className="text-xl text-center mt-4">Closest airport: [Airport]</p>
      <p className="text-xl text-center">Closest train station: [Station]</p>
      {/* Add more info as needed */}
    </section>
  );
};

export default InfoSection;
