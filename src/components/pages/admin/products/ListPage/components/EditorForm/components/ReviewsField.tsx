import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CheckboxField from 'src/components/material/form/CheckboxField';
import FormTextField from 'src/components/material/form/FormTextField';
import NumberField from 'src/components/material/form/NumberField';
import { ProductReview } from 'src/types/product';

export default function ReviewsField() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reviews',
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Đánh giá sản phẩm
        </Typography>
        <Button
          type='button'
          variant='outlined'
          size='small'
          startIcon={<Plus size={16} />}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            append({
              userName: '',
              rating: '5',
              date: new Date().toLocaleDateString('vi-VN'),
              comment: '',
              verified: true,
            } as ProductReview);
          }}
        >
          Thêm đánh giá
        </Button>
      </Box>

      {fields.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <Typography variant='body2'>Chưa có đánh giá nào. Click Thêm đánh giá để thêm mới.</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormTextField
                  name={`reviews.${index}.userName`}
                  label={index === 0 ? 'Tên người đánh giá' : ''}
                  placeholder='VD: Nguyễn Văn A'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <NumberField
                  name={`reviews.${index}.rating`}
                  label={index === 0 ? 'Số sao (1-5)' : ''}
                  inputProps={{ min: 1, max: 5, step: 0.5 }}
                  placeholder='VD: 4.5'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField name={`reviews.${index}.date`} label={index === 0 ? 'Ngày đánh giá' : ''} placeholder='VD: 15/12/2024' />
              </Grid>
              <Grid item xs={12} md={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', pt: index === 0 ? 3 : 0 }}>
                  <CheckboxField name={`reviews.${index}.verified`} label={index === 0 ? 'Đã mua' : ''} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name={`reviews.${index}.comment`}
                  label={index === 0 ? 'Nội dung đánh giá (Content)' : ''}
                  placeholder='VD: Sản phẩm rất đẹp, chất lượng tốt. Dịch vụ giao hàng nhanh chóng...'
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    type='button'
                    color='error'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      remove(index);
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
