import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './config';

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Array>} Array of documents
 */
export async function getCollection(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error(`Error getting collection ${collectionName}:`, error);
        throw error;
    }
}

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - Document ID
 * @returns {Promise<Object|null>} Document data or null if not found
 */
export async function getDocument(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error getting document ${documentId} from ${collectionName}:`, error);
        throw error;
    }
}

/**
 * Get documents by field value
 * @param {string} collectionName - Name of the collection
 * @param {string} field - Field to query
 * @param {any} value - Value to match
 * @returns {Promise<Array>} Array of matching documents
 */
export async function getDocumentsByField(collectionName, field, value) {
    try {
        const q = query(collection(db, collectionName), where(field, '==', value));
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error(`Error querying ${collectionName} by ${field}:`, error);
        throw error;
    }
}

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Document data
 * @returns {Promise<Object>} Created document with ID
 */
export async function addDocument(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: data.createdAt || Timestamp.now()
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error);
        throw error;
    }
}

/**
 * Update an existing document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - Document ID
 * @param {Object} data - Data to update
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, documentId, data) {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
    } catch (error) {
        console.error(`Error updating document ${documentId} in ${collectionName}:`, error);
        throw error;
    }
}

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - Document ID
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error(`Error deleting document ${documentId} from ${collectionName}:`, error);
        throw error;
    }
}
