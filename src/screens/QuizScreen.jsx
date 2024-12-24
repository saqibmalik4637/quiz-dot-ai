import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity,
         Pressable, ScrollView } from 'react-native';

import EmptyStar from '../components/icons/EmptyStar';
import FilledStar from '../components/icons/FilledStar';

import { useSelector, useDispatch } from 'react-redux';

import {
  setQuestionsInitialStateAction
} from '../reducers/questions/questionAction';

import {
  fetchingQuestions,
  fetchedQuestions
} from '../reducers/questions/questionSlice';

import {
  fetchRoomAction,
  createRoomAction,
  setFetchRoomInitialStateAction,
  setCreateRoomInitialStateAction
} from '../reducers/rooms/roomAction';

import { selectRoom } from '../reducers/rooms/roomSlice';

import {
  fetchQuizDetailsAction,
  markFavoritedInitialStateAction,
  unmarkFavoritedInitialStateAction,
  markFavoritedAction,
  unmarkFavoritedAction,
  markPlayedAction
} from '../reducers/quizzes/quizAction';

import { selectQuiz } from '../reducers/quizzes/quizSlice';

const QuizScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { creatingRoom, createdRoom, room } = useSelector(selectRoom);

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [createRoomCalled, setCreateRoomCalled] = useState(false);
  const [isFavoritedState, setIsFavoritedState] = useState(false);
  const [favoritedCountState, setFavoritedCountState] = useState(0);

  const {
    requestedMarkFavorite,
    requestedUnmarkFavorite,
    quiz
  } = useSelector(selectQuiz);

  useEffect(() => {
    dispatch(fetchQuizDetailsAction(route.params.quiz.id));
    dispatch(setCreateRoomInitialStateAction());
  }, [route]);

  useEffect(() => {
    if (quiz && Object.keys(quiz).length > 0) {
      setCurrentQuiz(quiz);
    }
  }, [quiz]);

  useEffect(() => {
    if (currentQuiz && Object.keys(currentQuiz).length > 0) {
      setIsFavoritedState(currentQuiz.is_favorited);
      setFavoritedCountState(currentQuiz.favorited_count)
    }
  }, [currentQuiz]);

  const goToPlayRoom = () => {
    dispatch(markPlayedAction({quizId: currentQuiz.id}));
    dispatch(setQuestionsInitialStateAction());
    navigation.navigate('PlayRoom', { quiz: currentQuiz, multipleUsers: false });
  }

  const markFavorite = () => {
    dispatch(markFavoritedAction({quizId: currentQuiz.id}));
    setIsFavoritedState(true);
    setFavoritedCountState(favoritedCountState + 1);
  }

  const unmarkFavorite = () => {
    dispatch(unmarkFavoritedAction({quizId: currentQuiz.id}));
    setIsFavoritedState(false);
    setFavoritedCountState(favoritedCountState - 1);
  }

  const createRoom = () => {
    dispatch(createRoomAction({ quiz_id: currentQuiz.id }));
    setCreateRoomCalled(true);
  }

  useEffect(() => {
    if (createRoomCalled === true &&
        !creatingRoom && createdRoom &&
        Object.keys(room).length > 0) {
      navigation.navigate('JoiningRoom', { room: room })
    }
  }, [creatingRoom, createdRoom, room, createRoomCalled]);

  return (
    <>
      { currentQuiz &&
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                { isFavoritedState ? (
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
              <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
                <Text style={styles.backButton}>X</Text>
              </TouchableOpacity>
            </View>

            <Image style={styles.bannerImage} source={{uri: currentQuiz.image_url}} />

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
                <Text style={styles.statsItemNumber}>{favoritedCountState}</Text>
                <Text style={styles.statsItemText}>Favorited</Text>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.descriptionAreaContainer}
              style={styles.descriptionArea}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.descriptionHeading}>Description</Text>

              <Text style={styles.descriptionText}>
                {currentQuiz.description}
                {currentQuiz.description}
              </Text>
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={[styles.primaryButton, styles.buttonShadow, styles.footerButton]}
              onPress={goToPlayRoom}>
              <Text style={styles.primaryButtonText}>LET'S PLAY</Text>
            </Pressable>

            {/*<Pressable
              style={[styles.primaryButtonInvert, styles.buttonShadow, styles.footerButton]}
              onPress={createRoom}>
              <Text style={styles.primaryButtonInvertText}>Play with Friends</Text>
            </Pressable>*/}
          </View>
        </View>
      }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginVertical: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  details: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  stats: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsItemNumber: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  statsItemText: {
    fontSize: 14,
    color: '#666',
  },

  descriptionArea: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  descriptionAreaContainer: {
    alignItems: 'center',
  },

  descriptionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },

  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  footerButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: '#000',
  },

  primaryButton: {
    backgroundColor: '#35095c',
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default QuizScreen;
