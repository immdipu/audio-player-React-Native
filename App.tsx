import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';

import {
  Home,
  Album,
  Artist,
  Playlist,
  Trending,
  Search,
  MyMusic,
} from './src/screens';

import Player from './src/player/Player';

// export function StackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Home"
//         component={Home}
//       />
//       <Stack.Screen name="Artist" component={Artist} />
//       <Stack.Screen
//         name="Album"
//         options={{headerShown: false, presentation: 'modal'}}
//         component={Album}
//       />
//       <Stack.Screen
//         name="Playlist"
//         options={{headerShown: false}}
//         component={Playlist}
//       />
//     </Stack.Navigator>
//   );
// }

const App = () => {
  return <MainNavigation />;
};

export default App;
