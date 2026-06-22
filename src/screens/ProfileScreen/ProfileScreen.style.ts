import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F3',
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    backgroundColor: '#E5E7EB',
  },

  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },

  userUsername: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },

  userBio: {
    marginTop: 10,
    textAlign: 'center',
    color: '#475569',
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
  },

  statIcon: {
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  actionIcon: {
    marginBottom: 8,
  },

  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },

  registerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },

  registerImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerContent: {
    flex: 1,
  },

  registerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },

  registerLocation: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 13,
  },

  registerDate: {
    marginTop: 4,
    color: '#94A3B8',
    fontSize: 12,
  },
});