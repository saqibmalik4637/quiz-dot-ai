import AntDesign from '@expo/vector-icons/AntDesign';

const FilledStar = ({color='#35095c', style={height: 30,width: 30}, size=20}) => {
  return (
    <AntDesign name="heart" color={color} style={style} size={size} />
  )
}

export default FilledStar;
