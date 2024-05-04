import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import QuizzesScreen from './screens/QuizzesScreen';
import QuizScreen from './screens/QuizScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import PlayRoomScreen from './screens/PlayRoomScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Quizzes" component={QuizzesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayRoom" component={PlayRoomScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
