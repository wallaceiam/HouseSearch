import { useMemo } from "react";
import { IEducationState, ISchoolSummary } from "./types";

const filterAgeRange = (ageRangeId: number, [lowest, highest]: number[]): boolean => {
  switch(ageRangeId) {
    // case 6: return true;
    case 5: return lowest >= 4;
    case 4: return highest <= 18 && lowest <= 16;
    case 3: return highest <= 18 && lowest <= 11;
    case 2: return lowest >= 4 && highest <= 11;
    case 1: return highest <= 4;
  }
  // const ageRangeTitles = {
  //   1: "Nursery (0-4 years)",
  //   2: "Primary (4-11 years)",
  //   3: "Secondary (11-18 years)",
  //   4: "Sixth Form (16-18 years)",
  //   5: "All Schools (4-18 years)",
  //   6: "All Schools & Nurseries"
  // }
  return true;
}

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

const educationFilter = (ratingFilter: number[], ageRangeFilter: number) => {
  return ({rating}: ISchoolSummary) => ratingFilter.includes(rating);
}
const getOfstedGeoJson = ({
  ofsted = [],
  rating,
  ageRange,
  religion,
  idaci: _idaci
}: IEducationState) => {
  const features = ofsted
    .filter(educationFilter(rating, ageRange))
    // .filter(
    //   ({ overallEffectiveness: overall }) => rating.includes(overall)
    // )
    // .filter(({ age }) => filterAgeRange(ageRange, age))
    // // .filter(({ age }) => {
    // //   const [lowestAge, highestAge] = age;
    // //   return minAge <= lowestAge && maxAge >= highestAge;
    // // })
    // .filter(({ faithGroup }) => religion.includes(faithGroup))
    // .filter(({ idaci }) => +idaci <= _idaci);

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

export const useGeoJson = (state: IEducationState) => {
  const ofstedGeoJson = useMemo(() => {
    return getOfstedGeoJson(state);
  }, [state]);

  return {
    ofstedGeoJson,
  };
};
