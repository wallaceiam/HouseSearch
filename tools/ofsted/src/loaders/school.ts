import path from "path";

import { blankOrUndefined, localAuthority, gender, date, town } from "../utils";
import { parser } from "../parser";
import { IPostcodeLookup, ISchool } from "../types";

export const getSchoolInformation = async (
  dir: string,
  postcodes: IPostcodeLookup
) => {
  const fileName = path.resolve(
    dir,
    "ofsted",
    "2020-2021",
    "england_school_information.csv"
  );

  const transformer = (row: any): ISchool | undefined => {
    if(row['URN'] === "") {
      return undefined;
    }
    const pc = postcodes[row["POSTCODE"].toUpperCase()];
    if (pc === undefined) {
      if (row["POSTCODE"].length > 0) {
        console.warn(
          `POSTCODE: ${row["POSTCODE"]} not found for ${row["SCHNAME"]}`
        );
      }
      return undefined;
    }

    const school: ISchool = {
      webLink: `/ELS/${row["URN"]}`,
      urn: row["URN"],
      localAuthorityId: +row['LA'],
      localAuthortiy: localAuthority(row["LANAME"]),
      name: row["SCHNAME"],
      address: row["STREET"],
      address2: blankOrUndefined(row["LOCALITY"]),
      address3: blankOrUndefined(row["ADDRESS3"]),
      town: town(row["TOWN"]),
      postcode: row["POSTCODE"].toUpperCase(),
      telephone: undefined,
      lat: pc.lat,
      long: pc.long,

      isOpen: row["SCHSTATUS"] === "Open",
      openDate: date(row["OPENDATE"]),
      closedDate: date(row["CLOSEDATE"]),
      minorGroup: row["MINORGROUP"],
      schoolType: row["SCHOOLTYPE"],
      isNursery: false,
      isPrimary: row["ISPRIMARY"] === "1",
      isSecondary: row["ISSECONDARY"] === "1",
      isPost16: row["ISPOST16"] === "1",
      ageLow: +row["AGELOW"],
      ageHigh: +row["AGEHIGH"],
      gender: gender(row["GENDER"]),
      religiousCharacter: row["RELCHAR"],
      adminPolicy: row["ADMPOL"],
      ofstedRating: row["OFSTEDRATING"],
      dateOfLastInspection: date(row["OFSTEDLASTINSP"]),
    };
    return school;
  };

  const schools = await parser<ISchool>({
    fileName,
    transformer,
  });

  schools.reduce((prev, { urn }) => {
    if (prev.includes(urn)) {
      console.warn(`DUPLICATE SCHOOL URN DETECTED: ${urn}`);
    } else {
      prev.push(urn);
    }
    return prev;
  }, new Array<string>());

  return schools;
};
