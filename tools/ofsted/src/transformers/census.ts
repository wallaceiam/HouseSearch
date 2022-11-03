import { parse } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import { localAuthorityMapper } from "../utils/parsing";
import { IPartialSchool, ICensus } from "../types";
import { createReadStream } from "../readers/createStream";
import {  } from "src/types/census";

interface ICensusLookup {
  [key: string]: ICensus;
}

class Census extends Transform {
  private readonly lookup: ICensusLookup;
  constructor(lookup: ICensusLookup, opts?: TransformOptions) {
    super({ ...opts, readableObjectMode: true, writableObjectMode: true });
    this.lookup = lookup;
  }

  override _transform(chunk: any, _: string, callback: TransformCallback) {
    const { urn, localAuthorityId: laId } = chunk as IPartialSchool;
    if (laId === undefined) {
      this.push(chunk);
      callback();
      return;
    }

    const { localAuthorityId } = localAuthorityMapper(`${laId}`, '');
    const key = `${urn}_${localAuthorityId}`;
    const census = this.lookup[key];
    if (census === undefined) {
      // console.warn(`CENSUS: ${urn} ${localAuthorityId} not found`);
    }
    this.push({ ...chunk, census });
    callback();
  }
}

export const census = async () => {
  console.log('Reading Census...');
  const stream = await createReadStream(config.censusFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: ICensusLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        const { localAuthorityId } = localAuthorityMapper(row["LA"], '');
        const key = `${row["URN"]}_${localAuthorityId}`;
        lookup[key] = {
          censusSchoolType: row["SCHOOLTYPE"],
          totalNumOnRoll: +row["NOR"],
          totalNumOfGirldONRoll: +row["NORG"],
          totalNumOfBoysOnRoll: +row["NORB"],
          numOfSENPupilsWithEHCPlan: +row["TSENELSE"],
          numOfEligiblePupilsWithSENSupport: +row["TSENELK"],
          numOfEnglishNotFirstLang: +row["NUMEAL"],
          numOfEnglishFirstLang: +row["NUMENGFL"],
          numOfUnclassifiedFirstLang: +row["NUMUNCFL"],
          numOfEligibleFreeSchoolMeal: +row["NUMFSM"],
          numOfEligibleFreeSchoolMealInPast6m: +row["NUMFSMEVER"],
        }
      })
      .on('end', () => {
        resolve(new Census(lookup));
      });
  });
  return transform;
}


