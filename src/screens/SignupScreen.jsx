import React, { useState, useEffect } from 'react';

import {
  StyleSheet, Text, ScrollView, View, TextInput, Pressable,
  Alert, KeyboardAvoidingView, Platform, TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryPicker } from "react-native-country-codes-picker";

import { createUserAction } from '../reducers/users/userAction';
import { selectCurrentUser, selectUserToken, selectCreatedUser } from '../reducers/users/userSlice';

import { setInitialStateCreateUserInterest } from '../reducers/user_interests/userInterestsAction';
import { selectUserInterests } from '../reducers/user_interests/userInterestsSlice';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const currentUser = useSelector(selectCurrentUser);
  const createdUser = useSelector(selectCreatedUser);
  const userInterestSlice = useSelector(selectUserInterests);

  const { createdUserInterest } = userInterestSlice;

  const [tokenStored, setTokenStored] = useState(false);
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');

  const [showCountryInput, setShowCountryInput] = useState(true);
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ fullname: '', age: '' });

  const _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log("Unable to set token", error.message);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullname.trim()) {
      newErrors.fullname = 'Name is required.';
    } else if (fullname.trim().length < 3) {
      newErrors.fullname = 'Name must be at least 3 characters.';
    }

    const parsedAge = parseInt(age, 10);
    if (!age) {
      newErrors.age = 'Age is required.';
    } else if (isNaN(parsedAge) || parsedAge < 10 || parsedAge > 100) {
      newErrors.age = 'Enter a valid age (5–100).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        createUserAction({
          fullname: fullname.trim(),
          age: age.trim(),
          country_code: countryCode,
        })
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    setCountryCode('IN')
    setCountryName('India');

    dispatch(setInitialStateCreateUserInterest());
  }, []);

  useEffect(() => {
    console.log("userToken", userToken);
    if (userToken) {
      _storeToken(userToken);
      setTokenStored(true);
    }
  }, [userToken]);

  useEffect(() => {
    console.log("createdUserInterest", createdUserInterest);
    console.log("createdUser", createdUser);
    console.log("currentUser", currentUser);
    if (!createdUserInterest && createdUser && currentUser && Object.keys(currentUser).length > 0) {
      navigation.navigate('Interests');
    }
  }, [createdUser, currentUser, createdUserInterest]);

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
            {errors.fullname ? <Text style={styles.errorText}>{errors.fullname}</Text> : null}
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
            {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
          </View>

          { showCountryInput &&
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Country</Text>

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
                pickerButtonOnPress={(item) => {
                  setCountryCode(item.code);
                  setCountryName(item.name.en);
                  setShowCountryPicker(false);
                }}
                popularCountries={['en', 'in', 'us']}
              />
            </View>
          }

          <Pressable
            style={[
              styles.primaryButton,
              isSubmitting && { backgroundColor: '#999' },
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? 'Moment...' : "Let's Play"}
            </Text>
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
    elevation: 8,
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
  },
});

export default SignupScreen;
