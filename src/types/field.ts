import { InputProps } from '@mui/material';

export type FieldConfigType = {
  label: string;
  placeHolder: string;
  input: InputType;
  rulesList: {
    rule: string;
    label: string;
  }[];
  fieldName: string;
  value?: string | number;
  optionList?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  extraRules?: {
    label: string;
    function: string;
    targetField: string;
  }[];
  clickableList?: ClickableConfig[];
  InputProps?: Partial<InputProps>;
};

export type ClickableConfig = {
  linkStart: number;
  linkLength: number;
  action:
    | 'OPEN_WEBVIEW'
    | 'RESEND_EMAIL_CODE'
    | 'SHOW_SIGN_UP_SCREEN'
    | 'SHOW_SIGN_IN_SCREEN'
    | 'SHOW_FORGOT_PASSWORD_SCREEN';
  paramList: {
    url?: string;
    type?: string;
    data?: string;
    email?: string;
  };
};

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  DATEPICKER = 'datepicker',
  EMAIL = 'email',
  SELECT = 'select',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  HIDDEN = 'hidden',
}

export type CoreType = {
  label: string;
  value: string;
};

export namespace Form {
  export type ExtraButton = {
    label: string;
    clickableList: ClickableConfig[];
    enableTime?: number;
  };
  export type Data = {
    inputList: FieldConfigType[];
  };
}
