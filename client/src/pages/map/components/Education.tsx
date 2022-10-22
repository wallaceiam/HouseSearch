import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext } from "react";
import {
  qualityOfEducationChanged,
  ageRangeChanged,
  distanceChanged,
  religionChanged,
  idaciChanged,
  behaviourAndAttitudesChanged,
  personalDevelopmentChanged,
  effectivenessOfLeadershipChanged,
  effectivenessOfSafeguardingChanged,
  ratingChanged,
} from "../stores/education";
import { EducationContext } from "./EducationProvider";
import Rating from "../../../components/Rating";
import Range from "../../../components/Range";
import Section, { IExpandingProps } from "../../../components/Section";
import DropdownWithCheckBoxes from "../../../components/DropdownWithCheckboxes";
import Dropdown from "../../../components/Dropdown";

const ratingTitles = {
  1: "Outstanding",
  2: "Good",
  3: "Requires Improvement",
  4: "Inadequate",
};

const ageRangeTitles = {
  1: "Nursery (0-4 years)",
  2: "Primary (4-11 years)",
  3: "Secondary (11-18 years)",
  4: "Sixth Form (16-18 years)",
  5: "All Schools (4-18 years)",
  6: "All Schools & Nurseries"
}

const idaciTitles = {
  1: "Least Deprived",
  2: "",
  3: "",
  4: "",
  5: "Most Deprived",
};

const faithGroups = {
  0: "Non-faith",
  1: "Christian",
  2: "Jewish",
  3: "Muslim",
  4: "Other faith",
};

const Education = ({ expanded, onToggleExpand }: IExpandingProps) => {
  const { state, dispatch } = useContext(EducationContext)!;

  const setRating = useCallback(
    (effectiveness: number) => {
      dispatch(ratingChanged(effectiveness));
    },
    [dispatch]
  );

  const setDistanceToSchool = useCallback(
    (distance: number) => {
      dispatch(distanceChanged(distance));
    },
    [dispatch]
  );

  const setAgeRange = useCallback(
    (range: number) => {
      dispatch(ageRangeChanged(range));
    },
    [dispatch]
  );

  const setReligion = useCallback(
    (religionId: number) => {
      dispatch(religionChanged(religionId));
    },
    [dispatch]
  );

  const setIdaci = useCallback(
    (idaci: number) => {
      dispatch(idaciChanged(idaci));
    },
    [dispatch]
  );

  const setQuatityOfEducation = useCallback(
    (effectiveness: number) => {
      dispatch(qualityOfEducationChanged(effectiveness));
    },
    [dispatch]
  );

  const setBehaviourAndAttitudes = useCallback(
    (effectiveness: number) => {
      dispatch(behaviourAndAttitudesChanged(effectiveness));
    },
    [dispatch]
  );

  const setPersonalDevelopment = useCallback(
    (effectiveness: number) => {
      dispatch(personalDevelopmentChanged(effectiveness));
    },
    [dispatch]
  );

  const setEffectivenessOfLeadership = useCallback(
    (effectiveness: number) => {
      dispatch(effectivenessOfLeadershipChanged(effectiveness));
    },
    [dispatch]
  );

  const setEffectivenessOfSafefuarding = useCallback(
    (effectiveness: number) => {
      dispatch(effectivenessOfSafeguardingChanged(effectiveness));
    },
    [dispatch]
  );

  return (
    <Section
      icon={
        <AcademicCapIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      }
      title="Schools"
      expanded={expanded}
      onToggleExpand={onToggleExpand}
    >
      <DropdownWithCheckBoxes
        id="rating"
        items={ratingTitles}
        label="Overall Rating"
        selectedItems={state.rating}
        onItemSelected={setRating}
      />

      <Dropdown
        id="age"
        items={ageRangeTitles}
        label="Age Range"
        selectedItem={state.ageRange}
        onItemSelected={setAgeRange}
        />

      <DropdownWithCheckBoxes
        id="faith"
        items={faithGroups}
        label="Faith"
        selectedItems={state.religion}
        onItemSelected={setReligion}
      />
      <Rating
        titles={idaciTitles}
        label="IDACI"
        value={state.idaci}
        setValue={setIdaci}
      />
      <Rating
        titles={ratingTitles}
        label="Quality of Education"
        value={state.qualityOfEducation}
        setValue={setQuatityOfEducation}
      />
      <Rating
        titles={ratingTitles}
        label="Behaviour & Attitudes"
        value={state.behaviourAndAttitudes}
        setValue={setBehaviourAndAttitudes}
      />
      <Rating
        titles={ratingTitles}
        label="Personal Development"
        value={state.personalDevelopment}
        setValue={setPersonalDevelopment}
      />
      <Rating
        titles={ratingTitles}
        label="Leadership"
        value={state.effectivenessOfLeadership}
        setValue={setEffectivenessOfLeadership}
      />
      <Rating
        titles={ratingTitles}
        label="Safeguarding"
        value={state.effectivenessOfSafeguarding}
        setValue={setEffectivenessOfSafefuarding}
      />
      <Range
        label="Distance to school"
        value={state.distanceToSchool}
        setValue={setDistanceToSchool}
      />
    </Section>
  );
};

export default Education;
