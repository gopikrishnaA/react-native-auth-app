import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: '#3D6DCC',
      borderWidth: 1,
      padding: 10
   },
    button: {
      backgroundColor: '#3D6DCC',
      padding: 10,
      margin: 15,
      height: 40
    },
    buttonText: {
      color: 'white',
      alignSelf: 'center'
    },
    tinyLogo: {
      width:150,
      height: 150,
      alignSelf: 'center',
      resizeMode: 'contain'
    }
  });

  export default styles;
