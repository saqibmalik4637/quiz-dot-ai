import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { fetchCurrentUserAction, createUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectFetchedCurrentUser, selectUserToken } from '../reducers/users/userSlice';
import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCurrentUser = useSelector(selectFetchedCurrentUser);
  const carousels = useSelector(selectCarousels);

  const [tokenStored, setTokenStored] = useState(false);
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');

  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log("Unable to set token", error.message);
    }
  };

  const redirectToHome = () => {
    navigation.navigate('Home');
  };

  const handleSubmit = () => {
    dispatch(createUserAction({
      fullname: fullname,
      age: age,
    }));
  };

  useEffect(() => {
    if (userToken) {
      _storeToken(userToken);
      setTokenStored(true);
    }
  }, [userToken]);

  useEffect(() => {
    if (tokenStored) {
      dispatch(fetchCurrentUserAction());
    }
  }, [tokenStored]);

  useEffect(() => {
    if (fetchedCurrentUser && currentUser && Object.keys(currentUser).length > 0) {
      dispatch(fetchCarouselsAction());
    }
  }, [fetchedCurrentUser, currentUser]);

  useEffect(() => {
    if (carousels && carousels.length > 0) {
      navigation.navigate('Home');
    }
  }, [carousels]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} // Adjust as per your header height
    >
      <ScrollView
        contentContainerStyle={styles.screenForm}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screenIntro}>
          <View style={styles.screenTitle}>
            <Text style={styles.screenTitleText}>Create Your Account</Text>
          </View>

          <View style={styles.screenDescription}>
            <Text style={styles.screenDescriptionText}>
              Share a little about yourself, and let’s get you started on an exciting quiz adventure!
            </Text>
          </View>
        </View>

        <View style={styles.formFields}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setFullname}
              value={fullname}
              placeholder="Enter your name"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setAge}
              value={age}
              keyboardType="numeric"
              placeholder="Enter your age"
              placeholderTextColor="#888"
            />
          </View>

          <Pressable
            style={[styles.primaryButton, styles.buttonShadow]}
            onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>Let's Play</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  screenIntro: {
    marginTop: 20,
    alignItems: 'center',
  },

  screenTitle: {
    marginBottom: 10,
  },

  screenTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#35095c',
    textAlign: 'center',
  },

  screenDescription: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },

  screenDescriptionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#666',
    letterSpacing: 0.5,
  },

  screenForm: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  formFields: {
    width: '100%',
    gap: 20,
  },

  inputGroup: {
    width: '100%',
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35095c',
    marginBottom: 8,
  },

  textInput: {
    fontSize: 18,
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#35095c',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },

  primaryButton: {
    backgroundColor: '#35095c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 50,
    marginTop: 20,
  },

  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SignupScreen;
