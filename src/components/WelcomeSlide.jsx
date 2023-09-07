import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const WelcomeSlide = ({ text, image }) => {
  return (
    <View  style={styles.slide}>
      <Image source={image} style={styles.stretch} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center'
  },

  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'center',
  },

  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 600,
    textAlign: 'center'
  }
});

export default WelcomeSlide;
