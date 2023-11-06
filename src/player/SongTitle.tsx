import {View, Text, Animated} from 'react-native';
import React, {memo} from 'react';
import clsx from 'clsx';
import {useAppSelector} from '../redux/hooks';
import {useAppContext} from '../context/AppContext';
import he from 'he';

const SongTitle = memo(({TextFont}: {TextFont: any}) => {
  const player = useAppSelector(state => state.player);
  const {isExpanded} = useAppContext();

  let title = he.decode(player?.currentTrack?.title || '');

  return (
    <Animated.Text
      style={{
        fontSize: TextFont,
      }}
      numberOfLines={1}
      ellipsizeMode="tail"
      className={clsx(
        'text-white font-medium tracking-tighter',
        isExpanded ? 'mr-0 font-semibold mt-10' : 'mr-36',
      )}>
      {title.length > 30 ? title.substring(0, 30) + '...' : title}
    </Animated.Text>
  );
});

export default SongTitle;
