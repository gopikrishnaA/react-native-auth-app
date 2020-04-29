import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackScreen, DrawerScreen } from './navigators';
import { StatusBar, View } from 'react-native';
import Loader from '../components/Loader';
const RootStack = createStackNavigator();

class RootStackScreen extends Component {
  constructor (props) {
    super(props);
    StatusBar.setHidden(true);
  }

  render () {
    const { isLoading, userToken } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={isLoading} />
        <RootStack.Navigator headerMode="none">
          {userToken ? (
            <RootStack.Screen
              name="App"
              component={DrawerScreen}
              options={{
                animationEnabled: false
              }}
            />
          ) : (
              <RootStack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                  animationEnabled: false
                }}
              />
            )}
        </RootStack.Navigator>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, loader }) => ({
  isLoading: loader.isLoading,
  userToken: auth.userToken
});

export default connect(mapStateToProps)(RootStackScreen);
