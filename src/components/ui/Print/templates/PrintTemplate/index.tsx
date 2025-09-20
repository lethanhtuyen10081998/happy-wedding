'use client';
import { Box, Grid, Typography } from '@mui/material';
import { CompanyLogo, HeaderText, ReceiptTitle } from 'src/components/ui/Print/components';
import { formatDateUTCtoLocalTimeView } from 'src/libs/date';
import { CompanyPrintInfo } from 'src/types/prints/companyPrintInfo';

export default function PrintTemplate({
  companyPrintInfo,
  children,
  title,
  footer,
}: {
  companyPrintInfo: CompanyPrintInfo;
  children: React.ReactNode;
  title: string;
  footer?: React.ReactNode;
}) {
  const receiptData = {
    companyName: companyPrintInfo.companyName,
    companyAddress: companyPrintInfo.address,
    companyPhone: companyPrintInfo.phone,
    fax: companyPrintInfo.fax,
    date: formatDateUTCtoLocalTimeView(new Date()),
  };

  return (
    <Box p={2} bgcolor='white'>
      <Box position='relative' width='100%'>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Box display='flex'>
              <Box m='auto'>
                <HeaderText
                  variant='subtitle1'
                  fontWeight='bold'
                  textTransform='uppercase'
                  textAlign='center'
                >
                  {receiptData.companyName}
                </HeaderText>
              </Box>
            </Box>

            <Box textAlign='center'>
              <Typography variant='body2' textAlign='center'>
                {receiptData.companyAddress}
              </Typography>
              <Typography variant='body2' textAlign='center'>
                SĐT: {receiptData.companyPhone} {receiptData.fax}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box display='flex' alignItems='center' position='absolute' top={0} left={0}>
          <CompanyLogo src={''} alt='Du Lịch Việt Logo' />
        </Box>
      </Box>

      <ReceiptTitle variant='h5'>{title}</ReceiptTitle>

      <Box display='grid' gap={3}>
        <Box>{children}</Box>

        {footer && footer}
      </Box>
    </Box>
  );
}
