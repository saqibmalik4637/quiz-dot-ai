import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useVideoPlayer, VideoView } from 'expo-video';

import { getToken } from '../config/token';

import { fetchCurrentUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectFetchedCurrentUser } from '../reducers/users/userSlice';

import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCurrentUser = useSelector(selectFetchedCurrentUser);
  const carousels = useSelector(selectCarousels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToken().then((res) => {
      if (res !== null) {
        dispatch(fetchCurrentUserAction());
      } else {
        navigation.navigate('Welcome');
      }
    })
  }, [getToken]);

  useEffect(() => {
    if (fetchedCurrentUser && (currentUser && Object.keys(currentUser).length > 0)) {
      dispatch(fetchCarouselsAction());
    } else if (fetchedCurrentUser && (!currentUser || (currentUser && Object.keys(currentUser).length === 0))) {
      AsyncStorage.removeItem('token');
      navigation.navigate('Signup')
    }
  }, [fetchedCurrentUser, currentUser]);

  useEffect(() => {
    if (fetchedCurrentUser && (carousels && carousels.length > 0)) {
      navigation.navigate('Home');
    }
  }, [fetchedCurrentUser, carousels]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoadingScreen;
