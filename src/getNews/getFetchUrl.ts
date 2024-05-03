import { NEWS_API_URL } from "@constants";

const getFetchUrl = (q: string) =>
  `${NEWS_API_URL}?q=${q}&` +
  `from=2024-04-03&` +
  // `from=2024-05-03&` +
  `sortBy=popularity&` +
  `apiKey=${process.env.NEWS_API_KEY}`;

export default getFetchUrl;
