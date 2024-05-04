import fs from "fs";
import getSpeechFile from "./getSpeechFile";
import getTemporaryMp3Files from "./getTemporaryMp3Files";
import splitSummaryIntoBatches from "./splitSummaryIntoBatches";
import { concatenateMp3, splitTextIntoPhrases } from "@utils/index";
import generateSummarySpeechBatch from "./generateSummarySpeechBatch";

const generateSummarySpeech = async (
  summary: string,
  userId: string
): Promise<string> => {
  const summaryBatches = splitSummaryIntoBatches(splitTextIntoPhrases(summary));

  console.log(`${summaryBatches.length} batches of speech to generate...`);

  for (let i = 0; i < summaryBatches.length; i++) {
    await generateSummarySpeechBatch(summaryBatches[i], i, userId);
  }

  console.log("buffering speech to file...");

  const speechFile = getSpeechFile(userId);
  const temporaryFiles = getTemporaryMp3Files(userId);

  await concatenateMp3(temporaryFiles, speechFile);

  // Remove temporary files after final speech generation
  temporaryFiles.forEach(fs.unlinkSync);

  console.log(`news summary generated: ${speechFile}!`);

  return speechFile;
};

export default generateSummarySpeech;
