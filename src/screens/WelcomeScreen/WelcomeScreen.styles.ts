import { StyleSheet } from 'react-native';
import { colors } from '../../style/colors';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },

  // ---- Topo: logo + nome ----
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 22,
    height: 22,
  },
  brandText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // ---- Folha decorativa de fundo ----
  leafBackground: {
    position: 'absolute',
    top: 40,
    right: -60,
    width: 320,
    height: 420,
    opacity: 0.18,
  },

  // ---- Bloco inferior de texto ----
  bottomBlock: {
    gap: 16,
  },
  smallLeafBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  smallLeafImage: {
    width: 24,
    height: 24,
  },
  eyebrow: {
    color: colors.greenAccent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },

  // ---- Linha de paginação + botão ----
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dotInactive,
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dotActive,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.greenButton,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: colors.greenButtonText,
    fontWeight: '700',
    fontSize: 15,
  },

  // ---- Rodapé "Pular" ----
  skipWrap: {
    alignItems: 'center',
    marginTop: 16,
  },
  skipText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
