import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Snackbar,
    CircularProgress,
    InputAdornment,
    IconButton,
    Fade,
} from '@mui/material';
import { styled } from '@mui/system';
import api from '../../utils/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const LeftSide = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundImage: 'url("/sided.avif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const RightSide = styled(Box)({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
});

const StyledPaper = styled(Paper)({
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

const SignUp = () => {
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'success',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Trigger fade-in effect after the component mounts
        setFadeIn(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            openSnackbar('Passwords do not match.', 'error');
            return;
        }
    
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
    
            openSnackbar('Registration successful', 'success');
            setFormData({ phone: '', name: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            openSnackbar(error.message || 'Registration failed', 'error');
        } finally {
            setLoading(false);
        }
    };
    

    const openSnackbar = (message, type) => {
        setSnackbar({
            open: true,
            message,
            type,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const snackbarStyle = snackbar.type === 'success'
        ? { backgroundColor: 'green', color: 'white' }
        : { backgroundColor: 'red', color: 'white' };

    return (
        <Fade in={fadeIn} timeout={1000}>
            <div>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={
                        <Box display="flex" alignItems="center">
                            {snackbar.type === 'success' ? (
                                <CheckCircleIcon style={{ marginRight: 8, color: 'white' }} />
                            ) : (
                                <ErrorIcon style={{ marginRight: 8, color: 'white' }} />
                            )}
                            {snackbar.message}
                        </Box>
                    }
                    ContentProps={{
                        style: snackbarStyle,
                    }}
                />
                <Container>
                    <LeftSide />
                    <RightSide>
                        <StyledPaper elevation={3}>
                            <Typography variant="h5" gutterBottom>
                                Create An Account
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Sign up and Get Connected
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Box display="flex" gap="10px" marginBottom="16px" marginTop="40px" flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        autoComplete="tel"
                                    />
                                </Box>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility}>
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleConfirmPasswordVisibility}>
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '1.5rem' }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                                </Button>
                            </form>
                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                                Already have an account?{' '}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    component="a"
                                    href="/Auth/signin"
                                    style={{ textTransform: 'none' }}
                                >
                                    Sign In
                                </Button>
                            </Typography>
                        </StyledPaper>
                    </RightSide>
                </Container>
            </div>
        </Fade>
    );
};

export default SignUp;
