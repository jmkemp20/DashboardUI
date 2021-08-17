import {
  Box,
  Card,
  CardContent,
  Grid
} from '@material-ui/core';
import StudentListAddStudent from './StudentListAddStudent';
import StudentListSearchStudents from './StudentListSearchStudents';

const StudentListToolbar = () => (
  <Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item lg={8} sm={6} xl={9} xs={12}>
              <StudentListSearchStudents />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <StudentListAddStudent />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default StudentListToolbar;
