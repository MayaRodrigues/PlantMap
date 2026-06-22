import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  feedCard: {
    gap: 14,
  },

  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DFF3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 20,
  },

  feedUser: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B4332',
  },

  feedLocation: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  feedPhoto: {
    height: 180,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  feedPhotoImage: {
    height: 200,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    width: '100%',
  },

  feedPhotoIcon: {
    fontSize: 42,
  },

  feedPlantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B4332',
  },

  feedScientificName: {
    marginTop: 2,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
  },

  feedConfidence: {
    marginTop: 4,
    fontSize: 13,
    color: '#4B5563',
  },

  feedDisease: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#B91C1C',
  },

  feedHealthy: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#2E9E5B',
  },

  feedStats: {
    flexDirection: 'row',
    gap: 18,
  },

  feedStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  feedStatText: {
    fontSize: 14,
    color: '#374151',
  },
});