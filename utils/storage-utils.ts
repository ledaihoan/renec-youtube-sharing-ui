import { openDB } from 'idb';
import { AuthData } from '@/types/auth-data';

const dbName = 'AuthDB';
const authStoreName = 'auth';
const version = 1;

async function initDB() {
  return openDB(dbName, version, {
    upgrade(db) {
      db.createObjectStore(authStoreName);
    },
  });
}

export async function storeAuthData(authData: AuthData) {
  const db = await initDB();
  return db.put(authStoreName, authData, 'authData');
}

export async function getAuthData() {
  const db = await initDB();
  return await db.get(authStoreName, 'authData') as AuthData;
}

export async function clearAuthData() {
  const db = await initDB();
  await db.delete(authStoreName, 'authData');
}
