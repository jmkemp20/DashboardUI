import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  CircularProgress
} from '@material-ui/core';

const AddStudentForm = ({ handleClose }) => {
  const userInfo = useSelector((state) => state.info.id);
  const [isLoading, setIsLoading] = useState(false);
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const handleNewStudent = (values) => {
    const tempStudent = {
      userId: userInfo,
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      className: values.class
    };
    fetch('/newStudent', {
      method: 'POST',
      body: JSON.stringify(tempStudent),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(students);
        const tempStudents = [...students];
        const tempData = {
          id: tempStudents.length,
          ...data
        };
        tempStudents.push(tempData);
        setIsLoading(false);
        dispatch({ type: 'SET_STUDENT_LIST', payload: tempStudents });
        handleClose();
      });
  };

  return (
    <div>
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
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            class: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required('First Name is required'),
            lastName: Yup.string().max(255).required('Last Name is required'),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            class: Yup.string().max(255).required('Class Block is required')
          })}
          onSubmit={(values) => {
            setIsLoading(true);
            handleNewStudent(values);
          }}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader
                  subheader="Please fill out the information for the student below"
                  title="Add Student"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name"
                        name="firstName"
                        onChange={handleChange}
                        required
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the last name"
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.class && errors.class)}
                        fullWidth
                        helperText={touched.class && errors.class}
                        label="Class Block"
                        name="class"
                        onChange={handleChange}
                        required
                        value={values.class}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Save details
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

AddStudentForm.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default AddStudentForm;
