import React from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';

const sidebarWidth = 240;

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1f2937', // Dark sidebar
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><WorkIcon /></ListItemIcon>
            <ListItemText primary="Internships" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><AssignmentIcon /></ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><FeedbackIcon /></ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
