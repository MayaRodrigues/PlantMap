import React from 'react';
import { View, Text, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons  from '@expo/vector-icons/Ionicons';

import { styles } from './HomeScreen.styles';
import FeedCard, { FeedPost } from '../../components/PlantCard';
import { usePlants } from '../../context/PlantContext';

const logoSource = require('../../../assets/logo.png');

const FEED: FeedPost[] = [
  {
    id: '1',
    user: 'Maria Silva',
    avatar: '👩',
    location: 'Parque Ambiental',
    plantName: 'Ipê Amarelo',
    confidence: 97,
    likes: 12,
    comments: 4,
  },
  {
    id: '2',
    user: 'João Santos',
    avatar: '👨',
    location: 'Jardim Botânico',
    plantName: 'Orquídea',
    likes: 20,
    comments: 7,
  },
];

function StatItem({
  emoji,
  number,
  label,
}: {
  emoji: string;
  number: string;
  label: string;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <View>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { posts } = usePlants();
  const feed = [...posts, ...FEED];

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

          {/* Quote */}
          <View style={[styles.card, styles.quoteCard]}>
            <Pressable style={styles.quoteIcon}>
              <Ionicons name="leaf" size={24} color="#2E9E5B" />
            </Pressable>
            <Text style={styles.quoteText}>
              "Cada planta conta uma história. Explore, registre e preserve a natureza ao
              seu redor."
            </Text>
          </View> 

          {/* Section divider */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>Feed da Comunidade</Text>
            <View style={styles.sectionLine} />
          </View>

          {/* Feed */}
          {feed.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}