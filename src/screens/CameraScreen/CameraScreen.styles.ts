import { StyleSheet } from 'react-native';
import { colors } from '../../style/colors';

export const styles = StyleSheet.create({
  // ----- câmera ao vivo -----
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  hint: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingBottom: 24,
  },
  sideButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  sideIcon: {
    fontSize: 22,
  },
  shutter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },

  // ----- pré-visualização da foto -----
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  previewActions: {
    padding: 20,
    gap: 12,
    backgroundColor: '#000000',
  },
  previewButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
  },
  analyzingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 40,
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  analyzingText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // ----- resultado da análise -----
  resultContainer: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  resultContent: {
    padding: 20,
    gap: 16,
  },
  resultImage: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
  },
  resultCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 18,
    gap: 6,
  },
  resultPlantName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
  },
  resultScientific: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.textGray,
  },
  resultConfidence: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 4,
  },
  resultDisease: {
    fontSize: 15,
    fontWeight: '600',
    color: '#B91C1C',
    marginTop: 8,
  },
  resultHealthy: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.greenStrong,
    marginTop: 8,
  },
  resultNeutral: {
    fontSize: 14,
    color: colors.textMutedLight,
    marginTop: 8,
  },
  notPlantEmoji: {
    fontSize: 40,
    textAlign: 'center',
  },
  notPlantTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
  },
  notPlantText: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 12,
  },
  galleryLink: {
    marginTop: 12,
    paddingVertical: 8,
  },
  galleryLinkText: {
    color: colors.greenStrong,
    fontSize: 15,
    fontWeight: '600',
  },

  // ----- permissão -----
  centered: {
    flex: 1,
    backgroundColor: colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 10,
  },
  permissionEmoji: {
    fontSize: 48,
  },
  permissionTitle: {
    color: colors.textDark,
    fontSize: 22,
    fontWeight: '700',
  },
  permissionText: {
    color: colors.textGray,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },

  // ----- botões compartilhados -----
  primaryButton: {
    backgroundColor: colors.greenStrong,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  secondaryButtonText: {
    color: '#2E9E5B',
    fontSize: 15,
    fontWeight: '700',
  },
});
