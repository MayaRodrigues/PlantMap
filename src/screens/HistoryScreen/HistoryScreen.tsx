import React from 'react';
import { Text, View, StatusBar, ScrollView , Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HistoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const logoSource = require('../../../assets/logo.png');


function StatItem({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <View style={styles.statItem}>
      <View>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}
export default function HistoryScreen() {
  return (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />
              </View>
              <Text style={styles.brandText}>PlantMap AI</Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable style={styles.iconButton} hitSlop={8}>
                <Ionicons name="notifications" size={24} color="#ffdb28" />
              </Pressable>
              <Pressable style={styles.iconButton} hitSlop={8}>
                <Ionicons name="person" size={24} color="#000000" />
              </Pressable>
            </View>
          </View>

          {/* Stats */}
            <View style={styles.card}>
              <Ionicons name ="stats-chart-sharp" size={28} color="#2E7D32" />
              <Text style={styles.statsTitle}> SUAS ESTATÍSTICAS</Text>
              <View style={styles.statsRow}>
                <Ionicons name='flower-outline' size={24} color="#000000" />
                <StatItem  number="12" label="plantas mapeadas" />
                <Ionicons name='location-outline' size={24} color="#000000" />
                <StatItem  number="18" label="locais mapeados" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        
      </View>
      );
}
