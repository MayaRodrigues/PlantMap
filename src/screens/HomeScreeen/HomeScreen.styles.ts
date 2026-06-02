import { StyleSheet } from 'react-native';
import { colors } from '../../style/colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },

  // ---- Header ----
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.chipBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 22,
    height: 22,
  },
  brandText: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.chipBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },

  // ---- Card base ----
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // ---- Quote card ----
  quoteCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: colors.chipBgLight,
    borderColor: 'transparent',
  },
  quoteIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  quoteText: {
    flex: 1,
    color: colors.textDark,
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // ---- Stats card ----
  statsTitle: {
    color: colors.textGray,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statEmoji: {
    fontSize: 22,
  },
  statNumber: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMutedLight,
    fontSize: 12,
    lineHeight: 16,
  },

  // ---- Section divider ----
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  sectionTitle: {
    color: colors.textGray,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ---- Feed card ----
  feedCard: {
    gap: 12,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.chipBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  feedUser: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '600',
  },
  feedLocation: {
    color: colors.textMutedLight,
    fontSize: 12,
    marginTop: 2,
  },
  feedPhoto: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.chipBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedPhotoIcon: {
    fontSize: 40,
    opacity: 0.45,
  },
  feedPlantName: {
    color: colors.textDark,
    fontSize: 17,
    fontWeight: '700',
  },
  feedConfidence: {
    color: colors.greenStrong,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  feedStats: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
  },
  feedStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  feedStatText: {
    color: colors.textGray,
    fontSize: 13,
  },

  // ---- Bottom tab bar ----
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.greenDarkBottom,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabEmoji: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textMutedLight,
  },
  tabLabelActive: {
    color: colors.greenStrong,
    fontWeight: '700',
  },
});
