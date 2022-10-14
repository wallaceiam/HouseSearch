export interface IState {
  ofsted?: IOfstedSchool[];

  stations?: IStation[];

  // filters
  effectiveness: number;
  minAge: number;
  maxAge: number;
  religion: number[];
  distanceToStation: number;
  idaci: number;
  qualityOfEducation: number;
  behaviourAndAttitudes: number;
  personalDevelopment: number;
  effectivenessOfLeadership: number;
  effectivenessOfSafeguarding: number;

  distanceToSchool: number;

  // pos
  lat: number;
  long: number;
  zoom: number;

  mapLoaded: boolean;
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

export interface IStation {
  readonly station: string;
  readonly lat: number;
  readonly long: number;
  readonly zone: string;
  readonly postcode: string;
  readonly type: string;
}

export interface IMoveView {
  readonly lat: number;
  readonly long: number;
  readonly zoom: number;
}
