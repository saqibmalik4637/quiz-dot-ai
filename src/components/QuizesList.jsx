import { StyleSheet, ScrollView, View, Pressable, Text, Image } from 'react-native';
import { quizes } from '../../lib/data';

const QuizesList = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.quizesList} showsVerticalScrollIndicator={false}>
      {
        quizes.map((quiz, i) => {
          return (
            <Pressable style={styles.pressable} key={i} onPress={() => navigation.navigate('Home')}>
              <View style={styles.quizContainer}>
                <Image style={styles.quizImage} source={require('../../assets/artistic-adventures.jpg')} />

                <View style={styles.quizDetails}>
                  <Text style={styles.name}>{quiz.name}</Text>
                  <Text style={styles.smallText}>{quiz.questionsCount} Questions</Text>
                  <Text style={styles.smallText}>Beginner, Grammar, English</Text>
                </View>
              </View>
            </Pressable>
          )
        })
      }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },

  quizesList: {
    flex: 2,
    width: '100%',
    marginTop: 2,
    paddingTop: 20,
  },

  quizContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'start',
    width: '100%',
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(222, 213, 230, 0.6)',
  },

  quizImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  quizDetails: {
    flex: 2,
    padding: 15,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 20,
  },

  smallText: {
    // marginTop: 10,
  }
});

export default QuizesList;
