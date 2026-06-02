import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navegation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
