import {View, Text, Animated} from 'react-native';
import React, {memo} from 'react';
import clsx from 'clsx';
import {useAppSelector} from '../redux/hooks';
import {useAppContext} from '../context/AppContext';

const SongTitle = memo(({TextFont}: {TextFont: any}) => {
  const player = useAppSelector(state => state.player);
  const {isExpanded} = useAppContext();
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
      {player?.currentTrack?.title}
    </Animated.Text>
  );
});

export default SongTitle;
