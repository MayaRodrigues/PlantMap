import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7F4',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#355E3B',
  },

  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  locationButtonText: {
    fontSize: 24,
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  plantImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },

  plantName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 10,
  },

  plantInfo: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 8,
  },

  closeButton: {
    marginTop: 18,
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // ---- Botão "Registrar aqui" ----
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1B4332',
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // ---- Formulário de novo ponto ----
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 4,
  },
  formHint: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    marginBottom: 14,
  },
  // ---- Busca por endereço ----
  addressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  addressInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  addressButton: {
    width: 48,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 15,
  },

  // ---- Foto opcional no formulário ----
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 14,
  },
  photoButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  photoPreview: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  removePhotoText: {
    color: '#B91C1C',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 14,
  },
});