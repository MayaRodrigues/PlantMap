import React from 'react';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../style/colors';
import { styles } from './WelcomeScreen.styles';
import { RootStackParamList } from '../../navegation/types';

const logoSource = require('../../../assets/logo.png');
const leafSource = require('../../../assets/icon/planta.png');

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
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
                source={logoSource}
                style={styles.smallLeafImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.eyebrow}>IDENTIFIQUE</Text>
            <Text style={styles.title}>Que planta é essa?</Text>
            <Text style={styles.subtitle}>
              Aponte a câmera para qualquer folha, flor ou árvore e descubra o
              nome na hora.
            </Text>

            <View style={styles.footerRow}>
              <View style={styles.dotsRow}>
                <View style={styles.dotActive} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>

              <Pressable
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Onboarding')}
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
