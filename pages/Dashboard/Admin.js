import React, { useState, useEffect } from 'react';

// Mock data (You can replace this with actual API calls)
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'intern', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'employer', active: true },
  // Add more users as needed
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [analytics, setAnalytics] = useState({
    totalUsers: 1000,
    activePostings: 200,
    totalApplications: 1500,
  });

  const [feedback, setFeedback] = useState([
    { id: 1, user: 'John Doe', content: 'Great platform!', resolved: false },
    { id: 2, user: 'Jane Smith', content: 'Can you add more job categories?', resolved: false },
  ]);

  const handleDeactivateUser = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, active: false } : user
    ));
  };

  const handleAssignRole = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleResolveFeedback = (feedbackId) => {
    setFeedback(feedback.map(item =>
      item.id === feedbackId ? { ...item, resolved: true } : item
    ));
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Platform Analytics */}
      <section className="analytics bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Platform Analytics</h2>
        <div className="text-lg mb-2">Total Users: {analytics.totalUsers}</div>
        <div className="text-lg mb-2">Active Postings: {analytics.activePostings}</div>
        <div className="text-lg mb-2">Total Applications: {analytics.totalApplications}</div>
      </section>

      {/* User Management */}
      <section className="user-management bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.active ? 'Active' : 'Inactive'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeactivateUser(user.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    {user.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleAssignRole(user.id, user.role === 'intern' ? 'employer' : 'intern')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Assign Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Content Moderation */}
      <section className="content-moderation bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Content Moderation</h2>
        <p className="text-lg">Manage reported content or resolve disputes between users.</p>
      </section>

      {/* Revenue Tracking */}
      <section className="revenue-tracking bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Revenue Tracking</h2>
        <p className="text-lg">Track subscription payments or job post purchases.</p>
      </section>

      {/* System Settings */}
      <section className="system-settings bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
        <p className="text-lg">Configure platform settings, such as allowed job categories, notification templates, etc.</p>
      </section>

      {/* Feedback and Support */}
      <section className="feedback-support bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Feedback and Support</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Feedback</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.content}</td>
                <td className="px-4 py-2">{item.resolved ? 'Resolved' : 'Unresolved'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleResolveFeedback(item.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    {item.resolved ? 'Reopen' : 'Resolve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
