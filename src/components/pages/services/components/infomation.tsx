'use client';
import { Box, Card, Divider, Typography } from '@mui/material';
import Button from 'src/components/material/Button';
import { SPACING } from 'src/constants/grid';
import { formatMoney } from 'src/libs/utils';

function Infomation({ price, originalPrice, name }: { price: number; originalPrice: number; name: string }) {
  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: SPACING }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h2' sx={{ marginBottom: '8px' }}>
            {name}
          </Typography>

          <Box sx={{ alignItems: 'baseline', justifyContent: 'center', gap: SPACING, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: SPACING, alignSelf: 'center' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}>
                {formatMoney(price)}
              </Typography>
              {originalPrice && (
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textDecoration: 'line-through',
                  }}
                >
                  {formatMoney(originalPrice)}
                </Typography>
              )}
            </Box>

            <Typography sx={{ color: (theme) => theme.palette.text.secondary, fontSize: '14px', margin: '8px 0 0 0' }}>Giá đã bao gồm VAT</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: SPACING }}>
          <Button>Liên hệ: 0977 432 412</Button>

          <Button variant='outlined'>Zalo: 0977 432 412</Button>
        </Box>

        <Divider />

        <Box>
          <Typography sx={{ mb: 2 }}>*Cam kết cung cấp dịch vụ chất lượng, uy tín. Chất lượng cao, giá cả hợp lý.*</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default Infomation;
