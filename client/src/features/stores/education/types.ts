export interface IEducationState {
  ofsted?: ISchoolSummary[];

  // filters
  rating: number[];
  ageRange: number;
  religion: number[];
  distanceToStation: number;
  idaci: number;
  qualityOfEducation: number;
  behaviourAndAttitudes: number;
  personalDevelopment: number;
  effectivenessOfLeadership: number;
  effectivenessOfSafeguarding: number;

  distanceToSchool: number;
}

export interface IAction {
  type: string;
  data: any;
}

export interface ISchoolSummary {
  readonly id: string;
  readonly webLink: string;
  readonly urn: string;
  readonly name: string;
  readonly address: string;
  readonly telephone: string | undefined;
  readonly lat: number;
  readonly long: number;
  readonly rating: number;
  readonly localAuthority: string;
  readonly gender: number;
  readonly minorGroup: string;
  readonly schoolType: string;
  readonly isTypeFlag: number;
  readonly lastInspDate: Date | undefined;
}