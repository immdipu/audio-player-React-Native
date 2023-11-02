import clsx from 'clsx';
import React from 'react';
import {View, Image, useWindowDimensions, Pressable} from 'react-native';
import {Disk} from '../icons';
import Animated from 'react-native-reanimated';

interface ImageProps {
  url: string | null;
  defaultImage?: string;
  widthMultiplier: number;
  borderRadius?: number;
  heightMultiplier: number;
  isFullScreen?: boolean;
  onPress?: () => void;
}

const ImageComponent: React.FC<ImageProps> = ({
  url,
  defaultImage,
  heightMultiplier,
  widthMultiplier,
  borderRadius = 15,
  isFullScreen = true,

  onPress,
}) => {
  const {width, height} = useWindowDimensions();
  // console.log('width', width);
  // console.log('heigth', height);

  // Use state to keep track of image loading and error states

  const [isError, setError] = React.useState(false);

  // Function to handle image loading success

  // Function to handle image loading error
  const handleError = () => {
    setError(true);
  };

  let imageWidth = width * widthMultiplier;
  let imageHeight = height * heightMultiplier;

  if (!isFullScreen) {
    imageWidth = 50;
    imageHeight = 48;
  }

  if (isError) {
    console.log('error occured');
  }

  return (
    <View
      style={{width: imageWidth, height: imageHeight}}
      className={clsx(!isFullScreen && 'mt-[3px]')}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: '#00000096',
          borderless: false,
          foreground: true,
        }}>
        {url && !isError ? (
          <Animated.Image
            source={{uri: url}}
            onError={handleError}
            // defaultSource={require('../assets/disk.png')}
            borderRadius={borderRadius}
            loadingIndicatorSource={require('../assets/disk.png')}
            className="w-full h-full"
          />
        ) : (
          <View
            style={{borderRadius: borderRadius}}
            className="items-center h-full  justify-center bg-neutral-800 ">
            <Disk />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ImageComponent;
