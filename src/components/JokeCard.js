import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import ActionIcon from './ActionIcon';
import { SUMMARY } from '../navigation/screen_names';

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttonStyle: {
    borderRadius: 5,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10
  },
  summaryBtn: {
    borderRadius: 5,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  jokeTxt: {
    marginBottom: 5,
    fontSize: 24
  }
});

const JokeCard = ({
  insertJoke,
  item = {},
  navigation,
  newJoke,
  showModal,
  updateStatus
}) => item.joke ? <Card >
  <Text style={styles.jokeTxt}>
    {item.joke}
  </Text>
  <View style={styles.buttonGroup}>
    <Button
      icon={<ActionIcon name='thumbsup' />}
      buttonStyle={styles.buttonStyle}
      title='Like'
      onPress={() => insertJoke ?
        insertJoke(item, 'Like')
        : updateStatus(item, 'Like')} />
    <Button
      icon={<ActionIcon name='thumbsdown' />}
      buttonStyle={styles.buttonStyle}
      title='DisLike'
      onPress={() => insertJoke ?
        insertJoke(item, 'DisLike')
        : updateStatus(item, 'DisLike')} />
    {newJoke && <Button
      icon={<ActionIcon name='gift' />}
      buttonStyle={styles.buttonStyle}
      title='New'
      onPress={() => newJoke()} />}
    {showModal && <Button
      icon={<ActionIcon name='trashcan' />}
      buttonStyle={styles.buttonStyle}
      title='Delete'
      onPress={() => showModal(true)} />}
  </View>
  {newJoke && <Button
    icon={<ActionIcon name='list-unordered' />}
    buttonStyle={styles.summaryBtn}
    title='Summary'
    onPress={() => navigation.navigate(SUMMARY)} />}
</Card> : null;

export default JokeCard;
