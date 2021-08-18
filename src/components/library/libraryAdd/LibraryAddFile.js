import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  CardActions,
  Paper,
  CircularProgress
} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';

const LibraryAddFile = () => {
  const [fileName, setFileName] = useState();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setFileName(event.target.files[0]);
    setIsFileUploaded(true);
  };

  const uploadHandler = () => {
    if (isFileUploaded) {
      setIsLoading(true);
      const data = new FormData();
      data.append('file', fileName);
      fetch('/newBookFileUplad', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res);
        setIsLoading(false);
      });
    }
  };

  return (
    <Card>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box sx={{ p: 3 }}>
          <label htmlFor="upload-book-file">
            <input
              accept=""
              id="upload-book-file"
              type="file"
              onChange={changeHandler}
              hidden
            />
            <Button component="span">
              <Paper elevation={5} sx={{ px: 2, py: 1 }}>
                <BackupIcon
                  sx={{
                    height: 50,
                    width: 50
                  }}
                />
              </Paper>
            </Button>
          </label>
        </Box>
        <Box sx={{ p: 3 }}>
          {isFileUploaded
            ? `${fileName.name}`
            : 'Please upload a .csv or .json file'}
        </Box>
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
          <></>
        )}
      </Box>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={uploadHandler}
        >
          Upload File
        </Button>
      </CardActions>
    </Card>
  );
};

export default LibraryAddFile;
