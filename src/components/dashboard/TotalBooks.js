import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Avatar, Card, CardContent, Grid, Typography
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import { red } from '@material-ui/core/colors';

const TotalBooks = (...rest) => {
  const calculationNumBooks = useSelector(
    (state) => state.calculations.numBooks
  );
  const [numBooks, setNumBooks] = useState(0);

  useEffect(() => {
    setNumBooks(calculationNumBooks);
  }, [calculationNumBooks]);

  return (
    <Card sx={{ height: '100%' }} {...rest}>
      <CardContent>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h4">
              TOTAL BOOKS
            </Typography>
            <Typography color="textPrimary" variant="h1">
              {numBooks}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <BookIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalBooks;
