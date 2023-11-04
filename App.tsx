import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  Home,
  Album,
  Artist,
  Playlist,
  Trending,
  Search,
  MyMusic,
} from './src/screens';

import Player from './src/player/Player';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="Artist" component={Artist} />
      <Stack.Screen
        name="Album"
        options={{headerShown: false, presentation: 'modal'}}
        component={Album}
      />
      <Stack.Screen
        name="Playlist"
        options={{headerShown: false}}
        component={Playlist}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trending" component={Trending} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="My Music" component={MyMusic} />
      </Tab.Navigator>
      {/* <Player /> */}
      {/* <View className="h-20 w-full bg-gray-600" /> */}
    </NavigationContainer>
  );
};

export default App;
