import clsx from 'clsx';
import React from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';

interface ImageProps {
  url: string;
  defaultImage?: string;
  widthMultiplier: number;
  borderRadius?: number;
  heightMultiplier: number;
  isFullScreen?: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({
  url,
  defaultImage,
  heightMultiplier,
  widthMultiplier,
  borderRadius = 15,
  isFullScreen = true,
}) => {
  const {width, height} = useWindowDimensions();
  // console.log('width', width);
  // console.log('heigth', height);

  // Use state to keep track of image loading and error states
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);

  // Function to handle image loading success
  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  // Function to handle image loading error
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  let imageWidth = width * widthMultiplier;
  let imageHeight = height * heightMultiplier;

  if (!isFullScreen) {
    imageWidth = 50;
    imageHeight = 48;
  }

  return (
    <View
      style={{width: imageWidth, height: imageHeight}}
      className={clsx(!isFullScreen && 'mt-[3px]')}>
      <Pressable
        android_ripple={{
          color: '#00000096',
          borderless: false,
          foreground: true,
        }}>
        {isLoading && (
          // Display a loading indicator (e.g., a spinner) while the image is loading
          <ActivityIndicator size="large" />
        )}
        {isError ? (
          // Display the default image when there is an error loading the image
          <Image
            style={{width: imageWidth, height: imageHeight}}
            source={{uri: defaultImage}}
          />
        ) : (
          // Display the image when it's loaded successfully
          <Image
            source={{uri: url}}
            onLoad={handleLoad}
            onError={handleError}
            borderRadius={borderRadius}
            className="w-full h-full"
          />
        )}
      </Pressable>
    </View>
  );
};

export default ImageComponent;
