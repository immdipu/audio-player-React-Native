import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, Artist, Album, Playlist, MyMusic} from '../screens';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabScreen"
        options={{headerShown: false}}
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Artist" component={Artist} />
      <Stack.Screen name="Album" component={Album} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
};
const MyMusicStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyMusic" component={MyMusic} />
    </Stack.Navigator>
  );
};

export {MainStack, HomeStack, MyMusicStack};
