import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navegation/RootNavigator';
import { PlantProvider } from './src/context/PlantContext';
import { initDatabase } from './src/database/squilite';

export default function App() {
  useEffect(() => {
    initDatabase().catch((error) =>
      console.log('Erro ao iniciar banco de dados:', error)
    );
  }, []);

  return (
    <SafeAreaProvider>
      <PlantProvider>
        <RootNavigator />
      </PlantProvider>
    </SafeAreaProvider>
  );
}
