import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getToken } from '../config/token';
import { fetchCurrentUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectFetchedCurrentUser } from '../reducers/users/userSlice';
import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';

import { softStartupSound } from '../media';
import { loadPlayer, playPlayer, stopPlayer } from '../SoundService';

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCurrentUser = useSelector(selectFetchedCurrentUser);
  const carousels = useSelector(selectCarousels);
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const [sound, setSound] = useState(null);

  const loadingLogo = require('../../assets/loading-logo1.gif');

  useEffect(() => {
    loadPlayer(softStartupSound, setSound, setIsSoundLoaded);

    // Cleanup
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSoundLoaded) {
      playPlayer(sound);
      const timeout = setTimeout(() => {
        stopPlayer(sound);
        getToken().then((res) => {
          if (res !== null) {
            dispatch(fetchCurrentUserAction());
          } else {
            navigation.navigate('Welcome');
          }
        });
      }, 3000);

      return () => {
        isMounted = false
        clearTimeout(timeout)
      }
    }
  }, [isSoundLoaded, dispatch, navigation, getToken]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && fetchedCurrentUser && currentUser && Object.keys(currentUser).length > 0) {
      navigation.navigate('Home');
    } else if (
      isMounted && fetchedCurrentUser &&
      (!currentUser || (currentUser && Object.keys(currentUser).length === 0))
    ) {
      AsyncStorage.removeItem('token');
      navigation.navigate('Welcome');
    }
    return () => {
      isMounted = false;
    };
  }, [fetchedCurrentUser, currentUser, dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={loadingLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
  },
});

export default LoadingScreen;
