import React, { useReducer } from "react";
import { IAction, IMapState, reducer, initialState } from "../stores/map";

export const MapContext = React.createContext<{
  state: IMapState;
  dispatch: React.Dispatch<IAction>;
} | null>(null);

interface IMapProviderProps {
  readonly children?: React.ReactNode;
}

const MapProvider = (props: IMapProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapProvider;
