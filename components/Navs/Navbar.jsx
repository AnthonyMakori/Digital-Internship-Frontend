import { useState } from 'react';
import { Container, Group, Text, Button, Drawer, ScrollArea, Anchor } from '@mantine/core';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6">
      <Container>
        <div className="flex items-center justify-between">
          <Text className="text-2xl font-bold">MyWebsite</Text>
          <Group spacing={20} className="hidden lg:flex">
            <Anchor href="/" className="hover:text-yellow-400 transition duration-300">
              Home
            </Anchor>
            <Anchor href="/about" className="hover:text-yellow-400 transition duration-300">
              About
            </Anchor>
            <Anchor href="/contact" className="hover:text-yellow-400 transition duration-300">
              Contact
            </Anchor>
          </Group>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="link" className="text-white" onClick={toggleDrawer}>
              ☰
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu - Drawer */}
      <Drawer
        opened={isDrawerOpen}
        onClose={toggleDrawer}
        position="right"
        overlayOpacity={0.5}
        overlayBlur={3}
        padding="xl"
        size="xs"
      >
        <ScrollArea style={{ height: '100%' }}>
          <Group direction="column" spacing={24}>
            <Anchor href="/" className="text-white hover:text-yellow-400" onClick={toggleDrawer}>
              Home
            </Anchor>
            <Anchor href="/about" className="text-white hover:text-yellow-400" onClick={toggleDrawer}>
              About
            </Anchor>
            <Anchor href="/contact" className="text-white hover:text-yellow-400" onClick={toggleDrawer}>
              Contact
            </Anchor>
          </Group>
        </ScrollArea>
      </Drawer>
    </nav>
  );
};

export default Navbar;
