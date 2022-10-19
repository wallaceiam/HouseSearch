
export interface IMapState {
  readonly lat: number;
  readonly long: number;
  readonly zoom: number;

  readonly hasMapLoaded: boolean;
};

export interface IAction {
  readonly type: string;
  readonly data: any;
}