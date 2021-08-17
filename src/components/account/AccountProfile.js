import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { User as AccountCircle } from 'react-feather';

const AccountProfile = (props) => {
  const userEmail = useSelector((state) => state.email);
  const userName = useSelector(
    (state) => `${state.info.firstName} ${state.info.lastName}`
  );
  const userInfo = useSelector((state) => state.info);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={AccountCircle.src}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userInfo.address}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userEmail}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userInfo.id}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
