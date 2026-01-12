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
  const { onUpdateFilterObject } = useAPIFilterContext();
  const methods = useForm<FilterProps>({
    defaultValues: { name: '', sortOrder: 'asc' },
  });

  const handleSubmit = (values: FilterProps) => {
    onUpdateFilterObject(values);
  };

  return (
    <FormProvider {...methods}>
      <Box component='form' onSubmit={methods.handleSubmit(handleSubmit)}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: '4px',
            bgcolor: 'white',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.13)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.75, sm: 1 },
              pb: { xs: 1, sm: 1.5 },
              mb: { xs: 1.5, sm: 2 },
              borderBottom: '1px solid rgba(0,0,0,0.09)',
            }}
          >
            <Box
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                bgcolor: 'grey.100',
              }}
            >
              <TuneIcon sx={{ color: 'primary.main', fontSize: { xs: 16, sm: 18 } }} />
            </Box>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 500,
                color: 'rgba(0,0,0,0.87)',
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              }}
            >
              Bộ lọc tìm kiếm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            <Box>
              <Typography
                variant='caption'
                sx={{
                  mb: { xs: 0.75, sm: 1 },
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.54)',
                  fontSize: { xs: '0.6875rem', sm: '0.75rem' },
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
                      <SearchIcon sx={{ color: 'grey.500', fontSize: { xs: 16, sm: 18 } }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: { xs: 40, sm: 36 },
                    bgcolor: 'common.white',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    '& fieldset': {
                      borderColor: 'rgba(0,0,0,0.09)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 1,
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: { xs: 0.75, sm: 1 } }}>
                <AttachMoneyIcon sx={{ color: 'grey.500', fontSize: { xs: 14, sm: 16 } }} />
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 500,
                    color: 'rgba(0,0,0,0.54)',
                    fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                  }}
                >
                  Khoảng giá (VNĐ)
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 0.75, sm: 1 } }}>
                <TextField
                  type='number'
                  {...methods.register('fromPrice', { valueAsNumber: true })}
                  placeholder='Từ'
                  size='small'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: { xs: 40, sm: 36 },
                      bgcolor: 'common.white',
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      '& fieldset': {
                        borderColor: 'rgba(0,0,0,0.09)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 1,
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
                      height: { xs: 40, sm: 36 },
                      bgcolor: 'common.white',
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      '& fieldset': {
                        borderColor: 'rgba(0,0,0,0.09)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 1,
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <FormControl fullWidth size='small'>
              <InputLabel sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>Sắp xếp theo giá</InputLabel>
              <Select 
                defaultValue='asc' 
                label='Sắp xếp theo giá' 
                onChange={(e) => methods.setValue('sortOrder', e.target.value as 'asc' | 'desc')}
                sx={{
                  height: { xs: 40, sm: 36 },
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.09)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value='asc' sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>Giá thấp đến cao</MenuItem>
                <MenuItem value='desc' sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>Giá cao đến thấp</MenuItem>
              </Select>
            </FormControl>

            <Button type='submit' variant='contained' fullWidth size='medium' sx={{ mt: { xs: 0.5, sm: 0 } }}>
              Áp dụng bộ lọc
            </Button>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
