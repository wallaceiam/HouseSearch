import { Schema } from "mongoose";

export interface ICensus {
  readonly censusSchoolType: string;
  readonly totalNumOnRoll: number;
  readonly totalNumOfGirldONRoll: number;
  readonly totalNumOfBoysOnRoll: number;
  readonly numOfSENPupilsWithEHCPlan: number;
  readonly numOfEligiblePupilsWithSENSupport: number;
  readonly numOfEnglishNotFirstLang: number;
  readonly numOfEnglishFirstLang: number;
  readonly numOfUnclassifiedFirstLang: number;
  readonly numOfEligibleFreeSchoolMeal: number;
  readonly numOfEligibleFreeSchoolMealInPast6m: number;
}

export const censusSchema = new Schema({
  censusSchoolType: { type: String, required: true },
  totalNumOnRoll: { type: Number, required: true },
  totalNumOfGirldONRoll: { type: Number, required: true },
  totalNumOfBoysOnRoll: { type: Number, required: true },
  numOfSENPupilsWithEHCPlan: { type: Number, required: true },
  numOfEligiblePupilsWithSENSupport: { type: Number, required: true },
  numOfEnglishNotFirstLang: { type: Number, required: true },
  numOfEnglishFirstLang: { type: Number, required: true },
  numOfUnclassifiedFirstLang: { type: Number, required: true },
  numOfEligibleFreeSchoolMeal: { type: Number, required: true },
  numOfEligibleFreeSchoolMealInPast6m: { type: Number, required: true },
});
