import { db } from '../database/squilite';

export async function toggleLike(plantId: number, userId: number) {
  const existing = await db.getFirstAsync(
    `SELECT id FROM likes WHERE plant_id = ? AND user_id = ?`,
    [plantId, userId]
  );

  if (existing) {
    await db.runAsync(
      `DELETE FROM likes WHERE plant_id = ? AND user_id = ?`,
      [plantId, userId]
    );
    return false;
  }

  await db.runAsync(
    `INSERT INTO likes (plant_id, user_id, created_at) VALUES (?, ?, ?)`,
    [plantId, userId, new Date().toISOString()]
  );

  return true;
}