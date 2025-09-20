export interface SpinnerState {
  show: boolean;
  showCount: number;
  message?: string;
}

export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';
