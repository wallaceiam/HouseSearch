interface IFinancialsPerPupil {
  readonly grantFunding: number;
  readonly selfGeneratedIncome: number;
  readonly totalIncome: number;

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

interface IFinancialsPerOfTotalIncome {
  readonly grantFunding: number;
  readonly selfGeneratedIncome: number;
}

interface IFinancialsPerOfTotalExpenditure {
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