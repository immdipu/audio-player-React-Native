import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Album, Artist} from './src/screens';

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
        <Stack.Screen
          name="Album"
          options={{headerShown: false}}
          component={Album}
        />
      </Stack.Navigator>

      <Player />
      {/* <View className="h-20 w-full bg-gray-600" /> */}
    </NavigationContainer>
  );
};

export default App;
