import React from 'react';
import { Text, View, StatusBar, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HistoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { usePlants } from '../../context/PlantContext';
import { FeedPost } from '../../components/PlantCard';

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

// Item da lista: uma planta já registrada no histórico.
function HistoryItem({ plant }: { plant: FeedPost }) {
  return (
    <View style={styles.historyItem}>
      {plant.imageUri ? (
        <Image source={{ uri: plant.imageUri }} style={styles.historyThumb} />
      ) : (
        <View style={[styles.historyThumb, styles.historyThumbPlaceholder]}>
          <Ionicons name="leaf" size={22} color="#2E7D32" />
        </View>
      )}

      <View style={styles.historyInfo}>
        <Text style={styles.historyName} numberOfLines={1}>
          {plant.plantName}
        </Text>

        {plant.scientificName ? (
          <Text style={styles.historyScientific} numberOfLines={1}>
            {plant.scientificName}
          </Text>
        ) : null}

        <View style={styles.historyMetaRow}>
          <Ionicons name="location-outline" size={14} color="#7a7a7a" />
          <Text style={styles.historyLocation} numberOfLines={1}>
            {plant.location}
          </Text>
        </View>
      </View>

      {plant.disease ? (
        <Ionicons name="bug-outline" size={20} color="#C62828" />
      ) : (
        <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
      )}
    </View>
  );
}

export default function HistoryScreen() {
  const { posts } = usePlants();

  const total = posts.length;
  const healthy = posts.filter((p) => !p.disease).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryItem plant={item} />}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerBlock}>
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
                <Ionicons name="stats-chart-sharp" size={28} color="#2E7D32" />
                <Text style={styles.statsTitle}> SUAS ESTATÍSTICAS</Text>
                <View style={styles.statsRow}>
                  <Ionicons name="flower-outline" size={24} color="#000000" />
                  <StatItem number={String(total)} label="plantas mapeadas" />
                  <Ionicons name="leaf-outline" size={24} color="#000000" />
                  <StatItem number={String(healthy)} label="plantas saudáveis" />
                </View>
              </View>

              <Text style={styles.listTitle}>Plantas registradas</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="leaf-outline" size={40} color="#bdbdbd" />
              <Text style={styles.emptyText}>
                Você ainda não registrou nenhuma planta.
              </Text>
              <Text style={styles.emptyHint}>
                Use a câmera para identificar e registrar sua primeira planta.
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
