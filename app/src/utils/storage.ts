import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const data = await JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    // saving error
  }
};
export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data == null ? null : JSON.parse(data);
  } catch (e) {
    // error reading value
  }
};
export const removeAll = async () => {
  try {
    await AsyncStorage.removeItem('jwt-token');
  } catch (e) {
    // error reading value
  }
};
