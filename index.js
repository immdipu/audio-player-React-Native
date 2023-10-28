import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AppContextProvider} from './src/context/AppContext';

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
