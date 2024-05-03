import getFetchRequest from "./getFetchRequest";

const getNews = async (q: string): Promise<Article[]> => {
  const request = getFetchRequest(q);
  const response = await fetch(request);
  const articlesData = await response.json();
  return articlesData.articles as Article[];
};

export default getNews;
