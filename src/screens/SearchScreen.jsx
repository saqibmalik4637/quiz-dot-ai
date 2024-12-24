import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuggestionsAction, clearSuggestionsAction } from '../reducers/search/searchAction';
import { selectSuggestions } from '../reducers/search/searchSlice';

import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const suggestions = useSelector(selectSuggestions);
  const [query, setQuery] = useState('');

  const handleQuerySubmit = () => {
    if (query) {
      navigation.navigate("SearchResult", { query: query })
    }
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion) {
      navigation.navigate("SearchResult", { query: suggestion })
    }
  }

  useEffect(() => {
    dispatch(clearSuggestionsAction());
  }, []);

  useEffect(() => {
    if (query && query !== '') {
      dispatch(fetchSuggestionsAction(query))
    } else {
      dispatch(clearSuggestionsAction());
    }
  }, [dispatch, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
          <AntDesign name="left" color="#a3a098" size={20} />
        </TouchableOpacity>

        <View style={styles.searchForm}>
          <EvilIcons name="search" color="#35095c" style={styles.searchIcon} size={20} />
          <TextInput
            style={styles.textInput}
            onChangeText={setQuery}
            autoFocus={true}
            placeholder="Science Fiction"
            value={query}
          />
          <TouchableOpacity style={styles.submitIcon} onPress={() => handleQuerySubmit()}>
            <AntDesign name="arrowright" color="#35095c" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.suggestions} showsVerticalScrollIndicator={false}>
        { suggestions &&
          <>
            { suggestions.map((suggestion, index) => {
              return <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => handleSuggestionClick(suggestion)}>
                <View style={styles.suggestionTextContainer}>
                  <EvilIcons name="search" color="#35095c" style={styles.searchSuggestionIcon} size={16} />
                  <Text style={styles.suggestionText}>{suggestion}</Text>              
                </View>

                <AntDesign name="arrowright" color="#35095c" style={styles.searchIcon} size={16} />
              </TouchableOpacity>
            })}
          </>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // paddingVertical: 50,
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
    borderWidth: 0.3,
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
  submitIcon: {
    marginTop: 10,
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    width: '70%',
  },
  searchSuggestionIcon: {
    marginTop: 15,
    marginLeft: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  suggestionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
  },
  suggestionText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 15,
  }
});

export default SearchScreen;
