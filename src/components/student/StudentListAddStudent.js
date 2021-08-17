import { useState } from 'react';
import { Box, Button, Modal } from '@material-ui/core';
import AddStudentForm from './AddStudentForm';

const StudentListAddStudent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 1.5
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Add Student
      </Button>
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
        <div>
          <AddStudentForm handleClose={handleClose} />
        </div>
      </Modal>
    </Box>
  );
};

export default StudentListAddStudent;
