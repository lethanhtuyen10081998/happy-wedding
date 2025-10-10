import { Button, IconButton, Stack } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from 'src/components/material/TextField';

import { Props } from './types';

const FormArrayTextField = (props: Props) => {
  const { name, helperText, ...others } = props;
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`${name}.${index}`}
          control={control}
          render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
            <Stack direction='row' spacing={1} alignItems='center'>
              <TextField
                {...others}
                label={index > 0 ? undefined : others.label}
                inputRef={ref}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                error={invalid || others.error}
                helperText={invalid ? error?.message || '' : helperText}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton color='error' onClick={() => remove(index)}>
                      <Trash2 size={18} />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
          )}
        />
      ))}

      <Button variant='outlined' startIcon={<Plus size={16} />} onClick={() => append('')}>
        Thêm giá trị
      </Button>
    </Stack>
  );
};

export default FormArrayTextField;
