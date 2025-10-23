#!/usr/bin/env node

/**
 * 🔍 ENRICH: Puppeteer Silent Scanning Ability
 *
 * Add session context and practical examples to ability document
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://badactordestroyer:vlB3Ga8tf0ah9jeA@free-cluster.svjei3w.mongodb.net/neko-defense-system';

async function enrichAbility() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('🐾 Connected to MongoDB Atlas, nyaa~!\n');

    const db = client.db('neko-defense-system');
    const collection = db.collection('abilities');

    const enrichment = {
      $set: {
        'enrichment.session_reference': 'puppeteer-silent-scanning-oct19',
        'enrichment.practical_examples': [
          {
            scenario: 'Vercel deployment with missing backend',
            solution_steps: [
              'Run silent Puppeteer scan: node neko-puppeteer-vercel-silent-scanner.js',
              'Analyze errors: node analyze-vercel-scan-errors.js',
              'Identify root cause: HTTP 401 = missing backend API',
              'Create Next.js API routes in app/api/',
              'Deploy to GitHub, Vercel auto-deploys',
              'Re-run scanner to verify 0 errors'
            ],
            time_saved: '2+ hours of manual testing'
          },
          {
            scenario: 'Production errors invisible to normal monitoring',
            solution_steps: [
              'Schedule silent scan via cron: 0 0 * * * node scanner.js',
              'Errors saved to MongoDB automatically',
              'Query error trends over time',
              'Alert team if error count spikes',
              'Historical data enables root cause analysis'
            ],
            time_saved: 'Proactive detection before user complaints'
          }
        ],
        'enrichment.code_templates': {
          silent_scanner: 'neko-defense-dashboard/neko-puppeteer-vercel-silent-scanner.js',
          error_collector: 'neko-defense-dashboard/puppeteer-error-collector.js',
          error_analyzer: 'neko-defense-dashboard/analyze-vercel-scan-errors.js',
          api_route_example: 'neko-defense-dashboard/app/api/threat-actors/route.js'
        },
        'enrichment.mongodb_queries': {
          'Get latest scan': 'db.getCollection("puppeteer-session-summaries").find({}).sort({timestamp: -1}).limit(1)',
          'Count errors by type': 'db.getCollection("puppeteer-error-collections").aggregate([{$match: {session_id: "SESSION_ID"}}, {$group: {_id: "$error_type", count: {$sum: 1}}}])',
          'Find HTTP 401 errors': 'db.getCollection("puppeteer-error-collections").find({http_status: 401})'
        },
        'enrichment.troubleshooting': [
          {
            issue: 'Scanner fails with waitForTimeout error',
            fix: 'Replace waitForTimeout() with setTimeout()',
            code: 'await new Promise(resolve => setTimeout(resolve, 2000))'
          },
          {
            issue: 'All routes failing with HTTP 401',
            cause: 'Backend API not deployed or env vars missing',
            fix: 'Create Next.js API routes or configure environment variables'
          },
          {
            issue: 'ECONNREFUSED when saving to MongoDB',
            cause: 'MCP trying localhost instead of Atlas',
            fix: 'Use direct MongoClient with process.env.MONGODB_URI'
          }
        ],
        'enrichment.real_world_results': {
          deployment: 'neko-defense-dashboard on Vercel',
          errors_before: 46,
          errors_after: 0,
          scan_time: '~30 seconds',
          fix_time: '~2 hours',
          documents_saved: 47,
          routes_tested: 8
        },
        'enrichment.related_rules': [
          'Rule 3.5: MCP MongoDB Atlas Connection Protocol',
          'Rule 3.1: Puppeteer Visual Demonstration Protocol',
          'Rule 3.2: Credential Security Protocol',
          'Rule 3.3: GitHub Repository Privacy Protocol'
        ],
        enriched_at: new Date(),
        enriched_by: 'neko-arc'
      }
    };

    const result = await collection.updateOne(
      { ability_id: 'puppeteer-silent-scanning-oct19' },
      enrichment
    );

    if (result.modifiedCount > 0) {
      console.log('✅ ABILITY ENRICHED SUCCESSFULLY!\n');
      console.log('📊 ENRICHMENT SUMMARY');
      console.log('════════════════════════════════════════════════════════════');
      console.log('🆔 Ability ID: puppeteer-silent-scanning-oct19');
      console.log('\n✨ Added:');
      console.log('   - Session reference');
      console.log('   - 2 practical examples');
      console.log('   - 4 code templates');
      console.log('   - 3 MongoDB queries');
      console.log('   - 3 troubleshooting tips');
      console.log('   - Real-world results (46 errors → 0)');
      console.log('   - 4 related rules');
      console.log('════════════════════════════════════════════════════════════\n');
    } else {
      console.log('⚠️  No changes made (ability may not exist or already enriched)\n');
    }

  } catch (error) {
    console.error('❌ Error enriching ability:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, desu~!\n');
  }
}

enrichAbility().catch(console.error);
