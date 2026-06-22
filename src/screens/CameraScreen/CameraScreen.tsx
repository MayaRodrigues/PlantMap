import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { styles } from './CameraScreen.styles';
import { colors } from '../../style/colors';
import { useCamera } from '../../hooks/useCamera';
import { usePlantAnalysis } from '../../hooks/usePlantAnalysis';
import { usePlants } from '../../context/PlantContext';
import { getCurrentUserLocation } from '../../services/locationService';

export default function CameraScreen() {
  const { addPost } = usePlants();

  const {
    cameraRef,
    permission,
    requestPermission,
    facing,
    toggleFacing,
    photo,
    isCapturing,
    takePhoto,
    pickFromGallery,
    retake,
  } = useCamera();

  const { analyzing, result, error, analyze, reset } = usePlantAnalysis();

  function handleRetake() {
    reset();
    retake();
  }

  async function handlePost() {
    if (!result?.isPlant || !photo) {
      return;
    }

    // captura o GPS para a planta aparecer no mapa (pode ser null se negar permissão)
    const coords = await getCurrentUserLocation();

    addPost({
      id: Date.now().toString(),
      user: 'Você',
      avatar: '🌱',
      location: 'Adicionado pela câmera',
      plantName: result.plantName,
      scientificName: result.scientificName,
      confidence: Math.round(result.confidence),
      imageUri: photo.uri,
      disease: result.disease,
      isHealthy: result.isHealthy,
      latitude: coords?.latitude,
      longitude: coords?.longitude,
      likes: 0,
      comments: 0,
    });

    // volta para a câmera para continuar analisando novas fotos
    handleRetake();
    Alert.alert('Publicado!', 'Sua planta foi adicionada ao feed. Você já pode analisar outra foto.');
  }

  // permissão ainda sendo carregada
  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.greenStrong} />
      </View>
    );
  }

  // permissão negada / ainda não concedida
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.permissionEmoji}>📷</Text>
        <Text style={styles.permissionTitle}>Precisamos da câmera</Text>
        <Text style={styles.permissionText}>
          Permita o acesso à câmera para identificar plantas pela foto.
        </Text>
        <Pressable style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryButtonText}>Permitir câmera</Text>
        </Pressable>
        <Pressable style={styles.galleryLink} onPress={pickFromGallery}>
          <Text style={styles.galleryLinkText}>Escolher da galeria</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // A câmera fica SEMPRE montada; a pré-visualização e o resultado aparecem
  // como camadas por cima. Assim o CameraView nunca é desmontado/remontado
  // (o que congelava a câmera ao voltar do resultado).
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

      {/* ----- controles da câmera ao vivo ----- */}
      {!photo && !result && (
        <SafeAreaView style={styles.overlay} pointerEvents="box-none">
          <View style={styles.topBar}>
            <Text style={styles.hint}>Aponte para a planta e toque para capturar</Text>
          </View>

          <View style={styles.controls}>
            <Pressable style={styles.sideButton} onPress={pickFromGallery} hitSlop={8}>
              <MaterialIcons name="photo-library" size={22} color="#FFFFFF" />
            </Pressable>

            <Pressable
              style={styles.shutter}
              onPress={takePhoto}
              disabled={isCapturing}
              hitSlop={8}
            >
              {isCapturing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <View style={styles.shutterInner} />
              )}
            </Pressable>

            <Pressable style={styles.sideButton} onPress={toggleFacing} hitSlop={8}>
              <Ionicons name="camera-reverse-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      )}

      {/* ----- pré-visualização da foto + analisar ----- */}
      {photo && !result && (
        <SafeAreaView style={[StyleSheet.absoluteFill, styles.previewContainer]}>
          <Image source={{ uri: photo.uri }} style={styles.previewImage} resizeMode="cover" />

          {analyzing ? (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.analyzingText}>Analisando a planta...</Text>
            </View>
          ) : (
            <View style={styles.previewActions}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.previewButtonsRow}>
                <Pressable
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={handleRetake}
                >
                  <Text style={styles.secondaryButtonText}>↺ Refazer</Text>
                </Pressable>

                <Pressable
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => analyze({ uri: photo.uri, base64: photo.base64 })}
                >
                  <Ionicons name="search" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}> Analisar planta</Text>
                </Pressable>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}

      {/* ----- resultado da análise ----- */}
      {result && (
        <SafeAreaView style={[StyleSheet.absoluteFill, styles.resultContainer]}>
          <ScrollView contentContainerStyle={styles.resultContent}>
            {photo && (
              <Image source={{ uri: photo.uri }} style={styles.resultImage} />
            )}

            {result.isPlant ? (
              <View style={styles.resultCard}>
                <Text style={styles.resultPlantName}>{result.plantName}</Text>

                {result.scientificName ? (
                  <Text style={styles.resultScientific}>{result.scientificName}</Text>
                ) : null}

                <Text style={styles.resultConfidence}>
                  Confiança: {Math.round(result.confidence)}%
                </Text>

                {result.disease ? (
                  <Text style={styles.resultDisease}>
                    🦠 {result.disease}
                    {result.diseaseConfidence != null
                      ? ` (${Math.round(result.diseaseConfidence)}%)`
                      : ''}
                  </Text>
                ) : result.isHealthy ? (
                  <Text style={styles.resultHealthy}> 🌱 Planta saudável</Text>
                ) : (
                  <Text style={styles.resultNeutral}>
                    Sem informação de saúde disponível.
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.resultCard}>
                <MaterialIcons name="block" size={28} color="#B91C1C" />
                <Text style={styles.notPlantTitle}>Nenhuma planta identificada</Text>
                <Text style={styles.notPlantText}>
                  Não encontramos uma planta nesta foto, então ela não pode ser
                  publicada no feed. Tente novamente com uma planta no centro da
                  imagem.
                </Text>
              </View>
            )}

            <View style={styles.resultActions}>
              <Pressable
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleRetake}
              >
                <Text style={styles.secondaryButtonText}>↺ Nova foto</Text>
              </Pressable>

              {result.isPlant && (
                <Pressable
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={handlePost}
                >
                  <Entypo name='publish' size={18} color="#7FE3A1" />
                  <Text style={styles.primaryButtonText}> Postar no feed</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
