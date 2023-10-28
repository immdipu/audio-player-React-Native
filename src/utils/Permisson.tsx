import {Alert} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export const getPermission = () => {
  return new Promise((resolve, reject) => {
    request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO).then(result => {
      if (result === 'granted') {
        return resolve('granted');
      } else {
        Alert.alert(
          'Audio Access Required',
          "To enjoy the full experience, this app needs access to your device's audio.",
          [
            {
              text: 'Grant Permission',
              onPress: () => getPermission(),
            },
            {
              text: 'Not Now',
            },
          ],
        );
        return reject('denied');
      }
    });
  });
};
