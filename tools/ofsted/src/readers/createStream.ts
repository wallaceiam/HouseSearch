import fs from "fs";
import fsp from "fs/promises";
import progress from "progressbar-stream";

import config from "../config";

export const createReadStream = async (fileName: string): Promise<fs.ReadStream> => {
  const stream = fs.createReadStream(fileName);
  if (config.showProgress) {
    const { size } = await fsp.stat(fileName);

    return stream.pipe(progress(size));
  }
  return stream;
};
