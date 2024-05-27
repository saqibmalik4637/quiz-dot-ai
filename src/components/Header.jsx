import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = ({ navigation, title }) => {

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack() }}>
          <AntDesign name="left" color="#a3a098" size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <EvilIcons name="search" color="#35095c" style={styles.icon} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  arrowIcon: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // height: 30,
    // width: 30,
  },
});

export default Header;
