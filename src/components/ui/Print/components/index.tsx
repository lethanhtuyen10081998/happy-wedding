'use client';
import { Box, TableCell, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CompanyLogo = styled('img')({
  height: 80,
  marginRight: 16,
});

export const HeaderText = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
});

export const ReceiptTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 20,
  textAlign: 'center',
  margin: '16px 0',
});

export const BorderedTableCell = styled(TableCell)({
  height: '20px',
  border: 'thin solid rgb(111, 111, 111)',
  padding: '2px 4px 2px 4px',
});

export const BorderedTableRow = styled('tr')({
  '& > td, & > th': {
    border: 'thin solid rgb(111, 111, 111)',
  },
});

export const SignatureBox = styled(Box)({
  textAlign: 'center',
  padding: '16px',
  minHeight: 80,
});

export const ReceiptNumber = styled(Typography)({
  textAlign: 'right',
  fontWeight: 'bold',
});
