import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

const Header = ({ navigation, title }) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.arrowIcon} onPress={() => { navigation.goBack(null) }}>
        <FontAwesomeIcon icon={faChevronLeft} color="#a3a098" size={20} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <FontAwesomeIcon icon="fa-magnifying-glass" color="#35095c" style={styles.icon} size={20} />
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
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  arrowIcon: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default Header;
