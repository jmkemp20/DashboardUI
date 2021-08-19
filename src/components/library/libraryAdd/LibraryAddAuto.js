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
  TextField,
  CircularProgress,
  Typography,
  Snackbar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const LibraryAddAuto = () => {
  const userInfo = useSelector((state) => state.info.id);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleNewBook = (enteredValues) => {
    fetch('/newBookAuto', {
      method: 'POST',
      body: JSON.stringify({ userId: userInfo, isbn: enteredValues.isbn }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          if (data.statusCode === 200) {
            console.log(
              `${data.statusCode} ${data.returnBody.title} ${data.returnBody.author}`
            );
            setIsLoading(false);
            setIsError(false);
            setSnackBarText('New Book Added!');
          } else {
            setErrorMessage(
              `${data.returnBody.message}, now: ${data.returnBody.copies} copies`
            );
            setIsError(true);
            setIsLoading(false);
            setSnackBarText('Added Book Copy!');
          }
          setOpenSnackBar(true);
        });
      } else {
        setErrorMessage(`Unable to add: ${enteredValues.isbn}`);
        setIsError(true);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          isbn: ''
        }}
        validationSchema={Yup.object().shape({
          isbn: Yup.string().min(10).max(13).required('ISBN is required')
        })}
        onSubmit={(values) => {
          setIsLoading(true);
          handleNewBook(values);
        }}
      >
        {({
          errors, handleChange, handleSubmit, touched, values
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
                      autoFocus
                    />
                  </Grid>
                  {!isLoading ? (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        {!isError ? (
                          <Typography>
                            ISBN will be looked up and saved to library
                            automatically
                          </Typography>
                        ) : (
                          <Typography>{errorMessage}</Typography>
                        )}
                      </Box>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          pt: 3
                        }}
                      >
                        <Typography>Searching...</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          pt: 3
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    </Grid>
                  )}
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
                  disabled={isLoading}
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={snackBarText}
        action={(
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </>
  );
};

export default LibraryAddAuto;
