import getArticlesPreview from "./getArticlesPreview";

/**
 * Given some article news, use an LLM to summarize the highlights
 * into a script which should take a fixed amount of time (minutes).
 *
 * @param articles The articles to highlight into a summary
 * @param time How long the summary should take in minutes when read
 */
const summarizeArticles = (articles: Article[], time: number) => {
  console.log(getArticlesPreview(articles));
};

export default summarizeArticles;
