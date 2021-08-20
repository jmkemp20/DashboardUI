import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar, Card, CardContent, Grid, Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalStudents = (...props) => {
  const calculationNumStudents = useSelector(
    (state) => state.calculations.numStudents
  );
  const [numStudents, setNumStudents] = useState(0);

  useEffect(() => {
    setNumStudents(calculationNumStudents);
  }, [calculationNumStudents]);

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h4">
              TOTAL STUDENTS
            </Typography>
            <Typography color="textPrimary" variant="h1">
              {numStudents}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalStudents;
