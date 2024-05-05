import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import {CountryPicker} from "react-native-country-codes-picker";

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
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log("Unable to set token", error.message);
    }
  };

  const redirectToHome = () => {
    navigation.navigate('Home');
  }

  const handleSubmit = () => {
    dispatch(createUserAction({
      fullname: fullname,
      age: age,
      country_code: countryCode
    }));
  }

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
    if (fetchedCurrentUser && Object.keys(currentUser).length > 0) {
      dispatch(fetchCarouselsAction());
    }
  }, [fetchedCurrentUser, currentUser]);

  return (
    <View  style={styles.container}>
      <View style={styles.screenIntro}>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitle.text}>CREATE AN ACCOUNT</Text>
        </View>

        <View style={styles.screenDescription}>
          <Text style={styles.screenDescription.text}>Unlock the treasure trove of quizzes tailored just for you! Share a sprinkle of your details, and we'll conjure up the perfect quiz potion for your entertainment delight. Let's get started on this adventure together! 🚀✨</Text>
        </View>
      </View>

      <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{flex: 1}} style={styles.screenForm}>
        <View style={styles.formFields}>
          <View style={styles.inputGroup}>
            <Text style={styles.screenForm.text}>Name</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={setFullname}
              value={fullname}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.screenForm.text}>Age</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={setAge}
              value={age}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.screenForm.text}>Country</Text>

            <TouchableOpacity
              onPress={() => setShowCountryPicker(true)}
              style={styles.textInput}
            >
              <Text style={{fontSize: 18}}>
                {countryName}
              </Text>
            </TouchableOpacity>

            <CountryPicker
              style={{paddingTop: 50}}
              show={showCountryPicker}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                setCountryCode(item.code);
                setCountryName(item.name.en);
                setShowCountryPicker(false);
              }}
              popularCountries={['en', 'in', 'us']}
            />
          </View>
        </View>

        <Pressable
          style={[styles.primaryButton, styles.buttonShadow]}
          onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Let's play</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },

  screenIntro: {
    marginTop: 50,
  },

  screenForm: {
    marginTop: 50,
    width: '100%',
  },

  formFields: {
    marginBottom: 100,
    gap: 20,
  },

  screenTitle: {
    alignItems: 'center',

    text: {
      fontSize: 30,
    }
  },

  screenDescription: {
    paddingTop: 40,
    padding: 10,
    alignItems: 'center',

    text: {
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: 1,
      textAlign: 'center',
    }
  },

  textInput: {
    fontSize: 18,
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#35095c',
    justifyContent: 'center'
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

  primaryButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default SignupScreen;
