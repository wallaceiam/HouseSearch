import React, { useReducer, useEffect } from "react";
import {
  reducer,
  ofstedDataFetched,
  initialState,
  IOfstedSchool,
  IEducationState,
  IAction,
} from "../../stores/education";

export const EducationContext =
  React.createContext<{
    state: IEducationState;
    dispatch: React.Dispatch<IAction>;
  } | null>(null);

interface IProviderProps {
  readonly children?: React.ReactNode;
}

const EducationProvider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:3010/v1/data/ofsted")
      .then((response) => response.json())
      .then((data: IOfstedSchool[]) => dispatch(ofstedDataFetched(data)));
  }, []);

  return (
    <EducationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </EducationContext.Provider>
  );
};

export default EducationProvider;
