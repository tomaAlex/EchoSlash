export const getDateLocale = (date: Date): string =>
  date.toLocaleDateString("en-CA", {
    // Canadian locale uses the YYYY-MM-DD format
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
