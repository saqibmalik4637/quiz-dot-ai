import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import QuizzesList from '../components/QuizzesList';

const ResultScreen = ({ route, navigation }) => {
  const result = route.params.result;
  const allAnswers = result.allAnswers;

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultheading}>FINAL RESULT</Text>
          { allAnswers.map((answer, index) => {
            return (
              <View style={styles.answerContainer} key={index}>
                
                <Text style={[styles.answerContent, styles.question]}>Q. {answer.question.content}</Text>

                <Pressable style={answer.userAnswer.id === answer.correctAnswer.id ? styles.correctAnswer : styles.wrongAnswer}>
                  <Text style={styles.optionText}>{answer.userAnswer.content}</Text>
                </Pressable>

                { answer.userAnswer.id !== answer.correctAnswer.id &&
                  <>
                    <Pressable style={styles.correctAnswer}>
                      <Text style={styles.optionText}>{answer.correctAnswer.content}</Text>
                    </Pressable>
                  </>
                }

                <Text style={styles.answerHeading}>Answer Point:</Text>
                <Text style={styles.answerContent}>{answer.points}</Text>
              </View>
            )
          }) }
        </View>

        <QuizzesList navigation={navigation} query="maths" />
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    justifyContent: 'start',
    alignItems: 'center',
  },

  resultContainer: {
    // flex: 2,
    padding: 20,
    backgroundColor: '#ded5e6',
    borderRadius: 20,
    marginBottom: 50,
  },

  resultheading: {
    fontSize: 30,
    textAlign: 'center'
  },

  answerContainer: {
    // backgroundColor: 'green',
    marginTop: 20,
    borderRadius: 20,
    // paddingHorizontal: 10,
    // paddingVertical: 20
  },

  question: {
    fontSize: 18
  },

  answerHeading: {
    color: '#000000'
  },

  answerContent: {
    color: '#000000'
  },

  optionText: {
    color: '#ffffff',
    fontSize: 18
  },

  correctAnswer: {
    backgroundColor: '#128230',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center'
  },

  wrongAnswer: {
    backgroundColor: '#cf3636',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center'
  },
});

export default ResultScreen;
