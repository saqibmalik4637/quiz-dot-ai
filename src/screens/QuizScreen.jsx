import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';

import EmptyStar from '../components/icons/EmptyStar';
import FilledStar from '../components/icons/FilledStar';

import { useSelector, useDispatch } from 'react-redux';

import { setQuestionsInitialStateAction } from '../reducers/questions/questionAction';
import { fetchingQuestions, fetchedQuestions } from '../reducers/questions/questionSlice';

import {
  markFavoritedInitialStateAction,
  unmarkFavoritedInitialStateAction,
  markFavoritedAction,
  unmarkFavoritedAction,
  markPlayedAction
} from '../reducers/quizzes/quizAction';

import { selectQuiz } from '../reducers/quizzes/quizSlice';

const QuizScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const {
    requestedMarkFavorite,
    requestedUnmarkFavorite,
    quiz
  } = useSelector(selectQuiz);

  useEffect(() => {
    console.log("route.params.quiz", route.params.quiz)
    setCurrentQuiz(route.params.quiz);
    dispatch(markFavoritedInitialStateAction());
    dispatch(unmarkFavoritedInitialStateAction());
  }, [route]);

  useEffect(() => {
    if (requestedMarkFavorite && (quiz && Object.keys(quiz).length > 0)) {
      setCurrentQuiz(quiz);
      dispatch(markFavoritedInitialStateAction());
    }
  }, [requestedMarkFavorite, quiz]);

  useEffect(() => {
    if (requestedUnmarkFavorite && (quiz && Object.keys(quiz).length > 0)) {
      setCurrentQuiz(quiz);
      dispatch(unmarkFavoritedInitialStateAction());
    }
  }, [requestedUnmarkFavorite, quiz]);

  const goToPlayRoom = () => {
    dispatch(markPlayedAction({quizId: currentQuiz.id}));
    dispatch(setQuestionsInitialStateAction());
    navigation.navigate('PlayRoom', { quiz: currentQuiz });
  }

  const markFavorite = () => {
    dispatch(markFavoritedAction({quizId: currentQuiz.id}));
  }

  const unmarkFavorite = () => {
    dispatch(unmarkFavoritedAction({quizId: currentQuiz.id}));
  }

  return (
    <>
      { currentQuiz &&
        <View style={styles.container}>
          <View contentContainerStyle={styles.contentContainerFlex} style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
                <Text style={styles.backButton}>X</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                { currentQuiz.is_favorited ? (
                    <TouchableOpacity onPress={unmarkFavorite}>
                      <FilledStar color={"#35095c"} style={styles.icon} size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={markFavorite}>
                      <EmptyStar color={"#35095c"} style={styles.icon} size={20} />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>

            <Image style={styles.bannerImage} source={currentQuiz.image} />

            <View style={styles.details}>
              <Text style={styles.text}>{currentQuiz.name}</Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.statsItem}>
                <Text style={styles.statsItemNumber}>{currentQuiz.questions_count}</Text>
                <Text style={styles.statsItemText}>Questions</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsItemNumber}>{currentQuiz.played_count}</Text>
                <Text style={styles.statsItemText}>Played</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsItemNumber}>{currentQuiz.favorited_count}</Text>
                <Text style={styles.statsItemText}>Favorited</Text>
              </View>
            </View>

            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionHeading}>Description</Text>

              <Text style={styles.descriptionText}>
                {currentQuiz.description}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={[styles.primaryButton, styles.buttonShadow]}
              onPress={() => goToPlayRoom()}>
              <Text style={styles.primaryButtonText}>LET'S PLAY</Text>
            </Pressable>
          </View>
        </View>
      }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },

  contentContainer: {
    justifyContent: 'start',
    alignItems: 'center',
    paddingTop: 50,
    flex: 1,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    fontSize: 20,
    // fontWeight: '900'
  },
  arrowIcon: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
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
  },

  stats: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    borderColor: 'grey',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3
  },

  statsItem: {
    alignItems: 'center',
    padding: 5
  },

  statsItemNumber: {
    // fontWeight: '900',
    fontSize: 25
  },

  descriptionArea: {
    marginTop: 20
  },

  descriptionHeading: {
    fontSize: 30
  },

  descriptionText: {
    paddingVertical: 10,
    fontSize: 18,
    // fontWeight: '100',
    lineHeight: 30,
    letterSpacing: 1
  },

  footer: {
    width: '100%',
    marginBottom: 20
  },

  primaryButton: {
    backgroundColor: '#35095c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: 'black',
  },

  primaryButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default QuizScreen;
