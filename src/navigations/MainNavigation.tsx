import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './StackNavigation';
import React from 'react';
import {View, Text} from 'react-native';
import Player from '../player/Player';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Player />

      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigation;
