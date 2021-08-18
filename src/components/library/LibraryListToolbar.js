import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const LibraryListToolbar = () => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/app/library/add', { replace: true });
  };

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item lg={8} sm={6} xl={9} xs={12}>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search Library"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item lg={4} sm={6} xl={3} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 1.5
                  }}
                >
                  <Button>Import</Button>
                  <Button sx={{ mx: 1 }}>Export</Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAddBook}
                  >
                    {' '}
                    Add Book
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LibraryListToolbar;
