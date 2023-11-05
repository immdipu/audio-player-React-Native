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

export const AudioDurationConverter = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
};
