export interface IEducationState {
  ofsted?: IOfstedSchool[];

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

export interface IOfstedSchool {
  readonly urn: string;
  readonly webLink: string;
  readonly name: string;
  readonly region: string;
  readonly faithGroup: number;
  readonly postcode: string;
  readonly overallEffectiveness: number;
  readonly typeOfEducation: string;
  readonly lat: number;
  readonly long: number;
  readonly idaci: number;
  readonly totalNumOfPupils: number;
  readonly age: [number, number];
  readonly catOfConcern: string;
  readonly qualityOfEducation: number;
  readonly behaviourAndAttitudes: number;
  readonly personalDevelopment: number;
  readonly effectivenessOfLeadership: number;
  readonly effectivenessOfSafeguarding: number;
}