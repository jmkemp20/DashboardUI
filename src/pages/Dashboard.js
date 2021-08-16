import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import TotalBooks from 'src/components/dashboard/TotalBooks';
import Sales from 'src/components/dashboard//Sales';
import BooksCheckedOut from 'src/components/dashboard/BooksCheckedOut';
import TotalStudents from 'src/components/dashboard/TotalStudents';
import StudentsWithBooks from 'src/components/dashboard/StudentsWithBooks';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | ClassroomLib</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pb: 1 }}>
          <Typography variant="h2">Dashboard</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBooks />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalStudents />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <BooksCheckedOut />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StudentsWithBooks />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
