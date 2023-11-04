import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeStack, MyMusicStack} from './StackNavigation';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="MyMusicTab" component={MyMusicStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
