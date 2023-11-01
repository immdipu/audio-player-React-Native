import {imageProps} from '../types/Reusable';
export const BASE_URL = 'https://saavn.me';

export const ImageSelector = (data: imageProps[]) => {
  if (data.length > 0) {
    return data[data.length - 1].link;
  } else {
    return '';
  }
};
