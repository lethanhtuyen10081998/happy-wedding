import { ArrowForward } from '@mui/icons-material';
import { Card, CardContent, Container, Grid, InputAdornment, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import DatePicker from 'src/components/material/DatePicker';
import TextField from 'src/components/material/TextField';
import SmoothScroll from 'src/components/SmoothScroll';

export default function SearchBoxComponent() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: any, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        position: 'absolute',
        bottom: { xs: '-120px', md: '-70px' },
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <SmoothScroll>
        <Card
          sx={{
            borderRadius: '16px',
            overflow: 'visible',
            boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant='fullWidth'
              sx={{
                mb: 3,
              }}
            >
              <Tab label='Tour du lịch' />
              <Tab label='Khách sạn' />
              <Tab label='Vé máy bay' />
            </Tabs>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder='Bạn muốn đi đâu?'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon name='location' />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.5}>
                <DatePicker fullWidth placeholder='Ngày khởi hành' label='Ngày khởi hành' />
              </Grid>
              <Grid item xs={12} sm={6} md={2.5}>
                <DatePicker fullWidth placeholder='Ngày về' label='Ngày về' />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant='contained'
                  size='large'
                  endIcon={<ArrowForward />}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </SmoothScroll>
    </Container>
  );
}
