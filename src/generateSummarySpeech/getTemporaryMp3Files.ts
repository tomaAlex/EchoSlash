import fs from "fs";
import { SUMMARIES_DIRECTORY, TEMPORARY_FILE_PREFIX } from "@constants";

const getTemporaryMp3Files = (): string[] => {
  const files = fs.readdirSync(`./${SUMMARIES_DIRECTORY}`);

  return files
    .filter(
      (file) => file.startsWith(TEMPORARY_FILE_PREFIX) && file.endsWith(".mp3")
    )
    .map((file) => `./${SUMMARIES_DIRECTORY}/${file}`);
};

export default getTemporaryMp3Files;
