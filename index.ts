import getNews from "./src/getNews";
import summarizeArticles from "./src/summarizeArticles";

const articles = await getNews("ai");

summarizeArticles(articles, 5);
