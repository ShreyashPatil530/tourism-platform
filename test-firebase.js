// Quick Firebase Connection Test
// Run this with: node test-firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('\n🔥 Firebase Connection Test\n');
console.log('Project ID:', firebaseConfig.projectId);
console.log('-----------------------------------\n');

async function testFirebase() {
    try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        console.log('✅ Firebase initialized successfully\n');

        // Test 1: Write data
        console.log('📝 Test 1: Writing test document...');
        const testData = {
            message: 'Firebase test message',
            timestamp: new Date().toISOString(),
            testField: 'This is a test'
        };

        const docRef = await addDoc(collection(db, 'test_collection'), testData);
        console.log('✅ Document written with ID:', docRef.id);
        console.log('   Data:', testData);

        // Test 2: Read data
        console.log('\n📖 Test 2: Reading all test documents...');
        const querySnapshot = await getDocs(collection(db, 'test_collection'));
        console.log('✅ Found', querySnapshot.size, 'document(s)');

        querySnapshot.forEach((doc) => {
            console.log('   Document ID:', doc.id);
            console.log('   Data:', doc.data());
        });

        // Test 3: Check other collections
        console.log('\n📚 Test 3: Checking existing collections...');

        const collections = ['blogs', 'bookings', 'contacts', 'destinations'];
        for (const collName of collections) {
            const snapshot = await getDocs(collection(db, collName));
            console.log(`   ${collName}: ${snapshot.size} document(s)`);
        }

        // Clean up test data
        console.log('\n🧹 Cleaning up test document...');
        await deleteDoc(doc(db, 'test_collection', docRef.id));
        console.log('✅ Test document deleted\n');

        console.log('-----------------------------------');
        console.log('🎉 All tests passed! Firebase is working correctly!\n');
        console.log('✅ Firebase can write data');
        console.log('✅ Firebase can read data');
        console.log('✅ Your collections are accessible\n');

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('\nFull error:', error);
        console.log('\n⚠️  Troubleshooting:');
        console.log('1. Check .env.local has all Firebase credentials');
        console.log('2. Verify Firestore is enabled in Firebase Console');
        console.log('3. Check Firestore security rules allow read/write');
        process.exit(1);
    }
}

testFirebase();
