import {Text, View, Pressable, useWindowDimensions} from 'react-native';
import React from 'react';
import {songTypes} from '../../types/song';
import ImageComponent from '../../component/Image';
import {ImageSelector} from '../../utils/constants';
import HTML from 'react-native-render-html';
import {IRecentSong} from '../../types/storageTypes';
import {useAppDispatch} from '../../redux/hooks';
import {AddRecentSong} from '../../redux/slice/playerSlice';

interface SongCardProps extends songTypes {
  Index?: number;
  handlePlay: (SongId: string) => void;
}
const SongCard: React.FC<SongCardProps> = ({
  id,
  name,
  image,
  primaryArtists,
  duration,
  downloadUrl,
  handlePlay,
}) => {
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const handlePress = () => {
    handlePlay(id);
    let song: IRecentSong = {
      id: id,
      title: name,
      artist: primaryArtists,
      artwork: image[image.length - 1].link,
      duration: duration,
      url: downloadUrl[downloadUrl.length - 1].link,
    };
    dispatch(AddRecentSong(song));
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
          url={image ? ImageSelector(image) : null}
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
                  name.length > 30 ? name.substring(0, 30) + '...' : name
                }</p>`,
              }}
            />
          </View>
          <Text className="-translate-y-1">
            {primaryArtists.length > 30
              ? primaryArtists.substring(0, 30) + '...'
              : primaryArtists}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SongCard;
