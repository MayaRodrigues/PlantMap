import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navegation/RootNavigator';
import { PlantProvider } from './src/context/PlantContext';
import { initDatabase } from './src/database/squilite';
import { isOnboardingComplete } from './src/services/storageService';
import { RootStackParamList } from './src/navegation/types';

export default function App() {
  // só renderiza o app depois que (1) as tabelas do banco existem e (2) já
  // sabemos a rota inicial (lida do AsyncStorage). Enquanto isso é null,
  // mostramos o loading. Isso evita que telas/contexto leiam ou gravem antes
  // do banco estar pronto.
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    async function boot() {
      try {
        await initDatabase();
      } catch (error) {
        console.log('Erro ao iniciar banco de dados:', error);
        // se o banco não inicializou, NADA será salvo — mostra o motivo
        Alert.alert(
          'Erro ao iniciar o banco de dados',
          String(error instanceof Error ? error.message : error)
        );
      }

      // se o onboarding já foi concluído antes, pula direto para a Home;
      // caso contrário começa pelas telas de boas-vindas.
      const done = await isOnboardingComplete();
      setInitialRoute(done ? 'Home' : 'Welcome');
    }

    boot();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PlantProvider>
        <RootNavigator initialRoute={initialRoute} />
      </PlantProvider>
    </SafeAreaProvider>
  );
}
