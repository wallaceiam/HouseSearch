import { IState } from "./interfaces";

export * from "./interfaces";
export * from "./reducer";
export * from "./selector";

export const defaultValue: IState = {
  effectiveness: 2,
  minAge: 2,
  maxAge: 18,
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

export const CategoryOfConcerns = ["SWK", "SM"];

export const FaithGroups = [
  "Non-faith",
  "Christian",
  "Jewish",
  "Muslim",
  "Other faith",
];

export const TypeOfEdications = [
  "Voluntary Aided School",
  "Voluntary Controlled School",
  "LA Nursery School",
  "Community School",
  "Community Special School",
  "Free School",
  "Free School Special",
  "Free School - Alternative Provision",
  "Academy Special Sponsor Led",
  "Academy Converter",
  "Academy Alternative Provision Converter",
  "Academy Sponsor Led",
  "Academy Special Converter",
  "Academy Alternative Provision Sponsor Led",
  "University Technical College",
  "City Technology College",
  "Studio School",
  "Foundation School",
  "Foundation Special School",
  "Pupil Referral Unit",
  "Non-Maintained Special School",
];
