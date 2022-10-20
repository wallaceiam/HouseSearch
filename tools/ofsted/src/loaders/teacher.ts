import path from "path";

import { parser } from "../parser";
import { ITeacher } from "../types";

export const getTeacherInformation = async (dir: string) => {
  const fileName = path.resolve(dir, "ofsted", "2020-2021", "england_swf.csv");

  const transformer = (row: any): ITeacher | undefined => {
    if(row['URN'] === "") {
      return undefined;
    }
    const teacher: ITeacher = {
      urn: row["URN"],
      localAuthorityId: +row["LA Number"],
      data: {
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
      },
    };

    return teacher;
  };

  return await parser<ITeacher>({
    fileName,
    transformer,
  });
};
