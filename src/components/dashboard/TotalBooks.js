import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Book';
import { red } from '@material-ui/core/colors';

const TotalBooks = ({ total, ...rest }) => (
  <Card sx={{ height: '100%' }} {...rest}>
    <CardContent>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h4">
            TOTAL BOOKS
          </Typography>
          <Typography color="textPrimary" variant="h1">
            {total}
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
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

TotalBooks.propTypes = {
  total: PropTypes.number
};

TotalBooks.defaultProps = {
  total: 0
};

export default TotalBooks;
