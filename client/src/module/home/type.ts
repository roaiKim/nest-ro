export type TabType = 'a' | 'b' | 'c';

export interface RouteParam {
  type: TabType;
}

export interface State {
  type: TabType | undefined;
}
