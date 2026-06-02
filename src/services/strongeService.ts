import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@plantmap_records';

export async function savePlant(plant: any) {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  const plants = data ? JSON.parse(data) : [];

  plants.push(plant);

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(plants)
  );
}

export async function getPlants() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}