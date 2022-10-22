export interface IPostcode {
  readonly postcode: string;
  readonly lat: number;
  readonly long: number;
}

export interface IPostcodeLookup {
  [postcode: string]: {
    readonly lat: number;
    readonly long: number;
  };
}

export interface ILocalAuthority {
  readonly localAuthorityId: number, 
  readonly localAuthority: string
};

export interface IUnique<T> {
  readonly urn: string;
  readonly localAuthorityId: number;
  readonly data: T;
}

interface ICensusData {
  readonly schoolType: string;
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

export interface ICensus extends IUnique<ICensusData> {}

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

interface IFinancialData {
  readonly isLondon: boolean;
  readonly median: string;
  readonly numOfFTEPupils: number;
  readonly perOfEligiblePupilsForFreeSchoolMeal: number;
  readonly freeSchoolMealsEligibilityBand: string;
  readonly perPupil: IFinancialsPerPupil;
  readonly perOfTotalIncome: IFinancialsPerOfTotalIncome;
  readonly perOfTotalExpenditure: IFinancialsPerOfTotalExpenditure;
}

export interface IFinancials extends IUnique<IFinancialData> {}

interface ITeacherData {
  readonly schoolPhase: string;
  readonly totalNumOfTeachers: number;
  readonly totalNumOfTeachingAssistants: number;
  readonly totalNumOfNonClassroomStaff: number;
  readonly totalNumOfTeachersFTE: number;
  readonly totalNumOfTeachingAssistantsFTE: number;
  readonly totalNumOfNonClassroomStaffFTE: number;
  readonly pupilTeacherRation: number;
  readonly meanGrossFTESalary: string;
}

export interface ITeacher extends IUnique<ITeacherData> {
}

interface IKeyStage4Data {
  readonly telePhone: string;
  readonly admissionPolicy: string;
  readonly admissionPolicy18: string;
  readonly isFeederForSixthForm: boolean;
  readonly isInKeyStage2PerformanceTables: boolean;
  readonly isInKeyStage45PerformanceTables: boolean;
  readonly numOfPupilsAtEndOfKeyStage4: number;
  readonly perOfKeyStage4Pupils: {
    readonly inAll: number;
    readonly inEnglish: number;
    readonly inMaths: number;
    readonly inScience: number;
    readonly inHumanities: number;
    readonly inLanguage: number;
  };
}

export interface IKeyStage4 extends IUnique<IKeyStage4Data> {
}

interface IKeyStage5Data {
  readonly description: string;
  readonly numOfEntries: number;
  readonly qualificationLevel: string;
  readonly qualificationType: string;
}

export interface IKeyStage5 extends IUnique<IKeyStage5Data> {
}

export interface ISchool {
  readonly id: string;
  readonly webLink: string;
  readonly urn: string;
  readonly localAuthorityId: number;
  readonly localAuthority: string;

  readonly name: string;
  readonly address: string;
  readonly address2: string | undefined;
  readonly address3: string | undefined;
  readonly town: string;
  readonly postcode: string;
  readonly telephone: string | undefined;
  readonly lat: number;
  readonly long: number;

  readonly minorGroup: string;
  readonly schoolType: string;
  readonly isOpen: boolean;
  readonly openDate: Date | undefined;
  readonly closedDate: Date | undefined;

  readonly isNursery: boolean;
  readonly isPrimary: boolean;
  readonly isSecondary: boolean;
  readonly isPost16: boolean;

  readonly ageLow: number | undefined;
  readonly ageHigh: number | undefined;
  readonly gender: number;

  readonly religiousCharacter: string | undefined;
  readonly adminPolicy: string | undefined;

  readonly ofstedRating: 1 | 2 | 3 | 4 | 0;
  readonly dateOfLastInspection: Date | undefined;

  readonly census: ICensusData | undefined;
  readonly financials: IFinancialData | undefined;
  readonly teachers: ITeacherData | undefined;
  readonly keyStage4: IKeyStage4Data | undefined;
  readonly keyStage5: IKeyStage5Data | undefined;
}

