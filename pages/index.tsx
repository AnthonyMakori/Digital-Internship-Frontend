// pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Login page
    router.push('/Auth/signin');  
  }, [router]);

  return <div className='text-bold' style={{backgroundColor:'aqua', paddingLeft:'40px'}}>Redirecting To Login...</div>; 
};

export default HomePage;
