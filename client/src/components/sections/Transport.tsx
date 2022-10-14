import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useContext, useCallback } from "react";
import Section, { IExpandingProps } from "../Section";
import Range from "../Range";
import { Context } from "../Provider";
import { stationDistanceChanged } from "../../store";

const Transport = ({ expanded, onToggleExpand }: IExpandingProps) => {
  const { state, dispatch } = useContext(Context)!;

  const setDistanceToStation = useCallback((distance: number) => {
    dispatch(stationDistanceChanged(distance));
  }, [dispatch]);
  
  return (
    <Section
      icon={
        <PaperAirplaneIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      }
      title="Transport"
      expanded={expanded}
      onToggleExpand={onToggleExpand}
    >
      <Range label="Distance to transport" value={state.distanceToStation} setValue={setDistanceToStation} />
    </Section>
  );
};

export default Transport;

