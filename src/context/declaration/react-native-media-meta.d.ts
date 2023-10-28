// react-native-media-meta.d.ts

declare module 'react-native-media-meta' {
  interface MediaMetaResponse {
    title: string;
    artist: string;
    album: string;
    genre: string;
    duration: number;
    // Add more fields as needed
  }

  const MediaMeta: {
    get(filePath: string): Promise<MediaMetaResponse>;
    // Add other functions provided by react-native-media-meta
  };

  export default MediaMeta;
}
