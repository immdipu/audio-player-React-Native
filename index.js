import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AppContextProvider} from './src/context/AppContext';
import TrackPlayer from 'react-native-track-player';
import {PlayerService} from './src/player/service';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastProvider} from 'react-native-toast-notifications';

const queryClient = new QueryClient();

export default function Main() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <AppContextProvider>
            {/* <GestureHandlerRootView style={{flex: 1}}> */}
            <ToastProvider>
              <App />
            </ToastProvider>
            {/* </GestureHandlerRootView> */}
          </AppContextProvider>
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => PlayerService);
