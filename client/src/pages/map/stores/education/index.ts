import { IEducationState } from "./types";

export * from "./actions";
export * from "./consts";
export * from "./types";
export * from "./reducer";
export * from "./selectors";

export const initialState: IEducationState = {
  rating: [2, 1],
  ageRange: 2,
  religion: [0, 1, 2, 3, 4],
  idaci: 3,
  qualityOfEducation: 2,
  behaviourAndAttitudes: 2,
  personalDevelopment: 2,
  effectivenessOfLeadership: 2,
  effectivenessOfSafeguarding: 1,

  distanceToStation: 0.6,
  distanceToSchool: 0.6,

};