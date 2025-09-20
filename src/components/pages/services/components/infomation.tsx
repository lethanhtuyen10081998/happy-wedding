'use client';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';

function Infomation({ price, originalPrice }: { price: string; originalPrice: string }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant='h3' sx={{ marginBottom: '8px' }}>
            Dịch vụ cưới trọn gói combo số 2
          </Typography>
          <Box sx={{ alignItems: 'baseline', justifyContent: 'center', gap: '12px', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', alignSelf: 'center' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}>
                {price}
              </Typography>
              {originalPrice && (
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: (theme) => theme.palette.text.secondary,
                    textDecoration: 'line-through',
                  }}
                >
                  {originalPrice}
                </Typography>
              )}
            </Box>

            <Typography sx={{ color: (theme) => theme.palette.text.secondary, fontSize: '14px', margin: '8px 0 0 0' }}>Giá đã bao gồm VAT</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button>Đặt lịch ngay</Button>

          <Button variant='outlined'>Tư vấn miễn phí</Button>
        </Box>

        <Divider style={{ margin: '24px 0' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon name='phone' sx={{ color: (theme) => theme.palette.primary.main }} size={20} />
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>0123 456 789</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon name='mail' sx={{ color: (theme) => theme.palette.primary.main }} size={20} />
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>info@weddingservice.com</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Infomation;
