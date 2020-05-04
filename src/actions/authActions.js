import { Platform } from 'react-native';
import invokeService from '../services';
import { updateJokes } from './jokesAction';
import { SIGNIN } from '../navigation/screen_names';
import Toast from '../components/CustomAndroidToast';

export const updateAuthData = (payload) => ({
  type: 'UPDATE_AUTH_DATA',
  payload
});

export const getJoke = () => {
  return (dispatch) => {
    invokeService({
      serviceUrl: '/api/joke',
      method: 'GET'
    })
      .then((result) => {
        dispatch(updateJokes({ item: result.data }));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const Login = (payload) => {
  return (dispatch) => {
    const { email, password } = payload;
    const requestData = {
      email,
      password
    };
    invokeService({
      serviceUrl: '/api/user/login',
      method: 'POST',
      requestData
    })
      .then((result) => {
        dispatch(updateAuthData({
          userId: result?.userId,
          userToken: result?.token || '',
          email: result?.email,
          userName: result?.userName,
          avatar: result?.avatar,
          password
        }));
        result?.token && dispatch(getJoke());
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const Register = (payload) => {
  return () => {
    const { navigation,
      email,
      username,
      password,
      password2 } = payload;
    const requestData = {
      name: username,
      email,
      password,
      password2
    };
    invokeService({
      serviceUrl: '/api/user/registration',
      method: 'POST',
      requestData
    })
      .then((result) => {
        const isSuccess = result?.status === 'success';
        if (Platform.OS === 'android') {
          isSuccess &&
            Toast({ visible: true, message: 'User created successfully' });
        }
        isSuccess && navigation.navigate(SIGNIN);
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};
export const updateUser = (payload) => {
  return (dispatch) => {
    const {
      avatar = '',
      email,
      username,
      password,
      password2,
      userId } = payload;
    const requestData = {
      avatar,
      name: username,
      email,
      password,
      password2,
      userId
    };
    invokeService({
      serviceUrl: '/api/user/update',
      method: 'POST',
      requestData
    })
      .then((result) => {
        const isSuccess = result?.status === 'success';
        isSuccess && dispatch(updateAuthData({
          userId: result?.userId,
          email: result?.email,
          userName: result?.userName,
          avatar: result?.avatar,
          password
        }));
        if (Platform.OS === 'android') {
          isSuccess &&
            Toast({ visible: true, message: 'User updated successfully' });
        }
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};
