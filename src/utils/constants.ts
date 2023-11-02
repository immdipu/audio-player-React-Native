import {Track} from 'react-native-track-player';
import {imageProps} from '../types/Reusable';
export const BASE_URL = 'https://saavn.me';
import {songTypes, downloadUrlProps} from '../types/song';

export const ImageSelector = (data: imageProps[]) => {
  if (data.length > 0) {
    return data[data.length - 1].link;
  } else {
    return '';
  }
};

export const LinkSelector = (data: downloadUrlProps[]) => {
  if (data.length > 0) {
    return data[data.length - 1].link;
  } else {
    return '';
  }
};

export const ConvertAudioMetaData = (data: songTypes[]): Track[] => {
  return data.map(item => {
    return {
      id: item.id,
      title: item.name,
      artist: item.primaryArtists,
      artwork: ImageSelector(item.image),
      url: LinkSelector(item.downloadUrl),
      duration: Number(item.duration),
    };
  });
};
