import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRecentSong} from '../types/storageTypes';

export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
  }
};

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    // error reading value
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const RecentSongAdd = async (value: IRecentSong) => {
  try {
    const data = await getObject('RecentSong');
    if (data) {
      let alreadyExist = data.find((item: any) => item.id === value.id);
      if (alreadyExist) {
        let newdata = data.filter((item: any) => item.id !== value.id);
        newdata.unshift(value);
      } else {
        if (data.length > 100) {
          data.pop();
          data.unshift(value);
        } else {
          data.unshift(value);
        }
      }
    } else {
      await storeObject('RecentSong', [value]);
    }
  } catch (error) {
    console.log(error);
  }
};
