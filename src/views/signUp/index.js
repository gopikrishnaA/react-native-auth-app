import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ScreenContainer } from '../../components/ScreenContainer';
import TextInput from '../../components/TextInput';
import { emailRegex } from '../../util/validator';
import { Register } from '../../actions/authActions';

class SignUp extends Component {
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
  signUpHandler = () => {
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
      const { register, navigation } = this.props;
      register({ username, email, password, password2, navigation });
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
    return (
      <ScreenContainer>
          <Image
           style={styles.tinyLogo}
           source={require('../../assets/download.png')}
          />
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
               style = {styles.button}
               onPress = {this.signUpHandler}>
               <Text style = {styles.buttonText}> Sign-Up </Text>
            </TouchableOpacity>
      </ScreenContainer>
    );
  }
}
const mapDisptchToProps = (dispatch) => ({
  register: (payload) => dispatch(Register(payload))
});

export default connect(null, mapDisptchToProps)(SignUp);
