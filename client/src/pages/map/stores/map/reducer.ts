import { MAP_LOADED, MOVE_VIEW } from "./actions";
import { IAction, IMapState } from "./types";

export const reducer = (state: IMapState, { type, data }: IAction): IMapState => {
  switch (type) {
    case MOVE_VIEW:
      return { ...state, ...data };
    case MAP_LOADED:
      return { ...state, hasMapLoaded: true };
    default:
      return state;
  }
};
