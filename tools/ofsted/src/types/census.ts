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