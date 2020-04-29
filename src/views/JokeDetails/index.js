import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView, StyleSheet,
  Text, TextInput, View
} from 'react-native';
import { Button, Divider, Icon, ListItem } from 'react-native-elements';
import { ScreenContainer } from '../../components/ScreenContainer';
import ConfirmModal from '../../components/ConfirmationModal';
import JokeCard from '../../components/JokeCard';
import {
  updateStatus, deleteJoke, getComments,
  updateJokes, updateComments, deleteComment
}
  from '../../actions/jokesAction';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    margin: 5
  },
  inputStyle: {
    borderColor: '#3D6DCC',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 10,
    padding: 10
  },
  commentTxt: {
    fontSize: 24,
    color: '#CDCDCD'
  },
  divider: {
    backgroundColor: '#3D6DCC'
  },
  commentsContainer: {
    padding: 10
  },
  addBtn: {
    marginTop: 20
  },
  item: {
    marginVertical: 2
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
  }
});

class Details extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount () {
    const { getComments, route } = this.props;
    const { item } = route?.params;
    getComments(item?.id || '');
  }

  showModal = (show) => {
    this.setState({
      show
    });
  }

  onChangeText = (text) => {
    this.props.update({ commentText: text });
    if (text.trim().length > 3) {
      this.setState({
        isError: false
      });
    }
  }

  onCommentUpdate = () => {
    const { commentText, route, updateComment } = this.props;
    const { item } = route?.params;
    if (commentText.trim().length > 3) {
      this.setState({
        isError: false
      });
      updateComment({ commentText, id: item?.id || '' });
    } else {
      this.setState({
        isError: true
      });
    }
  }

  render () {
    const { route, updateStatus,
      deleteComment,
      deleteJoke,
      comments,
      commentText } = this.props;
    const { item } = route?.params;
    const { show, isError } = this.state;
    return (<ScreenContainer >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ConfirmModal
          show={show}
          showModal={this.showModal}
          deleteJoke={deleteJoke} />
        <JokeCard
          item={item}
          updateStatus={updateStatus}
          showModal={this.showModal}
        />
        <View style={styles.commentsContainer}>
          <Text style={styles.commentTxt}>Comments Section</Text>
          <Divider style={styles.divider} />
          <TextInput
            multiline
            numberOfLines={4}
            placeholder='Leave comment here ...'
            onChangeText={this.onChangeText}
            style={styles.inputStyle}
            value={commentText} />
          {isError && <Text style={styles.error}>
            Enter input more than 3 letters</Text>}
          <Button
            buttonStyle={styles.addBtn}
            title='ADD'
            onPress={this.onCommentUpdate} />
          {comments.map(item =>
            <ListItem
              key={item.id}
              style={styles.item}
              title={item.comment}
              bottomDivider
              rightIcon={<Icon
                style={{ marginRight: 5 }}
                type='octicon'
                name='trashcan'
                color='#3D6DCC'
                onPress={() => deleteComment(item)}
                size={20} />}
            />
          )}
        </View>
      </ScrollView>
    </ScreenContainer>);
  }
};

const mapStateToProps = ({ jokes }) => ({
  commentText: jokes.commentText,
  comments: jokes.comments
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteComment: (payload) => dispatch(deleteComment(payload)),
  deleteJoke: () => dispatch(deleteJoke(ownProps)),
  getComments: (payload) => dispatch(getComments(payload)),
  updateStatus: (payload, status) => dispatch(updateStatus(payload, status)),
  update: (payload) => dispatch(updateJokes(payload)),
  updateComment: (payload) => dispatch(updateComments(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
