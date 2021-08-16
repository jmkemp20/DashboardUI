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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const StudentsWithBooks = (props) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h4">
            STUDENTS WITH BOOKS
          </Typography>
          <Typography color="textPrimary" variant="h1">
            30
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
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={20} variant="determinate" />
      </Box>
    </CardContent>
  </Card>
);

export default StudentsWithBooks;
