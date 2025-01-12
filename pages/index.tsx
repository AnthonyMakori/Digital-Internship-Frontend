// pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Login page
    router.push('/Auth/signin');  
  }, [router]);

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        Redirecting To Login...
      </div>
    </div>
  );
};

export default HomePage;
