import AsyncStorage from '@react-native-async-storage/async-storage';

// Persistência local simples (AsyncStorage): guarda preferências leves que não
// precisam de banco relacional. Aqui usamos para lembrar se o usuário já passou
// pelo onboarding, evitando mostrar as telas de boas-vindas toda vez.
const ONBOARDING_KEY = '@plantmap_onboarding_done';

// Marca o onboarding como concluído (chamado ao fim das telas de boas-vindas).
export async function setOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
}

// Lê se o usuário já concluiu o onboarding. Em caso de erro de leitura,
// assume que não concluiu para não travar quem está abrindo pela 1ª vez.
export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.log('Erro ao ler onboarding do AsyncStorage:', error);
    return false;
  }
}
