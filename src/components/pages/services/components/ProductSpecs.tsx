'use client';

import { Box, Chip, Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ProductSpecs() {
  // Hardcoded specifications - will be from database later
  const specifications = [
    { label: 'Thương hiệu', value: 'Happy Wedding' },
    { label: 'Xuất xứ', value: 'Việt Nam' },
    { label: 'Chất liệu', value: 'Cao cấp, nhập khẩu' },
    { label: 'Màu sắc', value: 'Nhiều màu' },
    { label: 'Kích thước', value: 'Theo yêu cầu' },
    { label: 'Bảo hành', value: '12 tháng' },
    { label: 'Vận chuyển', value: 'Toàn quốc' },
    { label: 'Thời gian giao hàng', value: '3-7 ngày' },
  ];

  const highlights = [
    'Chất lượng cao, uy tín',
    'Thiết kế độc đáo, sang trọng',
    'Giá cả hợp lý',
    'Dịch vụ chuyên nghiệp',
    'Hỗ trợ tư vấn 24/7',
  ];

  return (
    <Box>
      <Typography variant='h6' sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
        Thông tin sản phẩm
      </Typography>

        {/* Highlights */}
        <Box sx={{ mb: 4 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
            Điểm nổi bật:
          </Typography>
          <Grid container spacing={2}>
            {highlights.map((highlight, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {highlight}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Specifications Table */}
        <Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
            Thông số kỹ thuật:
          </Typography>
          <Table>
            <TableBody>
              {specifications.map((spec, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      bgcolor: 'grey.50',
                    },
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      width: '40%',
                      fontWeight: 600,
                      color: 'text.primary',
                      border: 'none',
                      py: 1.5,
                    }}
                  >
                    {spec.label}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'text.secondary',
                      border: 'none',
                      py: 1.5,
                    }}
                  >
                    {spec.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
    </Box>
  );
}

