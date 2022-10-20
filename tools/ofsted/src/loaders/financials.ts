import path from "path";

import { parser } from "../parser";
import { IFinancials } from "../types";

export const getFinancials = async (dir: string) => {
  const fileName = path.resolve(dir, "ofsted", "2020-2021", "england_cfr.csv");

  const transformer = (row: any): IFinancials | undefined => {
    if(row['URN'] === "") {
      return undefined;
    }
    const cfi: IFinancials = {
      urn: row["URN"],
      localAuthorityId: row["LA"],
      data: {
        isLondon: row["LONDON/NON-LONDON"] === "London",
        median: row["MEDIAN"],
        numOfFTEPupils: +row["PUPILS"],
        perOfEligiblePupilsForFreeSchoolMeal: +row["FSM"],
        freeSchoolMealsEligibilityBand: row["FSMBAND"],
        perPupil: {
          grantFunding: +row["GRANTFUNDING"],
          selfGeneratedIncome: +row["SELFGENERATEDINCOME"],
          totalIncome: +row["TOTALINCOME"],

          teachingStaff: +row["TEACHINGSTAFF"],
          supplyTeachers: +row["SUPPLYTEACHERS"],
          educationSupportStaff: +row["EDUCATIONSUPPORTSTAFF"],
          premises: +row["PREMISES"],
          backOffice: +row["BACKOFFICE"],
          catering: +row["CATERING"],
          otherStaff: +row["OTHERSTAFF"],
          energy: +row["ENERGY"],
          nonIctLearningResources: +row["LEARNINGRESOURCES"],
          ictLearningResources: +row["ICT"],
          boughtInProfServices: +row["BOUGHTINPROFESSIONALSERVICES"],
          other: +row["OTHER"],
          totalExpenditure: +row["TOTALEXPENDITURE"],
        },
        perOfTotalIncome: {
          grantFunding: +row["PGRANTFUNDING"],
          selfGeneratedIncome: +row["PSELFGENERATEDINCOME"],
        },
        perOfTotalExpenditure: {
          teachingStaff: +row["PTEACHINGSTAFF"],
          supplyTeachers: +row["PSUPPLYTEACHERS"],
          educationSupportStaff: +row["PEDUCATIONSUPPORTSTAFF"],
          premises: +row["PPREMISES"],
          backOffice: +row["PBACKOFFICE"],
          catering: +row["PCATERING"],
          otherStaff: +row["POTHERSTAFF"],
          energy: +row["PENERGY"],
          nonIctLearningResources: +row["PLEARNINGRESOURCES"],
          ictLearningResources: +row["PICT"],
          boughtInProfServices: +row["PBOUGHTINPROFESSIONALSERVICES"],
          other: +row["POTHER"],
        },
      },
    };

    return cfi;
  };

  return await parser<IFinancials>({
    fileName,
    transformer,
  });
};
