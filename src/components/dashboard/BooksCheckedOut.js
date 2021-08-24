import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/CropFreeOutlined';

const BooksCheckedOut = (...props) => {
  const numBooks = useSelector((state) => state.calculations.numBooks);
  const numBooksCheckedOut = useSelector(
    (state) => state.calculations.numBooksCheckedOut
  );

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h4">
              TOTAL BOOKS CHECKED OUT
            </Typography>
            <Typography color="textPrimary" variant="h1">
              {`(${numBooksCheckedOut}) ${(
                (numBooksCheckedOut / (numBooks === 0 ? 1 : numBooks))
                * 100
              ).toFixed(2)}%`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={((numBooksCheckedOut / (numBooks === 0 ? 1 : numBooks))
              * 100)}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BooksCheckedOut;
