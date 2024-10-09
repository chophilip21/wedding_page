import React from "react";

const StorySection = () => {
  return (
    <section className="py-12 z-10 bg-slate-100">
      <h2 translate="no" className="text-3xl text-center z-10">
        Our Story
      </h2>
      <div className="flex justify-center mt-6 z-10">
        {/* Timeline with icons */}
        <div className="text-center mx-4">
          <p translate="no" className="text-xl">
            2018
          </p>
          <p translate="no">We met</p>
        </div>
        <div className="text-center mx-4">
          <p translate="no" className="text-xl">
            2022
          </p>
          <p translate="no">We got engaged</p>
        </div>
        <div className="text-center mx-4">
          <p translate="no" className="text-xl">
            2025
          </p>
          <p translate="no">We get married</p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
