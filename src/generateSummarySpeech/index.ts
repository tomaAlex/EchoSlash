import fs from "fs";
import getSpeechFile from "./getSpeechFile";
import getTemporaryMp3Files from "./getTemporaryMp3Files";
import splitSummaryIntoBatches from "./splitSummaryIntoBatches";
import { concatenateMp3, splitTextIntoPhrases } from "@utils/index";
import generateSummarySpeechBatch from "./generateSummarySpeechBatch";

const generateSummarySpeech = async (summary: string): Promise<void> => {
  const summaryBatches = splitSummaryIntoBatches(splitTextIntoPhrases(summary));

  console.log(`${summaryBatches.length} batches of speech to generate...`);

  for (let i = 0; i < summaryBatches.length; i++) {
    await generateSummarySpeechBatch(summaryBatches[i], i);
  }

  console.log("buffering speech to file...");

  const speechFile = getSpeechFile();
  const temporaryFiles = getTemporaryMp3Files();

  await concatenateMp3(temporaryFiles, speechFile);

  // Remove temporary files after final speech generation
  temporaryFiles.forEach(fs.unlinkSync);

  console.log(`news summary generated: ${speechFile}!`);
};

export default generateSummarySpeech;
