import { openai } from "@constants";
import getArticlesPreview from "./getArticlesPreview";

/**
 * Given some article news, use an LLM to summarize the highlights
 * into a script which should take a fixed amount of time (minutes).
 *
 * @param articles The articles to highlight into a summary
 * @param time How long the summary should take in minutes when read
 */
const summarizeArticles = async (
  articles: Article[],
  time: number
): Promise<string> => {
  const articlesToSummarize = getArticlesPreview(articles);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a passionate AI enthusiast influencer well known " +
          "for creating informative videos on the latest AI news.",
      },
      {
        role: "user",
        content:
          "Considering these latest news articles about AI, create a summary of the most important highlights. " +
          `The script should be readable in about ${time} minutes at a normal pace: \n${articlesToSummarize}`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "text" },
  });

  return completion.choices[0].message.content as string;
};

export default summarizeArticles;
