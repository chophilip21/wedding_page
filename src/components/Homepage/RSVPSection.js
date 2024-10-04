import React, { useEffect, useState } from "react";
import images from "@/utils/imagesImport";
import { guestsList } from "@/utils/guestsList"; // dummy guests list

const RSVPSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestsToRsvp, setGuestsToRsvp] = useState([]);

  // Handle searching the guest list
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle guest selection from search results
  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    // Automatically select related guests if they exist
    if (guest.relationshipIds.length > 0) {
      const relatedGuests = guestsList.filter((g) =>
        guest.relationshipIds.includes(g.id)
      );
      setGuestsToRsvp([guest, ...relatedGuests]);
    } else {
      setGuestsToRsvp([guest]);
    }
  };

  // Filter guest list based on search term
  const filteredGuests = guestsList.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="rsvp-section" className="flex flex-col w-full bg-cream">
      {/* Top section */}
      <div
        className="relative w-full h-[500px] brightness-95 bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center"
        style={{
          backgroundImage: `url(${images.collage.src})`,
        }}
      >
        <h1 className="absolute left-1/2 transform -translate-x-1/2 z-20 transition-transform text-9xl text-gold">
          RSVP
        </h1>
        <div className="overlay z-0"></div>
      </div>
      {/* main section */}
      <div className="w-full py-12 px-12 bg-cream flex justify-center gap-20">
        {/* left part*/}
        <div className="w-full md:w-1/2 flex justify-end">
          <div className="flex flex-col items-start relative w-full max-w-full md:max-w-lg text-left gap-4 lg:gap-6">
            <div className="flex flex-col items-start">
              <h3 className=" font-bold z-20 ml-16">Confirm your</h3>
              <h3 className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-10">
                Attendance
              </h3>
            </div>
            <p className="text-left">
              Please RSVP by <span className="font-bold">15th May 2025</span> to
              let us know if you will be attending. Simply search for your name
              on the form and confirm whether you will be joining us or not.
            </p>
            <p className="text-left">
              You can also let us know if you have any special requests, such as
              dietary restrictions or other needs. We want to make sure everyone
              is comfortable and has a great time!
            </p>
          </div>
        </div>
        {/* right part*/}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for your name..."
            className="border p-2 rounded w-full mb-4"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Display search results */}
          {searchTerm && (
            <ul className="border p-2 w-full rounded">
              {filteredGuests.map((guest) => (
                <li
                  key={guest.id}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={() => handleGuestSelect(guest)}
                >
                  {guest.name}
                </li>
              ))}
            </ul>
          )}

          {/* RSVP Form: Display after selecting a guest */}
          {selectedGuest && (
            <div className="mt-4 w-full">
              <h3 className="text-lg font-bold">RSVP for:</h3>
              {guestsToRsvp.map((guest) => (
                <div key={guest.id} className="mb-4">
                  <p>{guest.name}</p>
                  <label className="mr-2">
                    <input type="radio" name={`rsvp_${guest.id}`} value="yes" />
                    Attending
                  </label>
                  <label>
                    <input type="radio" name={`rsvp_${guest.id}`} value="no" />
                    Not Attending
                  </label>
                </div>
              ))}
              {/* Add a textarea for special requests */}
              <textarea
                placeholder="Any special requests? (Dietary restrictions, etc.)"
                className="border p-2 rounded w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
