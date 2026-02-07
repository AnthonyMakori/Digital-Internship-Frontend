import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
};

const ModalInternshipEdit = ({ internship, open, onClose }) => {
  const [title, setTitle] = useState(internship.title || '');
  const [department, setDepartment] = useState(internship.department || '');

  const handleSave = () => {
    console.log('Update Internship:', { ...internship, title, department });
    // TODO: Call backend API
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Edit Internship</Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Department"
          fullWidth
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
    </Modal>
  );
};

export default ModalInternshipEdit;
