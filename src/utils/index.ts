
export const formatTimestamp = (timestamp: number): string => {
  const apiHour = new Date(timestamp * 1000);
  const hours = apiHour.getHours();
  const minutes = apiHour.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};


