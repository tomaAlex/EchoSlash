import fs from "fs";
import { openai } from "@constants";
import getSpeechFile from "./getSpeechFile";

const generateSummarySpeechBatch = async (
  summaryBatch: SpeechPhrasesBatch,
  batchIndex: number
): Promise<void> => {
  const speech = await openai.audio.speech.create({
    model: "tts-1",
    voice: "shimmer",
    input: summaryBatch.join(""),
  });

  console.log(`buffering speech batch ${batchIndex} to file...`);

  const speechFile = getSpeechFile(batchIndex);
  const buffer = Buffer.from(await speech.arrayBuffer());

  await fs.promises.writeFile(speechFile, buffer);
};

export default generateSummarySpeechBatch;
