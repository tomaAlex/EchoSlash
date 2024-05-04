import getNews from "./src/getNews";
import summarizeArticles from "./src/summarizeArticles";
import generateSummarySpeech from "./src/generateSummarySpeech";

const articles = await getNews("ai");
const summary = await summarizeArticles(articles, 5);

await generateSummarySpeech(summary);
