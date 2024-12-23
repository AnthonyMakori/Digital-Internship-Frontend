import { useState } from 'react';
import {  Container, Title, Text, Paper, LoadingOverlay } from '@mantine/core';
import { TextField, Button, Typography, Box, Link, FormControlLabel, Checkbox } from '@mui/material';
import { useRouter } from 'next/router';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleResetRequest = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
  
    setErrorMessage('');
    setIsLoading(true);
  
    try {
      // Replace with your API call for password reset
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send password reset email.');
      }
  
      router.push('/password-reset-sent'); // Redirect to confirmation page after success
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Something went wrong.');
      } else {
        setErrorMessage('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      size="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '0 20px',
      }}
    >
      <Paper
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
        }}
        withBorder
        shadow="md"
      >
        <LoadingOverlay visible={isLoading} opacity={0.3} />
        <Title style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Your Password</Title>

        {errorMessage && (
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#f44336',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            {errorMessage}
          </Text>
        )}

        <TextField
          label="Enter your email address"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            marginBottom: '20px',
            width: '100%',
            backgroundColor: '#f9f9f9',
            borderColor: '#e0e0e0',
           
          }}
          
        />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleResetRequest}
                style={{ marginTop: '1.5rem' }}
            >
                      
          Reset Password
        </Button>

        <Text style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/Auth/signin" style={{ color: '#1a73e8', textDecoration: 'none' }}>
            Remember your password? Login
          </a>
        </Text>
      </Paper>
    </Container>
  );
};

export default PasswordResetPage;
