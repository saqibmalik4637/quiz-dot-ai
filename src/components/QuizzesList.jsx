import { StyleSheet, ScrollView, View, Pressable, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizzesAction } from '../reducers/quizzes/quizAction';
import { selectQuiz } from '../reducers/quizzes/quizSlice';

const QuizzesList = ({ navigation, category, carouse_id, query }) => {
  const { quizzes } = useSelector(selectQuiz);
  const dispatch = useDispatch()

  useEffect(() => {
    if (category) {
      dispatch(fetchQuizzesAction({categoryId: category.id}));
    } else if (carouse_id) {
      dispatch(fetchQuizzesAction({carouselId: carouse_id}));
    } else {
      dispatch(fetchQuizzesAction({query: query}));
    }
  }, [dispatch, fetchQuizzesAction, query]);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.quizzesList} showsVerticalScrollIndicator={false}>
      {
        quizzes.map((quiz, i) => {
          return (
            <Pressable style={styles.pressable} key={i} onPress={() => navigation.navigate('Quiz', { quiz: quiz })}>
              <View style={styles.quizContainer}>
                <Image style={styles.quizImage} source={{uri: quiz.image_url}} />

                <View style={styles.quizDetails}>
                  <Text style={styles.name} numberOfLines={1}>{quiz.name}</Text>
                  <Text style={styles.smallText}>{quiz.questions_count} Questions</Text>
                  <Text style={styles.smallText} numberOfLines={1}>{quiz.tags_string}</Text>
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

  quizzesList: {
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

export default QuizzesList;
