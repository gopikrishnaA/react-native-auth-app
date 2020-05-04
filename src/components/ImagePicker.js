import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const defaultImage =  require('../assets/profile.png');
const styles = StyleSheet.create({

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    alignSelf: 'center',
    marginTop: 10
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});


export default class ImagePickerComp extends React.Component {
  // state = {
  //   videoSource: null
  // };

  constructor (props) {
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    // this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      },
      title: 'Choose a Photo',
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Gallary',
      allowsEditing: true,
      tintColor: '#fff'
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.info('User cancelled photo picker');
      } else if (response.error) {
        console.info('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.info('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: response.uri };
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.props.updateImage({ cacheImage:
          'data:image/jpeg;base64,' + response.data });
      }
    });
  }

  // selectVideoTapped () {
  //   const options = {
  //     title: 'Video Picker',
  //     takePhotoButtonTitle: 'Take Video...',
  //     mediaType: 'video',
  //     videoQuality: 'medium'
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     console.info('Response = ', response);

  //     if (response.didCancel) {
  //       console.info('User cancelled video picker');
  //     } else if (response.error) {
  //       console.info('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.info('User tapped custom button: ', response.customButton);
  //     } else {
  //       this.setState({
  //         videoSource: response.uri
  //       });
  //     }
  //   });
  // }

  render () {
    const { avatar } = this.props;
    const src = avatar ? { uri: avatar }
                       : defaultImage;
    return (
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar,
            styles.avatarContainer,
            { marginBottom: 20 }]}>
            <Image style={styles.avatar}
              source={src} />
          </View>
        </TouchableOpacity>
    );
  }
}

/* <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        {this.state.videoSource && (
          <Text style={{ margin: 8, textAlign: 'center' }}>
            {this.state.videoSource}
          </Text>
        )} */
