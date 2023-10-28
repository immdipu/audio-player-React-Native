import RNFS from 'react-native-fs';

export const getAllAudios = async (path: string): Promise<any[]> => {
  let audiosFiles: any[] = [];
  const directoryContents = await RNFS.readDir(path);
  for (const item of directoryContents) {
    if (
      item.isFile() &&
      (item.name.endsWith('mp3') || item.name.endsWith('m4a'))
    ) {
      audiosFiles.push(item);
    } else if (item.isDirectory()) {
      const subDirectoryFiles = await getAllAudios(item.path);
      audiosFiles.push(...subDirectoryFiles);
    }
  }
  return audiosFiles;
};
