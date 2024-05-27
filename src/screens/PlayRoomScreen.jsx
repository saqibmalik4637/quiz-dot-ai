import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../reducers/users/userSlice';

import { fetchQuestionsAction } from '../reducers/questions/questionAction';
import { selectQuestions, fetchingQuestions, fetchedQuestions } from '../reducers/questions/questionSlice';

import { createReportCardAction, createReportCardReportCardInitialStateAction } from '../reducers/report_cards/reportCardAction';
import { selectReportCard } from '../reducers/report_cards/reportCardSlice';

import * as Progress from 'react-native-progress';

const PlayRoomScreen = ({ route, navigation }) => {
  const totalTime = 20 * 1000;

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const { reportCard, creatingReportCard, createdReportCard } = useSelector(selectReportCard);

  const [quiz, setQuiz] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [finalResult, setFinalResult] = useState({});

  const [runTimer, setRunTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [timeProgress, setTimeProgress] = useState(0.0);
  const [timeTakenTracker, setTimeTakenTracker] = useState(null);
  const [timeOver, setTimeOver] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [perAnswerPoint, setPerAnswerPoint] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);

  const fetched = useSelector(fetchedQuestions);
  const fetching = useSelector(fetchingQuestions);
  const questions = useSelector(selectQuestions);

  const nextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      resetTimer();
      setQuestionIndex(questionIndex + 1);
    } else {
      setFinalResult({ allAnswers: allAnswers });
    }
  }

  const resetTimer = () => {
    setRunTimer(false);
    setStopTimer(false);
    setTimeTaken(0);
    setRemainingTime(totalTime);
    setTimeProgress(0.0);
    setTimeTakenTracker(null);
    setTimeOver(false);
  }

  const createReportCard = () => {
    const payload = {
      user_id: currentUser.id,
      quiz_id: quiz.id,
      given_answers: finalResult.allAnswers
    }

    dispatch(createReportCardAction(payload));
  }

  useEffect(() => {
    dispatch(createReportCardReportCardInitialStateAction());
    setQuiz(route.params.quiz);
  }, [route]);

  useEffect(() => {
    if (quiz && Object.keys(quiz).length > 0) {
      dispatch(fetchQuestionsAction({quizId: quiz.id}));
    }
  }, [quiz]);

  useEffect(() => {
    if ((quiz && Object.keys(quiz).length > 0) && fetched && !fetching && questions.length > 0) {
      const question = questions[questionIndex];
      const answerPoint = parseFloat(parseFloat(quiz.total_points) / questions.length)
      setPerAnswerPoint(answerPoint);
      setCurrentQuestion(question);
      setCorrectAnswer(question.answer);
      setUserAnswer(null);
      setResult(null);
    }
  }, [fetched, fetching, questions, questionIndex, quiz]);

  useEffect(() => {
    if (currentQuestion) {
      setRunTimer(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (runTimer && !timeTakenTracker) {
      setTimeTakenTracker(setTimeout(() => { setTimeTaken(timeTaken + 10) }, 10));
    }
  }, [runTimer]);

  useEffect(() => {
    if (stopTimer && timeTakenTracker) {
      clearInterval(timeTakenTracker);
      setTimeTakenTracker(null);
    }
  }, [stopTimer]);

  useEffect(() => {
    if (timeTaken > 0) {
      setRemainingTime(totalTime - timeTaken);
      setTimeProgress(parseFloat(timeTaken / totalTime));

      clearInterval(timeTakenTracker);
      setTimeTakenTracker(null);

      if (timeTaken < totalTime) {
        setTimeTakenTracker(setTimeout(() => { setTimeTaken(timeTaken + 100) }, 100));
      } else {
        setStopTimer(true);
        setTimeOver(true);
      }
    }
  }, [timeTaken]);

  useEffect(() => {
    if (userAnswer) {
      setStopTimer(true);

      if (userAnswer.id === correctAnswer.id) {
        setResult('correct');
      } else {
        setResult('incorrect');
      }
    }
  }, [userAnswer]);

  useEffect(() => {
    if (timeOver) {
      setResult('timeOver');
    }
  }, [timeOver]);

  useEffect(() => {
    if (result) {
      let answerScore;

      if (result === 'correct') {
        answerScore = parseFloat(parseFloat(parseFloat(remainingTime / totalTime) * perAnswerPoint));
      } else {
        answerScore = 0
      }

      setAllAnswers(
        [
          ...allAnswers, 
          {
            question: currentQuestion,
            user_answer: userAnswer,
            correct_answer: correctAnswer,
            result: result,
            points: answerScore,
            time_taken: timeTaken,
            allowed_time: totalTime
          }
        ]
      );

      setTotalScore(parseFloat(parseFloat(totalScore) + parseFloat(answerScore)).toFixed(2));
    }
  }, [result]);

  useEffect(() => {
    if (finalResult && Object.keys(finalResult).length > 0) {
      createReportCard();
    }
  }, [finalResult]);

  useEffect(() => {
    if (!creatingReportCard && createdReportCard && (reportCard && Object.keys(reportCard).length > 0)) {
      navigation.navigate('Result', { reportCard: reportCard });
    }
  }, [reportCard, creatingReportCard, createdReportCard]);

  return (
    <View style={styles.container}>
      { (currentUser && quiz && Object.keys(quiz).length > 0) &&
        <>
          <View style={styles.header}>
            <Text style={styles.questionsCount}>{questionIndex + 1}/{quiz.questions_count}</Text>
            <Text style={styles.quizName}>Quiz</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
                <Text style={styles.backButton}>X</Text>
              </TouchableOpacity>
            </View>
          </View>

          { currentQuestion &&
            <View style={styles.questionFullScreen}>
              <View style={styles.question}>
                <View style={styles.progressBar}>
                  <View style={styles.bar}>
                    <Progress.Bar progress={timeProgress} height={14} borderRadius={50} width={null} color={ timeOver ? '#cf3636' : '#35095c' }
                                  borderWidth={0} unfilledColor={"#ded5e6"} style={styles.progress} animated={false} animationType="timing" />
                  </View>
                </View>

                <View style={styles.questionContainer}>
                  <Text style={styles.questionContent}>{currentQuestion.content}</Text>
                </View>

                <View style={styles.optionsContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    { currentQuestion.options.map((option, index) => {
                      return (
                        <View key={index}>
                          { userAnswer !== null ?
                            <>
                              { option.id === userAnswer.id ?
                                <Pressable style={[styles.optionItemContainer, userAnswer.id === correctAnswer.id ? {backgroundColor: '#128230'} : {backgroundColor: '#cf3636'}]} key={index}>
                                  <Text style={styles.optionText}>{option.content}</Text>
                                </Pressable>
                              :
                                <>
                                  { option.id === correctAnswer.id ?
                                    <Pressable style={[styles.optionItemContainer, {backgroundColor: '#128230'}]} key={index}>
                                      <Text style={styles.optionText}>{option.content}</Text>
                                    </Pressable>
                                  :
                                    <Pressable style={[styles.optionItemContainer, {backgroundColor: '#000000'}]} key={index}>
                                      <Text style={styles.optionText}>{option.content}</Text>
                                    </Pressable>
                                  }
                                </>
                              }
                            </>
                          :
                            <>
                              { timeOver ?
                                <Pressable style={[styles.optionItemContainer, option.id === correctAnswer.id ? { backgroundColor: '#128230'} : { backgroundColor: '#000000'} ]} key={index}>
                                  <Text style={styles.optionText}>{option.content}</Text>
                                </Pressable>
                              :
                                <Pressable style={[styles.optionItemContainer, {backgroundColor: '#000000'}]} key={index} onPress={() => setUserAnswer(option)}>
                                  <Text style={styles.optionText}>{option.content}</Text>
                                </Pressable>
                              }
                            </>
                          }
                        </View>
                      )
                    }) }

                    { result ? 
                      <Pressable
                        style={[styles.primaryButton, styles.buttonShadow]}
                        onPress={() => nextQuestion()}>
                        <Text style={styles.primaryButtonText}>{ questionIndex + 1 < questions.length ? 'NEXT' : 'SEE REPORT CARD' }</Text>
                      </Pressable>
                    : <Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]}>
                        <Text style={styles.primaryButtonInvertText}>{ questionIndex + 1 < questions.length ? 'NEXT' : 'SEE REPORT CARD' }</Text>
                      </Pressable>
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          }
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    paddingTop: 50,
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

  questionsCount: {
    fontSize: 30,
  },

  quizName: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: 30,
    width: 30,
    fontWeight: 'bold'
  },

  timeOverContainer: {
    backgroundColor: '#cf3636',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },

  timeOverText: {
    color: '#ffffff',
    fontSize: 20
  },

  progressBar: {
    fontSize: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bar: {
    width: '100%'
  },

  progressCount: {
    fontSize: 20
  },

  questionFullScreen: {
    height: '85%',
    justifyContent: 'space-between',    
  },

  question: {
    justifyContent: 'space-between'
  },

  questionContainer: {
    minHeight: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ded5e6',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  questionContent: {
    fontSize: 20
  },

  optionsContainer: {
    // height: 'auto',
    // justifyContent: 'space-between'
  },

  optionItemContainer: {
    marginTop: 10,
    padding: 20,
    borderRadius: 50,
    alignItems: 'center'
  },

  optionText: {
    color: '#ffffff',
    fontSize: 18
  },

  primaryButton: {
    backgroundColor: '#35095c',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
    marginTop: 10,
  },

  primaryButtonInvert: {
    backgroundColor: '#ded5e6',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: 'black',
    marginTop: 10,
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

  primaryButtonInvertText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#35095c',
  },

  backButton: {
    fontSize: 20,
  },
});

export default PlayRoomScreen;
