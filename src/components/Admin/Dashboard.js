"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const Dashboard = ({ guests }) => {
  //   const [guests, setGuests] = useState([]);
  //const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Fetch guests from Firestore
  //     const fetchGuests = async () => {
  //       try {
  //         const guestsCollectionRef = collection(db, "guests");
  //         const querySnapshot = await getDocs(guestsCollectionRef);
  //         const guestsArray = querySnapshot.docs.map((doc) => doc.data());
  //         setGuests(guestsArray);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching guests:", error);
  //         setLoading(false);
  //       }
  //     };
  //     fetchGuests();
  //   }, []);

  // Calculations for each section
  const totalGuests = guests?.length;
  const emanueleSideGuests = guests?.filter(
    (guest) => guest?.guestSide === "Emanuele"
  );
  const karolinaSideGuests = guests.filter(
    (guest) => guest.guestSide === "Karolina"
  );

  // Status totals for all guests
  const attendingYes = guests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const attendingNo = guests.filter((guest) => guest.attending === "No").length;
  const attendingUnknown = guests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  // Status totals for Emanuele's side
  const emanueleAttendingYes = emanueleSideGuests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const emanueleAttendingNo = emanueleSideGuests.filter(
    (guest) => guest.attending === "No"
  ).length;
  const emanueleAttendingUnknown = emanueleSideGuests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  // Status totals for Karolina's side
  const karolinaAttendingYes = karolinaSideGuests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const karolinaAttendingNo = karolinaSideGuests.filter(
    (guest) => guest.attending === "No"
  ).length;
  const karolinaAttendingUnknown = karolinaSideGuests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  return (
    <div className="w-full flex flex-col jusify-start items-start ">
      <h4 className="font-sans text-neutral-600 font-bold mb-4 text-left">
        Dashboard
      </h4>

      {guests.length === 0 ? (
        <p className="font-sans">Counting...</p>
      ) : (
        <>
          {/* Section 1: Total number of guests */}
          <div className="mb-6 flex flex-col items-start border-b">
            <h6 className="font-sans font-bold text-left">
              Total Guests Invited
            </h6>
            <p className="font-sans text-left">
              Total guests: <span className="font-bold">{totalGuests}</span>
            </p>
            <p className="font-sans text-left">
              Emanuele&apos;s side:{" "}
              <span className="font-bold">{emanueleSideGuests.length}</span>
            </p>
            <p className="font-sans text-left">
              Karolina&apos;s side:{" "}
              <span className="font-bold">{karolinaSideGuests.length}</span>
            </p>
          </div>

          {/* Section 2: Total guests by attending status */}
          <div className="mb-6 flex flex-col items-start border-b">
            <h6 className="font-sans font-bold text-left">
              Guests Attending Status {"("}All{")"}
            </h6>
            <p className="font-sans text-left">
              Coming: <span className="font-bold">{attendingYes}</span>
            </p>
            <p className="font-sans text-left">
              Not coming: <span className="font-bold">{attendingNo}</span>
            </p>
            <p className="font-sans text-left">
              Unsure: <span className="font-bold">{attendingUnknown}</span>
            </p>
          </div>

          {/* Section 3: Guests attending status from hisside */}
          <div className="mb-6 flex flex-col items-start border-b">
            <h6 className="font-sans font-bold text-left">
              Guests Attending Status {"("}Emanuele&apos;s Side{")"}
            </h6>
            <p className="font-sans text-left">
              Coming: <span className="font-bold">{emanueleAttendingYes}</span>
            </p>
            <p className="font-sans text-left">
              Not coming:{" "}
              <span className="font-bold">{emanueleAttendingNo}</span>
            </p>
            <p className="font-sans text-left">
              Unsure:{" "}
              <span className="font-bold">{emanueleAttendingUnknown}</span>
            </p>
          </div>

          {/* Section 4: Guests attending status from her side */}
          <div className="mb-6 flex flex-col items-start ">
            <h6 className="font-sans font-bold text-left">
              Guests Attending Status {"("}Karolina&apos;s Side{")"}
            </h6>
            <p className="font-sans text-left">
              Coming: <span className="font-bold">{karolinaAttendingYes}</span>
            </p>
            <p className="font-sans text-left">
              Not coming:{" "}
              <span className="font-bold">{karolinaAttendingNo}</span>
            </p>
            <p className="font-sans text-left">
              Unsure:{" "}
              <span className="font-bold">{karolinaAttendingUnknown}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
