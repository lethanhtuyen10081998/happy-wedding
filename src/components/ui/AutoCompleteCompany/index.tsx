import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Icon } from 'src/components/icons';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import { usePermissionContext } from 'src/context/permissionContext/hooksContext';
import useListCompany from 'src/services/systemSettings/company/getListCompany';
import { Company } from 'src/types/systemSettings/company';
import { UserRole } from 'src/types/user';

const AutoCompleteCompany = (props: Omit<Props<Company>, 'options'>) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListCompany({ limit: 100, page: 1 });

  if (!data.length) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Company'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.factName}
      getItemValue={(item) => item}
      onOpen={() => setOpen(true)}
      open={open}
      onClose={() => setOpen(false)}
      InputProps={{
        startAdornment: <Icon name='lock' />,
      }}
    />
  );
};

export default AutoCompleteCompany;

export type AutoCompleteCompanyFieldProps = Omit<Props<Company>, 'options'> & {
  name: string;
};

export const AutoCompleteCompanyField = (props: AutoCompleteCompanyFieldProps) => {
  const { role } = usePermissionContext();

  if (role !== UserRole.SUPER_ADMIN) {
    return null;
  }

  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange } }) => {
        return (
          <AutoCompleteCompany
            value={value}
            onChange={(_e, value) => {
              onChange(value);
              props.onChange && props.onChange(_e, value);
            }}
          />
        );
      }}
    />
  );
};
