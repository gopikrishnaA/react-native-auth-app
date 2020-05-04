import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import { emailRegex } from '../../util/validator';
import { updateUser, updateAuthData } from '../../actions/authActions';
import ImagePicker from '../../components/ImagePicker';

class ProfilePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      emailError: '',
      userError: '',
      passwordError: '',
      password2Error: '',
      isUserNotValid: false,
      isEmailNotValid: false,
      isPasswordNotValid: false,
      isPassword2NotValid: false
    };
  }
  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {
        userName,
        email,
        password,
        updateImage } = this.props;
      this.setState({
        username: userName,
        email: email,
        password: password,
        password2: password
      });
      updateImage({ cacheImage: '' });
    });
  }
  componentWillUnmount () {
    this._unsubscribe();
  }
  onChangeText = (value, key) => {
    let error = {};
    if (key === 'username') {
      error = {
        isUserNotValid: false
      };
    } else if (key === 'email') {
      error = {
        isEmailNotValid: false
      };
    } else if (key === 'password') {
      error = {
        isPasswordNotValid: false
      };
    } else if (key === 'password2') {
      error = {
        isPassword2NotValid: false
      };
    }
    this.setState({
      [key]: value,
      ...error
    });
  }
  save = () => {
    const { username, email, password, password2 } = this.state;
    if (username.length < 6) {
      this.setState({
        isUserNotValid: true,
        userError: 'Enter more than 6 values'
      });
    } else if (!emailRegex.test(email)) {
      this.setState({
        isEmailNotValid: true,
        emailError: 'Not a valid email'
      });
    } else if (password.length < 6) {
      this.setState({
        isPasswordNotValid: true,
        passwordError: 'Enter more than 6 values'
      });
    } else if (password2.length < 6) {
      this.setState({
        isPassword2NotValid: true,
        password2Error: 'Enter more than 6 values'
      });
    } else if (password !== password2) {
      this.setState({
        isPassword2NotValid: true,
        password2Error: 'Password does not match'
      });
    } else {
      const { avatar, cacheImage, updateUser, userId } = this.props;
      updateUser({
        username, userId,
        email, password, password2,
        avatar: cacheImage || avatar
      });
    }
  }
  render () {
    const {
      email,
      username,
      password,
      password2,
      userError,
      emailError,
      passwordError,
      password2Error,
      isUserNotValid,
      isEmailNotValid,
      isPasswordNotValid,
      isPassword2NotValid
    } = this.state;
    const { cacheImage, avatar } = this.props;
    return (
      <View style={styles.container} >
        <Header title='User Profile' navigation={this.props.navigation} />
        <ImagePicker {...this.props} avatar={cacheImage || avatar} />
        <TextInput
          placeholder="Username"
          onChangeText={(text) => this.onChangeText(text, 'username')}
          isError={isUserNotValid}
          errorMessage={userError}
          value={username}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => this.onChangeText(text, 'email')}
          isError={isEmailNotValid}
          errorMessage={emailError}
          value={email}
        />
        <TextInput
          placeholder="Enter Password"
          onChangeText={(text) => this.onChangeText(text, 'password')}
          secureTextEntry
          maxLength={10}
          isError={isPasswordNotValid}
          errorMessage={passwordError}
          value={password}
        />
        <TextInput
          placeholder="Re-Enter Password"
          onChangeText={(text) => this.onChangeText(text, 'password2')}
          secureTextEntry
          maxLength={10}
          isError={isPassword2NotValid}
          errorMessage={password2Error}
          value={password2}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.save}>
          <Text style={styles.buttonText}> Save </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  avatar: auth.avatar,
  cacheImage: auth.cacheImage,
  email: auth.email,
  password: auth.password,
  userName: auth.userName,
  userId: auth.userId
});

const mapDisptchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUser(payload)),
  updateImage: (payload) => dispatch(updateAuthData(payload))
});

export default connect(mapStateToProps, mapDisptchToProps)(ProfilePage);
