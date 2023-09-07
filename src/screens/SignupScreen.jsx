import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Pressable, Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

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
              onChangeText={setName}
              value={name}
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
        </View>

        <Pressable
          style={[styles.primaryButton, styles.buttonShadow]}
          onPress={() => navigation.navigate('Home')}>
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
