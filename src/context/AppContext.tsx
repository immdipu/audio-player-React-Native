import React, {createContext, useContext, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {getPermission} from '../utils/Permisson';

interface IAppContext {
  audios: any[];
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  useEffect(() => {
    const isPermitted = async () => {
      const permission = await getPermission();
      return permission as string;
    };
    isPermitted().then(res => {
      console.log(res);
      if (res === 'granted') {
        RNFS.readDir(RNFS.ExternalStorageDirectoryPath).then(result => {
          let audioFiles: any = [];

          result.forEach((item: any) => {
            if (
              item.name.endsWith('.mp3') ||
              item.name.endsWith('.m4a') ||
              item.name.endsWith('.wav') ||
              item.name.endsWith('.aac')
            ) {
              audioFiles.push(item);
            }
          });
          console.log(audioFiles);
        });
      }
    });
  });

  return (
    <AppContext.Provider value={{audios: []}}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
