/* eslint no-underscore-dangle: off */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Card,
  Box,
  Modal,
  Grid,
  Pagination,
  Container
} from '@material-ui/core';
import LibraryCard from 'src/components/library/LibraryCard';

const StudentListResults = ({ columns, students }) => {
  const [pageSize, setPageSize] = useState(5);
  const [prevRowSelected, setPrevRowSelected] = useState(-1);
  const [open, setOpen] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleRowSelection = (row) => {
    if (prevRowSelected === row.id) {
      if (row.row.num_books > 0) {
        const tempData = {
          parentId: row.row.parent_id,
          studentId: row.row._id
        };
        fetch('/studentsBooks', {
          method: 'POST',
          body: JSON.stringify(tempData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setBookData(data);
              handleOpen();
            }
          });
      }
      setPrevRowSelected(-1);
    } else {
      setPrevRowSelected(row.id);
    }
  };

  return (
    <Card>
      <div style={{ height: 50 * pageSize + 150, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onRowClick={(selectedRow) => handleRowSelection(selectedRow)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          pagination
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container>
          <Box sx={{ pt: 0 }}>
            <Grid container spacing={4}>
              {bookData
                .slice((page - 1) * 1, (page - 1) * 1 + 1)
                .map((book) => (
                  <Grid item key={book.id} lg={12} md={12} sm={12} xs={12}>
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
              count={Math.round(bookData.length)}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Container>
      </Modal>
    </Card>
  );
};

StudentListResults.propTypes = {
  columns: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired
};

export default StudentListResults;
