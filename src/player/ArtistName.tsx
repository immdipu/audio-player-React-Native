import {View, Text} from 'react-native';
import React, {memo} from 'react';
import clsx from 'clsx';
import he from 'he';
import {useAppSelector} from '../redux/hooks';

const ArtistName = memo(({isExpanded}: {isExpanded: boolean}) => {
  const {currentTrack} = useAppSelector(state => state.player);
  let artistName = he.decode(currentTrack?.artist || '');
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      className={clsx(
        '  tracking-wide ',
        isExpanded
          ? 'font-normal text-neutral-200 text-base text-center'
          : 'text-xs text-start text-neutral-400',
      )}>
      {artistName
        ? artistName.length > 30
          ? artistName.slice(0, 30) + '...'
          : artistName
        : 'Unknown'}
    </Text>
  );
});

export default ArtistName;
