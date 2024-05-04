import getNews from "./src/getNews";
import summarizeArticles from "./src/summarizeArticles";
import generateSummarySpeech from "./src/generateSummarySpeech";

const articles = await getNews("ai");
const summary = await summarizeArticles(articles, 10);

await generateSummarySpeech(summary);
