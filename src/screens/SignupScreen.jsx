import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import {CountryPicker} from "react-native-country-codes-picker";

import { fetchCurrentUserAction, createUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectFetchedCurrentUser, selectUserToken } from '../reducers/users/userSlice';

import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCurrentUser = useSelector(selectFetchedCurrentUser);
  const carousels = useSelector(selectCarousels);
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

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
      dispatch(fetchCurrentUserAction());
    }
  }, [userToken]);

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
          <Text style={styles.screenDescription.text}>Please complete your profile. Don't worry, your data will remain private and only you can see it.</Text>
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
    padding: 25,
    alignItems: 'center',

    text: {
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: 0.25,
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
