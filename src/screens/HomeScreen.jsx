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
    if (newUserJoined) {
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
              <EvilIcons name="search" color="#35095c" style={styles.icon} size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
              <MaterialIcons name="privacy-tip" size={20} color="#35095c" />
            </TouchableOpacity>
          </View>
        </View>
      }

      <Text>Joining Code</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInput}
          onChangeText={setJoiningCode}
          value={joiningCode}
        />

        <TouchableOpacity style={styles.submitIcon} onPress={joinRoom}>
          <AntDesign name="arrowright" color="#35095c" size={20} />
        </TouchableOpacity>
      </View>

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

      {/*<CategoryCarousel navigation={navigation} topic='Top Collections' />*/}
      {/*<QuizCarousel navigation={navigation} topic='Trending Quiz' />*/}
      {/*<QuizCarousel navigation={navigation} topic='Top Picks' />*/}
    </View>
  )
};

const styles = StyleSheet.create({
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
  },
  logo: {
    height: 100,
    width: 100,
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
  },
  inputGroup: {
    width: '90%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#35095c',
    justifyContent: 'center'
  },
  submitIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
