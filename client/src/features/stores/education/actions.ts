import { ISchoolSummary } from "./types";

export const OFSTED_DATA_FETCHED = "OFSTED_DATA_FETCHED";
export const RATING_CHANGED = "RATING_CHANGED";
export const DISTANCE_CHANGED = "DISTANCE_CHANGED";
export const AGE_RANGE_CHANGED = "AGE_RANGE_CHANGED";
export const RELIGION_CHANGED = "RELIGION_CHANGED";
export const IDACI_CHANGED = "IDACI_CHANGED";
export const QUALITY_OF_EDUCATION_CHANGED = "QUALITY_OF_EDUCATION_CHANGED";
export const BEHAVIOUR_AND_ATTITUDEES_CHANGED =
  "BEHAVIOUR_AND_ATTITUDEES_CHANGED";
export const PERSONAL_DEVELOPMENT_CHANGED = "PERSONAL_DEVELOPMENT_CHANGED";
export const EFFECTIVENESS_OF_LEADERSHIP_CHANGED =
  "EFFECTIVENESS_OF_LEADERSHIP_CHANGED";
export const EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED =
  "EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED";

export const ofstedDataFetched = (data: ISchoolSummary[]) => ({
  type: OFSTED_DATA_FETCHED,
  data,
});

export const ratingChanged = (rating: number) => ({
  type: RATING_CHANGED,
  data: rating,
});

export const distanceChanged = (distance: number) => ({
  type: DISTANCE_CHANGED,
  data: distance,
});

export const ageRangeChanged = (range: number) => ({
  type: AGE_RANGE_CHANGED,
  data: range,
});

export const religionChanged = (religion: number) => ({
  type: RELIGION_CHANGED,
  data: religion,
});

export const idaciChanged = (idaci: number) => ({
  type: IDACI_CHANGED,
  data: idaci,
});

export const effectivenessOfSafeguardingChanged = (effectiveness: number) => ({
  type: EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED,
  data: effectiveness,
});

export const effectivenessOfLeadershipChanged = (effectiveness: number) => ({
  type: EFFECTIVENESS_OF_LEADERSHIP_CHANGED,
  data: effectiveness,
});

export const personalDevelopmentChanged = (effectiveness: number) => ({
  type: PERSONAL_DEVELOPMENT_CHANGED,
  data: effectiveness,
});

export const behaviourAndAttitudesChanged = (effectiveness: number) => ({
  type: BEHAVIOUR_AND_ATTITUDEES_CHANGED,
  data: effectiveness,
});
export const qualityOfEducationChanged = (effectiveness: number) => ({
  type: QUALITY_OF_EDUCATION_CHANGED,
  data: effectiveness,
});
