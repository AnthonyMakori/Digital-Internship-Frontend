// components/admin/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const menu = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { name: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { name: 'Internships', icon: <WorkIcon />, path: '/admin/internships' },
    { name: 'Applications', icon: <AssignmentIcon />, path: '/admin/applications' },
    { name: 'Feedback', icon: <FeedbackIcon />, path: '/admin/feedback' },
    { name: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  return (
    <List sx={{ width: 240, bgcolor: '#1f2937', height: '100vh', color: '#fff' }}>
      {menu.map((item) => (
        <ListItem
          button
          key={item.name}
          selected={router.pathname === item.path}
          onClick={() => router.push(item.path)}
        >
          <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
