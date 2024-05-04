import fs from "fs";
import path from "path";
import getSpeechTitle from "./getSpeechTitle";
import { SUMMARIES_DIRECTORY, TEMPORARY_FILE_PREFIX } from "@constants";
import { enforceDirectoryExistence } from "@utils/enforceDirectoryExistence";

const getSpeechFile = (userId: string, batchIndex?: number) => {
  const outputDirectory = path.resolve(`./${SUMMARIES_DIRECTORY}/${userId}`);

  // make sure the output directory is created
  enforceDirectoryExistence(outputDirectory);

  if (batchIndex != undefined) {
    return path.resolve(
      `${outputDirectory}/${TEMPORARY_FILE_PREFIX}${getSpeechTitle()}_${batchIndex}.mp3`
    );
  }

  return path.resolve(`${outputDirectory}/${getSpeechTitle()}.mp3`);
};

export default getSpeechFile;
