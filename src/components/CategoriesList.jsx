import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, ImageBackground, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAction } from '../reducers/categories/categoryAction';
import { selectCategories } from '../reducers/categories/categorySlice';

const CategoriesList = ({ navigation, query, carouselId }) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(fetchCategoriesAction({query: query}));
    } else if (carouselId) {
      dispatch(fetchCategoriesAction({carouselId: carouselId}));
    }
  }, [dispatch, fetchCategoriesAction])

  return (
    <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
      { categories &&
        <View style={styles.row}>
          {
            categories.map((category, i) => {
              return (
                <Pressable style={styles.imageContainer} key={i} onPress={() => navigation.navigate('Quizzes', { category: category })}>
                  <ImageBackground
                    style={styles.image}
                    imageStyle={{ borderRadius: 20 }}
                    source={{uri: category.image_url}}
                    resizeMode="cover">
                    <View style={styles.imageInner}>
                      <Text numberOfLines={1} style={styles.text}>{category.name}</Text>
                    </View>
                  </ImageBackground>
                </Pressable>
              )
            })
          }
        </View>
      }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  categoriesList: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageContainer: {
    marginHorizontal: '2%',
    marginBottom: 12,
    minWidth: '46%',
    flex: 1,
  },

  image: {
    justifyContent: 'flex-end',
    height: 120,
    borderRadius: 20,
    shadowColor: '#35095c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: '#35095c',
    elevation: 8,
  },

  imageInner: {
    backgroundColor: 'rgba(222, 213, 230, 0.6)',
    padding: 10,
    maxWidth: '70%',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  text: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default CategoriesList;
