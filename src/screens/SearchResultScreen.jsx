import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import QuizzesList from '../components/QuizzesList';
import CategoriesList from '../components/CategoriesList';

import { fetchQuizzesAction } from '../reducers/quizzes/quizAction';
import { selectQuizzes } from '../reducers/quizzes/quizSlice';

import { fetchCategoriesAction } from '../reducers/categories/categoryAction';
import { selectCategories } from '../reducers/categories/categorySlice';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

const SearchResultScreen = ({ route, navigation }) => {
  const [query, setQuery] = useState(route.params.query);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const quizzes = useSelector(selectQuizzes);

  const [resultFor, setResultFor] = useState('Quizzes');

  const handleQuerySubmit = () => {
    if (query) {
      navigation.navigate("SearchResult", { query: query })
    }
  }

  useEffect(() => {
    if (query && query !== '') {
      navigation.navigate("SearchResult", { query: query })
    } 
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
          <FontAwesomeIcon icon={faChevronLeft} color="#a3a098" size={20} />
        </TouchableOpacity>

        <View style={styles.searchForm}>
          <FontAwesomeIcon icon="fa-magnifying-glass" color="#35095c" style={styles.searchIcon} size={20} />
          <TextInput
            style={styles.textInput}
            onChangeText={setQuery}
            autoFocus={true}
            placeholder="Science Fiction"
            value={query}
          />
          <TouchableOpacity style={styles.submitIcon} onPress={() => handleQuerySubmit()}>
            <FontAwesomeIcon icon={faArrowRight} color="#35095c" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      { resultFor === 'Quizzes' &&
        <QuizzesList navigation={navigation} query={query} />
      }

      { resultFor === 'Categories' &&
        <CategoriesList navigation={navigation} query={query} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchForm: {
    width: '90%',
    height: 40,
    marginTop: 5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: '#35095c',
    justifyContent: 'space-between'
  },
  searchIcon: {
    marginTop: 10,
    marginLeft: 10,
  },
  arrowIcon: {
    marginTop: 15,
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    width: '70%',
  },
  submitIcon: {
    marginTop: 10,
    marginRight: 10,
  },
});

export default SearchResultScreen;
