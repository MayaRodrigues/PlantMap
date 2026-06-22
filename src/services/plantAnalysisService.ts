import { identifyPlantWithPlantNet } from './plantnetService';
import { identifyDiseaseWithPlantId } from './plantidService';

export type PlantAnalysis = {
  isPlant: boolean;
  plantName: string;
  scientificName: string;
  confidence: number; // 0 a 100
  isHealthy: boolean | null;
  disease: string | null;
  diseaseConfidence: number | null; // 0 a 100
};

export type AnalysisInput = {
  uri: string;
  base64?: string;
};

// Abaixo dessa confiança da Pl@ntNet consideramos que não há planta na foto
const PLANT_CONFIDENCE_THRESHOLD = 10;

export async function analyzePlant(image: AnalysisInput): Promise<PlantAnalysis> {
  // roda as duas APIs em paralelo, tolerando falha individual de uma delas
  const [idResult, diseaseResult] = await Promise.allSettled([
    identifyPlantWithPlantNet(image.uri),
    image.base64
      ? identifyDiseaseWithPlantId(image.base64)
      : Promise.reject(new Error('Imagem sem base64 para análise de doença.')),
  ]);

  const identification = idResult.status === 'fulfilled' ? idResult.value : null;
  const health = diseaseResult.status === 'fulfilled' ? diseaseResult.value : null;

  // Se as duas falharem, não temos como analisar
  if (!identification && !health) {
    throw new Error('Não foi possível analisar a imagem. Tente novamente.');
  }

  // "É planta?" — prioriza o is_plant da Plant.id; senão usa a confiança da Pl@ntNet
  const isPlant =
    health?.isPlant != null
      ? health.isPlant
      : (identification?.confidence ?? 0) >= PLANT_CONFIDENCE_THRESHOLD;

  return {
    isPlant,
    plantName: identification?.plantName ?? 'Planta não identificada',
    scientificName: identification?.scientificName ?? '',
    confidence: identification?.confidence ?? 0,
    isHealthy: health?.isHealthy ?? null,
    disease: health?.disease ?? null,
    diseaseConfidence: health?.diseaseConfidence ?? null,
  };
}
