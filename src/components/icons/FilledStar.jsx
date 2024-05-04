import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

const FilledStar = ({color, style, size}) => {
  return (
    <FontAwesomeIcon icon={faStar} color={color} style={style} size={size} />
  )
}

export default FilledStar;
