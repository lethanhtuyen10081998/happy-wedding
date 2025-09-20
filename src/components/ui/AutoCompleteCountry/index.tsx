import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import useListCountry from 'src/services/basicData/country/getListCountry';
import { Country } from 'src/types/basicData/country';

const AutoCompleteCountry = (props: Omit<Props<Country>, 'options'> & { factNo?: string }) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListCountry({ limit: 100000, page: 1 }, open);

  return (
    <AutoComplete
      {...props}
      label='Quốc tịch'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.vietNamName}
      getItemValue={(item) => item}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    />
  );
};

export default AutoCompleteCountry;

export type AutoCompleteCountryFieldProps = Omit<Props<Country>, 'options'> & {
  name: string;
  factNo?: string;
};

export const AutoCompleteCountryField = (props: AutoCompleteCountryFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange } }) => {
        return (
          <AutoCompleteCountry
            value={value}
            onChange={(_e, value) => {
              onChange(value);
              props.onChange?.(_e, value);
            }}
            factNo={props.factNo}
            {...props}
          />
        );
      }}
    />
  );
};
