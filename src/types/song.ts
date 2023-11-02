import {PrimaryArtistProps, imageProps} from './Reusable';

interface albumProps {
  id: string;
  name: string;
  url: string;
}

interface downloadUrlProps {
  quality: string;
  url: string;
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
