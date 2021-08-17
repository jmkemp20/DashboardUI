/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
  CircularProgress
} from '@material-ui/core';
import LibraryListToolbar from 'src/components/library/LibraryListToolbar';
import LibraryCard from 'src/components/library/LibraryCard';
import fullLibrary from 'src/__mocks__/fullLibrary';

const sortedLibrary = []
  .concat(fullLibrary)
  .sort((a, b) => (a.title > b.title ? 1 : -1));

const LibraryList = () => {
  const [isLoading, setIsLoading] = useState(true); // Set starting state to true
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [numBooks, setNumBooks] = useState(1);
  const [page, setPage] = useState(1);
  const userID = useSelector((state) => state.info.id);

  const handleChange = (event, value) => {
    setPage(value);
  };

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
        const books = [];
        for (const num in data) {
          const temp = {
            id: num,
            ...data[num]
          };
          books.push(temp);
        }
        setNumBooks(books.length);
        setIsLoading(false);
        setLoadedBooks(books.sort((a, b) => (a.title > b.title ? 1 : -1)));
      });
  }, [userID]);

  return (
    <>
      <Helmet>
        <title>Library | Material Kit</title>
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
            <Typography variant="h2">Library</Typography>
          </Box>
          <LibraryListToolbar />
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
            <>
              <Box sx={{ pt: 3 }}>
                <Grid container spacing={4}>
                  {loadedBooks.slice((page - 1) * 12, (page - 1) * 12 + 12).map((book) => (
                    <Grid item key={book.id} lg={3} md={4} sm={6} xs={12}>
                      <LibraryCard book={book} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3
                }}
              >
                <Pagination
                  color="primary"
                  count={Math.round(numBooks / 12)}
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default LibraryList;
