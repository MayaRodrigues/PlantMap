import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import ThirdonboardingScreen from '../screens/ThirdonboardingScreen/ThirdonboardingScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import MainTabs from './MainTabs';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  // Tela inicial: 'Home' se o onboarding já foi concluído (lido do AsyncStorage),
  // ou 'Welcome' na primeira vez que o app é aberto.
  initialRoute: keyof RootStackParamList;
};

export default function RootNavigator({ initialRoute }: RootNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Thirdonboarding" component={ThirdonboardingScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
