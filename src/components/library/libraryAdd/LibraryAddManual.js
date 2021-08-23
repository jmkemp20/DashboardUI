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
  Snackbar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const LibraryAddManual = () => {
  const userInfo = useSelector((state) => state.info.id);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleNewBook = (enteredValues) => {
    console.log(isLoading);
    const tempBook = {
      userId: userInfo,
      title: enteredValues.title,
      author: enteredValues.author,
      isbn: enteredValues.isbn,
      date: enteredValues.date,
      publisher: enteredValues.publisher,
      pages: enteredValues.pages,
      description: enteredValues.description
    };
    fetch('/newBook', {
      method: 'POST',
      body: JSON.stringify(tempBook),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setSnackBarText('New Book Added!');
      setOpenSnackBar(true);
      setIsLoading(false);
    });
  };

  return (
    <>
      {!isLoading ? (
        <Formik
          initialValues={{
            title: '',
            author: '',
            isbn: '',
            pages: 0,
            publisher: '',
            date: '',
            description: ''
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Title is required'),
            author: Yup.string().max(255).required('Author(s) is required'),
            isbn: Yup.string().max(13).required('ISBN is required'),
            pages: Yup.number(),
            publisher: Yup.string(),
            date: Yup.date(),
            copies: Yup.number(),
            description: Yup.string()
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
                  subheader="Please fill out the information for the book below"
                  title="Add Book - Manual Entry"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.title && errors.title}
                        label="Title"
                        name="title"
                        onChange={handleChange}
                        required
                        value={values.title}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.author && errors.author)}
                        fullWidth
                        helperText={touched.author && errors.author}
                        label="Author(s)"
                        name="author"
                        onChange={handleChange}
                        required
                        value={values.author}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="ISBN10 or ISBN13 (back of book or back of front cover) (978-X-XX-XXXXXX-X)"
                        label="ISBN"
                        name="isbn"
                        onChange={handleChange}
                        type="isbn"
                        required
                        value={values.isbn}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the number of pages"
                        label="Number of Pages"
                        name="pages"
                        type="number"
                        onChange={handleChange}
                        value={values.pages}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the publisher"
                        label="Publisher"
                        name="publisher"
                        onChange={handleChange}
                        value={values.publisher}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the published date"
                        label="Published Date"
                        name="date"
                        onChange={handleChange}
                        value={values.date}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
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

export default LibraryAddManual;
