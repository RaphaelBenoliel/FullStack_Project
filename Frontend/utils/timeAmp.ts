// utils/timeUtils.js
export const getRandomTimestamp = () => {
  const now: Date = new Date();
  const randomMinutes: number = Math.floor(Math.random() * 60 * 24); // random number of minutes within a day
  const randomDate: Date = new Date(now.getTime() - randomMinutes * 60000);

  const minutesAgo: number = Math.floor((now.getTime() - randomDate.getTime()) / 60000);

  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
  const hoursAgo: number = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;

  const daysAgo: number = Math.floor(hoursAgo / 24);
  return `${daysAgo} days ago`;
};
