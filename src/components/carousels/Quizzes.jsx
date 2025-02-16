import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import QuizBoxItem from '../QuizBoxItem';

import AntDesign from '@expo/vector-icons/AntDesign';

const Quizzes = ({ navigation, carousel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.topic}>{carousel.title}</Text>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Quizzes', { carousel_id: carousel.id, title: carousel.title })}>
          <Text style={styles.linkText}>View all</Text>
          <AntDesign name="arrowright" size={14} style={styles.linkIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        { carousel.items.map((quiz, index) => {
          return <TouchableOpacity key={index} style={styles.quizBox} onPress={() => navigation.navigate('Quiz', { quiz: quiz })}>
            <QuizBoxItem quiz={quiz} />
          </TouchableOpacity>
        }) }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topic: {
    fontSize: 14,
    // fontWeight: '400',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    fontSize: 14,
    color: '#35095c',
  },
  linkIcon: {
    marginLeft: 10,
  },
  quizBox: {
    width: 150,
    marginTop: 2,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
  }
});

export default Quizzes;
