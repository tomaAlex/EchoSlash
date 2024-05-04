import fs from "fs";
import path from "path";
import getSpeechTitle from "./getSpeechTitle";
import { SUMMARIES_DIRECTORY, TEMPORARY_FILE_PREFIX } from "@constants";

const getSpeechFile = (batchIndex?: number) => {
  const outputDirectory = path.resolve(`./${SUMMARIES_DIRECTORY}`);

  // make sure the output directory is created
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  if (batchIndex != undefined) {
    return path.resolve(
      `${outputDirectory}/${TEMPORARY_FILE_PREFIX}${getSpeechTitle()}_${batchIndex}.mp3`
    );
  }

  return path.resolve(`${outputDirectory}/${getSpeechTitle()}.mp3`);
};

export default getSpeechFile;
