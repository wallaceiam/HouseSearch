import * as fs from "fs";
import { parse, format } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import path from "path";
import { localAuthorityMapper, localAuthority as localAuthorityParser } from "../utils/parsing";
import { IPartialSchool } from "../types";
import { createReadStream } from "../readers/createStream";

interface ILocalAuthorityLookup {
  [localAuthority: string]: number;
}

class LocalAuthority extends Transform {
  private readonly localAuthorities: ILocalAuthorityLookup;
  constructor(localAuthorities: ILocalAuthorityLookup, opts?: TransformOptions) {
    super({ ...opts, readableObjectMode: true, writableObjectMode: true });
    this.localAuthorities = localAuthorities;
  }

  override _transform(chunk: any, _: string, callback: TransformCallback) {
    const { localAuthority, localAuthorityId } = chunk as IPartialSchool;
    if (localAuthorityId !== undefined) {
      this.push(chunk);
      callback();
      return;
    }

    const la = localAuthority === 'Durham' ? 'County Durham' : localAuthority;
    const id = this.localAuthorities[la];
    if (id === undefined) {
      console.warn(`LOCALAUTHORITY: ${la} not found`);
    }
    this.push({ ...chunk, localAuthorityId: id, localAuthority: la });
    callback()
  }
}

export const localAuthorityId = async () => {
  console.log('Reading Local Authorities...');
  const stream = await createReadStream(config.localAuthoritiesFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: ILocalAuthorityLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        lookup[row.localAuthority] = +row.localAuthorityId
      })
      .on('end', () => {
        resolve(new LocalAuthority(lookup));
      });
  });
  return transform;
}

export const createLocalAuthorityLookupCsv = async () =>
  new Promise<void>((resolve) => {
    const seen: string[] = [];
    fs.createReadStream(path.resolve(config.dataDir, "ofsted",
      "2020-2021",
      "england_school_information.csv"))
      .pipe(parse({ headers: true }))
      .pipe(format({ headers: true }))
      // Using the transform function from the formatting stream
      .transform((row: any) => {
        const { localAuthorityId, localAuthority } = localAuthorityMapper(
          row["LA"],
          row["LANAME"]
        );
        if (!seen.includes(localAuthorityId)) {
          seen.push(localAuthorityId);
          return {
            localAuthorityId: +localAuthorityId,
            localAuthority: localAuthorityParser(localAuthority) ?? "",
          };;
        }
        return undefined;
      })
      .pipe(fs.createWriteStream(config.localAuthoritiesFileName))
      .on('end', () => resolve());
  });

