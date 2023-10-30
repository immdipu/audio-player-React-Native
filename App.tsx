import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home/Home';
import Album from './src/screens/Album/Album';
import Artist from './src/screens/Artist/Artist';
import Player from './src/player/Player';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Artist" component={Artist} />
        <Stack.Screen name="Album" component={Album} />
      </Stack.Navigator>

      <Player />
    </NavigationContainer>
  );
};

export default App;
