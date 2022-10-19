import { IAction } from "./types";

export const MOVE_VIEW = "MOVE_VIEW";
export const MAP_LOADED = "MAP_LOADED";

interface IMoveView {
  readonly lat: number;
  readonly long: number;
  readonly zoom: number;
}

export const moveView = (data: IMoveView): IAction => ({
  type: MOVE_VIEW,
  data,
});

export const mapLoaded = (): IAction => ({
  type: MAP_LOADED,
  data: true,
});