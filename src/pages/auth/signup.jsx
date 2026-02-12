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
    MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const apiUrl = import.meta.env.VITE_API_URL;

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
        role: '',
        roleId: '',
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
        setFadeIn(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset roleId when role changes
        if (name === "role") {
            setFormData(prev => ({
                ...prev,
                role: value,
                roleId: ''
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const getRoleLabel = () => {
        switch (formData.role) {
            case "Student":
                return "Registration Number";
            case "Lecturer":
                return "Staff ID";
            case "Company":
                return "Company ID";
            default:
                return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            openSnackbar('Passwords do not match.', 'error');
            return;
        }

        if (!formData.role) {
            openSnackbar('Please select a role.', 'error');
            return;
        }

        if (!formData.roleId) {
            openSnackbar(`Please enter ${getRoleLabel()}.`, 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    role_id: formData.roleId,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            openSnackbar('Registration successful', 'success');

            setFormData({
                phone: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                roleId: '',
            });

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
        setSnackbar(prev => ({ ...prev, open: false }));
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
                            {snackbar.type === 'success'
                                ? <CheckCircleIcon style={{ marginRight: 8, color: 'white' }} />
                                : <ErrorIcon style={{ marginRight: 8, color: 'white' }} />}
                            {snackbar.message}
                        </Box>
                    }
                    ContentProps={{ style: snackbarStyle }}
                />

                <Container>
                    <LeftSide />

                    <RightSide>
                        <StyledPaper elevation={3}>
                            <Typography variant="h5" gutterBottom>
                                Create An Account
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Box display="flex" gap="10px" mt={4} mb={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        fullWidth
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>

                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                {/* ROLE DROPDOWN */}
                                <TextField
                                    select
                                    label="Select Role"
                                    name="role"
                                    fullWidth
                                    margin="normal"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Student">Student</MenuItem>
                                    <MenuItem value="Lecturer">Lecturer</MenuItem>
                                    <MenuItem value="Company">Company</MenuItem>
                                </TextField>

                                {/* CONDITIONAL ROLE ID */}
                                {formData.role && (
                                    <TextField
                                        label={getRoleLabel()}
                                        name="roleId"
                                        fullWidth
                                        margin="normal"
                                        value={formData.roleId}
                                        onChange={handleChange}
                                        required
                                    />
                                )}

                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    margin="normal"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
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
                                    fullWidth
                                    margin="normal"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Sign Up'}
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
