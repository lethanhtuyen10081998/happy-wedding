import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as RadioControl,
} from '@mui/material';
import { useEffect, useState } from 'react';

import FormHelperText from '../FormHelperText';
import { Props } from './types';

const getItemDefault = (item: any) => `${item}`;

const RadioGroup = <E extends unknown = string | number>(props: Props<E>) => {
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
    ...others
  } = props;

  const [itemList, setItemList] = useState<E[]>(() => (Array.isArray(options) ? options : []));

  useEffect(() => {
    if (!Array.isArray(options)) {
      options().then(setItemList);
    }
  }, [options]);

  return (
    <FormControl fullWidth error={!!error} {...controlProps}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <RadioControl {...others} {...others.radioControlProps}>
        {itemList.map((item) => {
          const keyValue = getItemValue(item);
          return (
            <FormControlLabel
              key={keyValue}
              value={keyValue}
              control={<Radio />}
              label={`${getItemLabel(item)}`}
              {...itemProps?.(item)}
            />
          );
        })}
      </RadioControl>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroup;
