'use client';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
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
    console.log('Filter - Submitting values:', values);
    onSetFilterObject(values);
  };

  return (
    <FormProvider {...methods}>
      <Box component='form' onSubmit={methods.handleSubmit(handleSubmit)}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid common.divider',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pb: 2,
              mb: 3,
              borderBottom: '1px solid common.divider',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1.5,
                bgcolor: 'grey.100',
              }}
            >
              <TuneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1.125rem',
              }}
            >
              Bộ lọc tìm kiếm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography
                variant='body2'
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                }}
              >
                Tìm kiếm sản phẩm
              </Typography>
              <TextField
                fullWidth
                {...methods.register('name')}
                placeholder='Nhập tên sản phẩm...'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon sx={{ color: 'grey.500', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    bgcolor: 'common.white',
                    '& fieldset': {
                      borderColor: 'common.divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <AttachMoneyIcon sx={{ color: 'grey.500', fontSize: 18 }} />
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: '0.875rem',
                  }}
                >
                  Khoảng giá (VNĐ)
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <TextField
                  type='number'
                  {...methods.register('fromPrice', { valueAsNumber: true })}
                  placeholder='Từ'
                  size='small'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 44,
                      bgcolor: 'common.white',
                      '& fieldset': {
                        borderColor: 'common.divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                  }}
                />
                <TextField
                  type='number'
                  {...methods.register('toPrice', { valueAsNumber: true })}
                  placeholder='Đến'
                  size='small'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 44,
                      bgcolor: 'common.white',
                      '& fieldset': {
                        borderColor: 'common.divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <FormControl fullWidth size='small'>
              <InputLabel>Sắp xếp theo giá</InputLabel>
              <Select defaultValue='asc' label='Sắp xếp theo giá' onChange={(e) => methods.setValue('sortOrder', e.target.value as 'asc' | 'desc')}>
                <MenuItem value='asc'>Giá thấp đến cao</MenuItem>
                <MenuItem value='desc'>Giá cao đến thấp</MenuItem>
              </Select>
            </FormControl>

            <Button type='submit' variant='contained' fullWidth>
              Áp dụng bộ lọc
            </Button>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
