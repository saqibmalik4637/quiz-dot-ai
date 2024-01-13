import { StyleSheet, View, Image, Text } from 'react-native';
import Header from '../components/Header';
import QuizesList from '../components/QuizesList';

const QuizCategory = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Image style={styles.bannerImage} source={route.params.category.image} />
      <View style={styles.details}>
        <Text style={styles.text}>{route.params.category.name}</Text>
        <Text style={styles.text}>15 quizes</Text>
      </View>
      <QuizesList navigation={navigation} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },

  bannerImage: {
    flex: 1,
    width: '100%',
    maxHeight: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  details: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
  }
});

export default QuizCategory;
