import { StyleSheet, View, Image, Text } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerComponent}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </View>
  )
};

const styles = StyleSheet.create({
  headerComponent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'start',
  },

  logo: {
    height: 100,
    width: 100,
  }
});

export default Header;
