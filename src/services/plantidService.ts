import axios from 'axios';

const PLANT_ID_BASE_URL = 'https://plant.id/api/v3';
const PLANT_ID_API_KEY = 'cmVpzqkMdhKbpwqtzEHOdS0Y01hB3o9vw8CZP7xbx2s1uotaDP'; 

export type PlantDiseaseResult = {
  isPlant: boolean | null;
  disease: string | null;
  diseaseConfidence: number | null;
  isHealthy: boolean | null;
};

export async function identifyDiseaseWithPlantId(
  base64Image: string
): Promise<PlantDiseaseResult> {
  if (!PLANT_ID_API_KEY) {
    throw new Error('Chave da Plant.id não configurada.');
  }

  const response = await axios.post(
    `${PLANT_ID_BASE_URL}/health_assessment`,
    {
      images: [base64Image],
      similar_images: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': PLANT_ID_API_KEY,
      },
    }
  );

  // IMPORTANTE:
  // adapte este parse conforme a resposta real da sua conta/endpoint da Plant.id
  const result = response.data;

  const topDisease =
    result?.result?.disease?.suggestions?.[0] ||
    result?.health_assessment?.diseases?.[0] ||
    null;

  // na v3 is_plant / is_healthy são objetos { binary, probability }
  const isPlant =
    result?.result?.is_plant?.binary ??
    result?.result?.is_plant ??
    null;

  const isHealthy =
    result?.result?.is_healthy?.binary ??
    result?.result?.is_healthy ??
    null;

  return {
    isPlant,
    disease: topDisease?.name || null,
    diseaseConfidence: topDisease?.probability
      ? topDisease.probability * 100
      : null,
    isHealthy,
  };
}

