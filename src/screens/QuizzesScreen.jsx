import { StyleSheet, View, Image, Text } from 'react-native';
import Header from '../components/Header';
import QuizzesList from '../components/QuizzesList';

const QuizzesScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={route.params.title} />
      { route.params.category ? <>
        <Image style={styles.bannerImage} source={{uri: route.params.category.image_url}} />
        <View style={styles.details}>
          <Text style={[styles.text, {width: '70%'}]}>{route.params.category.name}</Text>
          <Text style={styles.text}>{route.params.category.quizzes_count} quizzes</Text>
        </View>
        <QuizzesList navigation={navigation} category={route.params.category} />
      </> : <>
        { route.params.carouse_id ?
          <>
            <QuizzesList navigation={navigation} carouse_id={route.params.carouse_id} />
          </> : <>
            <QuizzesList navigation={navigation} query={route.params.query} />
          </>
        }
      </> }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
    marginVertical: 15,
  },

  details: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flexWrap: 'wrap',
  },
});

export default QuizzesScreen;
