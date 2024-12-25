import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import WelcomeSlide from '../components/WelcomeSlide';

const WelcomeScreen = ({ navigation }) => {
  const slideContents = [
    {
      text: 'Dive into exciting quizzes and explore your favorite topics!',
      image: require('../../assets/slide-one.png'),
    },
    {
      text: 'Test your knowledge across categories that spark your curiosity!',
      image: require('../../assets/slide-two.png'),
    },
    {
      text: "From science to cinema, there's a quiz here just for you!",
      image: require('../../assets/slide-three.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <PagerView style={styles.swiper} initialPage={0}>
        {slideContents.map((slideData, i) => (
          <WelcomeSlide key={i} text={slideData.text} image={slideData.image} currentIndex={i} />
        ))}
      </PagerView>
      <View style={styles.buttonsView}>
        <Pressable
          style={[styles.primaryButton, styles.buttonShadow]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryButtonText}>GET STARTED</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiper: {
    flex: 1,
  },
  buttonsView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#35095c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },
  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
});

export default WelcomeScreen;
