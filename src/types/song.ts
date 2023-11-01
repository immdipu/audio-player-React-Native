import {PrimaryArtistProps, imageProps} from './Reusable';

interface albumProps {
  id: string;
  name: string;
  url: string;
}

export interface songProps {
  id: string;
  name: string;
  album: albumProps;
  year: string;
  type: string;
  releaseDate: string;
  duration: string;
  lable: string;
  primaryArtists: PrimaryArtistProps[];
  featuredArtists: PrimaryArtistProps[];
  playCount: string;
  language: string;
  url: string;
  image: imageProps[];
}
