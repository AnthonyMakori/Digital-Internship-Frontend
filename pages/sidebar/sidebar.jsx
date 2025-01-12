import { Container, Text, Group, Anchor, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconBook, IconBriefcase, IconUserHeart, IconBuilding, IconUser, IconSettings } from '@tabler/icons-react';

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        style={{
          backgroundColor: '#1E3',
          color: 'white',
          width: isMobile ? '100%' : '16rem',
          minHeight: '100vh',
          padding: '1.5rem',
          position: isMobile ? 'fixed' : 'static',
          top: 0,
          left: 0,
          zIndex: 10,
          transition: 'width 0.3s ease',
        }}
      >
        <Text align="center" size="xl" weight={700} mb="lg" style={{ fontFamily: 'sans-serif' }}>
          Platform
        </Text>
        <Group direction="column" spacing="xs">
          <Anchor href="/" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconHome size={20} />
              <Text>Dashboard</Text>
            </Group>
          </Anchor>
          <Anchor href="/Dashboard/Interns" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconBook size={20} />
              <Text>Internships</Text>
            </Group>
          </Anchor>
          <Anchor href="/job-placements" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconBriefcase size={20} />
              <Text>Job Placements</Text>
            </Group>
          </Anchor>
          <Anchor href="/students" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconUserHeart size={20} />
              <Text>Students</Text>
            </Group>
          </Anchor>
          <Anchor href="/employers" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconBuilding size={20} />
              <Text>Employers</Text>
            </Group>
          </Anchor>
          <Anchor href="/Dashboard/Admin" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconUser size={20} />
              <Text>Profile</Text>
            </Group>
          </Anchor>
          <Anchor href="/Dashboard/Employers" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <Group direction="row" spacing="sm" align="center">
              <IconSettings size={20} />
              <Text>Settings</Text>
            </Group>
          </Anchor>
        </Group>
      </Box>

      {/* Main Content */}
      <Box style={{ flex: 1, padding: '2rem', marginLeft: isMobile ? 0 : '16rem', transition: 'margin-left 0.3s ease' }}>
        <Text size="xl" weight={700} style={{ fontFamily: 'sans-serif' }}>
          Welcome to the Digital Internship and Job Placement Platform
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
