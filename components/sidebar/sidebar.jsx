import { Container, Text, Group, Anchor, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconBook, IconBriefcase, IconUserGraduate, IconBuilding, IconUser, IconSettings } from '@tabler/icons-react';

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        style={{
          backgroundColor: '#1E3A8A', // Blue color
          color: 'white',
          width: isMobile ? '100%' : '16rem', // Full width on mobile
          minHeight: '100vh',
          padding: '1.5rem',
          position: isMobile ? 'fixed' : 'static',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <Text align="center" size="xl" weight={700} mb="lg">
          Platform
        </Text>
        <Group direction="column" spacing="xs">
          <Anchor href="/" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconHome />
              <Text>Dashboard</Text>
            </Group>
          </Anchor>
          <Anchor href="/internships" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconBook />
              <Text>Internships</Text>
            </Group>
          </Anchor>
          <Anchor href="/job-placements" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconBriefcase />
              <Text>Job Placements</Text>
            </Group>
          </Anchor>
          <Anchor href="/students" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconUserGraduate />
              <Text>Students</Text>
            </Group>
          </Anchor>
          <Anchor href="/employers" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconBuilding />
              <Text>Employers</Text>
            </Group>
          </Anchor>
          <Anchor href="/profile" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconUser />
              <Text>Profile</Text>
            </Group>
          </Anchor>
          <Anchor href="/settings" color="white" className="hover:bg-blue-600 p-2 rounded-lg transition">
            <Group spacing="sm">
              <IconSettings />
              <Text>Settings</Text>
            </Group>
          </Anchor>
        </Group>
      </Box>

      {/* Main Content */}
      <Box style={{ flex: 1, padding: '2rem' }}>
        <Text size="xl" weight={700}>
          Welcome to the Digital Internship and Job Placement Platform
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
