import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UsersPage from '../../components/admin/UsersPage';

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <UsersPage />
    </AdminLayout>
  );
};

export default AdminUsersPage;
