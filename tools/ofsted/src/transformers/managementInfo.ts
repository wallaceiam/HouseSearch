import { parse } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import { date, idaci, localAuthorityMapper, rating, religion, safeGuarding } from "../utils/parsing";
import { IPartialSchool, ISchoolReport } from "../types";
import { createReadStream } from "../readers/createStream";

const DATE_FORMAT = 'dd/MM/yyyy';

interface IManagementInfoLookup {
  [key: string]: ISchoolReport;
}

class ManagementInfo extends Transform {
  private readonly lookup: IManagementInfoLookup;
  constructor(lookup: IManagementInfoLookup, opts?: TransformOptions) {
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
    const managementinfo = this.lookup[key];
    if (managementinfo === undefined) {
      // console.warn(`TEACHERS: ${urn} ${localAuthorityId} not found`);
    }
    this.push({ ...chunk, ...managementinfo });
    callback()
  }
}

export const managementinfo = async () => {
  console.log('Reading Management Info...');
  const stream = await createReadStream(config.stateFundedFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: IManagementInfoLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        const { localAuthorityId } = localAuthorityMapper(row["LAESTAB"].substring(0, 3), '');
        const key = `${row["URN"]}_${localAuthorityId}`;
        lookup[key] = {
          openDate: date(row['School open date'], DATE_FORMAT),
          adminPolicy: row['Admissions policy'],
          religion: religion(row['Designated religious character']),
          religionEthos: row['Religious ethos'],
          religiousGroup: row['Faith grouping'],
          idaci: idaci(row['The income deprivation affecting children index (IDACI) quintile']),
          numOfPupils: +row['Total number of pupils'],
          ageLow: +row['Statutory lowest age'],
          ageHigh: +row['Statutory highest age'],
          dateOfLastInspection: date(row['Date of latest ungraded inspection'], DATE_FORMAT),

          ofstedRating: rating(row['Overall effectiveness']),
          //Category of concern	
          qualityOfEducation: rating(row['Quality of education']),
          behaviourAndAttitudes: rating(row['Behaviour and attitudes']),
          personalDevelopment: rating(row['Personal development']),
          leadershipAndManagement: rating(row['Effectiveness of leadership and management']),
          safeguarding: safeGuarding(row['Safeguarding is effective?']),
        }
      })
      .on('end', () => {
        resolve(new ManagementInfo(lookup));
      });
  });
  return transform;
}


