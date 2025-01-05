import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { fetchInterestsAction } from '../reducers/interests/interestsAction';
import { selectInterests } from '../reducers/interests/interestsSlice';

import { createUserInterestAction } from '../reducers/user_interests/userInterestsAction';
import { selectUserInterests } from '../reducers/user_interests/userInterestsSlice';

const InterestsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  // Fetch interests from Redux
  const interestsSlice = useSelector(selectInterests);
  const { interests } = interestsSlice;

  const userInterestsSlice = useSelector(selectUserInterests);
  const { createdUserInterest } = userInterestsSlice;

  // Track selected interests
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [userInterestSubmited, setUserInterestSubmited] = useState(false);

  // Fetch interests on mount
  useEffect(() => {
    dispatch(fetchInterestsAction());
  }, []);

  useEffect(() => {
    if (userInterestSubmited && createdUserInterest) {
      navigation.navigate('Home');
    }
  }, [userInterestSubmited, createdUserInterest]);

  // Toggle interest selection
  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((interest) => interest !== id) : [...prev, id]
    );
  };

  // Submit selected interests
  const submitInterests = () => {
    dispatch(createUserInterestAction(selectedInterests));
    setUserInterestSubmited(true);
  };

  return (
    <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.container}>
      <Text style={styles.title}>What are your interests?</Text>

      {/* Interests displayed as bubbles */}
      <FlatList
        data={interests}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.interestsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.bubble,
              selectedInterests.includes(item.id) && styles.bubbleSelected,
            ]}
            onPress={() => toggleInterest(item.id)}
          >
            <Text style={styles.bubbleText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Submit button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          selectedInterests.length === 0 && styles.submitButtonDisabled,
        ]}
        onPress={submitInterests}
        disabled={selectedInterests.length === 0}
      >
        <Text style={styles.submitButtonText}>Submit Interests</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default InterestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  interestsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  bubbleSelected: {
    backgroundColor: '#FF8C00',
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#FF4500',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
