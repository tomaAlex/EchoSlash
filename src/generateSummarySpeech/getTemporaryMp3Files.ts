import fs from "fs";
import { SUMMARIES_DIRECTORY, TEMPORARY_FILE_PREFIX } from "@constants";

const getTemporaryMp3Files = (userId: string): string[] => {
  const userSummariesDirectory = `./${SUMMARIES_DIRECTORY}/${userId}`;
  const files = fs.readdirSync(userSummariesDirectory);

  return files
    .filter(
      (file) => file.startsWith(TEMPORARY_FILE_PREFIX) && file.endsWith(".mp3")
    )
    .map((file) => `${userSummariesDirectory}/${file}`);
};

export default getTemporaryMp3Files;
