import {Text, View, Pressable, useWindowDimensions} from 'react-native';
import React from 'react';
import {songQueueTypes} from '../../types/song';
import ImageComponent from '../../component/Image';
import HTML from 'react-native-render-html';

interface SongCardProps extends songQueueTypes {
  handlePlay: (songIndex: number) => void;
  index: number;
}
const QueueSongCard: React.FC<SongCardProps> = ({
  id,
  artist,
  artwork,
  duration,
  title,
  url,
  index,
  handlePlay,
}) => {
  const {width} = useWindowDimensions();

  const handlePress = () => {
    handlePlay(index);
  };

  return (
    <View
      style={{width: width - 13}}
      className="overflow-hidden mx-auto rounded-lg">
      <Pressable
        className="flex flex-row py-3 px-2  rounded-lg  "
        onPress={handlePress}
        android_ripple={{
          color: '#61605c',
          borderless: false,
        }}>
        <ImageComponent
          url={artwork ? artwork : null}
          widthMultiplier={0.15}
          heightMultiplier={0.065}
          borderRadius={5}
        />
        <View className="flex-col ml-3  justify-start  flex-1">
          <View className=" -translate-y-3">
            <HTML
              contentWidth={width}
              baseStyle={{height: 30, margin: 0, padding: 0}}
              source={{
                html: `<p style="font-size:16px; font-weight:500; color:#ffffff;border:2px margin:0; height:30px">${
                  title.length > 30 ? title.substring(0, 30) + '...' : title
                }</p>`,
              }}
            />
          </View>
          <Text className="-translate-y-1">
            {artist.length > 30 ? artist.substring(0, 30) + '...' : artist}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default QueueSongCard;
