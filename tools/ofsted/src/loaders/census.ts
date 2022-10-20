import path from "path";

import { parser } from "../parser";
import { ICensus } from "../types";

export const getCensus = async (dir: string) => {
  const fileName = path.resolve(
    dir,
    "ofsted",
    "2020-2021",
    "england_census.csv"
  );

  const transformer = (row: any): ICensus | undefined => {
    if(row['URN'] === "") {
      return undefined;
    }
    const census: ICensus = {
      urn: row["URN"],
      localAuthorityId: +row["LA"],
      data: {
        schoolType: row["SCHOOLTYPE"],
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
      },
    };

    return census;
  };

  return await parser<ICensus>({
    fileName,
    transformer,
  });
};
