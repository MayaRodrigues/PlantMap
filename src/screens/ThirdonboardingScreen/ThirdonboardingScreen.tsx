import React from 'react';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../style/colors';
import { styles } from './ThirdonboardingScreen.styles';
import { RootStackParamList } from '../../navegation/types';

const logoSource = require('../../../assets/logo.png');
const iconSource = require('../../../assets/icon/mapa.png');
const leafSource = require('../../../assets/icon/planta.png');

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Thirdonboarding'>;

export default function ThirdonboardingScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <LinearGradient
      colors={[colors.greenDarkTop, colors.greenDarkBottom]}
      style={styles.gradient}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <Image
        source={leafSource}
        style={styles.leafBackground}
        resizeMode="contain"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Image
              source={logoSource}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandText}>PlantMap AI</Text>
        </View>

        <View>
          <View style={styles.bottomBlock}>
            <View style={styles.smallLeafBadge}>
              <Image
                source={iconSource}
                style={styles.smallLeafImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.eyebrow}>MAPEIE</Text>
            <Text style={styles.title}>Marque onde encontrou</Text>
            <Text style={styles.subtitle}>
              Cada descoberta vira um ponto no seu mapa 
              e na sua coleção pessoal.
            </Text>

            <View style={styles.footerRow}>
              <View style={styles.dotsRow}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dotActive} />
              </View>

              <Pressable
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.primaryButtonText}>Próximo</Text>
                <Text style={styles.primaryButtonText}>›</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.skipWrap}
            onPress={() => navigation.navigate('Home')}
            hitSlop={12}
          >
            <Text style={styles.skipText}>Pular</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
