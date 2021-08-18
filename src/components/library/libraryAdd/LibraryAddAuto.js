import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const LibraryAddAuto = () => {
  const userInfo = useSelector((state) => state.info.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewBook = (enteredValues) => {
    console.log(userInfo);
    console.log(enteredValues);
    console.log(isLoading);
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{
        isbn: ''
      }}
      validationSchema={Yup.object().shape({
        isbn: Yup.string().max(13).required('ISBN is required')
      })}
      onSubmit={(values) => {
        setIsLoading(true);
        handleNewBook(values);
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
              subheader="Please fill out the ISBN for the book below"
              title="Add Book - Auto Entry"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.isbn && errors.isbn)}
                    fullWidth
                    helperText={touched.isbn && errors.isbn}
                    label="ISBN"
                    name="isbn"
                    onChange={handleChange}
                    required
                    value={values.isbn}
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
                Search
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default LibraryAddAuto;
