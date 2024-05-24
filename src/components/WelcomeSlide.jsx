import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const WelcomeSlide = ({ text, image, currentIndex }) => {
  return (
    <View  style={styles.slide}>
      <Image source={image} style={styles.stretch} />
      <Text style={styles.text}>{text}</Text>

      <View style={styles.dotsContainer}>
        <View style={[styles.dot, currentIndex === 0 ? { backgroundColor: '#35095c' } : { backgroundColor: '#ded5e6' }]}></View>
        <View style={[styles.dot, currentIndex === 1 ? { backgroundColor: '#35095c' } : { backgroundColor: '#ded5e6' }]}></View>
        <View style={[styles.dot, currentIndex === 2 ? { backgroundColor: '#35095c' } : { backgroundColor: '#ded5e6' }]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'center',
  },

  text: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center'
  },

  dotsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '40%',
    height: 100,
    borderRadius: 100,
    flexDirection: 'row',
  },

  dot: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
  },
});

export default WelcomeSlide;
