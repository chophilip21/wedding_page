import React, { useState } from "react";
import images from "@/utils/imagesImport";
import { guestsList } from "@/utils/guestsList"; // dummy guests list
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const RSVPSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestsToRsvp, setGuestsToRsvp] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Handle searching the guest list
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle guest selection from search results
  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest); // Update the selected guest
    setSearchTerm(""); // Clear the search term to close the search results
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

  // Check if at least one guest is attending
  const hasAttendingGuests = () => {
    return (
      selectedGuest?.attending === true ||
      guestsToRsvp.some((guest) => guest.attending === true)
    );
  };

  // Handle button click
  const handleSubmit = () => {
    if (!isAnyCheckboxSelected()) {
      setErrorMessage(
        "Please select either 'Attending' or 'Not Attending' for each guest."
      );
    } else {
      setErrorMessage(""); // Clear the error message if checkboxes are selected
      setIsLoading(true); // Start loading
      // Simulate a loading time (e.g., 2 seconds)
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true); // Show the thank you message after loading

        if (hasAttendingGuests()) {
          setShowConfetti(true); // Trigger confetti if any guest is attending
        }
      }, 2000);
    }
  };

  // Check if at least one checkbox is selected for all guests
  const isAnyCheckboxSelected = () => {
    return (
      selectedGuest?.attending !== null ||
      guestsToRsvp.some((guest) => guest.attending !== null)
    );
  };

  return (
    <section
      id="rsvp-section"
      className="relative flex flex-col w-full bg-cream"
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="w-full h-full absolute overflow-hidden">
          <Confetti
            width={width}
            height={height * 2}
            colors={["#dcb46d"]}
            numberOfPieces={1250} // Increase the number of pieces for a burst effect
            recycle={false} // Make sure it doesn't recycle and stays for 1-2 seconds
            gravity={0.1} // Control how fast confetti falls, adjust for effect
            initialVelocityY={{ min: 20, max: 0.01 }}
            onConfettiComplete={() => setShowConfetti(false)} // Stop after animation completes
          />
        </div>
      )}

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
      <div className="w-full py-12 px-4 sm:px-6 xl:px-12 bg-cream flex flex-col lg:flex-row justify-center gap-4 lg:gap-12 xl:gap-44">
        {/* left part*/}
        <div className="w-full lg:w-1/2 flex justify-start lg:justify-end">
          <div className="flex flex-col items-start relative w-full max-w-full lg:max-w-lg text-left gap-4 lg:gap-6">
            <div className="flex flex-col items-start max-sm:w-full max-sm:items-center">
              <h3 className=" font-bold z-20 ml-6 sm:ml-16">Confirm your</h3>
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
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
          <div className="w-full lg:max-w-[500px] flex flex-col justify-start items-start">
            <p>- Search your name in the guests list</p>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for your name..."
              className="border py-2 px-3 rounded w-full max-lg:max-w-[500px] mb-4 focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* Display search results */}
            {searchTerm && filteredGuests.length > 0 && (
              <ul className="border p-2 w-full max-lg:max-w-[500px] rounded">
                {filteredGuests.map((guest) => (
                  <li
                    key={guest.id}
                    className="cursor-pointer hover:bg-gray-200 p-2 flex justify-start items-center gap-4"
                    onClick={() => handleGuestSelect(guest)}
                  >
                    {guest.name}
                  </li>
                ))}
              </ul>
            )}

            {/* If no guests are found */}
            {searchTerm && filteredGuests.length === 0 && (
              <p>No guests found with this name</p>
            )}

            {/* RSVP Form: Only visible after a guest is selected */}
            {selectedGuest && (
              <div className="mt-4 w-full flex flex-col justify-start items-start">
                <h2 className="text-xl font-bold mb-6 text-left">
                  {selectedGuest?.name}
                  <span className="font-normal">
                    , you are in our guest list!
                  </span>
                </h2>

                {/* Main Guest */}
                <div className=" flex flex-col items-start">
                  <p className="font-semibold text-left">
                    Are you attending the wedding?{" "}
                  </p>
                  <p className="-mt-4   opacity-70 text-left">
                    - Leave the checkbox empty if you are unsure.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    {" "}
                    <label className="">
                      <input
                        type="checkbox"
                        checked={selectedGuest?.attending === true}
                        onChange={() =>
                          setSelectedGuest((prevGuest) => ({
                            ...prevGuest,
                            attending:
                              prevGuest?.attending === true ? null : true,
                          }))
                        }
                      />
                      &nbsp;Yes, I&apos;m Attending
                    </label>
                    <label className="">
                      <input
                        type="checkbox"
                        checked={selectedGuest?.attending === false}
                        onChange={() =>
                          setSelectedGuest((prevGuest) => ({
                            ...prevGuest,
                            attending:
                              prevGuest?.attending === false ? null : false,
                          }))
                        }
                      />
                      &nbsp;No, I&apos;m Not Attending
                    </label>
                  </div>
                </div>

                {/* Sentence for RSVPing for others */}
                {selectedGuest?.relationshipIds?.length !== 0 && (
                  <>
                    <div className="w-1/2 h-px my-8 bg-black" />
                    <p className="text-left -mt-2">
                      Your invitation includes other guests. Would you like to
                      RSVP for them as well?
                    </p>
                  </>
                )}

                {/* Relatives or Group Members */}
                {guestsToRsvp.slice(1).map((guest) => (
                  <div
                    key={guest.id}
                    className="flex justify-start  flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:-mt-4 max-sm:mb-6"
                  >
                    <h2 className="text-xl font-bold text-left sm:mt-3">
                      {guest.name}
                    </h2>
                    <label className="max-sm:-mt-4">
                      <input
                        type="checkbox"
                        checked={guest.attending === true}
                        onChange={() =>
                          setGuestsToRsvp((prevGuests) =>
                            prevGuests.map((g) =>
                              g.id === guest.id
                                ? {
                                    ...g,
                                    attending:
                                      g.attending === true ? null : true,
                                  }
                                : g
                            )
                          )
                        }
                      />
                      &nbsp;Attending
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={guest.attending === false}
                        onChange={() =>
                          setGuestsToRsvp((prevGuests) =>
                            prevGuests.map((g) =>
                              g.id === guest.id
                                ? {
                                    ...g,
                                    attending:
                                      g.attending === false ? null : false,
                                  }
                                : g
                            )
                          )
                        }
                      />
                      &nbsp;Not Attending
                    </label>
                  </div>
                ))}

                {/* Textarea for special requests */}
                <textarea
                  placeholder="Any special requests? (Dietary restrictions, etc.)"
                  className="border p-2 rounded w-full max-lg:max-w-[500px] my-4 focus:outline-none"
                />

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn2"
                >
                  {isLoading ? "Loading..." : "Send RSVP"}
                </button>
                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-500 mt-4 text-left text-lg">
                    {errorMessage}
                  </p>
                )}

                {/* Thank You Message */}
                {submitted && errorMessage.length === 0 && (
                  <div className="mt-4 w-full flex flex-col justify-start items-start">
                    <p className="text-left">
                      <span className="font-bold">Thank you!</span> Your RSVP
                      has been submitted.
                    </p>
                    <p className="text-left text-lg -mt-4">
                      Remember that you can change the attendancy any time by{" "}
                      <span className="font-bold">15th May 2025</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
