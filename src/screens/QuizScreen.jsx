import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import EmptyStar from '../components/icons/EmptyStar';
import FilledStar from '../components/icons/FilledStar';

import { useSelector, useDispatch } from 'react-redux';

import { setQuestionsInitialStateAction } from '../reducers/questions/questionAction';
import { fetchingQuestions, fetchedQuestions } from '../reducers/questions/questionSlice';

const QuizScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const quiz = route.params.quiz;

  const goToPlayRoom = () => {
    dispatch(setQuestionsInitialStateAction());
    navigation.navigate('PlayRoom', { quiz: quiz });
  }

  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.contentContainerFlex} style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
            <Text style={styles.backButton}>X</Text>
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <EmptyStar color={"#35095c"} style={styles.icon} size={20} />
              {/*<FilledStar color={"#35095c"} style={styles.icon} size={20} />*/}
            </TouchableOpacity>
          </View>
        </View>

        <Image style={styles.bannerImage} source={quiz.image} />

        <View style={styles.details}>
          <Text style={styles.text}>{quiz.name}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Text style={styles.statsItemNumber}>{quiz.questions_count}</Text>
            <Text style={styles.statsItemText}>Questions</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsItemNumber}>{quiz.played_count}</Text>
            <Text style={styles.statsItemText}>Played</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsItemNumber}>{quiz.favorited_count}</Text>
            <Text style={styles.statsItemText}>Favorited</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsItemNumber}>{quiz.shared_count}</Text>
            <Text style={styles.statsItemText}>Shared</Text>
          </View>
        </View>

        <ScrollView style={styles.descriptionArea}>
          <Text style={styles.descriptionHeading}>Description</Text>

          <Text style={styles.descriptionText}>
            {quiz.description}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.primaryButton, styles.buttonShadow]}
          onPress={() => goToPlayRoom()}>
          <Text style={styles.primaryButtonText}>LET'S PLAY</Text>
        </Pressable>
      </View>
    </View>
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
    fontWeight: 900
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
    fontWeight: '600',
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
    // borderRightWidth: 0.3,
    alignItems: 'center',
    padding: 5
  },

  statsItemNumber: {
    fontWeight: 900,
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
    fontWeight: 100
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
