import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Menu,
  MenuItem,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const CheckoutChart = (props) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state) => state.info.id);
  const [daySelector, setDaySelector] = useState(7);
  const [checkoutData, setCheckoutData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDaySelectorSeven = () => {
    setDaySelector(7);
  };

  const handleDaySelectorThirty = () => {
    setDaySelector(30);
  };

  useEffect(() => {
    console.log(isLoading);
    setIsLoading(true);
    fetch('/students', {
      method: 'POST',
      body: JSON.stringify({ userId: userID }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        let checkoutDaysChart = [];
        let studentsWithBooksDays = [];
        const chartLabels = [];
        const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        if (daySelector === 7) {
          checkoutDaysChart = [0, 0, 0, 0, 0, 0, 0];
          studentsWithBooksDays = [0, 0, 0, 0, 0, 0, 0];
          for (let i = 6; i >= 0; i--) {
            const dateAgo = new Date(currentDate - 1000 * 60 * 60 * 24 * i);
            const dateInfo = dateAgo.toString().split(' ');
            chartLabels.push(`${dateInfo[0]} ${dateInfo[1]} ${dateInfo[2]}`);
          }
        } else {
          checkoutDaysChart = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
          ];
          studentsWithBooksDays = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
          ];
          for (let i = 29; i >= 0; i--) {
            const dateAgo = new Date(currentDate - 1000 * 60 * 60 * 24 * i);
            const dateInfo = dateAgo.toString().split(' ');
            chartLabels.push(`${dateInfo[0]} ${dateInfo[1]} ${dateInfo[2]}`);
          }
        }
        let daysAgoIndex = -1;
        for (let i = 0; i < data.length; i++) {
          for (let y = 0; y < data[i].checkout_list.length; y++) {
            const checkoutDate = new Date(data[i].checkout_list[y] * 1000);
            const diffInTime = checkoutDate.getTime() - currentDate.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);
            if (daySelector === 7) {
              daysAgoIndex = Math.trunc(((diffInDays - -6) / (1 - -6)) * 7);
              checkoutDaysChart[daysAgoIndex] += 1;
            } else {
              daysAgoIndex = Math.trunc(((diffInDays - -29) / (1 - -29)) * 30);
              checkoutDaysChart[daysAgoIndex] += 1;
            }
          }
          if (daysAgoIndex !== -1 && data[i].checkout_list.length > 0) {
            studentsWithBooksDays[daysAgoIndex]++;
          }
        }
        const tempData = {
          datasets: [
            {
              backgroundColor: colors.indigo[500],
              data: checkoutDaysChart,
              label: 'Checked Out Books'
            },
            {
              backgroundColor: colors.green[200],
              data: studentsWithBooksDays,
              label: 'Students With Books'
            }
          ],
          labels: chartLabels
        };
        console.log(checkoutDaysChart);
        console.log(studentsWithBooksDays);
        setCheckoutData(tempData);
        setIsLoading(false);
      });
  }, [daySelector]);

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <>
      <Card {...props}>
        <CardHeader
          action={(
            <Button
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
              onClick={handleMenuClick}
            >
              {`Last ${daySelector} days`}
            </Button>
          )}
          title="Books Checked Out"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Bar data={checkoutData} options={options} />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Overview
          </Button>
        </Box>
      </Card>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {daySelector !== 7 ? (
          <MenuItem onClick={handleDaySelectorSeven}>Last 7 Days</MenuItem>
        ) : (
          <MenuItem onClick={handleDaySelectorThirty}>Last 30 Days</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default CheckoutChart;
