import React from 'react';
import AutoCompleteField from 'src/components/material/form/AutoCompleteField';
import CheckboxField from 'src/components/material/form/CheckboxField';
import TextField from 'src/components/material/form/FormTextField';
import PasswordField from 'src/components/material/form/PasswordField';
import { CoreType, FieldConfigType, InputType } from 'src/types/field';

const fields: { [key: string]: React.ElementType } = {
  [InputType.PASSWORD]: PasswordField,
  [InputType.TEXT]: TextField,
  [InputType.EMAIL]: TextField,
  [InputType.SELECT]: AutoCompleteField,
  [InputType.CHECKBOX]: CheckboxField,
  [InputType.NUMBER]: TextField,
};

const FieldDynamic = (props: FieldConfigType): JSX.Element => {
  const Component: any = fields[props.input];
  const { fieldName, label, placeHolder, optionList = [], InputProps, disabled } = props;

  let selectFieldProps = {};
  if (props.input === InputType.SELECT) {
    selectFieldProps = {
      getItemLabel: (item: CoreType) => item.label,
      getItemValue: (item: CoreType) => item.value,
    };
  }

  return (
    <Component
      name={fieldName}
      label={label}
      placeholder={placeHolder}
      options={optionList}
      InputProps={InputProps}
      disabled={disabled}
      {...selectFieldProps}
    />
  );
};

export default FieldDynamic;
