import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView, Pressable, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

// import io from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux';
import QuizzesList from '../components/QuizzesList';

import { createReportCardReportCardInitialStateAction } from '../reducers/report_cards/reportCardAction';
import { getRoomScoreboardAction } from '../reducers/rooms/roomAction';
import { selectRoom } from '../reducers/rooms/roomSlice';

import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';

import { loadPlayer, playPlayer, stopPlayer } from '../SoundService';
import {
  musicboxSound
} from '../media';

const ResultScreen = ({ route, navigation }) => {
  // const socket = io('https://golden-vast-mongoose.ngrok-free.app');
  const dispatch = useDispatch();

  const { scoreboard } = useSelector(selectRoom);

  const screenWidth = Dimensions.get("window").width;

  const [reportCard, setReportCard] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomScoreboard, setRoomScoreboard] = useState([]);
  const [player, setPlayer] = useState(null);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (player) {
          stopPlayer(player);
        }

        navigation.navigate('Home');
        return true; // Prevents going back
      };

      // Listen for the back button press on Android
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup on screen unmount
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    loadPlayer(musicboxSound, setPlayer, setIsPlayerLoaded);
    dispatch(createReportCardReportCardInitialStateAction());
    setReportCard(route.params.reportCard);
    // setRoom(route.params.room);
  }, [route]);

  useEffect(() => {
    if (isPlayerLoaded && player) {
      playPlayer(player);
    }
  }, [player, isPlayerLoaded]);

  useEffect(() => {
    if (room && room) {
      dispatch(getRoomScoreboardAction(room.id));

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

  const redirectToHome = () => {
    if (player) {
      stopPlayer(player);
    }

    navigation.navigate('Home')
  }

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#FFD700', '#FF8C00']} // Define gradient colors here
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>FINAL SCOREBOARD</Text>
        </View>

        { (reportCard && Object.keys(reportCard).length > 0) &&
          <ScrollView style={[styles.resultContainerParent, { marginBottom: 80 }]} showsVerticalScrollIndicator={false}>
            <View style={styles.scoreContainer}>
              <View style={styles.totalScore}>
                <Text style={styles.totalNumberText}>SCORED POINTS</Text>
                <Text style={styles.totalNumber}>{parseFloat(reportCard.score).toFixed(2)}</Text>
              </View>

              <View style={styles.numbersContainer}>
                <Text style={styles.correctAnswerText}>CORRECT</Text>
                <Text style={styles.correctAnswerNumber}>{reportCard.correct_count}</Text>
              </View>

              <View style={styles.numbersContainer}>
                <Text style={styles.timedOutText}>TIMED OUT</Text>
                <Text style={styles.timedOutNumber}>{reportCard.no_result_count}</Text>
              </View>

              <View style={styles.numbersContainer}>
                <Text style={styles.inCorrectAnswerText}>INCORRECT</Text>
                <Text style={styles.inCorrectAnswerNumber}>{reportCard.incorrect_count}</Text>
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
          </ScrollView>
        }
        <View style={styles.footerButton}>
          <Pressable style={[styles.primaryButton, styles.buttonShadow]} onPress={() => redirectToHome()}>
            <Text style={styles.primaryButtonText}>GO TO HOME</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerGradient: {
    width: '100%',
  },

  header: {
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#35095c"
  },

  resultContainerParent: {
    width: '100%',
    height: '80%',
  },

  resultContainer: {
    marginTop: 30,
    width: '100%',
  },

  scoreContainer: {
    marginTop: 40,
    marginHorizontal: 25,
    justifyContent: 'space-evenly',
    backgroundColor: '#f9f5ff',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8, // For Android shadow
  },

  numbersContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#ece8f5',
    borderRadius: 20,
  },

  correctAnswerNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },

  correctAnswerText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: '600',
    textAlign: 'center',
  },

  inCorrectAnswerNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f44336',
    textAlign: 'center',
  },

  inCorrectAnswerText: {
    fontSize: 18,
    color: '#f44336',
    fontWeight: '600',
    textAlign: 'center',
  },

  timedOutNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9800',
    textAlign: 'center',
  },

  timedOutText: {
    fontSize: 18,
    color: '#ff9800',
    fontWeight: '600',
    textAlign: 'center',
  },

  totalScore: {
    marginHorizontal: 50,
    alignItems: 'center',
  },

  totalNumber: {
    fontSize: 50,
    color: '#35095c'
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
    elevation: 8,
  },

  primaryButtonInvertText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#35095c',
  },

  primaryButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ded5e6',
  },

  primaryButton: {
    marginTop: 100,
    backgroundColor: '#35095c',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
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
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 20,
    zIndex: 10,
  },

  moreItems: {
    marginTop: 30,
    marginHorizontal: 20
  },

  moreItemHeading: {
    fontSize: 30,
    color: '#ded5e6'
  },

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
});

export default ResultScreen;
