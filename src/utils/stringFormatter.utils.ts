export const stripHtmlTags = (input: string): string => {
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export const isValidSlackCommand = (message: string): boolean => {
  const cleanedMessage = stripHtmlTags(message);
  return cleanedMessage === "/slack-announcements";
};
