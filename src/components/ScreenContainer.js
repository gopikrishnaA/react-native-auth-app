import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  }
});

export const ScreenContainer = ({ children }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);
