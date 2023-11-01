import axios from '../axios/Instance';
import {AlbumTypes} from '../types/album';
import {playlistTypes} from '../types/playlist';
import {songTypes} from '../types/song';

interface trendingProps {
  songs: songTypes[];
  albums: AlbumTypes[];
}

interface HomedataProps {
  albums: AlbumTypes[];
  playlists: playlistTypes[];
  charts: playlistTypes[];
  trending: trendingProps;
}

export interface HomedataTypes {
  status: string;
  data: HomedataProps;
}

export const SongApi = {
  GetHomeData: async () => {
    try {
      const response = await axios.get('/home');
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
