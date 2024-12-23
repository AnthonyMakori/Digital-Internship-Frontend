import { Container, Group, Text, Anchor, Box } from '@mantine/core';
import { FaFacebookSquare, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
      <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>
        <Text>&copy; 2024 Digital Internship Platform</Text>
        <Group position="center" spacing="lg" style={{ margin: '10px 0' }}>
          <Anchor href="https://facebook.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaFacebookSquare />
          </Anchor>
          <Anchor href="https://twitter.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaTwitter />
          </Anchor>
          <Anchor href="https://linkedin.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaLinkedin />
          </Anchor>
          <Anchor href="https://instagram.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaInstagram />
          </Anchor>
          <Anchor href="https://github.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaGithub />
          </Anchor>
          <Anchor href="https://youtube.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaYoutube />
          </Anchor>
          <Anchor href="https://tiktok.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaTiktok />
          </Anchor>
          <Anchor href="https://pinterest.com" target="_blank" color="white" style={{ fontSize: '24px' }}>
            <FaPinterest />
          </Anchor>
        </Group>
        <Text>
          Contact us: <Anchor href="mailto:info@digitalinternshipplatform.com" color="white">info@digitalinternshipplatform.com</Anchor>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
