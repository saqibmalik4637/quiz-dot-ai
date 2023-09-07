import { StyleSheet, ScrollView, View, Text, ImageBackground } from 'react-native';
import Header from '../components/Header';
import { categories } from '../../lib/data';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CategoriesList />
    </View>
  )
};

const CategoriesList = () => {
  return (
    <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
      <View style={styles.row}>
        {
          categories.map((category, i) => {
            return (
              <ImageBackground
                key={i}
                style={styles.image}
                imageStyle={{ borderRadius: 20}}
                source={category.image}
                resizeMode="cover">
                <Text style={styles.text}>{category.name}</Text>
              </ImageBackground>
            )
          })
        }
      </View>
    </ScrollView> 
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

  categoriesList: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  image: {
    marginHorizontal: '2%',
    marginBottom: 12,
    minWidth: '46%',
    flex: 1,
    justifyContent: 'flex-end',
    height: 120,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  text: {
    color: '#ded5e6',
    fontSize: 20,
    // lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'left',
    // backgroundColor: '#000000c0',
  },
});

export default HomeScreen;
