import {
  IAction,
  IMoveView,
  IOfstedSchool,
  IState,
  IStation,
} from "./interfaces";

// actions
const FETCH_OFSTED = "FETCH_OFSTED";
const FETCH_STATIONS = "FETCH_STATIONS";
const MOVE_VIEW = "MOVE_VIEW";
const MAP_LOADED = "MAP_LOADED";
const SCHOOL_EFFECTIVENESS_CHANGED = "SCHOOL_EFFECTIVENESS_CHANGED";
const SCHOOL_DISTANCE_CHANGED = "SCHOOL_DISTANCE_CHANGED";
const MAX_AGE_CHANGED = "MAX_AGE_CHANGED";
const MIN_AGE_CHANGED = "MIN_AGE_CHANGED";
const TOGGLE_RELIGION = "TOGGLE_RELIGION";
const STATION_DISTANCE_CHANGED = "STATION_DISTANCE_CHANGED";
const IDACI_CHANGED = "IDACI_CHANGED";
const QUALITY_OF_EDUCATION_CHANGED = "QUALITY_OF_EDUCATION_CHANGED";
const BEHAVIOUR_AND_ATTITUDEES_CHANGED = "BEHAVIOUR_AND_ATTITUDEES_CHANGED";
const PERSONAL_DEVELOPMENT_CHANGED = "PERSONAL_DEVELOPMENT_CHANGED";
const EFFECTIVENESS_OF_LEADERSHIP_CHANGED =
  "EFFECTIVENESS_OF_LEADERSHIP_CHANGED";
const EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED =
  "EFFECTIVENESS_OF_SAFEGUARDING_CHNAGED";

// action creators
export const fetchOfsted = (data: IOfstedSchool[]) => ({
  type: FETCH_OFSTED,
  data,
});

export const fetchStations = (data: IStation[]) => ({
  type: FETCH_STATIONS,
  data,
});

export const moveView = (data: IMoveView) => ({
  type: MOVE_VIEW,
  data,
});

export const mapLoaded = () => ({
  type: MAP_LOADED,
  data: true,
});

export const schoolEffectivenessChanged = (effectiveness: number) => ({
  type: SCHOOL_EFFECTIVENESS_CHANGED,
  data: effectiveness,
});

export const schoolDistanceChanged = (distance: number) => ({
  type: SCHOOL_DISTANCE_CHANGED,
  data: distance,
});

export const minAgeChanged = (minAge: number) => ({
  type: MIN_AGE_CHANGED,
  data: minAge,
});

export const maxAgeChanged = (maxAge: number) => ({
  type: MAX_AGE_CHANGED,
  data: maxAge,
});

export const toggleReligion = (religionId: number) => ({
  type: TOGGLE_RELIGION,
  data: religionId,
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

export const stationDistanceChanged = (distance: number) => ({
  type: STATION_DISTANCE_CHANGED,
  data: distance,
});

export const reducer = (state: IState, { type, data }: IAction): IState => {
  switch (type) {
    case FETCH_OFSTED:
      return {
        ...state,
        ofsted: data,
      };
    case FETCH_STATIONS:
      return {
        ...state,
        stations: data,
      };
    case MOVE_VIEW:
      return { ...state, ...data };
    case MAP_LOADED:
      return { ...state, mapLoaded: true };
    case SCHOOL_EFFECTIVENESS_CHANGED:
      return {
        ...state,
        effectiveness: data,
      };
    case MIN_AGE_CHANGED:
      return { ...state, minAge: data };
    case MAX_AGE_CHANGED:
      return { ...state, maxAge: data };
    case SCHOOL_DISTANCE_CHANGED:
      return { ...state, distanceToSchool: data };
    case TOGGLE_RELIGION:
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
    case STATION_DISTANCE_CHANGED:
      return { ...state, distanceToStation: data };
    default:
      return state;
  }
};
