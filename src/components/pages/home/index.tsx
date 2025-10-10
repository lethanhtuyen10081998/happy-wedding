import { Box } from '@mui/material';

import HeroComponent from './components/hero';
import PopularComponent from './components/popular';
import ServiceComponent from './components/service';
import TestimonialsComponent from './components/testimonials';

export default function HomePage() {
  return (
    <Box>
      <HeroComponent />

      <PopularComponent />

      <ServiceComponent />

      <TestimonialsComponent />
    </Box>
  );
}
