import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import About from '../screens/About.tsx';
import Signup from '../screens/Signup.tsx';

const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;
