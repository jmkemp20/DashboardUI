/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Tab,
  Tabs
} from '@material-ui/core';
import TabPanel from 'src/components/layouts/TabPanel';
import LibraryAddManual from 'src/components/library/libraryAdd/LibraryAddManual';
import LibraryAddAuto from 'src/components/library/libraryAdd/LibraryAddAuto';
import LibraryAddFile from 'src/components/library/libraryAdd/LibraryAddFile';

const LibraryAdd = () => {
  const userFirstName = useSelector((state) => state.info.firstName);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Library Add | ClassELib</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container>
          <Box sx={{ pb: 1 }}>
            <Typography variant="h2">{`Add to ${userFirstName}'s Library`}</Typography>
          </Box>
          <AppBar position="static" sx={{ mt: 3 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="library add book"
              centered
              sx={{
                backgroundColor: 'background.default',
                py: 2
              }}
            >
              <Tab label="Manual Entry" />
              <Tab label="Auto Entry" />
              <Tab label="File Import" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <LibraryAddManual />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LibraryAddAuto />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LibraryAddFile />
          </TabPanel>
        </Container>
      </Box>
    </>
  );
};

export default LibraryAdd;
