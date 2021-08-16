import {
  Box,
  Button
} from '@material-ui/core';

const StudentListAddStudent = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      mt: 1.5
    }}
  >
    <Button>Import</Button>
    <Button sx={{ mx: 1 }}>Export</Button>
    <Button color="primary" variant="contained">
      Add Student
    </Button>
  </Box>
);

export default StudentListAddStudent;
