import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListCustomerSource from 'src/services/basicData/customerSource/getListCustomerSource';
import { CustomerSource } from 'src/types/managementCustomerService/customer';

const AutoCompleteCustomerSource = (props: Omit<Props<CustomerSource>, 'options'>) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListCustomerSource({ limit: 100, page: 1 });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Nguồn khách'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.name}
      getItemValue={(item) => item}
      onOpen={() => setOpen(true)}
      open={open}
      onClose={() => setOpen(false)}
    />
  );
};

export default AutoCompleteCustomerSource;

export type AutoCompleteCustomerSourceFieldProps = Omit<Props<CustomerSource>, 'options'> & {
  name: string;
  factNo?: string;
};

export const AutoCompleteCustomerSourceField = (props: AutoCompleteCustomerSourceFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange, ref, onBlur }, fieldState: { invalid, error } }) => {
        return (
          <AutoCompleteCustomerSource
            ref={ref}
            value={value}
            onChange={(_e, value) => {
              onChange(value);
            }}
            error={invalid || props.error}
            helperText={invalid ? error?.message || '' : props.helperText}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};
