import {Image} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '../redux/hooks';

const SongImage = () => {
  const [ImageLink, setImageLink] = React.useState<string | null>(null);
  const player = useAppSelector(state => state.player);

  useEffect(() => {
    if (player.currentTrack) {
      if (player.currentTrack.artwork) {
        setImageLink(player.currentTrack.artwork);
      } else {
        setImageLink(null);
      }
    }
  }, [player.currentTrack]);

  if (ImageLink) {
    return <Image className="w-full h-full " source={{uri: ImageLink}} />;
  } else {
    return (
      <Image
        className="w-full h-full "
        source={require('../assets/disk.png')}
      />
    );
  }
};

export default SongImage;
