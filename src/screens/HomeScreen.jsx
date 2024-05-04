import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarouselsAction } from '../reducers/carousels/carouselAction';
import { selectCarousels } from '../reducers/carousels/carouselSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Header from '../components/Header';
import QuizCarousel from '../components/carousels/Quizzes';
import CategoryCarousel from '../components/carousels/Categories';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const carousels = useSelector(selectCarousels);
  const scrollYRef = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (carousels.length === 0) {
      dispatch(fetchCarouselsAction());
    }
  }, [dispatch, fetchCarouselsAction, carousels]);

  return (
    <View style={styles.container}>
      { showHeader &&
        <View style={styles.headerComponent}>
          <Image style={styles.logo} source={require('../../assets/logo.png')} />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <FontAwesomeIcon icon="fa-magnifying-glass" color="#35095c" style={styles.icon} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      }

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
