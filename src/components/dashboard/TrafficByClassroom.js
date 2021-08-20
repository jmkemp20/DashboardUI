/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  CircularProgress,
  useTheme
} from '@material-ui/core';

const TrafficByClassroom = (...rest) => {
  const [classesData, setClassesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [classroomData, setClassroomData] = useState([]);
  const [classroomLabels, setClassroomLabels] = useState([]);
  const calculationClassroomData = useSelector(
    (state) => state.calculations.classroomData
  );
  const calculationClassroomLabels = useSelector(
    (state) => state.calculations.classroomLabels
  );

  useEffect(() => {
    setIsLoading(true);
    setClassroomData(calculationClassroomData);
    setClassroomLabels(calculationClassroomLabels);
  }, [calculationClassroomData, calculationClassroomLabels]);

  const options = {
    animation: false,
    cutoutPercentage: 75,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
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

  useEffect(() => {
    const tempData = {
      datasets: [
        {
          data: [...classroomData],
          backgroundColor: [
            colors.indigo[500],
            colors.red[600],
            colors.orange[600]
          ],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: [...classroomLabels]
    };
    setData(tempData);

    const tempClasses = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sumBooks = tempData.datasets[0].data.reduce(reducer, 0);
    for (const i in classroomLabels) {
      const tempVal = Number(
        (tempData.datasets[0].data[i] / sumBooks) * 100
      ).toFixed(0);
      const tempClass = {
        title: classroomLabels[i],
        value: tempVal,
        color: tempData.datasets[0].backgroundColor[i]
      };
      tempClasses.push(tempClass);
    }
    setClassesData(tempClasses);
    setIsLoading(false);
  }, [classroomData, classroomLabels]);

  return (
    <Card {...rest}>
      <CardHeader title="Books Checked Out by Classroom" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        {!isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {classesData.map(({ color, title, value }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h2">
                  {value}%
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TrafficByClassroom;
