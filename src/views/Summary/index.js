import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions, FlatList,
  RefreshControl, StyleSheet
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Header from '../../components/Header';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Icon } from 'react-native-elements';
import { DETAILS } from '../../navigation/screen_names';
import { getJokes } from '../../actions/jokesAction';

const styles = StyleSheet.create({
  item: {
    marginVertical: 2,
    width: Dimensions.get('window').width - 10
  },
  title: {
    fontSize: 12,
    color: 'white'
  }
});

const ActionIcon = ({ name }) =>
  <Icon
    name={name === 'Like' ? 'thumbsup' : 'thumbsdown'}
    type='octicon'
    color='#517fa4' />;

function Item (props) {
  const { item, onPressItem } = props;
  return (
    <ListItem
      style={styles.item}
      title={item.joke}
      bottomDivider
      rightIcon={<ActionIcon name={item.status} />}
      onPress={() => onPressItem(item)}
    />
  );
}

class Summary extends Component {

  componentDidMount () {
    const { navigation, getJokes } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      getJokes(false);
    });
  }
  componentWillUnmount () {
    this._unsubscribe();
  }
  onRefresh = () => {
    this.props.getJokes(true);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate(DETAILS, {
      item
    });
  }

  render () {
    return (
      <ScreenContainer>
        <Header title='Summary' navigation={this.props.navigation} />
        <FlatList
          data={this.props.data}
          renderItem={({ item }) =>
            <Item item={item} onPressItem={this.onPressItem} />
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh} />
          }
          keyExtractor={item => item.id}
        />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = ({ jokes }) => ({
  data: jokes.summary,
  refreshing: jokes.refreshing
});

const mapDispatchToProps = (dispatch) => ({
  getJokes: (payload) => dispatch(getJokes(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Summary);
