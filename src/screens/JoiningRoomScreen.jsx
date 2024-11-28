import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectFetchedCurrentUser } from '../reducers/users/userSlice';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
// import io from 'socket.io-client';

import { setQuestionsInitialStateAction } from '../reducers/questions/questionAction';
import { setCreateRoomInitialStateAction } from '../reducers/rooms/roomAction';
import { markPlayedAction } from '../reducers/quizzes/quizAction';

const JoiningRoomScreen = ({ route, navigation }) => {
  // // const socket = io('https://golden-vast-mongoose.ngrok-free.app');
  // const ws = useRef(null);

  // const currentUser = useSelector(selectCurrentUser);
  // const dispatch = useDispatch();
  // const [currentRoom, setCurrentRoom] = useState(null);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setCurrentRoom(route.params.room);
  // }, [route]);

  // useEffect(() => {
  //   if (currentRoom && currentRoom && Object.keys(currentRoom).length > 0) {
  //     setUsers(currentRoom.users);

  //     const subscriptionMessage = JSON.stringify({
  //       command: 'subscribe',
  //       identifier: JSON.stringify({
  //         channel: 'RoomChannel',
  //         room_id: currentRoom.id,
  //       }),
  //     });

  //     ws.current = new WebSocket('wss://golden-vast-mongoose.ngrok-free.app/cable');

  //     ws.current.onopen = () => {
  //       console.log('WebSocket connected');
  //       ws.current.send(subscriptionMessage);
  //     };

  //     ws.current.onmessage = (event) => {
  //       const response = JSON.parse(event.data);

  //       if (response.type === 'ping') return;

  //       console.log("response", response);
  //       if (response.message) {
  //         const { event, user } = response.message;

  //         if (event === 'new_user_joined') {
  //           setUsers((prevUsers) => [...prevUsers, user]);
  //         } else if (event === 'start_quiz') {
  //           // Handle quiz start logic
  //           console.log('Quiz started');
  //           navigation.navigate('PlayRoom', { quiz: currentRoom.quiz });
  //         }
  //       }
  //     };

  //     ws.current.onclose = () => console.log('WebSocket closed');
  //     ws.current.onerror = (error) => console.error('WebSocket error:', error);

  //     return () => ws.current.close();

  //     // socket.on('connect', () => {
  //     //   console.log('Connected to the server');
  //     // });

  //     // socket.on('disconnect', () => {
  //     //   console.log('Disconnected to the server');
  //     // });

  //     // socket.on(`new_user_joined${currentRoom.id}`, (data) => {
  //     //   setUsers((prevUsers) => [...prevUsers, data.user]);
  //     // });

  //     // socket.on(`start-quiz-${currentRoom.id}`, (data) => {
  //     //   dispatch(markPlayedAction({quizId: currentRoom.quiz.id}));
  //     //   dispatch(setQuestionsInitialStateAction());
  //     //   navigation.navigate('PlayRoom', { quiz: currentRoom.quiz, multipleUsers: true, room: currentRoom });
  //     // });
  //   }
  // }, [currentRoom]);

  // const startQuiz = () => {
  //   // socket.emit('start-quiz', { room_id: currentRoom.id });
  //   // const subscription = cable.subscriptions.create(
  //   //   { channel: "RoomChannel", room_id: currentRoom.id },
  //   //   {}
  //   // );

  //   // subscription.perform("start_quiz", { room_id: currentRoom.id });
  // }

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.header}>
  //       <View style={styles.iconContainer}>
  //         <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
  //           <Text style={styles.backButton}>X</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <Text style={styles.headerTitle}>Waiting for Players...</Text>
  //     </View>

  //     { currentRoom &&
  //       <>
  //         <View style={styles.joiningCode}>
  //           <Text style={styles.joiningCodeText}>JOINING CODE: {currentRoom.joining_code}</Text>
  //         </View>
  //         <View style={styles.quizDetails}>
  //           <View style={styles.quizImageAndName}>
  //             <Image style={styles.quizImage} source={{uri: currentRoom.quiz_image}} />
  //             <Text style={styles.quizName}>{currentRoom.quiz_name}</Text>
  //           </View>

  //           { users &&
  //             <View style={styles.playersCount}>
  //               <Text style={styles.playersCountText}>{users.length} {users.length == 1 ? 'player' : 'players'} have joined</Text>
  //             </View>
  //           }
  //         </View>

  //         { users &&
  //           <View style={styles.players}>
  //             <ScrollView contentContainerStyle={styles.playersAlignment} style={styles.playersScrollView}>
  //               {users.map((user, index) => (
  //                 <View key={index} style={styles.playerPill}>
  //                   <Image style={styles.playerImage} source={{uri: "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"}} />
  //                   <Text style={styles.playerName}>{user.fullname}</Text>
  //                 </View>
  //               ))}
  //             </ScrollView>
  //           </View>
  //         }

  //         <View style={styles.footer}>
  //           { currentUser.id === currentRoom.user_id ? (
  //             <Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]} onPress={() => startQuiz()}>
  //               <Text style={styles.primaryButtonInvertText}>Start</Text>
  //             </Pressable>
  //           ) : (
  //             <Text style={styles.quizName}>Waiting for host to start</Text>
  //           ) }
  //         </View>
  //       </>
  //     }
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: "#35095c"
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  backButton: {
    fontSize: 20,
    color: '#ffffff'
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 28
  },

  joiningCode: {

  },

  joiningCodeText: {
    color: '#ffffff',
    fontSize: 20
  },

  quizDetails: {
    backgroundColor: "#ffffff",
    height: '40%',
    width: '100%',
    marginTop: 20,
    borderRadius: 30,
    padding: 20
  },

  quizImageAndName: {
    alignItems: 'center'
  },

  quizImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
    borderRadius: 20,
  },

  quizName: {
    marginVertical: 5,
    fontSize: 25
  },

  playersCount: {
    paddingTop: 10,
    borderTopWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  players: {
    marginTop: 20,
    height: '30%',
  },

  playersAlignment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  playersScrollView: {
    // maxHeight: 200,
  },

  playerPill: {
    height: 40,
    borderRadius: 50,
    paddingVertical: 10,
    paddingRight: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  playerImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 40,
  },

  playerName: {
    fontWeight: 'bold'
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonInvertText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#35095c',
  },

  primaryButtonInvert: {
    backgroundColor: '#ffffff',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
  },

  buttonShadow: {
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default JoiningRoomScreen;
