import React from 'react';
import CustomDrawer from '../components/CustomDrawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Views } from '../views';
import { SIGNIN, SIGNUP, HOME, SUMMARY, DETAILS } from './screen_names';

const AuthStack = createStackNavigator();
export const AuthStackScreen = () =>
  <AuthStack.Navigator initialRouteName={SIGNIN}>
    <AuthStack.Screen name={SIGNIN}
      component={Views.SignIn}
      options={{ headerShown: false }} />
    <AuthStack.Screen name={SIGNUP} component={Views.SignUp} />
  </AuthStack.Navigator>;

const SummaryStack = createStackNavigator();
const SummaryStackScreen = () =>
  <SummaryStack.Navigator
    initialRouteName={SUMMARY}>
    <SummaryStack.Screen name={SUMMARY}
      component={Views.Summary}
      options={{ headerShown: false }} />
    <SummaryStack.Screen name={DETAILS}
      component={Views.JokeDetails}
      options={{
        title: 'Joke Details',
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center'
      }} />
  </SummaryStack.Navigator>;


const Drawer = createDrawerNavigator();
export const DrawerScreen = () => <Drawer.Navigator
  initialRouteName={HOME}
  drawerContent={(props) =>
    <CustomDrawer {...props} />}
  drawerStyle={{
    color: '#fff',
    backgroundColor: '#3D6DCC',
    width: 240
  }}>
  <Drawer.Screen
    name={HOME}
    component={Views.Home}
    options={{ drawerLabel: 'Home' }}
  />
  <Drawer.Screen
    name={SUMMARY}
    component={SummaryStackScreen}
    options={{ drawerLabel: 'Summary' }}
  />
</Drawer.Navigator>;
