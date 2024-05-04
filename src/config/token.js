import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    console.log("Unable to fetch token", e.message);
  }
};

export default getToken;
