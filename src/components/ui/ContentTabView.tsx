import { Box, Paper, Typography } from '@mui/material';
import { PADDING, SPACING } from 'src/constants/grid';

const ContentTabView = ({
  children,
  headertext,
  color = 'primary.main',
  padding,
  size = 'small',
}: {
  headertext: string;
  children: React.ReactNode;
  color?: string;
  padding?: number;
  size?: 'small' | 'medium';
}) => {
  return (
    <Box component={Paper} height='100%'>
      <Box
        padding={size === 'small' ? 1 : '14.5px'}
        px={2}
        sx={{
          backgroundColor: color,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Typography color={'white'} textTransform='uppercase'>
          {headertext}
        </Typography>
      </Box>

      <Box padding={padding !== undefined ? padding : PADDING} display='grid' gap={SPACING}>
        {children}
      </Box>
    </Box>
  );
};

export default ContentTabView;
