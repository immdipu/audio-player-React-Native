/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeStack, MyMusicStack} from './StackNavigation';
import {HomeIcon, FolderIcon} from 'react-native-heroicons/solid';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="black"
      shifting
      barStyle={{
        backgroundColor: '#737170',
        height: 70,
      }}
      style={{backgroundColor: 'black'}}>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'black',

          tabBarIcon: ({color}) => <HomeIcon size={25} color={color} />,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <FolderIcon size={25} color={color} />,
        }}
        name="MyMusicTab"
        component={MyMusicStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
