import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardHome from '../../components/admin/DashboardHome';

const analytics = {
  totalUsers: 1000,
  activePostings: 200,
  totalApplications: 1500,
};

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <DashboardHome analytics={analytics} />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
