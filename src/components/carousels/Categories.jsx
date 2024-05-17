import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import CategoryBoxItem from '../CategoryBoxItem';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

const Categories = ({ navigation, carousel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.topic}>{carousel.title}</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Categories', { title: carousel.title, query: carousel.title })}
        >
          <Text style={styles.linkText}>View all</Text>
          <FontAwesomeIcon icon={faArrowRight} color="#35095c" size={14} style={styles.linkIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        { carousel.items.map((category, index) => {
          return <TouchableOpacity key={index} style={styles.categoryBox}
                                   onPress={() => navigation.navigate('Quizzes', { category: category })}>

            <CategoryBoxItem category={category} />
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
  },
  linkText: {
    fontSize: 14,
    color: '#35095c',
  },
  linkIcon: {
    marginLeft: 10,
  },
  categoryBox: {
    width: 180,
    marginTop: 2,
    marginRight: 10,
    marginBottom: 10,
  }
});

export default Categories;
