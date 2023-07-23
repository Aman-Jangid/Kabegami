import AsyncStorage from "@react-native-async-storage/async-storage";

// add Data
const addArrayData = async (key, value) => {
  const previousData = await getData(key);

  previousData.push(value);

  await setData(key, previousData);
};

// set Local data
const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Failed to store ${key} in async storage : `, error);
  }
};

// get Local data
const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return null;
  } catch (error) {
    console.log(`Failed to get the value of ${key} : `, error);
  }
};

// delete Local data
const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Failed to remove data of ${key} : `, error);
  }
};

export default { setData, getData, deleteData, addArrayData };
