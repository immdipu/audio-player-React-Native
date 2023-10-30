import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AppContextProvider} from './src/context/AppContext';
import TrackPlayer from 'react-native-track-player';
import {PlayerService} from './src/player/service';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Main() {
  return (
    <PaperProvider>
      <AppContextProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <App />
        </GestureHandlerRootView>
      </AppContextProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => PlayerService);
