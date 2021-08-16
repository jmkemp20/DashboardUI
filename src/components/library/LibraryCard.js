import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuBook from '@material-ui/icons/MenuBook';
import DeleteForever from '@material-ui/icons/DeleteForever';

function LibraryCard({ book, ...rest }) {
  const handleClick = () => {
    console.log('delete');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardHeader
        title={book.title}
        subheader={book.authors}
        action={(
          <IconButton
            aria-label="settings"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <DeleteForever />
          </IconButton>
        )}
      />
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <MenuBook color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {`${book.pages} Pages`}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {book.isbn13 !== ''
                ? `ISBN13: ${book.isbn13}`
                : `ISBN10: ${book.isbn10}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

LibraryCard.propTypes = {
  book: PropTypes.object.isRequired
};

export default LibraryCard;
