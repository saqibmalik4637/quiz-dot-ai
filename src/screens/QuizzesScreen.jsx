import { StyleSheet, View, Image, Text } from 'react-native';
import Header from '../components/Header';
import QuizzesList from '../components/QuizzesList';

const QuizzesScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={route.params.title} />
      { route.params.category ? <>
        <Image style={styles.bannerImage} source={route.params.category.image} />
        <View style={styles.details}>
          <Text style={styles.text}>{route.params.category.name}</Text>
          <Text style={styles.text}>{route.params.category.quizzes_count} quizzes</Text>
        </View>
        <QuizzesList navigation={navigation} category={route.params.category} />
      </> : <>
        <QuizzesList navigation={navigation} query={route.params.query} />
      </> }
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
    // fontWeight: '600',
  }
});

export default QuizzesScreen;
