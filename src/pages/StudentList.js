import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import StudentListResults from 'src/components/student/StudentListResults';
import StudentListToolbar from 'src/components/student/StudentListToolbar';
import fullStudents from 'src/__mocks__/fullStudents';
import columnNames from 'src/components/student/columnNames';

const StudentList = () => (
  <>
    <Helmet>
      <title>Students | Material Kit</title>
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
          <Typography variant="h2">Students</Typography>
        </Box>
        <StudentListToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentListResults columns={columnNames} students={fullStudents} />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentList;
