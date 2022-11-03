import { parse } from "fast-csv";
import { IPartialSchool } from "../types";
import {
  blankOrUndefined,
  boolean,
  classification,
  date,
  gender,
  idaci,
  localAuthority,
  postcode,
  rating,
  safeGuarding,
  telephone,
  town,
} from "../utils/parsing";

const DATE_FORMAT = "dd/MM/yyyy";

const skip = (row: any): boolean => {
  if (row["Provider URN"] === "") {
    return true;
  }

  if (
    row["Provider Name"] === "REDACTED" ||
    row["Provider Postcode"] === "REDACTED"
  ) {
    return true;
  }

  return false;
};

const transform = (row: any): IPartialSchool | undefined => {
  if (skip(row)) {
    return undefined;
  }

  const school: IPartialSchool = {
    // http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/CARE/EY101465
    webLink: `/CARE/${row["Provider URN"]}`,
    name: row["Provider Name"],
    urn: row["Provider URN"],
    localAuthority: localAuthority(row["Local Authority"]),
    classification: classification(row["Provider Type"])!,
    schoolType: row["Provider Subtype"],
    openDate: date(row['Registration Date'],  DATE_FORMAT),
    isOpen: row["Provider Status"] === "Active",
    onEYR: boolean(row["Provider Early Years Register Flag"]),
    onCCR: boolean(row["Provider Compulsory Childcare Register Flag"]),
    onVCR: boolean(row["Provider Voluntary Childcare Register Flag"]),
    isNursery: true,
    address: blankOrUndefined(row["Provider Address Line 1"]),
    address2: blankOrUndefined(row["Provider Address Line 2"]),
    address3: blankOrUndefined(row["Provider Address Line 3"]),
    town: town(row["ProviderTtown"]),
    postcode: postcode(row["Provider Postcode"])!,
    telephone: telephone(row["Telephone Number"]),

    idaci: idaci(row["Deprivation Band"]),
    numOfPlaces: +row["Places"],
    numOfPlacesIncEstimates: +row["Places including Estimates"],

    gender: gender("MIXED"),
    ofstedRating: rating(row["Most recent full: Overall effectiveness"]),
    dateOfLastInspection: date(row["Most Recent Full: Inspection Date"], DATE_FORMAT),

    qualityOfEducation: rating(row["Quality of Education"]),
    behaviourAndAttitudes: rating(row["Behaviour and Attitudes"]),
    personalDevelopment: rating(row["Personal Development"]),
    leadershipAndManagement: rating(
      row["Effectiveness of Leadership and Management"]
    ),
    safeguarding: safeGuarding(row["Safeguarding is Effective?"]),
  };

  return school;
};

export const childcare = parse({
  headers: true,
  skipLines: 2,
  ignoreEmpty: true,
}).transform(transform);
