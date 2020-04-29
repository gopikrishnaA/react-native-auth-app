import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import Header from '../../components/Header';
import { ScreenContainer } from '../../components/ScreenContainer';
import JokeCard from '../../components/JokeCard';
import { getNewJoke, insertJoke } from '../../actions/jokesAction';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    marginTop: 5
  }
});

class Home extends Component {
  render () {
    const { item, navigation, insertJoke, getNewJoke } = this.props;
    return (
      <ScreenContainer>
        <Header title='HOME' navigation={navigation} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          <JokeCard
            item={item}
            insertJoke={insertJoke}
            newJoke={getNewJoke}
            navigation={navigation}
          />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = ({ jokes }) => ({
  item: jokes.item
});

const mapDispatchToProps = (dispatch) => ({
  getNewJoke: () => dispatch(getNewJoke()),
  insertJoke: (payload, status) => dispatch(insertJoke(payload, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
