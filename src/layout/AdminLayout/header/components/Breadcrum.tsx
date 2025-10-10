import { Box, Breadcrumbs, Typography } from '@mui/material';
import NextLink from 'src/components/material/NextLink';
import { useBreadcrumb } from 'src/context/layoutContext/hooksContext';

function Breadcrum() {
  const breadcrumb = useBreadcrumb();

  return (
    <Box ml={2}>
      <Breadcrumbs aria-label='breadcrumb'>
        {breadcrumb.map((item, index) => {
          if (index === breadcrumb.length - 1 || !item?.link) {
            return (
              <Typography key={index} color='text.primary' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {item.label}
              </Typography>
            );
          }

          return (
            <NextLink key={item.link} href={item.link}>
              <Typography key={index} color='text.primary' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                {item.label}
              </Typography>
            </NextLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

export default Breadcrum;
