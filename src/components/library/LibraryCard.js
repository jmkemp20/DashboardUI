/* eslint no-underscore-dangle: off */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
  Collapse,
  CircularProgress
} from '@material-ui/core';
import MenuBook from '@material-ui/icons/MenuBook';
import DeleteForever from '@material-ui/icons/DeleteForever';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

function LibraryCard({ book, ...rest }) {
  const userInfo = useSelector((state) => state.info.id);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    const postData = {
      userId: userInfo,
      bookId: book._id
    };
    fetch('/deleteBook', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res);
      setIsLoading(false);
    });
  };

  const handleExpand = () => {
    setExpanded(!expanded);
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
            onClick={handleDelete}
          >
            {isLoading ? <CircularProgress /> : <DeleteForever />}
          </IconButton>
        )}
      />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          aria-label="settings"
          aria-haspopup="true"
          onClick={handleExpand}
        >
          {expanded ? (
            <ExpandLess color="action" />
          ) : (
            <ExpandMore color="action" />
          )}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body1"
          >
            {book.description}
          </Typography>
        </Box>
      </Collapse>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <LibraryBooks color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {`${book.copies} Copies`}
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
              {book.isbn10 !== '' && book.isbn10 !== null
                ? `ISBN10: ${book.isbn10}`
                : 'ISBN10: N/A'}
            </Typography>
          </Grid>
        </Grid>
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
              {book.isbn13 !== '' && book.isbn13 !== null
                ? `ISBN13: ${book.isbn13}`
                : 'ISBN13: N/A'}
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
