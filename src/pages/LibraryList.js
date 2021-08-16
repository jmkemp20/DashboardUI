import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination
} from '@material-ui/core';
import LibraryListToolbar from 'src/components/library/LibraryListToolbar';
import LibraryCard from 'src/components/library/LibraryCard';
import fullLibrary from 'src/__mocks__/fullLibrary';

const sortedLibrary = []
  .concat(fullLibrary)
  .sort((a, b) => (a.title > b.title ? 1 : -1));

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
        <Box sx={{ pb: 1 }}>
          <Typography variant="h2">Library</Typography>
        </Box>
        <LibraryListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={4}>
            {sortedLibrary.map((book) => (
              <Grid
                item
                key={book.isbn10 + book.isbn13}
                lg={3}
                md={4}
                sm={6}
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
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

export default LibraryList;
