import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const useUserName = () => {
  const context = useContext(UserContext)

  if (context === undefined) throw new Error('undefined context')

  return context
}

export default useUserName;