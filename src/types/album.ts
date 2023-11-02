import {imageProps} from './Reusable';
import {PrimaryArtistProps} from './Reusable';
import {songTypes} from './song';

export interface AlbumTypes {
  id: string;
  name: string;
  title?: string;
  year: string;
  releaseDate: string;
  type: string;
  language: string;
  songCount: number;
  url: string;
  primaryArtists: PrimaryArtistProps[];
  featuredArtists: PrimaryArtistProps[];
  artists: PrimaryArtistProps[];
  image?: imageProps[];
  songs: songTypes[];
}
