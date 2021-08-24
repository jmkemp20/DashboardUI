import { useSelector } from 'react-redux';
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

const StudentsWithBooks = (...props) => {
  const numStudentsWithBooks = useSelector(
    (state) => state.calculations.numStudentsWithBooks
  );
  const numStudents = useSelector((state) => state.calculations.numStudents);

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h4">
              STUDENTS WITH BOOKS
            </Typography>
            <Typography color="textPrimary" variant="h1">
              {numStudentsWithBooks}
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
          <LinearProgress
            value={
              (numStudentsWithBooks / (numStudents === 0 ? 1 : numStudents))
              * 100
            }
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentsWithBooks;
