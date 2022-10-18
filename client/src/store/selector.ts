import { useMemo } from "react";
import { IOfstedSchool, IState, IStation } from "./interfaces";

// 0 = Insufficient evidence
// 1 = Outstanding
// 2 = Good
// 3 = Requires improvement (previously satisfactory)
// 4 = Inadequate
// SWK = Serious Weaknesses
// SM = Special Measures
// 8 = Does not apply (used for the early years judgement from January to August 2012)
// 9 = No Judgement. Pupils achievement is shown under three differing frameworks.
// Null = No data available.  Some schools are yet to be inspected and so no inspection data are available."

const getOfstedGeoJson = (
  ofsted: IOfstedSchool[],
  effectiveness: number,
  minAge: number,
  maxAge: number,
  religionIds: number[],
  _idaci: number,
  _qualityOfEducation: number,
  _behaviourAndAttitudes: number,
  _personalDevelopment: number,
  _effectivenessOfLeadership: number,
  _effectivenessOfSafeguarding: number
) => {
  const features = ofsted
    .filter(
      ({
        overallEffectiveness: overall,
        qualityOfEducation,
        behaviourAndAttitudes,
        personalDevelopment,
        effectivenessOfLeadership,
        effectivenessOfSafeguarding,
      }) =>
        +overall <= effectiveness &&
        qualityOfEducation <= _qualityOfEducation &&
        behaviourAndAttitudes <= _behaviourAndAttitudes &&
        personalDevelopment <= _personalDevelopment &&
        effectivenessOfLeadership <= _effectivenessOfLeadership &&
        effectivenessOfSafeguarding <= _effectivenessOfSafeguarding
    )
    .filter(({ age }) => {
      const [lowestAge, highestAge] = age;
      return minAge <= lowestAge && maxAge >= highestAge;
    })
    .filter(({ faithGroup }) => religionIds.includes(+faithGroup))
    .filter(({ idaci }) => +idaci <= _idaci);

  const result = {
    type: "FeatureCollection",
    features: features.map(({ lat, long, ...rest }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [+long, +lat],
      },
      properties: rest,
    })),
  };

  return result;
};

const getStatiomGeoJson = (data: IStation[]) => {
  const result = {
    type: "FeatureCollection",
    features: data.map(({ lat, long, ...rest }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [+long, +lat],
      },
      properties: rest,
    })),
  };

  return result;
};

export const useGeoJson = (state: IState) => {
  const ofstedGeoJson = useMemo(() => {
    return getOfstedGeoJson(
      state.ofsted ?? [],
      state.effectiveness,
      state.minAge,
      state.maxAge,
      state.religion,
      state.idaci,
      state.qualityOfEducation,
      state.behaviourAndAttitudes,
      state.personalDevelopment,
      state.effectivenessOfLeadership,
      state.effectivenessOfSafeguarding
    );
  }, [
    state.ofsted,
    state.effectiveness,
    state.minAge,
    state.maxAge,
    state.religion,
    state.idaci,
    state.qualityOfEducation,
    state.behaviourAndAttitudes,
    state.personalDevelopment,
    state.effectivenessOfLeadership,
    state.effectivenessOfSafeguarding,
  ]);

  const stationGeoJson = useMemo(() => {
    return getStatiomGeoJson(state.stations ?? []);
  }, [state.stations]);

  return {
    ofstedGeoJson,
    stationGeoJson,
  };
};
