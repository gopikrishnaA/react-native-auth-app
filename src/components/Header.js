import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#3D6DCC',
    height: 50,
    justifyContent: 'space-around'
  },
  menuIcon: {
    position: 'absolute',
    left: 0,
    marginLeft: 10
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const MenuIcon = ({ navigation }) => <Icon
    name='three-bars'
    size={30}
    color='#fff'
    onPress={() => navigation.openDrawer()}
/>;

const Header = ({
  title = '',
  navigation
  }) => {
  return (

    <View style={styles.headerBackground}>
      <View style={styles.menuIcon} >
        <MenuIcon navigation={navigation}/>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};


export default Header;
