import {
  BEHAVIOUR_AND_ATTITUDEES_CHANGED,
  EFFECTIVENESS_OF_LEADERSHIP_CHANGED,
  EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED,
  OFSTED_DATA_FETCHED,
  IDACI_CHANGED,
  AGE_RANGE_CHANGED,
  PERSONAL_DEVELOPMENT_CHANGED,
  QUALITY_OF_EDUCATION_CHANGED,
  DISTANCE_CHANGED,
  RATING_CHANGED,
  RELIGION_CHANGED,
} from "./actions";
import { IAction, IEducationState } from "./types";

export const reducer = (
  state: IEducationState,
  { type, data }: IAction
): IEducationState => {
  switch (type) {
    case OFSTED_DATA_FETCHED:
      return {
        ...state,
        ofsted: data,
      };
    case RATING_CHANGED:
      if (state.rating.includes(data)) {
        return {
          ...state,
          rating: [...state.rating.filter((r) => r !== data)],
        };
      }
      return { ...state, rating: [...state.rating, data] };
    case AGE_RANGE_CHANGED:
      return { ...state, ageRange: data };
    case DISTANCE_CHANGED:
      return { ...state, distanceToSchool: data };
    case RELIGION_CHANGED:
      if (state.religion.includes(data)) {
        return {
          ...state,
          religion: [...state.religion.filter((r) => r !== data)],
        };
      }
      return { ...state, religion: [...state.religion, data] };
    case IDACI_CHANGED:
      return { ...state, idaci: data };
    case QUALITY_OF_EDUCATION_CHANGED:
      return { ...state, qualityOfEducation: data };
    case BEHAVIOUR_AND_ATTITUDEES_CHANGED:
      return { ...state, behaviourAndAttitudes: data };
    case PERSONAL_DEVELOPMENT_CHANGED:
      return { ...state, personalDevelopment: data };
    case EFFECTIVENESS_OF_LEADERSHIP_CHANGED:
      return { ...state, effectivenessOfLeadership: data };
    case EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED:
      return { ...state, effectivenessOfSafeguarding: data };
    default:
      return state;
  }
};
