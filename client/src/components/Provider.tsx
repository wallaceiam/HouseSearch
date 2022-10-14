import React, { useReducer, useEffect } from "react";
import {
  reducer,
  fetchOfsted,
  fetchStations,
  defaultValue,
  IOfstedSchool,
  IState,
  IAction,
} from "../store";

export const Context = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
} | null>(null);

interface IProviderProps {
  readonly children?: React.ReactNode;
}

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);

  useEffect(() => {
    fetch("http://localhost:3010/v1/data/ofsted")
      .then((response) => response.json())
      .then((data: any[]) => data.map((d) => ({...d, age: (d.age as string).split(',').map((n) => +n)})))
      .then((data: IOfstedSchool[]) => dispatch(fetchOfsted(data)));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3010/v1/data/stations")
      .then((response) => response.json())
      .then((data) => dispatch(fetchStations(data)));
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
