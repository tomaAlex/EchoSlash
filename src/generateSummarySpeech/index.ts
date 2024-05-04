import fs from "fs";
import { openai } from "@constants";
import getSpeechFile from "./getSpeechFile";

const generateSummarySpeech = async (summary: string): Promise<void> => {
  console.log("generating summary speech...");

  const speech = await openai.audio.speech.create({
    model: "tts-1",
    voice: "shimmer",
    input: summary,
  });

  console.log("buffering speech to file...");

  const speechFile = getSpeechFile();
  const buffer = Buffer.from(await speech.arrayBuffer());

  await fs.promises.writeFile(speechFile, buffer);

  console.log(`news summary generated: ${speechFile}!`);
};

export default generateSummarySpeech;
