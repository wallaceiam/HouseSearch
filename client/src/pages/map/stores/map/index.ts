import { IMapState } from "./types";

export * from "./actions";
export * from "./types";
export * from "./reducer";

export const initialState: IMapState = {
  long: -0.1276,
  lat: 51.5072,
  zoom: 9.5,

  hasMapLoaded: false,
};
