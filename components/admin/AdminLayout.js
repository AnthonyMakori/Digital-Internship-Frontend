// components/admin/AdminLayout.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
