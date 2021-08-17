/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const [loadedStudents, setLoadedStudents] = useState([]);
  const userID = useSelector((state) => state.info.id);

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
        setLoadedStudents(students);
      });
  }, [userID]);

  return (
    <>
      <Helmet>
        <title>Students | Material Kit</title>
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
            <Typography variant="h2">Students</Typography>
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
                students={loadedStudents}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default StudentList;
