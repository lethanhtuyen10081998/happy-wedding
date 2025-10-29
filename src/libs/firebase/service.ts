import {
  addDoc,
  collection,
  count,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getAggregateFromServer,
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

  async countDocuments(collectionName: string, conditions?: { field: string; op: WhereFilterOp; value: unknown }[]): Promise<number> {
    let colRef: any = collection(this.db, collectionName);

    if (conditions && conditions.length > 0) {
      const filters = conditions.map((c) => where(c.field, c.op, c.value));
      colRef = query(colRef, ...filters);
    }

    const snapshot = await getAggregateFromServer(colRef, { total: count() });
    return snapshot.data().total;
  }

  async list<T = DocumentData>(
    collectionName: string,
    options?: {
      conditions?: { field: string; op: WhereFilterOp; value: unknown }[];
      orderByField?: string; // sắp xếp theo field
      orderDirection?: 'asc' | 'desc';
      pageSize?: number; // số lượng mỗi trang
      startAfterDoc?: QueryDocumentSnapshot; // doc bắt đầu (cho load more)
    },
  ): Promise<{
    rows: (T & { id: string })[];
    total: number;
    lastDoc: QueryDocumentSnapshot | null; // để load trang tiếp theo
  }> {
    try {
      let q: any = collection(this.db, collectionName);

      const { conditions, orderByField, orderDirection, pageSize, startAfterDoc } = options || {};

      // filter
      if (conditions && conditions.length > 0) {
        // console.log('Firebase service - Conditions:', conditions);
        const filters = conditions.map((c) => where(c.field, c.op, c.value));
        q = query(q, ...filters);
        // console.log('Firebase service - Query filters applied');
      }

      // orderBy (quan trọng khi dùng paging)
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection || 'asc'));
      }

      // paging
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      if (pageSize) {
        q = query(q, limit(pageSize));
      }

      const snapshot = await getDocs(q);
      console.log('Firebase service - Query result:', {
        docsCount: snapshot.docs.length,
        isEmpty: snapshot.empty,
        docs: snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
      });

      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));

      const lastDocSnap = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
      const total = await this.countDocuments(collectionName, conditions);

      return {
        rows: docs,
        lastDoc: lastDocSnap as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        total: total,
      };
    } catch (error) {
      console.error(error);
      return {
        rows: [],
        total: 0,
        lastDoc: null,
      };
    }
  }
}

// Export single instance to reuse
const firestoreService = new FirestoreService(db);
export default firestoreService;
