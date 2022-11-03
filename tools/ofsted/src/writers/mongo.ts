import { Writable, WritableOptions } from 'stream';
import mongoose from "mongoose";
import config from '../config';

type WriteFunc = (chuck: any) => Promise<Error | null | undefined>;

class Mongo extends Writable {
  
  private mongo?: mongoose.Mongoose;
  private readonly writeFunc: WriteFunc;

  constructor(writeFunc: WriteFunc, opts?: WritableOptions) {
    super({ ...opts, objectMode: true });
    this.writeFunc = writeFunc;
  }

  public readonly connect = async () => {
    this.mongo = await mongoose.connect(config.mongoDbUrl);
  }

  public readonly disconnect = async () => {
    await this.mongo?.disconnect();
    
  }

  override _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
    this.writeFunc(chunk)
      .then((result) => callback(result))
      .catch((error: Error) => callback(error));
  }
}

export const mongo = async (writeFunc: WriteFunc) => {
  const m = new Mongo(writeFunc);
  await m.connect();

  return m;
}