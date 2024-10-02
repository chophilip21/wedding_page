export const getCountdown = () => {
  const weddingDate = new Date("2025-07-26T16:30:00"); // 26 July 2025, 4:30 PM
  //const weddingDate = new Date("2024-09-16T13:20:00"); // test
  const now = new Date();

  const totalSeconds = (weddingDate - now) / 1000;

  if (totalSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "We got married",
    };
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds, message: "" };
};
