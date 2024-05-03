import getNews from "./src/getNews";
import summarizeArticles from "./src/summarizeArticles";

const articles = await getNews("ai");
const summary = await summarizeArticles(articles, 5);

console.log(summary);
