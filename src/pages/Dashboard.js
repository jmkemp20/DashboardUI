/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import TotalBooks from 'src/components/dashboard/TotalBooks';
import Sales from 'src/components/dashboard//Sales';
import BooksCheckedOut from 'src/components/dashboard/BooksCheckedOut';
import TotalStudents from 'src/components/dashboard/TotalStudents';
import StudentsWithBooks from 'src/components/dashboard/StudentsWithBooks';
import TrafficByClassroom from 'src/components/dashboard/TrafficByClassroom';
import { indexOf } from 'lodash';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true); // Set starting state to true
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [loadedStudents, setLoadedStudents] = useState([]);
  const [numBooks, setNumBooks] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numStudentsWithBooks, setNumStudentsWithBooks] = useState(0);
  const [numBooksCheckedOut, setNumBooksCheckedOut] = useState(0);
  const userID = useSelector((state) => state.info.id);
  const [studentClassroomData, setStudentClassroomData] = useState([]);
  const [studentClassroomLabels, setStudentClassroomLabels] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('/library', {
      method: 'POST',
      body: JSON.stringify({ userId: userID }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNumBooks(data.length);
        setIsLoading(false);
        setLoadedBooks(data);
      });
  }, [userID]);

  useEffect(() => {
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
        let books = 0;
        let students = 0;
        let classrooms = [];
        let classCount = [];
        for (const num in data) {
          if (!classrooms.includes(data[num].classroom)) {
            classrooms.push(String(data[num].classroom));
            classCount.push(0);
          }
          const len = data[num]['book_list'].length;
          if (len > 0) classCount[classrooms.indexOf(data[num].classroom)] += len;
          books += len;
          if (len > 0) students++;
        }
        console.log(classCount);
        console.log(classrooms);
        setStudentClassroomData(classCount);
        setStudentClassroomLabels(classrooms);
        setNumStudentsWithBooks(students);
        setNumBooksCheckedOut(books);
        setNumStudents(data.length);
        setIsLoading(false);
        setLoadedStudents(data);
      });
  }, [userID]);

  return (
    <>
      <Helmet>
        <title>Dashboard | ClassroomLib</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Container maxWidth={false}>
            <Box sx={{ pb: 1 }}>
              <Typography variant="h2">Dashboard</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item lg={6} sm={6} xl={3} xs={12}>
                <TotalBooks total={numBooks} />
              </Grid>
              <Grid item lg={6} sm={6} xl={3} xs={12}>
                <TotalStudents total={numStudents} />
              </Grid>
              <Grid item lg={6} sm={6} xl={3} xs={12}>
                <BooksCheckedOut
                  total={numBooksCheckedOut}
                  numBooks={numBooks}
                />
              </Grid>
              <Grid item lg={6} sm={6} xl={3} xs={12}>
                <StudentsWithBooks
                  total={numStudentsWithBooks}
                  numStudents={numStudents}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByClassroom inData={studentClassroomData} inLabels={studentClassroomLabels} sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
