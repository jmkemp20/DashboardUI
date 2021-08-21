/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  CircularProgress
} from '@material-ui/core';
import StudentListResults from 'src/components/student/StudentListResults';
import StudentListToolbar from 'src/components/student/StudentListToolbar';
import columnNames from 'src/components/student/columnNames';

const StudentList = () => {
  const [isLoading, setIsLoading] = useState(true); // Set starting state to true
  const userID = useSelector((state) => state.info.id);
  const userFirstName = useSelector((state) => state.info.firstName);
  const reduxStudents = useSelector((state) => state.students);
  const dispatch = useDispatch();

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
        const students = [];
        for (const num in data) {
          const temp = {
            id: num,
            ...data[num]
          };
          students.push(temp);
        }
        setIsLoading(false);
        dispatch({ type: 'SET_STUDENT_LIST', payload: students });
      });
  }, [userID]);

  return (
    <>
      <Helmet>
        <title>Students | ClassroomLib</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pb: 1 }}>
            <Typography variant="h2">{`${userFirstName}'s Students`}</Typography>
          </Box>
          <StudentListToolbar />
          <Box sx={{ pt: 3 }}>
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
              <StudentListResults
                columns={columnNames}
                students={reduxStudents}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default StudentList;
