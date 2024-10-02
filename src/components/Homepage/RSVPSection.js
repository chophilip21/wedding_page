import React from "react";

const RSVPSection = () => {
  return (
    <section id="rsvp-section" className="py-12">
      <h2 className="text-3xl text-center">RSVP</h2>
      <form className="flex flex-col items-center mt-6">
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Confirm Attendance
        </button>
      </form>
    </section>
  );
};

export default RSVPSection;
