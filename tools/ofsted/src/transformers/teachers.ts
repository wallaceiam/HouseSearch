import { parse } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import { localAuthorityMapper } from "../utils/parsing";
import { IPartialSchool, ITeachers } from "../types";
import { createReadStream } from "../readers/createStream";

interface ITeachersLookup {
  [key: string]: ITeachers;
}

class Teachers extends Transform {
  private readonly lookup: ITeachersLookup;
  constructor(lookup: ITeachersLookup, opts?: TransformOptions) {
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
    const teachers = this.lookup[key];
    if (teachers === undefined) {
      // console.warn(`TEACHERS: ${urn} ${localAuthorityId} not found`);
    }
    this.push({ ...chunk, teachers });
    callback()
  }
}

export const teachers = async () => {
  console.log('Reading Teachers...');
  const stream = await createReadStream(config.teachersFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: ITeachersLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        const { localAuthorityId } = localAuthorityMapper(row["LA Number"], '');
        const key = `${row["URN"]}_${localAuthorityId}`;
        lookup[key] = {
          schoolPhase: row["School Phase"],
          totalNumOfTeachers: +row["Total Number of Teachers (Headcount)"],
          totalNumOfTeachingAssistants:
            +row["Total Number of Teaching Assistants (Headcount)"],
          totalNumOfNonClassroomStaff:
            +row[
            "Total Number of Non Classroom-based School Support Staff, Excluding Auxiliary Staff (Headcount)"
            ],
          totalNumOfTeachersFTE:
            +row["Total Number of Teachers (Full-Time Equivalent)"],
          totalNumOfTeachingAssistantsFTE:
            +row["Total Number of Teaching Assistants (Full-time Equivalent)"],
          totalNumOfNonClassroomStaffFTE:
            +row[
            "Total Number of Non Classroom-based School Support Staff, Excluding Auxiliary Staff (Full-Time Equivalent)"
            ],
          pupilTeacherRation: +row["Pupil:     Teacher Ratio"],
          meanGrossFTESalary: row["Mean Gross FTE Salary of All Teachers (£s)"],
        }
      })
      .on('end', () => {
        resolve(new Teachers(lookup));
      });
  });
  return transform;
}


