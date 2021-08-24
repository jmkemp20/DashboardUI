import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Modal,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const userInfo = useSelector((state) => state.info);

  const handleCloseModal = () => {
    setOpenInfo(false);
  };

  const handleOpenModal = () => {
    setOpenInfo(true);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
  };

  return (
    <>
      <AppBar elevation={0} {...rest}>
        <Toolbar>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />
          <Hidden lgDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Info">
              <IconButton color="inherit" onClick={handleOpenModal}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout}>
                <InputIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Modal
        open={openInfo}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Card>
            <CardHeader
              avatar={<Logo />}
              title="ClassroomLibDashboard"
              subheader={`ClassroomLib - Joshua Kemp © ${new Date().getFullYear()}`}
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2
                }}
              >
                <Typography variant="h5">
                  {`ClassroomLibKiosk Link: ${userInfo.id}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography color="secondary">
                  Make sure this matches with your Kiosk
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
