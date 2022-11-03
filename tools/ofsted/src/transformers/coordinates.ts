import { parse } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import { IPartialSchool, ICoordinates } from "../types";
import { createReadStream } from "../readers/createStream";

interface IPostcodeLookup {
  [postcode: string]: ICoordinates;
}

class Coordinates extends Transform {
  private readonly postcodes: IPostcodeLookup;
  constructor(postcodes: IPostcodeLookup, opts?: TransformOptions) {
    super({ ...opts, readableObjectMode: true, writableObjectMode: true });
    this.postcodes= postcodes;
  }

  override _transform(chunk: any, _: string, callback: TransformCallback) {
    const { postcode } = chunk as IPartialSchool;
    const coordinates = this.postcodes[postcode];
    if(coordinates === undefined) {
      console.warn(`COORDINATES: ${postcode} not found`);
    }
    this.push({ ...chunk, coordinates });
    callback()
  }
}

export const coordinates = async () => {
  console.log('Reading Postcodes...');
  const stream = await createReadStream(config.postcodeFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: IPostcodeLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        lookup[row["pcds"].toUpperCase()] = {
          lat: +row["lat"],
          long: +row["long"],
        };
      })
      .on('end', () => {
        resolve(new Coordinates(lookup));
      });
  });
  return transform;
}



