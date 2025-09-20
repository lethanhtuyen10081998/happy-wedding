export enum ActionsTypes {
  ON_SET_REFS = 'ON_SET_REFS',
  ON_EXCUTE_REF = 'ON_EXCUTE_REF',
  ON_EXCUTE_ALL_REF = 'ON_EXCUTE_ALL_REF',
}

export type Actions =
  | {
      type: ActionsTypes.ON_SET_REFS;
      payload: RefsState;
    }
  | {
      type: ActionsTypes.ON_EXCUTE_REF;
      payload: string;
    }
  | {
      type: ActionsTypes.ON_EXCUTE_ALL_REF;
    };

export type API = {
  onSetRefs(payload: RefsState): void;
  onExcuteRef(payload: string): void;
  onExcuteAllRef(): void;
};

export interface State {
  refs: RefsState;
}

export type RefsState = {
  [key: string]: () => void;
};
