import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreeen/HomeScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

import { colors } from '../style/colors';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Ícone (emoji) e rótulo de cada aba, na ordem do mockup
const TAB_META: Record<keyof MainTabParamList, { label: string; icon: string }> = {
  Home: { label: 'Home', icon: '🏠' },
  Map: { label: 'Mapa', icon: '🗺️' },
  Camera: { label: 'Câmera', icon: '📷' },
  History: { label: 'Histórico', icon: '🕑' },
  Profile: { label: 'Perfil', icon: '👤' },
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || 8 }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const meta = TAB_META[route.name as keyof MainTabParamList];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} style={styles.tabItem} onPress={onPress} hitSlop={4}>
            <Text style={styles.tabEmoji}>{meta.icon}</Text>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabEmoji: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textMutedLight,
  },
  tabLabelActive: {
    color: colors.greenStrong,
    fontWeight: '700',
  },
});
