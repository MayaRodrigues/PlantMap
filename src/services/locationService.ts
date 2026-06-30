import * as Location from 'expo-location';

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export async function getCurrentUserLocation(): Promise<UserLocation | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

// converte um endereço digitado (rua, cidade, país...) em coordenadas.
// retorna null se o endereço não for encontrado.
export async function geocodeAddress(
  address: string
): Promise<UserLocation | null> {
  const query = address.trim();
  if (!query) {
    return null;
  }

  // o geocoder do sistema costuma exigir a permissão de localização
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const results = await Location.geocodeAsync(query);

  if (!results.length) {
    return null;
  }

  return {
    latitude: results[0].latitude,
    longitude: results[0].longitude,
  };
}

// converte coordenadas (ex: localização atual do GPS) em um endereço legível.
// retorna null se não conseguir resolver.
export async function reverseGeocode(
  coords: UserLocation
): Promise<string | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const results = await Location.reverseGeocodeAsync(coords);

  if (!results.length) {
    return null;
  }

  const place = results[0];
  // monta um endereço amigável a partir das partes disponíveis
  const parts = [
    place.street,
    place.streetNumber,
    place.district,
    place.city,
    place.region,
  ].filter(Boolean);

  return parts.length ? parts.join(', ') : null;
}
