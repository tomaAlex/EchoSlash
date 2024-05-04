import ffmpeg from "fluent-ffmpeg";

export const concatenateMp3 = (
  files: string[],
  outputFilename: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    const command = ffmpeg();

    // Add each MP3 file to the FFmpeg command
    files.forEach((file) => {
      command.input(file);
    });

    command
      .on("error", reject)
      .on("end", resolve)
      .mergeToFile(outputFilename, "./tmp");
  });
