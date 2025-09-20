import { Box, Paper, Typography } from '@mui/material';

const CardViewReport = ({
  title,
  value,
  backgroundColor,
  color,
}: {
  title: string;
  value: string;
  backgroundColor: string;
  color?: string;
}) => {
  return (
    <Box
      component={Paper}
      sx={{
        backgroundColor: backgroundColor,
        padding: 0.5,
        px: 2,
        maxWidth: 150,
      }}
    >
      <Box>
        <Typography variant='body1' color={color}>
          {title}
        </Typography>
        <Typography fontSize={'0.75rem'} color={color}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardViewReport;
