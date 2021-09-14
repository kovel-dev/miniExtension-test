import { useSelector } from 'react-redux';

import { RootState } from '..';

export default function useAuth() {
  const {
    isLoading,
    isAuthenticated,
    user,
    errorMessage,
    studentName,
  } = useSelector((state: RootState) => state.auth);

  return {
    isLoading,
    isAuthenticated,
    user,
    errorMessage,
    studentName,
  };
}
