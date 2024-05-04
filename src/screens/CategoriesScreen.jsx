import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';

const CategoriesScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={route.params.title} />
      <CategoriesList navigation={navigation} query={route.params.query} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
});

export default CategoriesScreen;
