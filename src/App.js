import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './store';
import RootStackScreen from './navigation';

const App = () =>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootStackScreen  />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>;

export default App;
