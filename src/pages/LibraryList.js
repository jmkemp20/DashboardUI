import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import LibraryListToolbar from 'src/components/library/LibraryListToolbar';
import LibraryCard from 'src/components/library/LibraryCard';
import books from 'src/__mocks__/books';

const LibraryList = () => (
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
        <LibraryListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={4}
          >
            {books.map((book) => (
              <Grid
                item
                key={book.id}
                lg={4}
                md={6}
                xs={12}
              >
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
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default LibraryList;
