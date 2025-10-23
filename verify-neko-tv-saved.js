#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

async function verify() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('neko-defense-system');

    console.log('🔍 Verifying Neko TV session was saved...\n');

    // Check hunt-conversations
    const conversation = await db.collection('hunt-conversations').findOne({
      session_id: 'neko-tv-creation-oct19-2025'
    });

    if (conversation) {
      console.log('✅ Hunt conversation found!');
      console.log(`   📋 Title: ${conversation.title}`);
      console.log(`   📅 Date: ${conversation.date}`);
      console.log(`   🎯 Category: ${conversation.category}`);
      console.log(`   📊 Files created: ${conversation.technical_details.files_created.length}`);
    } else {
      console.log('❌ Hunt conversation NOT found!');
    }

    // Check abilities
    const ability = await db.collection('abilities').findOne({
      ability_id: 'animated-terminal-db-visualization-oct19'
    });

    if (ability) {
      console.log('\n✅ Ability found!');
      console.log(`   📋 Name: ${ability.name}`);
      console.log(`   🎯 Category: ${ability.category}`);
      console.log(`   ⚡ Reusability: ${ability.reusability}`);
      console.log(`   💡 Applicable to: ${ability.applicable_to.length} use cases`);
    } else {
      console.log('\n❌ Ability NOT found!');
    }

    // Count total documents in each collection
    const huntCount = await db.collection('hunt-conversations').countDocuments();
    const abilityCount = await db.collection('abilities').countDocuments();

    console.log('\n📊 COLLECTION TOTALS:');
    console.log(`   📝 hunt-conversations: ${huntCount} documents`);
    console.log(`   🎯 abilities: ${abilityCount} documents`);

    console.log('\n💖 Verification complete, desu~!\n');

  } finally {
    await client.close();
  }
}

verify();
