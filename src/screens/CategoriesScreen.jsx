import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';

const CategoriesScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    setTitle(route.params.title);
    setQuery(route.params.query);
  }, [route]);

  return (
    <View style={styles.container}>
      { (title && query) &&
        <>
          <Header navigation={navigation} title={title} />
          <CategoriesList navigation={navigation} query={query} />
        </>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
});

export default CategoriesScreen;
