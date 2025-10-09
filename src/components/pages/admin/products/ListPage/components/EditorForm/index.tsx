import { Box, Grid } from '@mui/material';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from 'src/components/material/Button';
import FormArrayTextField from 'src/components/material/form/ArrayTextField';
import CheckboxField from 'src/components/material/form/CheckboxField';
import FormTextField from 'src/components/material/form/FormTextField';
import NumberField from 'src/components/material/form/NumberField';
import { AutoCompleteCategoriesField } from 'src/components/ui/AutoCompleteCategories';
import { SPACING } from 'src/constants/grid';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import useYupValidationResolver from 'src/helpers/useYupValidationResolver';
import { formatMoneyToNumber } from 'src/libs/utils';
import { FormEditorProps } from 'src/types/formEditor';

import UploadArea from './components/UploadArea';
import { EditorFormRequest } from './types';
import { validation } from './validation';

function EditorForm({ onSubmit, defaultValues, buttonLabel: buttonLalel, loading }: FormEditorProps<EditorFormRequest>) {
  const resolver = useYupValidationResolver(validation);
  const methods = useForm<EditorFormRequest>({
    resolver,
    defaultValues: {
      ...defaultValues,
      tags: defaultValues?.tags?.length ? defaultValues?.tags?.map((tag) => tag.trim()) : [''],
    },
  });

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      onSubmit({
        ...values,
        categoryId: values.categoryId,
        price: formatMoneyToNumber(values.price).toString(),
        quantity: formatMoneyToNumber(values.quantity).toString(),
        tags: values.tags?.map((tag) => tag.trim()) || [],
      });
    },
    [onSubmit],
  );

  return (
    <Box py={5} px={10}>
      <Box mt={2} component='form'>
        <FormProvider {...methods}>
          <Grid container spacing={SPACING.md}>
            <Grid item xs={12} md={4}>
              <UploadArea />
            </Grid>

            <Grid item xs={12} md={8} container columnSpacing={SPACING.lg}>
              <Grid item md={12} display='grid'>
                <FormTextField name='name' label='Tên sản phẩm' />
              </Grid>
              <Grid item md={3} display='grid'>
                <AutoCompleteCategoriesField name='categoryId' label='Danh mục' getItemValue={(item) => item.id} getItemLabel={(item) => item.name} />
              </Grid>

              <Grid item md={3} display='grid'>
                <NumberField name='price' label='Giá' />
              </Grid>
              <Grid item md={3} display='grid'>
                <NumberField name='originalPrice' label='Giá gốc' />
              </Grid>
              <Grid item md={3} display='grid'>
                <NumberField name='quantity' label='Số lượng' />
              </Grid>
              <Grid item md={3} display='grid'>
                <FormTextField name='unit' label='Đơn vị' />
              </Grid>
              <Grid item md={3} display='grid'>
                <Box display='flex' alignItems='center'>
                  <CheckboxField name='isShowHomePage' label='Hiển thị trang chủ' />
                </Box>
              </Grid>

              <Grid item md={12} display='grid'>
                <FormTextField name='videoUrl' label='URL video' />
              </Grid>
              <Grid item md={4} display='grid'>
                <FormArrayTextField name='tags' label='Danh sách ưu đãi' />
              </Grid>

              <Grid item md={3} display='grid'>
                <FormTextField name='description' label='Mô tả' />
              </Grid>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button label={buttonLalel} fullWidth type='submit' onClick={methods.handleSubmit(handleSubmit)} loading={loading} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default function EditorFormWrapper({ onSubmit, defaultValues, buttonLabel: buttonLalel, loading }: FormEditorProps<EditorFormRequest>) {
  return (
    <DetailDataContextProvider data={defaultValues}>
      <EditorForm onSubmit={onSubmit} defaultValues={defaultValues} buttonLabel={buttonLalel} loading={loading} />
    </DetailDataContextProvider>
  );
}
