import getNews from "./getNews";
import summarizeArticles from "./summarizeArticles";
import { SUMMARIES_DIRECTORY, transporter, type NewsTopics } from "@constants";
import generateSummarySpeech from "./generateSummarySpeech";
import {
  enforceDirectoryExistence,
  getDateLocale,
  getYesterdayDate,
} from "@utils/index";

const summarizeAndEmailNews = async (
  topic: NewsTopics,
  email: string
): Promise<void> => {
  // Ensure the directory exists, avoid DoS attacks
  enforceDirectoryExistence(`./${SUMMARIES_DIRECTORY}/${email}`);

  const yesterday = getYesterdayDate();
  const articles = await getNews(topic, yesterday);
  const summary = await summarizeArticles(articles, topic, 10, yesterday);
  const filePath = await generateSummarySpeech(summary, email);

  transporter.sendMail(
    {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: `Your echo about ${topic} is here!`,
      text:
        `Here is your latest echo slash since yesterday (${getDateLocale(getYesterdayDate())}) ` +
        `about ${topic}. Come back tomorrow for more slash... For now, enjoy that opinionated echo! 🗣`,
      attachments: [
        {
          filename: `${topic}_${getDateLocale(new Date())}.mp3`,
          path: filePath,
        },
      ],
    },
    (error, info) => {
      if (error) {
        console.log("Error sending mail: ", error);
        return;
      }
      console.log("Email sent: " + info.response);
    }
  );
};

export default summarizeAndEmailNews;
