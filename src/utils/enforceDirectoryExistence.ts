import fs from "fs";

export const enforceDirectoryExistence = (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    return;
  }
  fs.mkdirSync(directoryPath, { recursive: true });
};
