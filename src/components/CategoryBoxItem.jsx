import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Pressable } from 'react-native'

const CategoryBoxItem = ({category}) => {
  return (
    <ImageBackground
      style={styles.image}
      imageStyle={{ borderRadius: 20 }}
      source={{uri: category.image_url}}
      resizeMode="cover">
      <View style={styles.imageInner}>
        <Text numberOfLines={1} style={styles.text}>{category.name}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'flex-end',
    height: 120,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  imageInner: {
    backgroundColor: 'rgba(222, 213, 230, 0.6)',
    padding: 10,
    maxWidth: '70%',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  text: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default CategoryBoxItem;
