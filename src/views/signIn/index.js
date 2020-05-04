import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Login as LoginAction } from '../../actions/authActions';
import styles from './styles';
import { SIGNUP } from '../../navigation/screen_names';
import { ScreenContainer } from '../../components/ScreenContainer';
import TextInput from '../../components/TextInput';
import { emailRegex } from '../../util/validator';
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isEmailNotValid: false,
      isPasswordNotValid: false
    };
  }
  onChangeEmail = (email) => {
    this.setState({
      email,
      isEmailNotValid: false
    });
  }
  onChangePassword = (password) => {
    this.setState({
      password,
      isPasswordNotValid: false
    });
  }
  loginHandler = () => {
    // eslint-disable-next-line max-len
    const { email, password } = this.state;
    if (!emailRegex.test(email)) {
      this.setState({
        isEmailNotValid: true,
        emailError: 'Not a valid email'
      });
    } else if (password.length < 6) {
      this.setState({
        isPasswordNotValid: true,
        passwordError: 'Enter more than 6 values'
      });
    } else {
      this.props.Login({ email, password });
    }
  }
  singUp = () => {
    this.props.navigation.navigate(SIGNUP);
  }
  render () {
    const {
      email,
      password,
      isPasswordNotValid,
      isEmailNotValid,
      passwordError,
      emailError
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={this.singUp}>
          <Text style={styles.buttonText}> Sign-up </Text>
        </TouchableOpacity>
        <ScreenContainer>

          <Image
            style={styles.tinyLogo}
            source={require('../../assets/download.png')}
          />
          <TextInput
            placeholder="Email"
            onChangeText={this.onChangeEmail}
            isError={isEmailNotValid}
            errorMessage={emailError}
            value={email}
            />
          <TextInput
            placeholder="Password"
            onChangeText={this.onChangePassword}
            secureTextEntry
            maxLength={10}
            isError={isPasswordNotValid}
            errorMessage={passwordError}
            value={password}
            />
          <TouchableOpacity
            style={styles.button}
            onPress={this.loginHandler}>
            <Text style={styles.buttonText}> Sign-In </Text>
          </TouchableOpacity>
        </ScreenContainer>
      </View>

    );
  }
}

const mapDisptchToProps = (dispatch) => ({
  Login: (payload) => dispatch(LoginAction(payload))
});

export default connect(null, mapDisptchToProps)(Login);
