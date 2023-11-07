import RNFS from 'react-native-fs';

const ignoredFolders = ['Android', 'iOS', 'Pictures', 'Movies', 'DCIM', 'MIUI'];

let audiosFiles: any[] = [];
export const getAllAudios = async (path: string): Promise<any[]> => {
  const directoryContents = await RNFS.readDir(path);
  const promises = directoryContents.map(async item => {
    if (ignoredFolders.includes(item.name) || item.name.startsWith('.')) {
      return;
    } else {
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
  });
  await Promise.all(promises);
  console.log('audiosFiles', audiosFiles.slice(0, 10));
};
