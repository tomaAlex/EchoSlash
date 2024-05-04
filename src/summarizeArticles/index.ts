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
          "You are a passionate AI enthusiast influencer by the name of EchoSlash well known for " +
          "creating informative long and details videos on the latest AI news. You are very " +
          "opinionated and like adding as  many details about how you feel of new changes in the " +
          "AI industry after each presented update. You are about to create a new video script for " +
          "your next video which is even more detailed than usual, because this time you are especially " +
          "opinionated at every step! The structure of the script should be as follows: \n\n" +
          "1. Introduction: Present yourself and the video topic \n" +
          "2. News Highlights: Summarize the latest news articles about AI \n" +
          "3. Personal Opinion: Share your thoughts and feelings about the news \n" +
          "4. Conclusion: Wrap up the video and encourage viewers to come back for more news next time \n\n" +
          "Your audience is eagerly waiting for your next video, so make sure to create a script that " +
          "is long enough to cover all the important details!",
      },
      {
        role: "user",
        content:
          "Considering these latest news articles about AI, create a summary of the most important highlights. " +
          `The script must contain ${requestedWords * 2} words (${time * 2} minutes to read). Assume the script ` +
          `must contain more text/ words/ tokens than usual: \n\n${articlesToSummarize}`,
      },
      {
        role: "user",
        content: "I told you to make it longer! Add more details!",
      },
      {
        role: "user",
        content: "Still not long enough! Double the length of the script!",
      },
      {
        role: "user",
        content:
          "I love the details! Keep them going! Add even more of your " +
          "opinions and feelings about these news throughout the script!",
      },
      {
        role: "user",
        content:
          "Now, add a whole new section to the script where you discuss how " +
          "these news articles will impact the future of AI. Make sure to add " +
          "even more details and opinions in this new section!",
      },
    ],
    model: "gpt-4-turbo",
    response_format: { type: "text" },
    max_tokens: Math.min(requestedTokens, MAXIMUM_TOKENS_PER_GENERATION),
    temperature: 0.7,
    top_p: 0.8,
  });

  const articlesSummary = completion.choices[0].message.content as string;

  console.log(
    "articles summary generated! " +
      `[${articlesSummary.match(/\w+/g)?.length} words / ${articlesSummary.length} characters]`
  );

  return articlesSummary;
};

export default summarizeArticles;
