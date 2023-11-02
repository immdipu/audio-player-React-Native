import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

const SongImage = () => {
  const [isError, setError] = React.useState(false);
  const [ImageLink, setImageLink] = React.useState(null);

  return (
    <Image
      className="w-full h-full "
      defaultSource={require('../assets/disk.png')}
    />
  );
};

export default SongImage;
