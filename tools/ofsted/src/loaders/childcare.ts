import path from "path";

import {
  blankOrUndefined,
  telephone,
  localAuthority as localAuthorityParser,
  gender,
  town,
  getId,
  dateWithFormat,
  rating,
} from "../utils";
import { parser } from "../parser";
import { ILocalAuthority, IPostcodeLookup, ISchool } from "../types";

export const getChildcareInformation = async (
  dir: string,
  postcodes: IPostcodeLookup,
  localAuthorities: ILocalAuthority[],
) => {
  const fileName = path.resolve(
    dir,
    "Childcare_provider_level_data_as_at_31_August_2021.csv"
  );

  const date = dateWithFormat('dd/MM/yyyy');

  const transformer = (row: any): ISchool | undefined => {
    if(row['Provider URN'] === "") {
      return undefined;
    }
    if (row["Provider name"] === "REDACTED" || row["Postcode"] === "REDACTED") {
      return undefined;
    }

    const postcode = row["Postcode"].toUpperCase();
    const pc = postcodes[postcode];
    if (pc === undefined) {
      if (postcode.length > 0) {
        console.warn(
          `POSTCODE: ${postcode} not found for ${row["Provider name"]}`
        );
      }
      return undefined;
    }

    const id = getId({ urn: row['Provider URN'], localAuthorityId: -1, postcode});

    const localAuthortiy = localAuthorityParser(row["Local authority"]);
    const localAuthorityId = localAuthorities.find((la) => la.localAuthority === localAuthortiy ||
      (la.localAuthority === 'County Durham' &&  localAuthortiy === 'Durham'))?.localAuthorityId ?? -1;
    if(localAuthorityId < 0) {
      console.warn(`LA not found for ${localAuthortiy}`);
    }

    const school: ISchool = {
      id,
      // http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/CARE/EY101465
      webLink: `/CARE/${row["Provider URN"]}`,
      urn: row["Provider URN"],
      localAuthorityId,
      localAuthority: localAuthortiy,
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
      postcode,
      lat: pc.lat,
      long: pc.long,
      telephone: telephone(row["Telephone Number"]),

      // 'Parliamentary constituency',
      ageLow: undefined,
      ageHigh: undefined,
      gender: gender("MIXED"),
      religiousCharacter: undefined,
      adminPolicy: undefined,
      ofstedRating: rating(row['Most recent full: Overall effectiveness']),
      dateOfLastInspection: date(row['Most recent full: Inspection date']),

      census: undefined,
      financials: undefined,
      teachers: undefined,
      keyStage4: undefined,
      keyStage5: undefined
    };

    if(row['Provider URN'] === '119603') {
      console.log(JSON.stringify(row));
      console.log();
      console.log(JSON.stringify(school));
    }

    return school;
  };

  return await parser<ISchool>({
    fileName,
    transformer,
    parseOptions: { headers: true, skipLines: 3, ignoreEmpty: true },
  });
};
