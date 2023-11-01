import {imageProps} from './Reusable';

export interface playlistTypes {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  type: string;
  image: imageProps[];
  url: string;
  songCount: string;
  firstname: string;
  followerCount: string;
  lastUpdated: string;
}
