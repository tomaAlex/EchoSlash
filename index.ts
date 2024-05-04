import getNews from "./src/getNews";
import { NewsTopics } from "@constants";
import { getYesterdayDate } from "@utils/index";
import summarizeArticles from "./src/summarizeArticles";
import generateSummarySpeech from "./src/generateSummarySpeech";

const yesterday = getYesterdayDate();
const topic = NewsTopics.Technology;
const articles = await getNews(topic, yesterday);
const summary = await summarizeArticles(articles, topic, 10, yesterday);

await generateSummarySpeech(summary);
