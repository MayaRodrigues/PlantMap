import { Directory, File, Paths } from 'expo-file-system';

// Pasta permanente onde as fotos das plantas ficam guardadas.
// Paths.document é o diretório de documentos do app: ao contrário do cache
// (onde a câmera/galeria deixam a foto original), o sistema NÃO apaga esses
// arquivos. Por isso a foto continua existindo mesmo depois de fechar o app.
const PLANTS_DIR = new Directory(Paths.document, 'plants');

function ensurePlantsDir() {
  if (!PLANTS_DIR.exists) {
    PLANTS_DIR.create({ intermediates: true });
  }
}

// Copia a foto recém-tirada/escolhida (que vive no cache temporário) para a
// pasta permanente e devolve o novo caminho, que é o que gravamos no banco.
// Assim o image_uri salvo aponta para um arquivo que sobrevive ao fechamento
// do app. Para URLs remotas, data URIs ou fotos que já estão na nossa pasta,
// devolve a uri original sem copiar.
export function persistPlantImage(sourceUri?: string | null): string {
  if (!sourceUri || !sourceUri.startsWith('file://')) {
    return sourceUri ?? '';
  }

  // já está na pasta permanente: nada a fazer.
  if (sourceUri.startsWith(PLANTS_DIR.uri)) {
    return sourceUri;
  }

  const source = new File(sourceUri);
  if (!source.exists) {
    // arquivo de origem sumiu (cache limpo): não há o que copiar.
    return sourceUri;
  }

  ensurePlantsDir();

  const extension = source.extension || '.jpg';
  const fileName = `plant_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}${extension}`;
  const destination = new File(PLANTS_DIR, fileName);

  source.copy(destination);
  return destination.uri;
}

// Remove a foto permanente de uma planta (usar ao apagar a planta do banco).
// Só apaga arquivos que estão dentro da nossa pasta, para nunca mexer em
// fotos originais da galeria do usuário.
export function deletePlantImage(uri?: string | null) {
  if (!uri || !uri.startsWith(PLANTS_DIR.uri)) {
    return;
  }

  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch (error) {
    console.log('Erro ao remover imagem da planta:', error);
  }
}
