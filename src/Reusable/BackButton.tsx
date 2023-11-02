/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable} from 'react-native';
import {ArrowSmallLeftIcon} from 'react-native-heroicons/outline';

interface BackButtonProps {
  onPress: () => void;
  backgroundOpacity?: number;
  iconSize?: number;
  iconColor?: string;
  width?: number;
  height?: number;
}

const BackButton: React.FC<BackButtonProps> = ({
  backgroundOpacity = 0.2,
  iconSize = 25,
  iconColor = 'white',
  width = 48,
  height = 48,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: '#61605c',
        borderless: false,
      }}
      style={{
        backgroundColor: `rgba(52, 52, 52, ${backgroundOpacity})`,
        width: width,
        height: height,
      }}
      className="text-white rounded-lg items-center justify-center">
      <ArrowSmallLeftIcon size={iconSize} color={iconColor} />
    </Pressable>
  );
};

export default BackButton;
