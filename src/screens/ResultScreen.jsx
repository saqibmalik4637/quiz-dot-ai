import { Dimensions, StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import QuizzesList from '../components/QuizzesList';

import { PieChart } from 'react-native-chart-kit';

const ResultScreen = ({ route, navigation }) => {
  const screenWidth = Dimensions.get("window").width;

  const reportCard = route.params.reportCard;
  const allAnswers = reportCard.given_answers;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = [
    {
      name: "Correct answers",
      population: reportCard.correct_count,
      color: "#128230",
      legendFontColor: "#128230",
      legendFontSize: 15
    },
    {
      name: "Incorrect answers",
      population: reportCard.incorrect_count,
      color: "#cf3636",
      legendFontColor: "#cf3636",
      legendFontSize: 15
    },
    {
      name: "Timed out",
      population: reportCard.no_result_count,
      color: "#7F7F7F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FINAL SCOREBOARD</Text>
      </View>
      <ScrollView style={styles.resultContainerParent} showsVerticalScrollIndicator={false}>
        <View style={styles.totalScore}>
          <Text style={styles.totalNumber}>{parseFloat(reportCard.score).toFixed(2)}</Text>
          {/*<Text style={styles.totalText}>out of {reportCard.quiz_total_points}</Text>*/}
        </View>

        <View style={styles.resultContainer}>
          <View>
            <PieChart
              data={data}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              center={[0, 0]}
              absolute
            />
          </View>
          
        </View>

        <View style={styles.footerButton}>
          <Pressable style={[styles.primaryButtonInvert, styles.buttonShadow]} onPress={() => navigation.navigate('Home')}>
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
    marginTop: 30,
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
