import store from '../store';
import { showLoader, hideLoader } from '../actions/loaderActions';
import { updateAuthData } from '../actions/authActions';
import { Platform } from 'react-native';
import Toast from '../components/CustomAndroidToast';

const invokeService = ({ serviceUrl, method = 'GET', requestData }) => {
  console.info('serviceName is ', serviceUrl);
  console.info('requestData is ', requestData);

  const baseUrl = Platform.OS !== 'android' ? 'http://localhost:3000'
                                            : 'http://192.168.1.4:3000';
  const data = requestData ? JSON.stringify(requestData) : {};

  // Show loading icon
  store.dispatch(showLoader());

  // sent body object based on method
  const body = method !== 'GET' && method !== 'DELETE' ? { body: data } : {};
  // sent headers based on serviceUrl
  let authorization = {};
  if (serviceUrl.includes('login')
    || serviceUrl.includes('registration')) {
    authorization = {};
  } else {
    authorization = { Authorization: store.getState().auth.userToken };
  }
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json; charset=UTF-8',
    ...authorization
  };
  return fetch(
    baseUrl + serviceUrl,
    {
      method,
      headers,
      ...body
    }
  )
    .then((response) => {
      store.dispatch(hideLoader());
      if (!response.ok) {
        response.status === 403 &&
        store.dispatch(updateAuthData());
        return response.json().then(data =>
          Platform.OS === 'android' ?
          Toast({ visible: true, message: data.errorMessage })
          : Error(response.statusText)
        );
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      console.info(error);
      if (Platform.OS === 'android') {
        Toast({ visible: true, message: error.message });
      } else {
        throw new Error(error);
      }
    });
};
export default invokeService;
