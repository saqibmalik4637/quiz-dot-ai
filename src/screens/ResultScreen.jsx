import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import QuizzesList from '../components/QuizzesList';

const ResultScreen = ({ route, navigation }) => {
  const result = route.params.result;
  const allAnswers = result.allAnswers;

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FINAL SCOREBOARD</Text>
      </View>
      <ScrollView style={styles.resultContainerParent} showsVerticalScrollIndicator={false}>
        <View style={styles.resultContainer}>
          <View style={styles.scoreContainer}>
            <View style={styles.numbersContainer}>
              <Text style={styles.correctAnswerNumber}>10</Text>
              <Text style={styles.correctAnswerText}>CORRECT</Text>
            </View>
            <View style={styles.numbersContainer}>
              <Text style={styles.inCorrectAnswerNumber}>10</Text>
              <Text style={styles.inCorrectAnswerText}>INCORRECT</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalScore}>
          <Text style={styles.totalNumber}>799.89</Text>
          <Text style={styles.totalText}>TOTAL POINTS</Text>
        </View>

        <View style={styles.footerButton}>
          <Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]}>
            <Text style={styles.primaryButtonInvertText}>GO TO HOME</Text>
          </Pressable>
        </View>

        <View style={styles.moreItems}>
          <Text style={styles.moreItemHeading}>SIMILAR QUIZZES:</Text>

          <QuizzesList navigation={navigation} query={"math"} />
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
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
    width: '100%',
  },

  scoreContainer: {
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  numbersContainer: {
    alignItems: 'center'
  },

  correctAnswerNumber: {
    fontSize: 100,
    color: '#128230',
  },

  correctAnswerText: {
    fontSize: 20,
    color: '#128230',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inCorrectAnswerNumber: {
    fontSize: 100,
    color: '#cf3636',
  },

  inCorrectAnswerText: {
    fontSize: 20,
    color: '#cf3636',
    justifyContent: 'center',
    alignItems: 'center'
  },

  totalScore: {
    marginTop: 80,
    marginHorizontal: 50,
    alignItems: 'center',
  },

  totalNumber: {
    fontSize: 100,
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
