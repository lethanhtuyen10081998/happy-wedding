import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete } from '@mui/material';
import { isEqual } from 'lodash';
import { forwardRef, useEffect, useState } from 'react';

import Checkbox from '../Checkbox';
import TextField from '../TextField';
import { Props } from './types';
export * from './types';

const getItemDefault = (item: any) => `${item}`;

function AutoCompleteInner<E extends unknown = string | number>(
  props: Props<E>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    label,
    controlProps,
    labelProps,
    options,
    itemProps,
    getItemValue = getItemDefault,
    getItemLabel = getItemDefault,
    error,
    helperText,
    required,
    multiple = false,
    value,
    loading,
    ...others
  } = props;
  const [itemList, setItemList] = useState<E[]>(() => (Array.isArray(options) ? options : []));

  useEffect(() => {
    setItemList(options);
  }, [options]);

  return (
    <Autocomplete
      ref={ref}
      options={itemList}
      getOptionLabel={(option: string | E | any) => getItemLabel(option)?.toString() || ''}
      renderOption={(props, option, { selected }) => {
        if (multiple) {
          return (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                checkedIcon={<CheckBoxIcon fontSize='small' />}
                checked={selected}
              />
              {getItemLabel(option)}
            </li>
          );
        }

        return <li {...props}>{getItemLabel(option)}</li>;
      }}
      loading
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={error}
          helperText={helperText}
          value={getItemValue(value as any)}
          InputProps={{
            ...params.InputProps,
            ...others.InputProps,
          }}
        />
      )}
      multiple={multiple}
      value={
        Array.isArray(value)
          ? itemList.filter((item) => value.some((it) => isEqual(item, it)))
          : value
      }
      {...others}
    />
  );
};

// Wrap with forwardRef for generic component
const AutoComplete = forwardRef(AutoCompleteInner) as <E extends unknown = string | number>(
  props: Props<E> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default AutoComplete;
