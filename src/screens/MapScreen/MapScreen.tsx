import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Image,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './MapScreen.styles';
import { getCurrentUserLocation } from '../../services/locationService';
import { getAllPlants, PlantRecord } from '../../services/plantService';
import { usePlants } from '../../context/PlantContext';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type Coord = { latitude: number; longitude: number };

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { addPost } = usePlants();

  const [plants, setPlants] = useState<PlantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantRecord | null>(null);

  // ponto escolhido para registrar (abre o formulário quando != null)
  const [formCoord, setFormCoord] = useState<Coord | null>(null);
  const [formName, setFormName] = useState('');
  const [formLocationName, setFormLocationName] = useState('');
  const [formDisease, setFormDisease] = useState('');
  const [formImageUri, setFormImageUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: -25.4294,
    longitude: -54.5824,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  useEffect(() => {
    loadMapData();
  }, []);

  async function loadMapData() {
    try {
      setLoading(true);

      const userLocation = await getCurrentUserLocation();
      const savedPlants = await getAllPlants();

      if (userLocation) {
        setInitialRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }

      setPlants(savedPlants);
    } catch (error) {
      console.log('Erro ao carregar mapa:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleGoToMyLocation() {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  }

  // abre o formulário num ponto escolhido (toque longo ou GPS)
  function openFormAt(coord: Coord) {
    setFormName('');
    setFormLocationName('');
    setFormDisease('');
    setFormImageUri(null);
    setFormCoord(coord);
  }

  // escolhe uma foto da galeria (a planta pode ter sido fotografada em outro
  // momento/lugar, então a foto é independente do ponto escolhido no mapa)
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormImageUri(result.assets[0].uri);
    }
  }

  // botão "Registrar aqui": usa a localização atual
  async function handleRegisterHere() {
    const coords = await getCurrentUserLocation();
    if (!coords) {
      Alert.alert(
        'Localização indisponível',
        'Permita o acesso à localização para registrar no seu ponto atual.'
      );
      return;
    }
    openFormAt(coords);
  }

  async function handleSavePoint() {
    if (!formCoord) return;

    if (!formName.trim()) {
      Alert.alert('Informe o nome', 'Digite o nome da planta para registrar o ponto.');
      return;
    }

    try {
      setSaving(true);

      const disease = formDisease.trim();

      await addPost({
        id: Date.now().toString(),
        user: 'Você',
        avatar: '🌱',
        location: formLocationName.trim() || 'Ponto no mapa',
        plantName: formName.trim(),
        disease: disease ? disease : null,
        isHealthy: disease ? false : true,
        imageUri: formImageUri ?? undefined,
        latitude: formCoord.latitude,
        longitude: formCoord.longitude,
        likes: 0,
        comments: 0,
      });

      setFormCoord(null);
      await loadMapData(); // recarrega os pinos com o novo ponto
    } catch (error) {
      console.log('Erro ao salvar ponto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o ponto.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        onLongPress={(e) => openFormAt(e.nativeEvent.coordinate)}
      >
        {plants.map((plant) => (
          <Marker
            key={plant.id}
            coordinate={{
              latitude: plant.latitude,
              longitude: plant.longitude,
            }}
            title={plant.plantName}
            description={plant.locationName ?? 'Local da planta'}
            onPress={() => setSelectedPlant(plant)}
          />
        ))}

        {/* prévia do ponto que está sendo registrado */}
        {formCoord && <Marker coordinate={formCoord} pinColor="#2E7D32" />}
      </MapView>

      {/* botão de registrar no ponto atual */}
      <Pressable style={styles.addButton} onPress={handleRegisterHere}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Registrar aqui</Text>
      </Pressable>

      {/* botão de centralizar */}
      <Pressable style={styles.locationButton} onPress={handleGoToMyLocation}>
        <Entypo name="location" size={20} color="#ffffff" />
      </Pressable>

      {/* modal com detalhes da planta */}
      <Modal
        visible={!!selectedPlant}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedPlant(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedPlant && (
              <>
                {selectedPlant.imageUri ? (
                  <Image
                    source={{ uri: selectedPlant.imageUri }}
                    style={styles.plantImage}
                  />
                ) : null}

                <Text style={styles.plantName}>{selectedPlant.plantName}</Text>

                <Ionicons name="location-outline" size={16} color="#B91C1C" />
                <Text>
                  {selectedPlant.locationName ?? 'Local não informado'}
                </Text>
                <AntDesign name="calendar" size={16} color="#355E3B" />
                <Text>
                  {new Date(selectedPlant.createdAt).toLocaleDateString('pt-BR')}
                </Text>

                {selectedPlant.disease ? (
                  <Text style={styles.plantInfo}>🦠 {selectedPlant.disease}</Text>
                ) : (
                  <Text style={styles.plantInfo}>🌿 Sem doença detectada</Text>
                )}

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setSelectedPlant(null)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* modal de formulário para registrar um novo ponto */}
      <Modal
        visible={!!formCoord}
        transparent
        animationType="slide"
        onRequestClose={() => setFormCoord(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.formTitle}>Registrar planta</Text>
            <Text style={styles.formHint}>
              {formCoord
                ? `Ponto: ${formCoord.latitude.toFixed(5)}, ${formCoord.longitude.toFixed(5)}`
                : ''}
            </Text>

            {formImageUri ? (
              <>
                <Image
                  source={{ uri: formImageUri }}
                  style={styles.photoPreview}
                />
                <Pressable onPress={() => setFormImageUri(null)}>
                  <Text style={styles.removePhotoText}>Remover foto</Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.photoButton} onPress={pickImage}>
                <Ionicons name="image-outline" size={20} color="#374151" />
                <Text style={styles.photoButtonText}>
                  Adicionar foto da galeria
                </Text>
              </Pressable>
            )}

            <Text style={styles.label}>Nome da planta *</Text>
            <TextInput
              style={styles.input}
              value={formName}
              onChangeText={setFormName}
              placeholder="Ex: Ipê Amarelo"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Local (opcional)</Text>
            <TextInput
              style={styles.input}
              value={formLocationName}
              onChangeText={setFormLocationName}
              placeholder="Ex: Parque Ambiental"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Doença (opcional)</Text>
            <TextInput
              style={styles.input}
              value={formDisease}
              onChangeText={setFormDisease}
              placeholder="Deixe vazio se estiver saudável"
              placeholderTextColor="#9CA3AF"
            />

            <View style={styles.formButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setFormCoord(null)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.saveButton}
                onPress={handleSavePoint}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? 'Salvando...' : 'Salvar ponto'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
