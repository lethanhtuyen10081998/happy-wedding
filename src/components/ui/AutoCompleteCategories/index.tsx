import { forwardRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import AutoComplete, { Props } from 'src/components/material/AutoComplete';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import useListCategories from 'src/services/admin/settings/categories/getList';
import { Category } from 'src/types/admin/categories';

const AutoCompleteCategories = forwardRef<HTMLDivElement, Omit<Props<Category>, 'options'>>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useListCategories({ limit: 100, page: 1 });

  if (isFetching) {
    return <SpinnerCenter size={24} />;
  }

  return (
    <div ref={ref}>
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
    </div>
  );
});

AutoCompleteCategories.displayName = 'AutoCompleteCategories';

export default AutoCompleteCategories;

export type AutoCompleteCategoriesFieldProps = Omit<Props<Category>, 'options'> & {
  name: string;
  categoryId?: string;
};

export const AutoCompleteCategoriesField = (props: AutoCompleteCategoriesFieldProps) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        return (
          <AutoCompleteCategories
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
