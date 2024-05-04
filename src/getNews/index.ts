import getFetchRequest from "./getFetchRequest";

const getNews = async (q: string): Promise<Article[]> => {
  console.log("fetching the latest news...");

  const request = getFetchRequest(q);
  const response = await fetch(request);

  const articlesData = await response.json();
  const articles = articlesData.articles as Article[];

  console.log(`retrieved latest news: ${articles.length} articles!`);

  return articles;
};

export default getNews;
