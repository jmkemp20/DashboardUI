import PropTypes from 'prop-types';
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

const BooksCheckedOut = ({ total, ...props }) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h4"
          >
            TOTAL BOOKS CHECKED OUT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h1"
          >
            {`${(total * 100).toFixed(2)}%`}
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
          value={(total * 100).toFixed(2)}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);

BooksCheckedOut.propTypes = {
  total: PropTypes.number
};

BooksCheckedOut.defaultProps = {
  total: 0
};

export default BooksCheckedOut;
