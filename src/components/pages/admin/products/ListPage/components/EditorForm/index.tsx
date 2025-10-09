import { Box, Grid } from '@mui/material';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from 'src/components/material/Button';
import FormArrayTextField from 'src/components/material/form/ArrayTextField';
import CheckboxField from 'src/components/material/form/CheckboxField';
import FormTextField from 'src/components/material/form/FormTextField';
import NumberField from 'src/components/material/form/NumberField';
import ScrollContent from 'src/components/ScrollContent';
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

  function slugify(value: string): string {
    return value
      .normalize('NFD') // tách dấu ra khỏi ký tự
      .replace(/[\u0300-\u036f]/g, '') // xóa toàn bộ dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // xóa ký tự đặc biệt
      .trim()
      .replace(/\s+/g, '-'); // thay khoảng trắng bằng dấu gạch nối
  }

  return (
    <Box px={3}>
      <Box mt={2} component='form'>
        <FormProvider {...methods}>
          <UploadArea />

          <Box mt={2}>
            <ScrollContent height='calc(100vh - 250px)' maxHeight='calc(100vh - 250px)'>
              <Grid container columnSpacing={SPACING.lg}>
                <Grid item md={6}>
                  <FormTextField
                    name='name'
                    label='Tên sản phẩm'
                    onChange={(e) => {
                      methods.setValue('slug', slugify(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormTextField name='slug' label='Slug' />
                </Grid>
                <Grid item md={3}>
                  <AutoCompleteCategoriesField
                    name='categoryId'
                    label='Danh mục'
                    getItemValue={(item) => item.id}
                    getItemLabel={(item) => item.name}
                  />
                </Grid>

                <Grid item md={3}>
                  <NumberField name='price' label='Giá' />
                </Grid>
                <Grid item md={3}>
                  <NumberField name='originalPrice' label='Giá gốc' />
                </Grid>
                <Grid item md={3}>
                  <NumberField name='quantity' label='Số lượng' />
                </Grid>
                <Grid item md={3}>
                  <FormTextField name='unit' label='Đơn vị' />
                </Grid>
                <Grid item md={3}>
                  <Box display='flex' alignItems='center'>
                    <CheckboxField name='isShowHomePage' label='Hiển thị trang chủ' />
                  </Box>
                </Grid>

                <Grid item md={12}>
                  <FormTextField name='videoUrl' label='URL video' />
                </Grid>
                <Grid item md={4}>
                  <FormArrayTextField name='tags' label='Danh sách ưu đãi' />
                </Grid>

                <Grid item md={3}>
                  <FormTextField name='description' label='Mô tả' />
                </Grid>
              </Grid>
            </ScrollContent>
          </Box>
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
