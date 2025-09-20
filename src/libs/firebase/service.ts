import { addDoc, collection, deleteDoc, doc, DocumentData, Firestore, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db } from './config';

/**
 * Generic Firestore service for simple CRUD.
 * Methods:
 *  - create(collectionName, data, id?) : create new doc (auto id or provided id)
 *  - get(collectionName, id) : get doc by id
 *  - update(collectionName, id, partialData) : update fields
 *  - delete(collectionName, id) : delete doc
 */
export class FirestoreService {
  private db: Firestore;

  constructor(dbInstance: Firestore) {
    this.db = dbInstance;
  }

  /**
   * Create a document.
   * If `id` provided, it will create/overwrite the document with that id (setDoc).
   * If no `id`, it will add a new doc with auto id (addDoc).
   */
  async create<T extends DocumentData = DocumentData>(collectionName: string, data: T, id?: string): Promise<{ id: string }> {
    if (id) {
      const ref = doc(this.db, collectionName, id);
      await setDoc(ref, data);
      return { id };
    } else {
      const colRef = collection(this.db, collectionName);
      const docRef = await addDoc(colRef, data);
      return { id: docRef.id };
    }
  }

  /**
   * Get a document by id.
   * Returns null if not exists.
   */
  async get<T = DocumentData>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
    const ref = doc(this.db, collectionName, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as T) };
  }

  /**
   * Update document by id. Partial update only.
   * Throws if doc not exists (Firestore will create if doesn't exist for updateDoc? actually updateDoc fails on missing doc).
   */
  async update<T extends Partial<DocumentData>>(collectionName: string, id: string, partialData: T): Promise<void> {
    const ref = doc(this.db, collectionName, id);
    await updateDoc(ref, partialData as DocumentData);
  }

  /**
   * Delete a document by id.
   */
  async delete(collectionName: string, id: string): Promise<void> {
    const ref = doc(this.db, collectionName, id);
    await deleteDoc(ref);
  }
}

// Export single instance to reuse
const firestoreService = new FirestoreService(db);
export default firestoreService;
