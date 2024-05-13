import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';

const EmptyStar = ({color='#35095c', style={height: 30,width: 30}, size=20}) => {
  return (
    <FontAwesomeIcon icon={faStar} color={color} style={style} size={size} />
  )
}

export default EmptyStar;
