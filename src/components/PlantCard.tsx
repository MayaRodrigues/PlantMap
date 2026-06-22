import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { styles } from './PlantCard.styles';

export type FeedPost = {
  id: string;
  user: string;
  avatar: string;
  location: string;
  plantName: string;
  scientificName?: string;
  confidence?: number;
  imageUri?: string;
  disease?: string | null;
  isHealthy?: boolean | null;
  latitude?: number;
  longitude?: number;
  likes: number;
  comments: number;
};

type FeedCardProps = {
  post: FeedPost;
};

export default function FeedCard({ post }: FeedCardProps) {
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

      {post.imageUri ? (
        <Image source={{ uri: post.imageUri }} style={styles.feedPhotoImage} />
      ) : (
        <View style={styles.feedPhoto}>
          <Text style={styles.feedPhotoIcon}>🌿</Text>
        </View>
      )}

      <View>
        <Text style={styles.feedPlantName}>{post.plantName}</Text>

        {post.scientificName ? (
          <Text style={styles.feedScientificName}>{post.scientificName}</Text>
        ) : null}

        {post.confidence != null && (
          <Text style={styles.feedConfidence}>
            Identificação: {post.confidence}%
          </Text>
        )}

        {post.disease ? (
          <Text style={styles.feedDisease}>🦠 {post.disease}</Text>
        ) : post.isHealthy ? (
          <Text style={styles.feedHealthy}>🌿 Planta saudável</Text>
        ) : null}
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
