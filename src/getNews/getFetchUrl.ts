import { NEWS_API_URL } from "@constants";

/**
 * Compute the fetching URL for the news on a topic from a starting date.
 *
 * @param q The topic to aggregate news about
 * @param from Since when should the news be retrieved (defaults to yesterday)
 * @returns The URL to fetch the news about a given topic from a starting date
 */
const getFetchUrl = (
  q: string,
  from: Date = new Date(new Date().setDate(new Date().getDate() - 1))
) =>
  `${NEWS_API_URL}?q=${q}&` +
  `from=${from.toLocaleDateString("en-CA", {
    // Canadian locale uses the YYYY-MM-DD format
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}&` +
  `sortBy=popularity&` +
  `apiKey=${process.env.NEWS_API_KEY}`;

export default getFetchUrl;
