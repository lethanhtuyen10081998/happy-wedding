export enum ActionsTypes {
  ON_SET_BREADCRUM = 'ON_SET_BREADCRUM',
  ON_COLLAPSIBLE_DRAWER = 'ON_COLLAPSIBLE_DRAWER',
}

export type Actions =
  | {
      type: ActionsTypes.ON_SET_BREADCRUM;
      payload: Breadcrumb[];
    }
  | {
      type: ActionsTypes.ON_COLLAPSIBLE_DRAWER;
      payload: boolean;
    };

export type API = {
  onSetBreadcrum: (value: Breadcrumb[]) => void;
  onSetCollapsible: (value: boolean) => void;
};

export interface State {
  breadcrumbs: Breadcrumb[];
  collapsible: boolean;
}

export type Breadcrumb = {
  label: string;
  link?: string;
};
