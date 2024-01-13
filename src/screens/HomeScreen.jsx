import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CategoriesList navigation={navigation} />
    </View>
  )
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
});

export default HomeScreen;
