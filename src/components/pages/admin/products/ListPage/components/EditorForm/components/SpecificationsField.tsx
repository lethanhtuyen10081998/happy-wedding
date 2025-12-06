import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormTextField from 'src/components/material/form/FormTextField';
import { ProductSpecification } from 'src/types/product';

export default function SpecificationsField() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specifications',
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Thông số kỹ thuật
        </Typography>
        <Button
          type='button'
          variant='outlined'
          size='small'
          startIcon={<Plus size={16} />}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            append({ label: '', value: '' } as ProductSpecification);
          }}
        >
          Thêm thông số
        </Button>
      </Box>

      {fields.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <Typography variant='body2'>Chưa có thông số nào. Click Thêm thông số để thêm mới.</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field, index) => (
          <Grid container spacing={2} key={field.id} alignItems='center'>
            <Grid item xs={5}>
              <FormTextField
                name={`specifications.${index}.label`}
                label={index === 0 ? 'Tên thông số' : ''}
                placeholder='VD: Thương hiệu, Xuất xứ...'
              />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                name={`specifications.${index}.value`}
                label={index === 0 ? 'Giá trị' : ''}
                placeholder='VD: Happy Wedding, Việt Nam...'
              />
            </Grid>
            <Grid item xs={1}>
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
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
