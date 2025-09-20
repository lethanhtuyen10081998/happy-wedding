import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Icon } from 'src/components/icons';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListScreen from 'src/services/systemSettings/screen/getListScreen';
import { ScreenRecord } from 'src/types/systemSettings/screens/screen';

const AutoCompleteScreen = (props: Omit<Props<ScreenRecord>, 'options'>) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListScreen({ limit: 100, page: 1 });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      options={data}
      loading={isFetching}
      getItemLabel={(item) => item.objName}
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

export default AutoCompleteScreen;

export type AutoCompleteScreenFieldProps = Omit<Props<ScreenRecord>, 'options'> & {
  name: string;
};

export const AutoCompleteScreenField = (props: AutoCompleteScreenFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange }, fieldState: {} }) => {
        return (
          <AutoCompleteScreen
            value={value}
            onChange={(_e, value) => {
              onChange(value);
            }}
            {...props}
          />
        );
      }}
    />
  );
};
