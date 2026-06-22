import axios from 'axios';

const PLANTNET_API_KEY = '2b10k5W0bH5JXNWCatXzVAHIe';
const PLANTNET_BASE_URL = 'https://my-api.plantnet.org/v2';

export type PlantNetResult = {
  plantName: string;
  scientificName: string;
  confidence: number;
};

export async function identifyPlantWithPlantNet(imageUri: string): Promise<PlantNetResult> {
  if (!PLANTNET_API_KEY) {
    throw new Error('Chave da Pl@ntNet não configurada.');
  }

  const formData = new FormData();

  formData.append('images', {
    uri: imageUri,
    name: 'plant.jpg',
    type: 'image/jpeg',
  } as any);


  formData.append('organs', 'auto');

  const response = await axios.post(
    `${PLANTNET_BASE_URL}/identify/all?api-key=${PLANTNET_API_KEY}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  const topResult = response.data?.results?.[0];

  if (!topResult) {
    throw new Error('Não foi possível identificar a planta.');
  }

  return {
    plantName:
      topResult?.species?.commonNames?.[0] ||
      topResult?.species?.scientificNameWithoutAuthor ||
      'Planta não identificada',
    scientificName:
      topResult?.species?.scientificNameWithoutAuthor ||
      topResult?.species?.scientificName ||
      'Nome científico não encontrado',
    confidence: topResult?.score ? topResult.score * 100 : 0,
  };
}