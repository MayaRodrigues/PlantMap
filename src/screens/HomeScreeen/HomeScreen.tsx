import React from 'react';
import { View, Text, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './HomeScreen.styles';

const logoSource = require('../../../assets/logo.png');

type FeedPost = {
  id: string;
  user: string;
  avatar: string;
  location: string;
  plantName: string;
  confidence?: number;
  likes: number;
  comments: number;
};

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

function StatItem({ emoji, number, label }: { emoji: string; number: string; label: string }) {
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

function FeedCard({ post }: { post: FeedPost }) {
  return (
    <View style={[styles.card, styles.feedCard]}>
      <View style={styles.feedHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.avatar}</Text>
        </View>
        <View>
          <Text style={styles.feedUser}>{post.user}</Text>
          <Text style={styles.feedLocation}>📍 {post.location}</Text>
        </View>
      </View>

      <View style={styles.feedPhoto}>
        <Text style={styles.feedPhotoIcon}>🌿</Text>
      </View>

      <View>
        <Text style={styles.feedPlantName}>{post.plantName}</Text>
        {post.confidence != null && (
          <Text style={styles.feedConfidence}>Identificação: {post.confidence}%</Text>
        )}
      </View>

      <View style={styles.feedStats}>
        <Pressable style={styles.feedStat} hitSlop={8}>
          <Text>❤️</Text>
          <Text style={styles.feedStatText}>{post.likes}</Text>
        </Pressable>
        <Pressable style={styles.feedStat} hitSlop={8}>
          <Text>💬</Text>
          <Text style={styles.feedStatText}>{post.comments}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
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
                <Text style={styles.iconText}>🔔</Text>
              </Pressable>
              <Pressable style={styles.iconButton} hitSlop={8}>
                <Text style={styles.iconText}>👤</Text>
              </Pressable>
            </View>
          </View>

          {/* Quote */}
          <View style={[styles.card, styles.quoteCard]}>
            <Text style={styles.quoteIcon}>🌿</Text>
            <Text style={styles.quoteText}>
              "Cada planta conta uma história. Explore, registre e preserve a natureza ao
              seu redor."
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.card}>
            <Text style={styles.statsTitle}>📊 SUAS ESTATÍSTICAS</Text>
            <View style={styles.statsRow}>
              <StatItem emoji="🌱" number="25" label="plantas registradas" />
              <StatItem emoji="📍" number="18" label="locais mapeados" />
            </View>
          </View>

          {/* Section divider */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>Feed da Comunidade</Text>
            <View style={styles.sectionLine} />
          </View>

          {/* Feed */}
          {FEED.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
