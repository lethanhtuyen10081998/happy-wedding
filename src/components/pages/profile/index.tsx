import { Container, Grid } from '@mui/material';
import ScrollableTabs from 'src/components/material/ScrollableTabs';

import HeaderPhoto from './components/HeaderPhoto';
import Tour from './components/TabsInformation/Tour';
import Visa from './components/TabsInformation/Visa';
import UserInformation from './components/UserInformation';

const ProfilePage = () => {
  return (
    <Container maxWidth='lg'>
      <HeaderPhoto />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <UserInformation />
        </Grid>

        <Grid item xs={12} md={8} mt={-6}>
          <ScrollableTabs
            paddingContent={0}
            tabs={[
              { component: <Tour />, label: 'Tour đã đi', value: 0 },
              { component: <Visa />, label: 'Thông tin VISA', value: 1 },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
