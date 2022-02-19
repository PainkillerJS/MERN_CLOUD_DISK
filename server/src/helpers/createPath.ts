import path from "path";

export const createPath = (...pathFile: string[]) =>
  pathFile.reduce((pathAssets, filePath) => path.join(pathAssets, filePath), path.resolve(__dirname, "..", "files"));
