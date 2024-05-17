import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../reducers/users/userSlice';

export const getCurrentUser = () => {  
  const currentUser = useSelector(selectCurrentUser);
  return currentUser
}
