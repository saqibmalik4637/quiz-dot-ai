import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';

import WelcomeSlide from '../components/WelcomeSlide';

const WelcomeScreen = ({ navigation }) => {
  const slideContents = [
    {
      text: 'Create, share and play quizzes whenever and wherever you want',
      image: require('../../assets/slide-one.png')
    },

    {
      text: 'Find fun and interesting quizzes to boost up your knowledge',
      image: require('../../assets/slide-two.png')
    },

    {
      text: 'Play and take quiz challenges together with your friends.',
      image: require('../../assets/slide-three.png')
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <View style={styles.container}>
      <PagerView style={styles.swiper} initialPage={0}>
        { 
          slideContents.map((slideData, i) => {
            return <WelcomeSlide key={i} text={slideData.text} image={slideData.image} currentIndex={i} />
          })
        }
      </PagerView>

      <View style={styles.buttonsView}>
        <Pressable
          style={[styles.primaryButton, styles.buttonShadow]}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.primaryButtonText}>GET STARTED</Text>
        </Pressable>

        {/*<Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]} onPress={() => Alert.alert('I ALREADY HAVE AN ACCOUNT')}>*/}
          {/*<Text style={styles.primaryButtonInvertText}>I ALREADY HAVE AN ACCOUNT</Text>*/}
        {/*</Pressable>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    flex: 1,
    backgroundColor: '#fff',
  },

  swiper: {
    flex: 1,
  },

  buttonsView: {
    marginTop: 100,
    marginBottom: 50,
    width: '100%',
  },

  primaryButton: {
    backgroundColor: '#35095c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: 'black',
  },

  primaryButtonInvert: {
    backgroundColor: '#ded5e6',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
  },

  primaryButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },

  primaryButtonInvertText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#35095c',
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default WelcomeScreen;
