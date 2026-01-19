// Migration script to transfer JSON data to Firestore
// Run this script once to populate your Firestore database with existing data

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase Admin SDK configuration
const serviceAccount = {
    type: 'service_account',
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'tourism-platform-sp530',
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CERT_URL
};

// Initialize Firebase Admin (using default credentials for this migration)
const app = initializeApp({
    projectId: 'tourism-platform-sp530'
});

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
            await db.collection('bookings').doc(id.toString()).set(bookingData);
            console.log(`  ✓ Migrated booking ID: ${id}`);
        }
        console.log(`✅ Migrated ${bookings.length} bookings\n`);

        // Migrate Destinations
        console.log('📦 Migrating destinations...');
        for (const destination of destinations) {
            const { id, ...destinationData } = destination;
            await db.collection('destinations').doc(id.toString()).set(destinationData);
            console.log(`  ✓ Migrated destination: ${destination.name}`);
        }
        console.log(`✅ Migrated ${destinations.length} destinations\n`);

        // Migrate Blogs
        console.log('📦 Migrating blogs...');
        for (const blog of blogs) {
            const { id, ...blogData } = blog;
            await db.collection('blogs').doc(id.toString()).set(blogData);
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
        console.error('Migration failed:', error);
        process.exit(1);
    });
