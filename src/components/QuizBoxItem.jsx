import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Pressable } from 'react-native'

const QuizBoxItem = ({quiz}) => {
  return (
    <View>
      <ImageBackground
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        source={{uri: quiz.image_url}}
        resizeMode="cover"
      >
        <View style={styles.imageInner}>
          <Text style={styles.questionsCount}>{quiz.questions_count}Qs</Text>
        </View>
      </ImageBackground>

      <View style={styles.description}>
        <Text numberOfLines={2} style={styles.text}>{quiz.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  imageInner: {
    backgroundColor: '#35095c',
    padding: 10,
    borderRadius: 12,
    width: 60,
    marginRight: 3,
    marginBottom: 3,
  },
  questionsCount: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 60,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default QuizBoxItem;
