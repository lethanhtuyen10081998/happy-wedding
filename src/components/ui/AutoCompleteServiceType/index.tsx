import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListServiceType from 'src/services/basicData/serviceType/getListServiceType';
import { ServiceTypeEnum, ServiceTypeRecord } from 'src/types/basicData/serviceType';

export const AutoCompleteServiceType = (
  props: Omit<Props<ServiceTypeRecord>, 'options'> & { type: ServiceTypeEnum },
) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListServiceType({
    limit: 100,
    page: 1,
    type: [props.type, ServiceTypeEnum.ALL_TOUR],
  });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Loại dịch vụ'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.serviceTypeName}
      getItemValue={(item) => item?.serviceTypeId}
      onOpen={() => setOpen(true)}
      open={open}
      onClose={() => setOpen(false)}
    />
  );
};

export type AutoCompleteServiceTypeFieldProps = Omit<Props<ServiceTypeRecord>, 'options'> & {
  name: string;
  type: ServiceTypeEnum;
};

export const AutoCompleteServiceTypeField = (props: AutoCompleteServiceTypeFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
        return (
          <AutoCompleteServiceType
            value={value}
            onChange={(_e, value) => {
              onChange(value);
              props.onChange?.(_e, value);
            }}
            type={props.type}
            error={invalid}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
