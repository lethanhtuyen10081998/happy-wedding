import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListCategories from 'src/services/admin/settings/categories/getList';
import { Category } from 'src/types/admin/categories';

const AutoCompleteCategories = (props: Omit<Props<Category>, 'options'>) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListCategories({ limit: 100, page: 1 });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <AutoComplete
      {...props}
      label='Danh mục'
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

export default AutoCompleteCategories;

export type AutoCompleteCategoriesFieldProps = Omit<Props<Category>, 'options'> & {
  name: string;
  categoryId?: string;
};

export const AutoCompleteCategoriesField = (props: AutoCompleteCategoriesFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange, ref, onBlur }, fieldState: { invalid, error } }) => {
        return (
          <AutoCompleteCategories
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
