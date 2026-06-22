import { useState } from 'react';
import {
  analyzePlant,
  AnalysisInput,
  PlantAnalysis,
} from '../services/plantAnalysisService';

export function usePlantAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PlantAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(image: AnalysisInput): Promise<PlantAnalysis | null> {
    try {
      setAnalyzing(true);
      setError(null);
      const data = await analyzePlant(image);
      setResult(data);
      return data;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Erro ao analisar a imagem.';
      setError(message);
      setResult(null);
      return null;
    } finally {
      setAnalyzing(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { analyzing, result, error, analyze, reset };
}
