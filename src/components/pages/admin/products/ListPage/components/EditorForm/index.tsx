import { Box, Grid } from '@mui/material';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from 'src/components/material/Button';
import FormArrayTextField from 'src/components/material/form/ArrayTextField';
import FormTextField from 'src/components/material/form/FormTextField';
import NumberField from 'src/components/material/form/NumberField';
import { AutoCompleteCategoriesField } from 'src/components/ui/AutoCompleteCategories';
import { SPACING } from 'src/constants/grid';
import useYupValidationResolver from 'src/helpers/useYupValidationResolver';
import { formatMoneyToNumber } from 'src/libs/utils';
import { FormEditorProps } from 'src/types/formEditor';

import UploadArea from './components/UploadArea';
import { EditorFormRequest } from './types';
import { validation } from './validation';

export default function EditorForm({ onSubmit, defaultValues, buttonLabel: buttonLalel, loading }: FormEditorProps<EditorFormRequest>) {
  const resolver = useYupValidationResolver(validation);
  const methods = useForm<EditorFormRequest>({
    resolver,
    defaultValues,
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
            <Grid item xs={12} md={6}>
              <UploadArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display='grid' gap={SPACING.md}>
                <AutoCompleteCategoriesField name='categoryId' label='Danh mục' getItemValue={(item) => item.id} getItemLabel={(item) => item.name} />
                <FormTextField name='name' label='Tên sản phẩm' />
                <NumberField name='price' label='Giá' />
                <NumberField name='originalPrice' label='Giá gốc' />
                <NumberField name='quantity' label='Số lượng' />
                <FormTextField name='unit' label='Đơn vị' />
                <FormArrayTextField name='tags' label='Tags' />
                <FormTextField name='description' label='Mô tả' />
                <FormTextField name='images' label='Hình ảnh' />
                <FormTextField name='videoUrl' label='URL video' />
              </Box>
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
