import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../style/colors';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.emoji}>🕑</Text>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.subtitle}>Suas identificações anteriores — em construção.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  emoji: { fontSize: 48 },
  title: { color: colors.textDark, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.textGray, fontSize: 14, textAlign: 'center' },
});
