import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';

const EmptyStar = ({color, style, size}) => {
  return (
    <FontAwesomeIcon icon={faStar} color={color} style={style} size={size} />
  )
}

export default EmptyStar;
