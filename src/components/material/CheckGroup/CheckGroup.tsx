import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import FormHelperText from '../FormHelperText';
import { Props } from './types';

const getItemDefault = (item: any) => `${item}`;

const CheckGroup = <E extends unknown = string | number>(props: Props<E>) => {
  const {
    value = [],
    options,
    getItemValue = getItemDefault,
    getItemLabel = getItemDefault,
    onChange,
    onBlur,
    error,
    helperText,
  } = props;

  const [itemList, setItemList] = useState<E[]>(() => (Array.isArray(options) ? options : []));

  const onCheck = (itemValue: string | number) => {
    onChange?.([...value, itemValue]);
  };

  const onUncheck = (itemValue: string | number) => {
    onChange?.(value.filter((i) => i !== itemValue));
  };

  useEffect(() => {
    if (!Array.isArray(options)) {
      options().then(setItemList);
    }
  }, [options]);

  return (
    <FormGroup>
      {itemList.map((i) => {
        const itemValue = getItemValue(i);
        const checked = value.includes(itemValue);

        return (
          <FormControlLabel
            key={getItemValue(i)}
            control={
              <Checkbox
                key={itemValue}
                checked={checked}
                onChange={() => (!checked ? onCheck : onUncheck)(itemValue)}
                onBlur={onBlur}
              />
            }
            label={<Typography sx={{}}>{`${getItemLabel(i, checked)}`}</Typography>}
          />
        );
      })}
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormGroup>
  );
};

export default CheckGroup;
