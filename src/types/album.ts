import {imageProps} from './Reusable';
import {PrimaryArtistProps} from './Reusable';

export interface AlbumTypes {
  id: string;
  name: string;
  year: string;
  type: string;
  language: string;
  url: string;
  primaryArtists: PrimaryArtistProps[];
  featuredArtists: PrimaryArtistProps[];
  artists: PrimaryArtistProps[];
  image?: imageProps[];
}
