import Instance from '../axios/Instance';
import {AlbumTypes} from '../types/album';
import {playlistTypes} from '../types/playlist';
import {songTypes} from '../types/song';

interface trendingProps {
  songs: songTypes[];
  albums: AlbumTypes[];
}

export interface HomedataProps {
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
  GetHomeData: async (): Promise<HomedataProps> => {
    try {
      const response = await Instance.get('/modules?language=hindi,english');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  getAlbumDetails: async (id: string): Promise<AlbumTypes> => {
    try {
      const response = await Instance.get(`albums?id=${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  getPlaylistDetails: async (id: string): Promise<AlbumTypes> => {
    try {
      const response = await Instance.get(`playlists?id=${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
