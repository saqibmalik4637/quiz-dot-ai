import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

// import io from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux';
import QuizzesList from '../components/QuizzesList';

import { createReportCardReportCardInitialStateAction } from '../reducers/report_cards/reportCardAction';
import { getRoomScorebordAction } from '../reducers/rooms/roomAction';
import { selectRoom } from '../reducers/rooms/roomSlice';

import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const ResultScreen = ({ route, navigation }) => {
  // const socket = io('https://golden-vast-mongoose.ngrok-free.app');

  const { isLoaded, isClosed, load, show } = useInterstitialAd("ca-app-pub-3081698164560598/7924515371");

  const dispatch = useDispatch();

  const { scoreboard } = useSelector(selectRoom);

  const screenWidth = Dimensions.get("window").width;

  const [reportCard, setReportCard] = useState(null);
  const [grapghData, setGraphData] = useState([]);
  const [adWatched, setAdWatched] = useState(false);
  const [room, setRoom] = useState(null);
  const [roomScoreboard, setRoomScoreboard] = useState([]);

  useEffect(() => {
    dispatch(createReportCardReportCardInitialStateAction());
    setAdWatched(false);
    load();
    // setRoom(route.params.room);
  }, [route, load]);

  useEffect(() => {
    if (isLoaded && !adWatched) {
      show();
    }
  }, [isLoaded, show]);

  useEffect(() => {
    if (isClosed) {
      setAdWatched(true);
    }
  }, [isClosed]);

  useEffect(() => {
    if (adWatched) {
      setReportCard(route.params.reportCard);
    }
  }, [adWatched]);

  useEffect(() => {
    if (room && room) {
      dispatch(getRoomScorebordAction(room.id));

      socket.on(`refresh-scoreboard-${room.id}`, (data) => {
        setRoomScoreboard(data.scoreboard);
      });
    }
  }, [room, dispatch]);

  useEffect(() => {
    if (scoreboard && scoreboard) {
      setRoomScoreboard(scoreboard);
    }
  }, [scoreboard]);

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FINAL SCOREBOARD</Text>
      </View>

      { (reportCard && Object.keys(reportCard).length > 0) &&
        <ScrollView style={styles.resultContainerParent} showsVerticalScrollIndicator={false}>
          <View style={styles.totalScore}>
            <Text style={styles.totalNumber}>{parseFloat(reportCard.score).toFixed(2)}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <View style={styles.numbersContainer}>
              <Text style={styles.correctAnswerNumber}>{reportCard.correct_count}</Text>
              <Text style={styles.correctAnswerText}>correct</Text>
            </View>

            <View style={styles.numbersContainer}>
              <Text style={styles.timedOutNumber}>{reportCard.no_result_count}</Text>
              <Text style={styles.timedOutText}>timed out</Text>
            </View>

            <View style={styles.numbersContainer}>
              <Text style={styles.inCorrectAnswerNumber}>{reportCard.incorrect_count}</Text>
              <Text style={styles.inCorrectAnswerText}>incorrect</Text>
            </View>
          </View>

          { (room && room) &&
            <View style={styles.otherUsersContainer}>
              <Text style={styles.headerText}>ALL USERS</Text>

              <View style={styles.allUsersList} showsVerticalScrollIndicator={false}>
                { roomScoreboard &&
                  <>
                  { roomScoreboard.map((userItem, i) => {
                    return <View key={i} style={styles.userItem}>
                      <View style={styles.userItemInnerContainer}>
                        <Text style={styles.userPosition}>{userItem.position}.</Text>
                        <Text style={styles.userName}>{userItem.name}</Text>
                      </View>

                      <View style={styles.userItemInnerContainer}>
                        { (userItem.in_progress && userItem.in_progress === true) ? (
                            <Text style={styles.userScoreText}>In progress</Text>
                          ) : (<Text style={styles.userScore}>{parseFloat(userItem.score).toFixed(2)}</Text>)
                        }
                      </View>
                    </View>
                  }) }
                  </>
                }
              </View>
            </View>
          }

          <View style={styles.footerButton}>
            <Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.primaryButtonInvertText}>GO TO HOME</Text>
            </Pressable>
          </View>

          <View style={styles.moreItems}>
            <Text style={styles.moreItemHeading}>SIMILAR QUIZZES:</Text>

            <QuizzesList navigation={navigation} query={reportCard.quiz_category_name} />
          </View>
        </ScrollView>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  otherUsersContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  allUsersList: {
    marginVertical: 20,
    marginHorizontal: 20,
    width: '80%',
  },

  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userItemInnerContainer: {
    flexDirection: 'row',
  },

  userPosition: {
    fontSize: 30,
    paddingRight: 20,
    color: "#ded5e6"
  },

  userName: {
    fontSize: 30,
    color: "#ded5e6"
  },

  userScore: {
    fontSize: 30,
    color: "#ded5e6"
  },

  userScoreText: {
    fontSize: 15,
    color: '#ded5e6'
  },

  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },

  header: {
    height: '20%',
    width: '100%',
    paddingTop: 50,
    backgroundColor: '#35095c',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerText: {
    fontSize: 30,
    color: "#ded5e6"
  },

  resultContainerParent: {
    width: '100%',
    backgroundColor: '#35095c'
  },

  resultContainer: {
    marginTop: 30,
    width: '100%',
  },

  scoreContainer: {
    marginTop: 50,
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  numbersContainer: {
    alignItems: 'center'
  },

  correctAnswerNumber: {
    fontSize: 60,
    color: '#128230',
  },

  correctAnswerText: {
    fontSize: 20,
    color: '#128230',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inCorrectAnswerNumber: {
    fontSize: 60,
    color: '#cf3636',
  },

  inCorrectAnswerText: {
    fontSize: 20,
    color: '#cf3636',
    justifyContent: 'center',
    alignItems: 'center'
  },

  timedOutNumber: {
    fontSize: 60,
    color: '#b6c7e3',
  },

  timedOutText: {
    fontSize: 20,
    color: '#b6c7e3',
    justifyContent: 'center',
    alignItems: 'center'
  },

  totalScore: {
    marginHorizontal: 50,
    alignItems: 'center',
  },

  totalNumber: {
    fontSize: 80,
    color: '#ded5e6'
  },

  totalText: {
    fontSize: 20,
    color: '#ded5e6'
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  primaryButtonInvertText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#35095c',
  },

  primaryButtonInvert: {
    marginTop: 100,
    backgroundColor: '#ded5e6',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
  },

  footerButton: {
    width: '100%',
    alignItems: 'center'
  },

  moreItems: {
    marginTop: 30,
    marginHorizontal: 20
  },

  moreItemHeading: {
    fontSize: 30,
    color: '#ded5e6'
  }
});

export default ResultScreen;
