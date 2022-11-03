import { parse } from "fast-csv";
import { IPartialSchool } from "../types";
import {
  blankOrUndefined,
  classification,
  date,
  gender,
  localAuthority,
  postcode,
  rating,
  religion,
  town,
} from "../utils/parsing";

const DATE_FORMAT = "dd-MM-yyyy";

const skip = (row: any): boolean => {
  if (row["URN"] === "" || row['POSTCODE'] === "") {
    return true;
  }

  return false;
};

const transform = (row: any): IPartialSchool | undefined => {
  if (skip(row)) {
    return undefined;
  }

  const school: IPartialSchool = {
    // http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/EY101465
    webLink: `/ELS/${row["URN"]}`,
    urn: row["URN"],
    localAuthorityId: +row["LA"],
    localAuthority: localAuthority(row["LANAME"]),
    name: row["SCHNAME"],
    address: row["STREET"],
    address2: blankOrUndefined(row["LOCALITY"]),
    address3: blankOrUndefined(row["ADDRESS3"]),
    town: town(row["TOWN"]),
    postcode: postcode(row["POSTCODE"])!,

    isOpen: row["SCHSTATUS"] === "Open",
    openDate: date(row["OPENDATE"], DATE_FORMAT),
    closedDate: date(row["CLOSEDATE"], DATE_FORMAT),
    classification: classification(row["MINORGROUP"])!,
    schoolType: row["SCHOOLTYPE"],
    isPrimary: row["ISPRIMARY"] === "1",
    isSecondary: row["ISSECONDARY"] === "1",
    isPost16: row["ISPOST16"] === "1",
    ageLow: +row["AGELOW"],
    ageHigh: +row["AGEHIGH"],
    gender: gender(row["GENDER"]),
    religion: religion(row["RELCHAR"]),
    adminPolicy: row["ADMPOL"],
    ofstedRating: rating(row["OFSTEDRATING"]),
    dateOfLastInspection: date(row["OFSTEDLASTINSP"], DATE_FORMAT),
  };

  return school;
};

export const school = parse({
  headers: true,
  ignoreEmpty: true,
}).transform(transform);
