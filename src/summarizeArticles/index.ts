import {
  AVERAGE_TOKENS_PER_WORD,
  MAXIMUM_TOKENS_PER_GENERATION,
  WORDS_PER_MINUTE,
  openai,
} from "@constants";
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
  console.log("summarizing articles...");

  const articlesToSummarize = getArticlesPreview(articles);

  const requestedWords = time * WORDS_PER_MINUTE;
  const requestedTokens = Math.ceil(requestedWords * AVERAGE_TOKENS_PER_WORD);

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
          `The script must contain ${requestedWords} words (${time} minutes to read): \n${articlesToSummarize}`,
      },
    ],
    model: "gpt-4-turbo",
    response_format: { type: "text" },
    max_tokens: Math.min(requestedTokens, MAXIMUM_TOKENS_PER_GENERATION),
    temperature: 1.5,
  });

  const articlesSummary = completion.choices[0].message.content as string;

  console.log(
    "articles summary generated! " +
      `[${articlesSummary.match(/\w+/g)?.length} words / ${articlesSummary.length} characters]`
  );

  return articlesSummary;
};

export default summarizeArticles;
