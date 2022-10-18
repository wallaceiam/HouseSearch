import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext } from "react";
import {
  qualityOfEducationChanged,
  minAgeChanged,
  maxAgeChanged,
  schoolDistanceChanged,
  FaithGroups,
  toggleReligion,
  idaciChanged,
  behaviourAndAttitudesChanged,
  personalDevelopmentChanged,
  effectivenessOfLeadershipChanged,
  effectivenessOfSafeguardingChanged,
  schoolEffectivenessChanged,
} from "../../../store";
import { Context } from "./Provider";
import Rating from "../../../components/Rating";
import Range from "../../../components/Range";
import Section, { IExpandingProps } from "../../../components/Section";
import GroupComobo from "../../../components/GroupCombo";

const effectivenessTitles = {
  1: "Outstanding",
  2: "Good",
  3: "Requires Improvement",
  4: "Inadequate",
};

const idaciTitles = {
  1: "Least Deprived",
  2: "",
  3: "",
  4: "",
  5: "Most Deprived",
};

const Education = ({ expanded, onToggleExpand }: IExpandingProps) => {
  const { state, dispatch } = useContext(Context)!;

  const setEffectiveness = useCallback(
    (effectiveness: number) => {
      dispatch(schoolEffectivenessChanged(effectiveness));
    },
    [dispatch]
  );

  const setDistanceToSchool = useCallback(
    (distance: number) => {
      dispatch(schoolDistanceChanged(distance));
    },
    [dispatch]
  );

  const setMinAge = useCallback(
    (minAge: number) => {
      dispatch(minAgeChanged(minAge));
    },
    [dispatch]
  );

  const setMaxAge = useCallback(
    (maxAge: number) => {
      dispatch(maxAgeChanged(maxAge));
    },
    [dispatch]
  );

  const setReligion = useCallback(
    (religionId: number) => {
      dispatch(toggleReligion(religionId));
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
      <Rating
        titles={effectivenessTitles}
        label="Overall"
        value={state.effectiveness}
        setValue={setEffectiveness}
      />
      <Range
        label="Min Age"
        value={state.minAge}
        min={1}
        max={18}
        setValue={setMinAge}
      />
      <Range
        label="Max Age"
        value={state.maxAge}
        min={1}
        max={18}
        setValue={setMaxAge}
      />
      <GroupComobo
        label="Religion"
        checked={state.religion}
        items={FaithGroups}
        setChecked={setReligion}
      />
      <Rating
        titles={idaciTitles}
        label="IDACI"
        value={state.idaci}
        setValue={setIdaci}
      />
      <Rating
        titles={effectivenessTitles}
        label="Quality of Education"
        value={state.qualityOfEducation}
        setValue={setQuatityOfEducation}
      />
      <Rating
        titles={effectivenessTitles}
        label="Behaviour & Attitudes"
        value={state.behaviourAndAttitudes}
        setValue={setBehaviourAndAttitudes}
      />
      <Rating
        titles={effectivenessTitles}
        label="Personal Development"
        value={state.personalDevelopment}
        setValue={setPersonalDevelopment}
      />
      <Rating
        titles={effectivenessTitles}
        label="Leadership"
        value={state.effectivenessOfLeadership}
        setValue={setEffectivenessOfLeadership}
      />
      <Rating
        titles={effectivenessTitles}
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
