import React from 'react';
import Auth from '../../components/Auth';
import Home from '../../components/Home';
import useAuth from '../../store/hooks/auth';

const ME: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? <Auth /> : <Home />}
    </>
  );
};

export default ME;
