import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../reducers/users/userSlice';

export const getCurrentUser = () => {
  console.log("get current user")
  const currentUser = useSelector(selectCurrentUser);
  return currentUser
}
