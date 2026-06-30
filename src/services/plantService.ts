import { db } from '../database/squilite';
import { FeedPost } from '../components/PlantCard';
import { persistPlantImage } from './imageStorage';

// Por enquanto o app trabalha com um único usuário local (id = 1),
// semeado em initDatabase(). Quando houver login, troque pelo id real.
const DEFAULT_USER_ID = 1;

// Registro usado pelo mapa: planta + coordenadas (vem do JOIN com locations).
export type PlantRecord = {
  id: number;
  plantName: string;
  imageUri: string;
  latitude: number;
  longitude: number;
  locationName?: string | null;
  disease?: string | null;
  createdAt: string;
};

// Resultado da gravação: id gerado pelo banco e o caminho permanente da foto
// (pode ser diferente do enviado, pois a imagem é copiada para a pasta do app).
export type InsertedPlant = {
  id: number;
  imageUri: string;
};

// Grava uma planta (e, se houver coordenadas, a localização dela).
export async function insertPlant(post: FeedPost): Promise<InsertedPlant> {
  const createdAt = new Date().toISOString();

  // Copia a foto do cache temporário para a pasta permanente ANTES de gravar,
  // garantindo que o image_uri salvo continue válido depois de fechar o app.
  const imageUri = persistPlantImage(post.imageUri);

  const result = await db.runAsync(
    `INSERT INTO plants
       (user_id, plant_name, scientific_name, image_uri, confidence, disease, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      DEFAULT_USER_ID,
      post.plantName,
      post.scientificName ?? null,
      imageUri,
      post.confidence ?? null,
      post.disease ?? null,
      post.location, // guardamos o nome do local em "notes"
      createdAt,
    ]
  );

  const plantId = result.lastInsertRowId;

  // Só grava no mapa se a foto tiver vindo com GPS.
  if (post.latitude != null && post.longitude != null) {
    await db.runAsync(
      `INSERT INTO locations
         (plant_id, user_id, name, latitude, longitude, created_at)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        plantId,
        DEFAULT_USER_ID,
        post.location,
        post.latitude,
        post.longitude,
        createdAt,
      ]
    );
  }

  return { id: plantId, imageUri };
}

// Plantas com coordenadas, para os pinos do mapa.
export async function getAllPlants(): Promise<PlantRecord[]> {
  return db.getAllAsync<PlantRecord>(`
    SELECT
      p.id            AS id,
      p.plant_name    AS plantName,
      p.image_uri     AS imageUri,
      p.disease       AS disease,
      p.created_at    AS createdAt,
      l.latitude      AS latitude,
      l.longitude     AS longitude,
      l.name          AS locationName
    FROM plants p
    INNER JOIN locations l ON l.plant_id = p.id
    ORDER BY p.created_at DESC;
  `);
}

// Todas as plantas no formato do feed (não precisa de coordenadas).
export async function getFeedPlants(): Promise<FeedPost[]> {
  const rows = await db.getAllAsync<{
    id: number;
    plantName: string;
    scientificName: string | null;
    imageUri: string;
    confidence: number | null;
    disease: string | null;
    location: string | null;
  }>(`
    SELECT
      id,
      plant_name      AS plantName,
      scientific_name AS scientificName,
      image_uri       AS imageUri,
      confidence,
      disease,
      notes           AS location
    FROM plants
    ORDER BY created_at DESC;
  `);

  return rows.map((row) => ({
    id: String(row.id),
    user: 'Você',
    avatar: '🌱',
    location: row.location ?? 'Local não informado',
    plantName: row.plantName,
    scientificName: row.scientificName ?? undefined,
    confidence: row.confidence ?? undefined,
    imageUri: row.imageUri || undefined,
    disease: row.disease,
    isHealthy: row.disease ? false : true,
    likes: 0,
    comments: 0,
  }));
}
