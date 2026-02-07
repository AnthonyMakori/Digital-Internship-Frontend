// components/admin/DashboardHome.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = ({ analytics }) => {

  const chartData = [
    { name: 'Users', value: analytics.totalUsers },
    { name: 'Postings', value: analytics.activePostings },
    { name: 'Applications', value: analytics.totalApplications },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Platform Analytics</Typography>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Users</Typography>
            <Typography variant="h5">{analytics.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Active Postings</Typography>
            <Typography variant="h5">{analytics.activePostings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Applications</Typography>
            <Typography variant="h5">{analytics.totalApplications}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>Overview Chart</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6a5acd" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DashboardHome;
