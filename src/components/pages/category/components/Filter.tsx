'use client';

import { Box, FormControl, MenuItem, Paper, Select, Slider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AutoCompleteCategories from 'src/components/ui/AutoCompleteCategories';
import { useFilterObjectContext } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import { useDebouncedCallback } from 'src/hooks/useDebounceCallback';
import { Category } from 'src/types/admin/categories';

export type FilterProps = {
  category: Category;
  name: string;
  fromPrice: number;
  toPrice: number;
  sortOrder: 'asc' | 'desc';
};

export default function Filter() {
  const [sortOrder] = useState<'asc' | 'desc'>('asc');
  const { category, name, fromPrice, toPrice } = useFilterObjectContext<FilterProps>();
  const { onSetFilterObject } = useAPIFilterContext();
  const [filter, setFilter] = useState<FilterProps>({ category, name, fromPrice: 0, toPrice: 30000000, sortOrder: 'asc' });
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setFilter({ ...filter, fromPrice: newValue[0], toPrice: newValue[1] });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const debouncedSetFilterObject = useDebouncedCallback((filter: FilterProps) => {
    onSetFilterObject(filter);
  }, 1000);

  useEffect(() => {
    debouncedSetFilterObject(filter);
  }, [filter, debouncedSetFilterObject]);

  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 110 }}>
      <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
        Bộ Lọc
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField fullWidth placeholder='Tìm kiếm ...' value={name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='subtitle2'>Khoảng giá</Typography>
        <Slider
          value={[fromPrice, toPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay='auto'
          min={0}
          max={30000000}
          step={500000}
          valueLabelFormat={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant='caption'>{formatPrice(fromPrice)}</Typography>
          <Typography variant='caption'>{formatPrice(toPrice)}</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <AutoCompleteCategories
          label='Danh mục'
          getItemValue={(item) => item.id}
          getItemLabel={(item) => item.name}
          value={category}
          onChange={(e, value) => setFilter({ ...filter, category: value })}
        />
      </Box>

      <Box>
        <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 500 }}>
          Sắp xếp theo giá
        </Typography>
        <FormControl fullWidth>
          <Select value={sortOrder} onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value as 'asc' | 'desc' })}>
            <MenuItem value='asc'>Giá tăng dần</MenuItem>
            <MenuItem value='desc'>Giá giảm dần</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
