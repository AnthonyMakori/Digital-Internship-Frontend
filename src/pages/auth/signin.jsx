import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

const apiUrl = import.meta.env.VITE_API_URL;

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LeftContainer = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const StyledPaper = styled(Paper)({
  padding: '3rem',
  maxWidth: '450px',
  width: '100%',
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
});

const RightContainer = styled(Box)(({ theme }) => ({
  width: '50%',
  backgroundImage: 'url("/night.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '200px',
  },
}));

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
});

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const openSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Save token
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      openSnackbar('Login successful');

      // Role-based redirect
      const role = data.user.role;

      if (role === 'Company') {
        navigate('/admin');
      } else if (role === 'Student') {
        navigate('/dashboard/interns');
      } else if (role === 'Lecturer') {
        navigate('/dashboard/employers');
      } else {
        navigate('/');
      }
    } catch (error) {
      openSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <StyledPaper elevation={5}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Access your account to explore more.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email or Phone"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Button
              onClick={() => navigate('/auth/signup')}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Account
            </Button>
          </form>
        </StyledPaper>
      </LeftContainer>

      <RightContainer>
        <Overlay>
          <Typography variant="h4">Welcome Back!</Typography>
        </Overlay>
      </RightContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};

export default SignIn;
