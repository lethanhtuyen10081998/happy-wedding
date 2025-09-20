import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListService from 'src/services/basicData/service/getListService';
import { ServiceRecord } from 'src/types/basicData/service';

const AutoCompleteService = (
  props: Omit<Props<ServiceRecord>, 'options'> & { serviceTypeId?: string },
) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListService({
    limit: 100,
    page: 1,
    serviceTypeId: props.serviceTypeId,
  });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Tên dịch vụ'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.serviceName}
      getItemValue={(item) => item?.serviceId}
      onOpen={() => setOpen(true)}
      open={open}
      onClose={() => setOpen(false)}
    />
  );
};

export default AutoCompleteService;

export type AutoCompleteServiceFieldProps = Omit<Props<ServiceRecord>, 'options'> & {
  name: string;
  serviceTypeId?: string;
};

export const AutoCompleteServiceField = (props: AutoCompleteServiceFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
        return (
          <AutoCompleteService
            value={value}
            onChange={(_e, value) => {
              onChange(value);
              props.onChange?.(_e, value);
            }}
            serviceTypeId={props.serviceTypeId}
            error={invalid}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
