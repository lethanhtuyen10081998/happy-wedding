import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Icon } from 'src/components/icons';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListRole from 'src/services/systemSettings/role/getListRole';
import { Role } from 'src/types/systemSettings/role';

const AutoCompleteRole = (props: Omit<Props<Role>, 'options'>) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListRole({ limit: 100, page: 1 });

  if (!data.length) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Role'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.roleName}
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

export default AutoCompleteRole;

export type AutoCompleteRoleFieldProps = Omit<Props<Role>, 'options'> & {
  name: string;
};

export const AutoCompleteRoleField = (props: AutoCompleteRoleFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange }, fieldState: {} }) => {
        return (
          <AutoCompleteRole
            value={value}
            onChange={(_e, value) => {
              onChange(value);
            }}
          />
        );
      }}
    />
  );
};
