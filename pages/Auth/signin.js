import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Link,
    FormControlLabel,
    Checkbox,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
    minHeight: '550px',
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
    textAlign: 'center',
    padding: '2rem',
    zIndex: 1,
});

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    return (
        <Container>
            <LeftContainer>
                <StyledPaper elevation={5} style={{ width: '80%' }}>
                    <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Access your account to explore more.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'} 
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                            <Link href="/Auth/password-reset" underline="hover" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Remember me"
                            style={{ marginTop: '0.5rem', textAlign: 'left', width: '100%' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: '1.5rem',
                                background: 'linear-gradient(45deg, #6a5acd, #836fff)',
                                color: '#fff',
                                padding: '0.75rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            href="/Auth/signup"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                fontWeight: 'bold',
                                border: '2px solid #6a5acd',
                            }}
                        >
                            Create an Account
                        </Button>
                    </form>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        style={{ marginTop: '1rem', display: 'block' }}
                    >
                        By signing in, you agree to our{' '}
                        <Link href="#">Terms of Service</Link> and{' '}
                        <Link href="#">Privacy Policy</Link>.
                    </Typography>
                </StyledPaper>
            </LeftContainer>
            <RightContainer>
                <Overlay>
                    <Typography variant="h4">Welcome Back!</Typography>
                </Overlay>
            </RightContainer>
        </Container>
    );
};

export default SignIn;
