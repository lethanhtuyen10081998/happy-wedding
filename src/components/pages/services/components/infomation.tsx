'use client';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Button from 'src/components/material/Button';
import { formatMoney } from 'src/libs/utils';

function Infomation({ price, originalPrice }: { price: number; originalPrice: number }) {
  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant='h3' sx={{ marginBottom: '8px' }}>
            Dịch vụ cưới trọn gói combo số 2
          </Typography>
          <Box sx={{ alignItems: 'baseline', justifyContent: 'center', gap: '12px', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', alignSelf: 'center' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}>
                {formatMoney(price)}
              </Typography>
              {originalPrice && (
                <Typography
                  sx={{
                    fontSize: '12px',
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button>Liên hệ: 0977 432 412</Button>

          <Button variant='outlined'>Zalo: 0977 432 412</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Infomation;
