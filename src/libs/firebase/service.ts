import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  updateDoc,
  where,
  WhereFilterOp,
} from 'firebase/firestore';

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
   * Get a document by condition
   * Returns null if not exists.
   */

  async getByCondition<T = DocumentData>(collectionName: string, field: string, op: WhereFilterOp, value: any): Promise<(T & { id: string }) | null> {
    const q = query(collection(this.db, collectionName), where(field, op, value), limit(1));

    const snap = await getDocs(q);

    if (snap.empty) return null;

    return { id: snap.docs[0].id, ...(snap.docs[0].data() as T) };
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

  async list<T = DocumentData>(
    collectionName: string,
    options?: {
      conditions?: { field: string; op: WhereFilterOp; value: unknown }[];
      orderByField?: string;
      orderDirection?: 'asc' | 'desc';
      pageSize?: number;
      startAfterDoc?: QueryDocumentSnapshot;
    },
  ): Promise<{
    rows: (T & { id: string })[];
    total: number;
    lastDoc: QueryDocumentSnapshot | null;
  }> {
    try {
      let q: any = collection(this.db, collectionName);
      const { conditions, orderByField, orderDirection, pageSize, startAfterDoc } = options || {};

      // 🧩 Kiểm tra trước khi build query
      if (conditions && conditions.length > 0) {
        // Nếu có mảng rỗng trong điều kiện 'in' hoặc 'array-contains-any' → trả về rỗng luôn
        const hasEmptyInFilter = conditions.some(
          (c) => (c.op === 'in' || c.op === 'array-contains-any') && (!Array.isArray(c.value) || c.value.length === 0),
        );

        if (hasEmptyInFilter) {
          console.warn('⚠️ Bỏ qua truy vấn vì có điều kiện "in" hoặc "array-contains-any" với mảng rỗng.');
          return { rows: [], total: 0, lastDoc: null };
        }

        // Lọc chỉ giữ lại điều kiện hợp lệ
        const validConditions = conditions.filter((c) => {
          if ((c.op === 'in' || c.op === 'array-contains-any') && (!Array.isArray(c.value) || c.value.length === 0)) {
            console.warn(`⚠️ Bỏ qua điều kiện '${c.field}' vì mảng rỗng.`);
            return false;
          }
          return true;
        });

        if (validConditions.length > 0) {
          const filters = validConditions.map((c) => where(c.field, c.op, c.value));
          q = query(q, ...filters);
        }
      }

      // 🧭 Sắp xếp
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection || 'asc'));
      }

      // ⏩ Phân trang
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      if (pageSize) {
        q = query(q, limit(pageSize));
      }

      // 🔍 Lấy dữ liệu
      const snapshot = await getDocs(q);

      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }));

      const lastDocSnap = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

      // 🔢 Đếm tổng số (nếu bạn có method riêng countDocuments)
      const total = await this.countDocuments(collectionName, conditions);

      return {
        rows: docs,
        lastDoc: lastDocSnap as QueryDocumentSnapshot<DocumentData> | null,
        total,
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(`🔥 FirebaseError [${error.code}]: ${error.message}`);
      } else {
        console.error('🔥 Unknown error:', error);
      }

      return {
        rows: [],
        total: 0,
        lastDoc: null,
      };
    }
  }

  private async countDocuments(collectionName: string, conditions?: { field: string; op: WhereFilterOp; value: unknown }[]): Promise<number> {
    let q: any = collection(this.db, collectionName);

    if (conditions && conditions.length > 0) {
      const validConditions = conditions.filter((c) => {
        if ((c.op === 'in' || c.op === 'array-contains-any') && (!Array.isArray(c.value) || c.value.length === 0)) {
          return false;
        }
        return true;
      });

      if (validConditions.length > 0) {
        const filters = validConditions.map((c) => where(c.field, c.op, c.value));
        q = query(q, ...filters);
      }
    }

    const snapshot = await getDocs(q);
    return snapshot.size;
  }
}

// Export single instance to reuse
const firestoreService = new FirestoreService(db);
export default firestoreService;
