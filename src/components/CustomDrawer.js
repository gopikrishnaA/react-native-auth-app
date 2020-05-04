import React from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { updateAuthData } from '../actions/authActions';
import { PROFILE } from '../navigation/screen_names';

const styles = StyleSheet.create({
  itemStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0
  },
  labelStyle: {
    color: 'white',
    fontSize: 16,
    margin: 0
  },
  footer: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 10
  },
  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff'
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  }
});

const UserBadge = (props) => {
  const { navigation: { navigate }, userName, avatar } = props;
  return (<TouchableOpacity
    style={styles.profile}
    onPress={() => navigate(PROFILE)}>
    <View style={styles.imageContainer}>
      <Image source={avatar ? { uri: avatar }
        : require('../assets/profile.png')}
      style={styles.image} />
    </View>
    <View style={styles.nameContainer}>
    <Text style={styles.labelStyle}>{ userName }</Text>
    </View>
  </TouchableOpacity>);
};

const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <UserBadge {...props} />
        <DrawerItemList
          itemStyle={styles.itemStyle}
          labelStyle={styles.labelStyle}
          activeBackgroundColor='#043D6DCC'
          {...props} />
        <DrawerItem
          activeBackgroundColor='#043D6DCC'
          label="Logout"
          labelStyle={styles.labelStyle}
          style={styles.itemStyle}
          onPress={() => props.dispatch(updateAuthData())}
        />
      </DrawerContentScrollView>
      <Text style={styles.footer}>© ℗®™@Gopi.inc</Text>
    </View>
  );
};

const mapStateToProps = ({ auth }) => ({
  userName: auth.userName,
  avatar: auth.avatar
});

export default connect(mapStateToProps)(CustomDrawerContent);
