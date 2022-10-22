import path from "path";

import {
  blankOrUndefined,
  localAuthority as localAuthorityParser,
  gender,
  date,
  town,
  getId,
  rating,
} from "../utils";
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
    if (row["URN"] === "") {
      return undefined;
    }
    const postcode = row["POSTCODE"].toUpperCase();
    const pc = postcodes[postcode];
    if (pc === undefined) {
      if (postcode.length > 0) {
        console.warn(
          `POSTCODE: ${postcode} not found for ${row["SCHNAME"]}`
        );
      }
      return undefined;
    }

    const id = getId({
      urn: row["URN"],
      localAuthorityId: +row["LA"],
      postcode: postcode,
    });

    const school: ISchool = {
      id,
      webLink: `/ELS/${row["URN"]}`,
      urn: row["URN"],
      localAuthorityId: +row["LA"],
      localAuthority: localAuthorityParser(row["LANAME"]),
      name: row["SCHNAME"],
      address: row["STREET"],
      address2: blankOrUndefined(row["LOCALITY"]),
      address3: blankOrUndefined(row["ADDRESS3"]),
      town: town(row["TOWN"]),
      postcode,
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
      ofstedRating: rating(row["OFSTEDRATING"]),
      dateOfLastInspection: date(row["OFSTEDLASTINSP"]),
      
      census: undefined,
      financials: undefined,
      teachers: undefined,
      keyStage4: undefined,
      keyStage5: undefined
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
