import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  Box,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

const StudentsWithBooks = ({ total, numStudents, ...props }) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h4">
            STUDENTS WITH BOOKS
          </Typography>
          <Typography color="textPrimary" variant="h1">
            {total}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <LibraryAddCheckIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={(total / numStudents) * 100} variant="determinate" />
      </Box>
    </CardContent>
  </Card>
);

StudentsWithBooks.propTypes = {
  total: PropTypes.number,
  numStudents: PropTypes.number
};

StudentsWithBooks.defaultProps = {
  total: 0,
  numStudents: 0
};

export default StudentsWithBooks;
