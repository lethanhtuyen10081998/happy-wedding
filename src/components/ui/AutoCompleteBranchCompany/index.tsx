import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Icon } from 'src/components/icons';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListBranch from 'src/services/systemSettings/company/branch/getListBranch';
import { Branch } from 'src/types/systemSettings/company';

const AutoCompleteBranchCompany = (props: Omit<Props<Branch>, 'options'> & { factNo?: string }) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListBranch({ limit: 100, page: 1, factNo: props.factNo });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Branch'
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.name}
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

export default AutoCompleteBranchCompany;

export type AutoCompleteBranchCompanyFieldProps = Omit<Props<Branch>, 'options'> & {
  name: string;
  factNo?: string;
};

export const AutoCompleteBranchCompanyField = (props: AutoCompleteBranchCompanyFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange } }) => {
        return (
          <AutoCompleteBranchCompany
            value={value}
            onChange={(_e, value) => {
              onChange(value);
            }}
            factNo={props.factNo}
          />
        );
      }}
    />
  );
};
