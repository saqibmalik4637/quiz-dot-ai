import { StyleSheet, Text, View, Image } from 'react-native';

const WelcomeSlide = ({ text, image, currentIndex }) => {
  return (
    <View style={styles.slide}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  image: {
    width: '100%',
    height: '70%', // Takes most of the space
    resizeMode: 'contain',
  },
  text: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#35095c',
  },
  inactiveDot: {
    backgroundColor: '#ded5e6',
  },
});

export default WelcomeSlide;
