import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';

const CategoriesScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState(null);
  const [query, setQuery] = useState(null);
  const [carouselId, setCarouselId] = useState(null);

  useEffect(() => {
    setTitle(route.params.title);
    if (route.params.query) {
      setQuery(route.params.query);  
    } else if (route.params.carouselId) {
      setCarouselId(route.params.carouselId);
    }
    
  }, [route]);

  return (
    <View style={styles.container}>
      { (title && (query || carouselId)) &&
        <>
          <Header navigation={navigation} title={title} />
          { query ? (<>
            <CategoriesList navigation={navigation} query={query} />
          </>) : (<>
            <CategoriesList navigation={navigation} carouselId={carouselId} />
          </>) }
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
