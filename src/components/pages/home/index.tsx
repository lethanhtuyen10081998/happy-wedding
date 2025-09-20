import { Box } from '@mui/material';

import HeroComponent from './components/hero';
import PopularComponent from './components/popular';
import ServiceComponent from './components/service';
import TestimonialsComponent from './components/testimonials';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroComponent />

      {/* Popular Destinations */}
      <PopularComponent />

      {/* Services Section */}
      <ServiceComponent />
      {/* Testimonials */}
      <TestimonialsComponent />
    </Box>
  );
}
