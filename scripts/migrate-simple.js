// Simple migration script using Firebase client SDK
// Run with: node scripts/migrate-simple.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
    try {
        console.log('🚀 Starting migration to Firestore...\n');

        // Read JSON files
        const dataDir = path.join(__dirname, '..', 'data');
        const bookingsPath = path.join(dataDir, 'bookings.json');
        const destinationsPath = path.join(dataDir, 'destinations.json');
        const blogsPath = path.join(dataDir, 'blogs.json');

        const bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf-8'));
        const destinations = JSON.parse(fs.readFileSync(destinationsPath, 'utf-8'));
        const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));

        // Migrate Bookings
        console.log('📦 Migrating bookings...');
        for (const booking of bookings) {
            const { id, ...bookingData } = booking;
            await setDoc(doc(db, 'bookings', id.toString()), bookingData);
            console.log(`  ✓ Migrated booking ID: ${id}`);
        }
        console.log(`✅ Migrated ${bookings.length} bookings\n`);

        // Migrate Destinations
        console.log('📦 Migrating destinations...');
        for (const destination of destinations) {
            const { id, ...destinationData } = destination;
            await setDoc(doc(db, 'destinations', id.toString()), destinationData);
            console.log(`  ✓ Migrated destination: ${destination.name}`);
        }
        console.log(`✅ Migrated ${destinations.length} destinations\n`);

        // Migrate Blogs
        console.log('📦 Migrating blogs...');
        for (const blog of blogs) {
            const { id, ...blogData } = blog;
            await setDoc(doc(db, 'blogs', id.toString()), blogData);
            console.log(`  ✓ Migrated blog: ${blog.title}`);
        }
        console.log(`✅ Migrated ${blogs.length} blogs\n`);

        console.log('🎉 Migration completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Bookings: ${bookings.length}`);
        console.log(`   - Destinations: ${destinations.length}`);
        console.log(`   - Blogs: ${blogs.length}`);
        console.log(`   - Total documents: ${bookings.length + destinations.length + blogs.length}`);

    } catch (error) {
        console.error('❌ Error during migration:', error);
        console.error('Error details:', error.message);
        throw error;
    }
}

// Run migration
migrateData()
    .then(() => {
        console.log('\n✨ You can now use Firestore for all operations!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration failed:', error.message);
        process.exit(1);
    });
