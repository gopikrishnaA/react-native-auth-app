import React from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Icon } from 'react-native-elements';
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: 'white',
    height: 250,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10
  },
  title: {
    alignSelf: 'center',
    fontSize: 24
  },
  subTitle: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  closeIcon: {
    alignItems: 'flex-end'
  },
  iconStyle: {
    fontWeight: 'bold'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  buttonStyle: {
    borderRadius: 5,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const ConfirmModal = ({
  show = false,
  opacity = 0.4,
  showModal = () => {},
  deleteJoke = () => {}
}) => {
  if (!show) {
    return null;
  }
  return (
    <Modal
      transparent
      animationType="none"
      visible={show}
      onRequestClose={() => { }}
    >
      <View
        style={[
          styles.modalBackground,
          { backgroundColor: `rgba(0,0,0,${opacity})` }
        ]}
      >
        <View style={styles.wrapper}>
          <Icon
            name='close-o'
            type='evilicon'
            size={45}
            containerStyle={styles.closeIcon}
            iconStyle={styles.iconStyle}
            onPress={() => showModal(false)} />
          <Text style={styles.title}>Are you want to delete ?</Text>
          <Text style={styles.subTitle}>If you want to delete this item,
          will permanently going to delete
          the records from the database ☹</Text>
          <View style={styles.buttonGroup}>
            <Button
              buttonStyle={styles.buttonStyle}
              title='Yes, I Do'
              onPress={() => deleteJoke()} />
            <Button
              buttonStyle={styles.buttonStyle}
              title='Cancel'
              onPress={() => showModal(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
