import {imageProps} from '../types/Reusable';
export const BASE_URL = 'https://saavn.me';

export const ImageSelector = (data: imageProps[]) => {
  console.log(data);
  if (data.length > 0) {
    return data[0].link;
  } else {
    return '';
  }
};
