import fs from "fs";
import path from "path";
import getSpeechTitle from "./getSpeechTitle";

const getSpeechFile = () => {
  const outputDirectory = path.resolve("./summaries");

  // make sure the output directory is created
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  return path.resolve(`${outputDirectory}/${getSpeechTitle()}.mp3`);
};

export default getSpeechFile;
