import React, {createContext, useContext, useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {getPermission} from '../utils/Permisson';
import {getAllAudios} from '../utils/FileExplorer';

interface IAppContext {
  audios?: any[];
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext>({
  isExpanded: false,
  setIsExpanded: () => {},
});

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const isPermitted = async () => {
      const permission = await getPermission();
      if (permission === 'granted') {
        const mainDirectory = RNFS.ExternalStorageDirectoryPath;
        const audios = await getAllAudios(mainDirectory);
      }
      // return permission as string;
    };

    isPermitted();

    // isPermitted().then(res => {
    //   if (res === 'granted') {
    //     const mainDirectory = RNFS.ExternalStorageDirectoryPath;
    //     const audios = getAllAudios(mainDirectory);
    //     console.log(audios);
    //   }
    // });
  });

  return (
    <AppContext.Provider value={{isExpanded, setIsExpanded}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
