export const formatDate = (date: Date): string => {
  const formattedTimeStamp = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    weekday: "short",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  }).format(date);

  return formattedTimeStamp;
};

export const getUnixTimestamp = (date: Date) =>
  Math.floor(date.getTime() / 1000 - 1);
