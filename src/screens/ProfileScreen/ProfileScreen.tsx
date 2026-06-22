import React from 'react';
import { View, Text, Image, ScrollView, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { styles } from './ProfileScreen.style'; 


const USER = {
  name: 'Mayara Rodrigues',
  username: '@mayara.plants',
  bio: 'Explorando e registrando a natureza ao meu redor 🌱',
  plantsCount: 24,
  mappedLocations: 10,
  postsCount: 18,
};

const LAST_REGISTERS = [
  {
    id: '1',
    plantName: 'Ipê Amarelo',
    location: 'Parque Ambiental',
    date: '21/06/2026',
  },
  {
    id: '2',
    plantName: 'Orquídea',
    location: 'Jardim Botânico',
    date: '19/06/2026',
  },
  {
    id: '3',
    plantName: 'Samambaia',
    location: 'Praça Central',
    date: '17/06/2026',
  },
];

function StatCard({
  icon,
  number,
  label,
}: {
  icon: React.ReactNode;
  number: string | number;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

function RegisterCard({
  plantName,
  location,
  date,
}: {
  plantName: string;
  location: string;
  date: string;
}) {
  return (
    <View style={styles.registerCard}>
        <MaterialCommunityIcons name="leaf" size={28} color="#2E7D32" />
      

      <View style={styles.registerContent}>
        <Text style={styles.registerTitle}>{plantName}</Text>
        <Text style={styles.registerLocation}>📍 {location}</Text>
        <Text style={styles.registerDate}>{date}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Perfil</Text>

            <Pressable style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={22} color="#1E293B" />
            </Pressable>
          </View>

          {/* Profile card */}
          <View style={styles.profileCard}>

            <Text style={styles.userName}>{USER.name}</Text>
            <Text style={styles.userUsername}>{USER.username}</Text>
            <Text style={styles.userBio}>{USER.bio}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatCard
              icon={<MaterialCommunityIcons name="leaf" size={22} color="#2E7D32" />}
              number={USER.plantsCount}
              label="Plantas"
            />

            <StatCard
              icon={<Ionicons name="location-outline" size={22} color="#2E7D32" />}
              number={USER.mappedLocations}
              label="Locais"
            />

            <StatCard
              icon={<Ionicons name="document-text-outline" size={22} color="#2E7D32" />}
              number={USER.postsCount}
              label="Posts"
            />
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações rápidas</Text>

            <View style={styles.actionsGrid}>
              <ActionButton
                label="Minhas plantas"
                icon={<MaterialCommunityIcons name="sprout" size={22} color="#2E7D32" />}
              />

              <ActionButton
                label="Meu mapa"
                icon={<Ionicons name="map-outline" size={22} color="#2E7D32" />}
              />

              <ActionButton
                label="Editar perfil"
                icon={<Ionicons name="create-outline" size={22} color="#2E7D32" />}
              />

              <ActionButton
                label="Configurações"
                icon={<Ionicons name="settings-outline" size={22} color="#2E7D32" />}
              />
            </View>
          </View>

          {/* Last registers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Últimos registros</Text>

            {LAST_REGISTERS.map((item) => (
              <RegisterCard
                key={item.id}
                plantName={item.plantName}
                location={item.location}
                date={item.date}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}