#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file with your MongoDB Atlas connection string.');
  process.exit(1);
}

async function showNekoTV() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('\n🐾✨ NEKO TV - MONGODB ATLAS EXPLORER ✨🐾\n');
    console.log('═══════════════════════════════════════════════════════════════════════════════\n');

    await client.connect();
    console.log('✅ Connected to MongoDB Atlas, desu~!\n');

    const admin = client.db().admin();

    // List all databases
    const { databases } = await admin.listDatabases();

    console.log(`📊 TOTAL DATABASES FOUND: ${databases.length}\n`);
    console.log('═══════════════════════════════════════════════════════════════════════════════\n');

    // Iterate through each database
    for (const dbInfo of databases) {
      const dbName = dbInfo.name;
      const sizeOnDisk = (dbInfo.sizeOnDisk / 1024 / 1024).toFixed(2); // MB

      console.log(`\n🗄️  DATABASE: ${dbName}`);
      console.log(`   💾 Size: ${sizeOnDisk} MB`);
      console.log('   ─────────────────────────────────────────────────────────────────────────\n');

      // Get collections for this database
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();

      if (collections.length === 0) {
        console.log('   📭 No collections found (empty database)\n');
      } else {
        console.log(`   📚 COLLECTIONS (${collections.length} total):\n`);

        // Show each collection with document count
        for (const collection of collections) {
          const collectionName = collection.name;
          const coll = db.collection(collectionName);

          try {
            const count = await coll.countDocuments();
            console.log(`   📦 ${collectionName}`);
            console.log(`      └─ Documents: ${count}`);

            // Get sample document structure (first document)
            if (count > 0) {
              const sample = await coll.findOne();
              const fields = Object.keys(sample || {}).slice(0, 5); // First 5 fields
              if (fields.length > 0) {
                console.log(`      └─ Sample fields: ${fields.join(', ')}${fields.length < Object.keys(sample).length ? '...' : ''}`);
              }
            }
            console.log('');
          } catch (error) {
            console.log(`      └─ ⚠️  Unable to query (permission issue)`);
            console.log('');
          }
        }
      }

      console.log('   ─────────────────────────────────────────────────────────────────────────');
    }

    console.log('\n═══════════════════════════════════════════════════════════════════════════════');
    console.log('\n💖 NEKO TV MONGODB ATLAS EXPLORATION COMPLETE, NYAA~! ✨\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPlease verify:');
    console.error('  1. MONGODB_URI is correct in .env file');
    console.error('  2. MongoDB Atlas cluster is running');
    console.error('  3. Network connection is stable\n');
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, desu~!\n');
  }
}

showNekoTV();
