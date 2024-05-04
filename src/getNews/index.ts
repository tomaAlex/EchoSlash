import getFetchRequest from "./getFetchRequest";
import { getYesterdayDate } from "@utils/index";

/**
 * Gather the latest news about a given topic from a starting date.
 *
 * @param q The topic to aggregate news about.
 * @param from Since when should the news be retrieved (defaults to yesterday).
 * @returns The latest news about a given topic from a starting date.
 */
const getNews = async (
  q: string,
  from: Date = getYesterdayDate()
): Promise<Article[]> => {
  console.log("fetching the latest news...");

  const request = getFetchRequest(q, from);
  const response = await fetch(request);

  const articlesData = await response.json();
  const articles = articlesData.articles as Article[];

  console.log(`retrieved latest news: ${articles.length} articles!`);

  return articles;
};

export default getNews;
