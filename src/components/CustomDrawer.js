import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { updateToken } from '../actions/authActions';


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
  }
});

const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          itemStyle={styles.itemStyle}
          labelStyle={styles.labelStyle}
          activeBackgroundColor='blue'
          {...props} />
        <DrawerItem
          activeBackgroundColor='blue'
          label="Logout"
          labelStyle={styles.labelStyle}
          style={styles.itemStyle}
          onPress={() => props.dispatch(updateToken(''))}
        />
      </DrawerContentScrollView>
      <Text style={styles.footer}>© ℗®™@Gopi.inc</Text>
    </View>
  );
};
export default connect()(CustomDrawerContent);
