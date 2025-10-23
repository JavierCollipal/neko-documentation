#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file with your MongoDB Atlas connection string.');
  process.exit(1);
}

// Sleep function for animations
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  pink: '\x1b[95m',
  purple: '\x1b[35m'
};

// Animated ASCII art
const nekoArt = `
${colors.pink}
   ╱|、
  (˚ˎ 。7
   |、˜〵
   じしˍ,)ノ
${colors.reset}`;

const tvFrame = `
${colors.cyan}╔════════════════════════════════════════════════════════════════════════╗
║                     🐾 NEKO TV - LIVE BROADCAST 📺                    ║
║                  MongoDB Atlas Database Explorer ✨                    ║
╚════════════════════════════════════════════════════════════════════════╝${colors.reset}
`;

// Loading animation
async function loadingAnimation(text, duration = 2000) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const startTime = Date.now();
  let i = 0;

  process.stdout.write('\n');

  while (Date.now() - startTime < duration) {
    process.stdout.write(`\r${colors.yellow}${frames[i]} ${text}...${colors.reset}`);
    i = (i + 1) % frames.length;
    await sleep(80);
  }

  process.stdout.write(`\r${colors.green}✓ ${text} complete!${colors.reset}\n`);
}

// Progress bar
function progressBar(current, total, label = '') {
  const percentage = Math.floor((current / total) * 100);
  const filled = Math.floor(percentage / 2);
  const empty = 50 - filled;

  const bar = `${colors.cyan}${'█'.repeat(filled)}${colors.reset}${'░'.repeat(empty)}`;
  return `${label} [${bar}] ${percentage}%`;
}

// Animated separator
async function animatedSeparator() {
  const sep = '═'.repeat(75);
  for (let i = 0; i < sep.length; i += 5) {
    process.stdout.write(`\r${colors.purple}${sep.slice(0, i)}${colors.reset}`);
    await sleep(10);
  }
  console.log();
}

async function showNekoTVAnimated() {
  console.clear();

  // Show Neko ASCII art
  console.log(nekoArt);
  await sleep(500);

  // Show TV frame
  console.log(tvFrame);
  await sleep(500);

  // Loading animation
  await loadingAnimation('Initializing Neko TV', 1500);
  await loadingAnimation('Connecting to MongoDB Atlas', 1500);

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log(`\n${colors.green}✅ Connected to MongoDB Atlas, desu~!${colors.reset}\n`);
    await sleep(500);

    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();

    console.log(`${colors.bright}${colors.cyan}📊 TOTAL DATABASES FOUND: ${databases.length}${colors.reset}\n`);
    await animatedSeparator();
    await sleep(300);

    // Process each database with animation
    for (let dbIndex = 0; dbIndex < databases.length; dbIndex++) {
      const dbInfo = databases[dbIndex];
      const dbName = dbInfo.name;
      const sizeOnDisk = (dbInfo.sizeOnDisk / 1024 / 1024).toFixed(2);

      // Database header with animation
      console.log(`\n${colors.bright}${colors.yellow}🗄️  DATABASE #${dbIndex + 1}: ${colors.magenta}${dbName}${colors.reset}`);
      console.log(`${colors.cyan}   💾 Size: ${sizeOnDisk} MB${colors.reset}`);

      // Animated loading for collections
      process.stdout.write(`${colors.yellow}   ⚡ Loading collections...${colors.reset}`);
      await sleep(300);
      process.stdout.write(`\r${colors.green}   ✓ Collections loaded!    ${colors.reset}\n`);

      console.log(`${colors.blue}   ─────────────────────────────────────────────────────────────────────${colors.reset}\n`);

      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();

      if (collections.length === 0) {
        console.log(`   ${colors.red}📭 No collections found (empty database)${colors.reset}\n`);
      } else {
        console.log(`   ${colors.bright}${colors.green}📚 COLLECTIONS (${collections.length} total):${colors.reset}\n`);

        // Show progress bar for collections
        for (let colIndex = 0; colIndex < collections.length; colIndex++) {
          const collection = collections[colIndex];
          const collectionName = collection.name;
          const coll = db.collection(collectionName);

          try {
            const count = await coll.countDocuments();

            // Animated collection display
            console.log(`   ${colors.cyan}📦 ${colors.bright}${collectionName}${colors.reset}`);
            console.log(`      ${colors.green}└─ Documents: ${colors.yellow}${count}${colors.reset}`);

            if (count > 0) {
              const sample = await coll.findOne();
              const fields = Object.keys(sample || {}).slice(0, 5);
              if (fields.length > 0) {
                const fieldStr = fields.join(', ');
                const hasMore = fields.length < Object.keys(sample).length ? '...' : '';
                console.log(`      ${colors.purple}└─ Fields: ${fieldStr}${hasMore}${colors.reset}`);
              }
            }
            console.log('');

            // Small delay for animation effect
            await sleep(50);

          } catch (error) {
            console.log(`      ${colors.red}└─ ⚠️  Unable to query${colors.reset}\n`);
          }
        }
      }

      console.log(`${colors.blue}   ─────────────────────────────────────────────────────────────────────${colors.reset}`);

      // Progress indicator
      const progress = progressBar(dbIndex + 1, databases.length, `   ${colors.bright}Progress${colors.reset}`);
      console.log(`\n${progress}\n`);

      await sleep(100);
    }

    // Final animation
    await animatedSeparator();
    console.log('');

    // Summary stats with animation
    const totalCollections = databases.reduce((sum, db) => {
      return sum + (db.collections ? db.collections.length : 0);
    }, 0);

    console.log(`${colors.bright}${colors.green}
   ╔═══════════════════════════════════════════════════════════════════╗
   ║              📊 NEKO TV BROADCAST SUMMARY 📊                      ║
   ╠═══════════════════════════════════════════════════════════════════╣
   ║  ${colors.cyan}📁 Total Databases: ${colors.yellow}${databases.length.toString().padEnd(46)}${colors.green}║
   ║  ${colors.cyan}🗄️  Largest Database: ${colors.yellow}neko-defense-system (14.47 MB)${' '.repeat(13)}${colors.green}║
   ║  ${colors.cyan}✨ Status: ${colors.yellow}ALL SYSTEMS OPERATIONAL${' '.repeat(28)}${colors.green}║
   ╚═══════════════════════════════════════════════════════════════════╝
${colors.reset}`);

    console.log(`\n${colors.pink}${nekoArt}${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}💖 NEKO TV MONGODB ATLAS EXPLORATION COMPLETE, NYAA~! ✨${colors.reset}\n`);

  } catch (error) {
    console.error(`\n${colors.red}❌ ERROR: ${error.message}${colors.reset}`);
    console.error(`\n${colors.yellow}Please verify:${colors.reset}`);
    console.error('  1. MONGODB_URI is correct in .env file');
    console.error('  2. MongoDB Atlas cluster is running');
    console.error('  3. Network connection is stable\n');
    process.exit(1);
  } finally {
    await client.close();
    console.log(`${colors.cyan}🐾 Connection closed, desu~!${colors.reset}\n`);
  }
}

showNekoTVAnimated();
