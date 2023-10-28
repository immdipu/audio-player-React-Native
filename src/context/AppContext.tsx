import React, {createContext, useContext, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {getPermission} from '../utils/Permisson';
import {getAllAudios} from '../utils/FileExplorer';

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
        const mainDirectory = RNFS.ExternalStorageDirectoryPath;
      }
    });
  });

  return (
    <AppContext.Provider value={{audios: []}}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
