import { ToastAndroid } from 'react-native';
// a component that calls the imperative ToastAndroid API
const Toast = props => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };

  export default Toast;
