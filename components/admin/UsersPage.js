import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from '@mui/material';
import api from '../../utils/api';
import ModalUserEdit from './ModalUserEdit';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api('/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivate = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
    // TODO: Call backend API
  };

  const handleRoleChange = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'intern' ? 'employer' : 'intern' } : u));
    // TODO: Call backend API
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Users</Typography>
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.active ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeactivate(u.id)} sx={{ mr: 1 }} variant="contained" color="primary">
                    {u.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button onClick={() => handleRoleChange(u.id)} sx={{ mr: 1 }} variant="contained" color="secondary">
                    Change Role
                  </Button>
                  <Button onClick={() => handleEdit(u)} variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {selectedUser && (
        <ModalUserEdit
          user={selectedUser}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Box>
  );
};

export default UsersPage;
