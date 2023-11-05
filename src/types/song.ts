import {PrimaryArtistProps, imageProps} from './Reusable';

interface albumProps {
  id: string;
  name: string;
  url: string;
}

export interface downloadUrlProps {
  quality: string;
  link: string;
}

export interface songTypes {
  id: string;
  name: string;
  album: albumProps;
  year: string;
  type: string;
  releaseDate: string;
  duration: string;
  lable: string;
  primaryArtists: string;
  featuredArtists: PrimaryArtistProps[];
  playCount: string;
  language: string;
  url: string;
  image: imageProps[];
  downloadUrl: downloadUrlProps[];
}

export interface songQueueTypes {
  artist: string;
  duration: string;
  id?: string;
  url: string;
  title: string;
  artwork: string;
}
