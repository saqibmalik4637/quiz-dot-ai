import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity,
         TextInput, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';

import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';
import { joinRoomAction } from '../reducers/rooms/roomAction';
import { selectRoom } from '../reducers/rooms/roomSlice';

import QuizCarousel from '../components/carousels/Quizzes';
import CategoryCarousel from '../components/carousels/Categories';

import { loadPlayer, playPlayer, stopPlayer } from '../SoundService';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import {
  softViolinMusicSound,
  boyGirlAnimatedOne,
} from '../media';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const carousels = useSelector(selectCarousels);
  const { newUserJoined, room } = useSelector(selectRoom);
  const scrollYRef = useRef(0);
  const [showHeader, setShowHeader] = useState(true);
  const [joiningCode, setJoiningCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const [sound, setSound] = useState(null);

  // Disable back navigation to prevent going to previous screens
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // Prevents going back
      };

      // Listen for the back button press on Android
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup on screen unmount
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    dispatch(fetchCarouselsAction());

    loadPlayer(softViolinMusicSound, setSound, setIsSoundLoaded);

    // Cleanup
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading && isSoundLoaded) {
      playPlayer(sound);
    }
  }, [isSoundLoaded, isLoading]);

  useEffect(() => {
    // Create an array of promises for image preloading
    const preloadImages = carousels.flatMap((carousel) =>
      carousel.items.map((item) =>
        Image.prefetch(item.image_url)
      )
    );

    // Wait for all images to load
    Promise.all(preloadImages)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          stopPlayer(sound);
        }, 5000)
      })
      .catch((error) => {
        setIsLoading(false);
        stopPlayer(sound);
      });
  }, [carousels]);

  useEffect(() => {
    if (newUserJoined && room) {
      navigation.navigate('JoiningRoom', { room: room });
    }
  }, [newUserJoined, room]);

  const joinRoom = () => {
    dispatch(joinRoomAction(joiningCode));
  };

  return (
    <>
      <View style={[styles.loadingWrapper, isLoading ? {} : styles.hide]}>
        <LinearGradient
          colors={['yellow', '#ffffff']}
          style={styles.headerGradient}
        >
          <View style={styles.loadingHeader}>
            <Image style={styles.loadinLogo} source={require('../../assets/logo.png')} />
          </View>
        </LinearGradient>
        <Text style={styles.loadingText}>🍳 Cooking Up Quizzes! 🧠✨</Text>
        <Image source={boyGirlAnimatedOne} style={styles.loadingImage} />
      </View>

      <View style={[styles.container, isLoading ? styles.hide : {}]}>
        {showHeader && (
          <LinearGradient
            colors={['yellow', '#ffffff']} // Define gradient colors here
            style={styles.headerGradient}
          >
            <View style={styles.headerComponent}>
              <Image style={styles.logo} source={require('../../assets/logo.png')} />
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.headerButton}>
                  <AntDesign name="search1" color="#ffffff" style={styles.icon} size={28} />
                </TouchableOpacity>

                 {/*<TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.headerButton}> 
                   <AntDesign name="user" color="#ffffff" style={styles.icon} size={28} /> 
                 </TouchableOpacity>*/}
              </View>
            </View>
          </LinearGradient>
        )}

        {/*<View style={styles.joinRoomContainer}>
          <Text style={styles.joinRoomHeading}>Play with friends</Text>
          <Text style={styles.inputLabel}>Enter a room joining code:</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              onChangeText={setJoiningCode}
              value={joiningCode}
            />

            <TouchableOpacity style={styles.submitIcon} onPress={joinRoom}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>*/}

        {carousels && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {carousels.map((carousel, index) => (
              <View key={index} style={styles.carousel}>
                {carousel.type === 'QuizCarousel' ? (
                  <QuizCarousel navigation={navigation} carousel={carousel} />
                ) : (
                  <CategoryCarousel navigation={navigation} carousel={carousel} />
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#ffffff',
    justifyContent: 'start',
  },
  loadingWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  hide: {
    display: 'none'
  },
  loadinLogo: {
    width: 100,
    resizeMode: 'contain',
  },
  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  loadingImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  loadingText: {
    color: '#FF8C00',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  carousel: {
    marginBottom: 20,
  },
  headerGradient: {
    width: '100%',
    // paddingTop: 40,
    // paddingBottom: 10,
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: '#f07839',
    width: 50,                // Set a square dimension for consistent centering
    height: 50,
    borderRadius: 20,         // Half of width/height to make it circular
    marginRight: 15,
    textAlign: 'center',
  },
  icon: {
    color: '#ffffff',
    textAlign: 'center',       // Ensures the icon text is centered if needed
  },
  headerButtonText: {
    color: '#ffffff'
  },
  joinRoomContainer: {
    backgroundColor: '#ded5e6',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  joinRoomHeading: {
    fontSize: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 18,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#35095c',
    justifyContent: 'space-between',
    width: '70%',
  },
  submitIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35095c',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default HomeScreen;
