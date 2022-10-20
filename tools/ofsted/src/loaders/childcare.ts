import path from "path";

import {
  blankOrUndefined,
  telephone,
  localAuthority,
  gender,
  town,
} from "../utils";
import { parser } from "../parser";
import { IPostcodeLookup, ISchool } from "../types";

export const getChildcareInformation = async (
  dir: string,
  postcodes: IPostcodeLookup
) => {
  const fileName = path.resolve(
    dir,
    "Childcare_provider_level_data_as_at_31_August_2021.csv"
  );

  const transformer = (row: any): ISchool | undefined => {
    if(row['Provider URN'] === "") {
      return undefined;
    }
    if (row["Provider name"] === "REDACTED" || row["Postcode"] === "REDACTED") {
      return undefined;
    }

    const pc = postcodes[row["Postcode"]];
    if (pc === undefined) {
      if (row["Postcode"].length > 0) {
        console.warn(
          `POSTCODE: ${row["Postcode"]} not found for ${row["Provider name"]}`
        );
      }
      return undefined;
    }

    // http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/CARE/EY101465
    const school: ISchool = {
      webLink: `/CARE/${row["Provider URN"]}`,
      urn: row["Provider URN"],
      localAuthorityId: -1,
      minorGroup: row["Provider type"],
      schoolType: row["Provider subtype"],
      isOpen: row["Provider status"] === "Active",
      openDate: undefined,
      closedDate: undefined,
      isNursery: true,
      isPost16: false,
      isPrimary: false,
      isSecondary: false,
      // 'Individual Register combinations',
      // 'Provider Early Years Register Flag',
      // 'Provider Compulsory Childcare Register Flag',
      // 'Provider Voluntary Childcare Register Flag',
      // 'Registered person URN',
      // 'Registered_Person_Name',
      name: row["Provider name"],
      address: row["Provider address line 1"],
      address2: blankOrUndefined(row["Provider address line 2"]),
      address3: blankOrUndefined(row["Provider address line 3"]),
      town: town(row["Provider town"]),
      postcode: row["Postcode"].toUpperCase(),
      lat: pc.lat,
      long: pc.long,
      telephone: telephone(row["Telephone Number"]),

      // 'Parliamentary constituency',
      localAuthortiy: localAuthority(row["Local authority"]),
      ageLow: undefined,
      ageHigh: undefined,
      gender: gender("MIXED"),
      religiousCharacter: undefined,
      adminPolicy: undefined,
      ofstedRating: 0,
      dateOfLastInspection: undefined,
    };

    return school;
  };

  return await parser<ISchool>({
    fileName,
    transformer,
    parseOptions: { headers: true, skipLines: 3, ignoreEmpty: true },
  });
};
