import { Schema } from "mongoose";

export interface IFinancialsPerPupil {
  // income
  readonly grantFunding: number;
  readonly selfGeneratedIncome: number;
  readonly totalIncome: number;

  // expense
  readonly teachingStaff: number;
  readonly supplyTeachers: number;
  readonly educationSupportStaff: number;
  readonly premises: number;
  readonly backOffice: number;
  readonly catering: number;
  readonly otherStaff: number;
  readonly energy: number;
  readonly nonIctLearningResources: number;
  readonly ictLearningResources: number;
  readonly boughtInProfServices: number;
  readonly other: number;
  readonly totalExpenditure: number;
}

export const financialsPerPupilSchema = new Schema({
  grantFunding: { type: Number, required: true },
  selfGeneratedIncome: { type: Number, required: true },
  totalIncome: { type: Number, required: true },
  teachingStaff: { type: Number, required: true },
  supplyTeachers: { type: Number, required: true },
  educationSupportStaff: { type: Number, required: true },
  premises: { type: Number, required: true },
  backOffice: { type: Number, required: true },
  catering: { type: Number, required: true },
  otherStaff: { type: Number, required: true },
  energy: { type: Number, required: true },
  nonIctLearningResources: { type: Number, required: true },
  ictLearningResources: { type: Number, required: true },
  boughtInProfServices: { type: Number, required: true },
  other: { type: Number, required: true },
  totalExpenditure: { type: Number, required: true },
});

export interface IFinancialsPerOfTotalIncome {
  readonly grantFunding: number;
  readonly selfGeneratedIncome: number;
}

export const financialsPerOfTotalIncomeSchema = new Schema({
  grantFunding: { type: Number, required: true },
  selfGeneratedIncome: { type: Number, required: true },
});

export interface IFinancialsPerOfTotalExpenditure {
  readonly teachingStaff: number;
  readonly supplyTeachers: number;
  readonly educationSupportStaff: number;
  readonly premises: number;
  readonly backOffice: number;
  readonly catering: number;
  readonly otherStaff: number;
  readonly energy: number;
  readonly nonIctLearningResources: number;
  readonly ictLearningResources: number;
  readonly boughtInProfServices: number;
  readonly other: number;
}

export const financialsPerOfTotalExpenditureSchema = new Schema({
  teachingStaff: { type: Number, required: true },
  supplyTeachers: { type: Number, required: true },
  educationSupportStaff: { type: Number, required: true },
  premises: { type: Number, required: true },
  backOffice: { type: Number, required: true },
  catering: { type: Number, required: true },
  otherStaff: { type: Number, required: true },
  energy: { type: Number, required: true },
  nonIctLearningResources: { type: Number, required: true },
  ictLearningResources: { type: Number, required: true },
  boughtInProfServices: { type: Number, required: true },
  other: { type: Number, required: true },
});

export interface IFinancials {
  readonly isLondon: boolean;
  readonly median: string;
  readonly numOfFTEPupils: number;
  readonly perOfEligiblePupilsForFreeSchoolMeal: number;
  readonly freeSchoolMealsEligibilityBand: string;
  readonly perPupil: IFinancialsPerPupil;
  readonly perOfTotalIncome: IFinancialsPerOfTotalIncome;
  readonly perOfTotalExpenditure: IFinancialsPerOfTotalExpenditure;
}

export const financialsSchema = new Schema({
  isLondon: { type: Boolean, required: true },
  median: { type: String, required: true },
  numOfFTEPupils: { type: Number, required: true },
  perOfEligiblePupilsForFreeSchoolMeal: { type: Number, required: true },
  freeSchoolMealsEligibilityBand: { type: String, required: true },
  perPupil: { type: financialsPerPupilSchema, required: true },
  perOfTotalIncome: { type: financialsPerOfTotalIncomeSchema, required: true },
  perOfTotalExpenditure: { type: financialsPerOfTotalExpenditureSchema, required: true }
});