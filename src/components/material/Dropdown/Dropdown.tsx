import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

import FormHelperText from '../FormHelperText';
import { Props } from './types';

const getItemDefault = (item: any) => `${item}`;

const Dropdown = <E extends unknown = string | number>(props: Props<E>) => {
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
    value,
    ...others
  } = props;

  const [itemList, setItemList] = useState<E[]>(() => (Array.isArray(options) ? options : []));

  useEffect(() => {
    if (!Array.isArray(options)) {
      options().then(setItemList);
    }
  }, [options]);

  return (
    <FormControl variant={others.variant || 'outlined'} fullWidth error={!!error} {...controlProps}>
      <InputLabel {...labelProps}>{label}</InputLabel>

      <Select label={label} fullWidth {...others} value={value}>
        {itemList.map((item) => {
          const keyValue = getItemValue(item);
          return (
            <MenuItem key={keyValue} value={keyValue} {...itemProps}>
              {getItemLabel(item)}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Dropdown;
