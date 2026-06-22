import { StyleSheet } from 'react-native';
import { colors } from '../../style/colors';

export const styles = StyleSheet.create({
container: {
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
statsTitle: {
    color: colors.textGray,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 14,
},
statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
},
statEmoji: {
    fontSize: 22,
},
statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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

});