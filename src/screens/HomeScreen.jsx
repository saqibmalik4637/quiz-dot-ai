import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';
import { joinRoomAction } from '../reducers/rooms/roomAction';
import { selectRoom } from '../reducers/rooms/roomSlice';

import Header from '../components/Header';
import QuizCarousel from '../components/carousels/Quizzes';
import CategoryCarousel from '../components/carousels/Categories';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const carousels = useSelector(selectCarousels);
  const { newUserJoined, room } = useSelector(selectRoom);
  const scrollYRef = useRef(0);
  const [showHeader, setShowHeader] = useState(true);
  const [joiningCode, setJoiningCode] = useState(null);

  useEffect(() => {
    if (carousels.length === 0) {
      dispatch(fetchCarouselsAction());
    }
  }, [dispatch, fetchCarouselsAction, carousels]);

  const joinRoom = () => {
    dispatch(joinRoomAction(joiningCode));
  }

  useEffect(() => {
    if (newUserJoined && room) {
      navigation.navigate('JoiningRoom', { room: room })
    }
  }, [newUserJoined, room]);

  return (
    <View style={styles.container}>
      { showHeader &&
        <View style={styles.headerComponent}>
          <Image style={styles.logo} source={require('../../assets/logo.png')} />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <EvilIcons name="search" color="#35095c" style={styles.icon} size={28} />
            </TouchableOpacity>

            {/*<TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
              <MaterialIcons name="privacy-tip" size={20} color="#35095c" />
            </TouchableOpacity>*/}
          </View>
        </View>
      }

      {/*<View style={styles.joinRoomContainer}>
        <Text style={styles.joinRoomHeading}>Play with friends</Text>
        <Text style={styles.inputLabel}>Enter a room joining code:</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.textInput}
            onChangeText={setJoiningCode}
            value={joiningCode}
          />

          <TouchableOpacity style={styles.submitIcon} onPress={joinRoom}>
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>*/}

      { carousels &&
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          { carousels.map((carousel, index) => {
            return <View key={index} style={styles.carousel}>
              { carousel.type === 'QuizCarousel' ?
                <QuizCarousel navigation={navigation} carousel={carousel} /> :
                <CategoryCarousel navigation={navigation} carousel={carousel} />
              }
            </View>
          }) }

          { carousels.map((carousel, index) => {
            return <View key={index} style={styles.carousel}>
              { carousel.type === 'QuizCarousel' ?
                <QuizCarousel navigation={navigation} carousel={carousel} /> :
                <CategoryCarousel navigation={navigation} carousel={carousel} />
              }
            </View>
          }) }
        </ScrollView>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  joinRoomContainer: {
    backgroundColor: '#ded5e6',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  joinRoomHeading: {
    fontSize: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    fontSize: 18,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#35095c',
    justifyContent: 'space-between',
    width: '70%'
  },
  submitIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35095c',
    paddingHorizontal: 20,
    borderRadius: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  headerComponent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  logo: {
    width: 80,
    height: '100%',
    resizeMode: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  icon: {
    height: 30,
    width: 30,
  },
  carousel: {
    marginBottom: 20,
  }
});

export default HomeScreen;
