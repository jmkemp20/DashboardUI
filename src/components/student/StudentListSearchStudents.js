import {
  TextField,
  InputAdornment,
  Box,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const StudentListSearchStudents = () => (
  <Box>
    <TextField
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon fontSize="small" color="action">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        )
      }}
      placeholder="Search Students"
      variant="outlined"
    />
  </Box>
);

export default StudentListSearchStudents;
