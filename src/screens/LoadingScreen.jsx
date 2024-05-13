import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getToken } from '../config/token';

import { fetchCurrentUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectFetchedCurrentUser } from '../reducers/users/userSlice';

import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';

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
      <ActivityIndicator size="large" color="#35095c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 260,
  },
  logo: {
    height: 250,
    width: 250,
  },
});

export default LoadingScreen;
