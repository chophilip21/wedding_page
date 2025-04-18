/**
 * @file countdownHelper.js
 * @description Helper function to calculate the countdown to the wedding date for the welcome section.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

export const getCountdown = () => {
  const weddingDate = new Date("2025-09-21T12:30:00"); // 21 September 2025, 12:30 PM
  //const weddingDate = new Date("2024-09-16T13:20:00"); // Test

  const now = new Date(); // Get the current date and time

  const totalSeconds = (weddingDate - now) / 1000; // Calculate the total remaining time in seconds

  // If the countdown is over, return a message indicating the wedding happened
  if (totalSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "We got married",
    };
  }

  // Calculate days, hours, minutes, and seconds left
  const days = Math.floor(totalSeconds / 86400); // 1 day = 86400 seconds
  const hours = Math.floor((totalSeconds % 86400) / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 1 minute = 60 seconds
  const seconds = Math.floor(totalSeconds % 60); // Remaining seconds

  // Return the calculated countdown values with an empty message
  return { days, hours, minutes, seconds, message: "" };
};
