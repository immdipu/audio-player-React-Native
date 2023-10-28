import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AppContextProvider} from './src/context/AppContext';
import TrackPlayer from 'react-native-track-player';
import {PlayerService} from './src/player/service';

export default function Main() {
  return (
    <PaperProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => PlayerService);
