import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, ImageBackground, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAction } from '../redux/category/categoryAction';
// import { categories } from '../../lib/data';

const CategoriesList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categoriesList } = useSelector(state => state.category);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  useEffect(() => {
    if (categoriesList && categoriesList) {
      setCategories(categoriesList);
    }
  }, [categoriesList]);

  return (
    <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
      { categories &&
        <View style={styles.row}>
          {
            categories.map((category, i) => {
              return (
                <Pressable style={styles.imageContainer} key={i} onPress={() => navigation.navigate('Category', { category: category })}>
                  <ImageBackground
                    style={styles.image}
                    imageStyle={{ borderRadius: 20 }}
                    source={category.image}
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default CategoriesList;
