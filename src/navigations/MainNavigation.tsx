import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './StackNavigation';
import React from 'react';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigation;
