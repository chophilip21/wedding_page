/**
 * @file Dashboard.js
 * @description Displays the dashboard summary of guest data, including total guests and attending status, for both his side (Philip in this case) and
 *              her side (Tamako in this case).
 * @note Admin Panel is doen in English only.
 * @author Philip
 */

"use client";

import React from "react";

const Dashboard = ({ guests }) => {
  // Calculations for each section
  const totalGuests = guests?.length;
  const philipSideGuests = guests?.filter(
    (guest) => guest?.guestSide === "Philip"
  );
  const tamakoSideGuests = guests.filter(
    (guest) => guest.guestSide === "Tamako"
  );

  // Status totals for all guests
  const attendingYes = guests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const attendingNo = guests.filter((guest) => guest.attending === "No").length;
  const attendingUnknown = guests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  // Status totals for Philip's side
  const philipAttendingYes = philipSideGuests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const philipAttendingNo = philipSideGuests.filter(
    (guest) => guest.attending === "No"
  ).length;
  const philipAttendingUnknown = philipSideGuests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  // Status totals for Tamako's side
  const tamakoAttendingYes = tamakoSideGuests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const tamakoAttendingNo = tamakoSideGuests.filter(
    (guest) => guest.attending === "No"
  ).length;
  const tamakoAttendingUnknown = tamakoSideGuests.filter(
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
              Philip&apos;s side: <span className="font-bold">{philipSideGuests.length}</span>
            </p>
            <p className="font-sans text-left">
              Tamako&apos;s side: <span className="font-bold">{tamakoSideGuests.length}</span>
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

          {/* Section 3: Guests attending status from his side */}
          <div className="mb-6 flex flex-col items-start border-b">
            <h6 className="font-sans font-bold text-left">
              Guests Attending Status {"("}Philip&apos;s Side{")"}
            </h6>
            <p className="font-sans text-left">
              Coming: <span className="font-bold">{philipAttendingYes}</span>
            </p>
            <p className="font-sans text-left">
              Not coming: <span className="font-bold">{philipAttendingNo}</span>
            </p>
            <p className="font-sans text-left">
              Unsure: <span className="font-bold">{philipAttendingUnknown}</span>
            </p>
          </div>

          {/* Section 4: Guests attending status from her side */}
          <div className="mb-6 flex flex-col items-start ">
            <h6 className="font-sans font-bold text-left">
              Guests Attending Status {"("}Tamako&apos;s Side{")"}
            </h6>
            <p className="font-sans text-left">
              Coming: <span className="font-bold">{tamakoAttendingYes}</span>
            </p>
            <p className="font-sans text-left">
              Not coming: <span className="font-bold">{tamakoAttendingNo}</span>
            </p>
            <p className="font-sans text-left">
              Unsure: <span className="font-bold">{tamakoAttendingUnknown}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
