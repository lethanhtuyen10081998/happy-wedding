'use client';

import { Box, Button, Grid, Paper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import DropdownField from 'src/components/material/form/DropdownField';
import FormTextField from 'src/components/material/form/FormTextField';
import { PADDING } from 'src/constants/grid';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import { Category } from 'src/types/admin/categories';

export type FilterProps = {
  category?: Category;
  name?: string;
  fromPrice?: number;
  toPrice?: number;
  sortOrder?: 'asc' | 'desc';
};

export default function Filter() {
  const { onSetFilterObject } = useAPIFilterContext();
  const methods = useForm<FilterProps>({
    defaultValues: { name: '', sortOrder: 'asc' },
  });

  const handleSubmit = (values: FilterProps) => {
    onSetFilterObject(values);
  };

  return (
    <FormProvider {...methods}>
      <Box component='form' onSubmit={methods.handleSubmit(handleSubmit)}>
        <Paper sx={{ position: 'sticky', top: 300 }}>
          <Box sx={{ p: PADDING }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormTextField name='name' fullWidth placeholder='Tìm kiếm ...' />
              </Grid>

              <Grid item xs={12} md={2}>
                <DropdownField
                  name='sortOrder'
                  options={[
                    { label: 'Giá tăng dần', value: 'asc' },
                    { label: 'Giá giảm dần', value: 'desc' },
                  ]}
                  getItemLabel={(item) => item.label}
                  getItemValue={(item) => item.value}
                />
              </Grid>
            </Grid>

            <Button variant='contained' color='primary' type='submit'>
              Tìm kiếm
            </Button>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
