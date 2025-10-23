#!/usr/bin/env node

/**
 * 📚 CASE PATTERN: MCP MongoDB Atlas Connection Fix
 *
 * Pattern for fixing MCP MongoDB localhost ECONNREFUSED errors
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://badactordestroyer:vlB3Ga8tf0ah9jeA@free-cluster.svjei3w.mongodb.net/neko-defense-system';

const casePattern = {
  pattern_id: 'mcp-mongodb-atlas-fix-oct19',
  name: 'MCP MongoDB Atlas Connection Fix',
  category: 'System Configuration',
  difficulty: 'intermediate',
  reusability: 'high',

  problem: 'MCP MongoDB tools attempting localhost:27017 connection causing ECONNREFUSED errors flooding terminal output',

  symptoms: [
    'ECONNREFUSED 127.0.0.1:27017 errors in terminal',
    'mcp__mongodb__findDocuments fails',
    'mcp__mongodb__countDocuments fails',
    'All MCP MongoDB tools unusable',
    'Terminal polluted with connection error messages'
  ],

  root_cause: {
    issue: 'MCP MongoDB server defaults to localhost if MONGODB_URI not configured correctly',
    config_location: '~/.claude.json',
    missing_config: 'MONGODB_URI environment variable in mcpServers.mongodb.env',
    impact: 'All MCP MongoDB operations fail, terminal spam, unprofessional appearance'
  },

  solution: {
    approach: 'Configure ~/.claude.json with MongoDB Atlas connection string',

    steps: [
      {
        step: 1,
        action: 'Check current MCP configuration',
        command: 'grep -A 10 "mongodb" ~/.claude.json',
        expected: 'Should show MONGODB_URI with mongodb+srv:// URI'
      },
      {
        step: 2,
        action: 'Edit ~/.claude.json if incorrect',
        command: 'nano ~/.claude.json',
        changes: 'Add or update MONGODB_URI in mcpServers.mongodb.env'
      },
      {
        step: 3,
        action: 'Add Atlas connection string',
        config: {
          "mcpServers": {
            "mongodb": {
              "command": "npx",
              "args": ["-y", "@harryelv/mongodb-mcp-server"],
              "env": {
                "MONGODB_URI": "mongodb+srv://user:pass@cluster.mongodb.net/",
                "MONGODB_DATABASE": "neko-defense-system"
              }
            }
          }
        }
      },
      {
        step: 4,
        action: 'Create IMMUTABLE rule in CLAUDE.md',
        file: '~/CLAUDE.md',
        rule: 'Rule 3.5: MCP MongoDB Atlas Connection Protocol',
        enforcement: 'STOP using MCP tools if ECONNREFUSED appears, use direct MongoClient'
      },
      {
        step: 5,
        action: 'Use direct MongoClient as backup',
        code: `
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
// Query directly without MCP
        `
      }
    ],

    alternative_solution: {
      approach: 'Use direct MongoDB connection instead of MCP',
      when: 'MCP configuration cannot be fixed or unreliable',
      benefit: 'More reliable, works regardless of MCP config',
      code_template: '~/Documents/github/neko-defense-dashboard/analyze-vercel-scan-errors.js'
    }
  },

  verification: {
    test_command: 'mcp__mongodb__findDocuments with simple query',
    success_indicator: 'No ECONNREFUSED errors, query returns data',
    failure_indicator: 'ECONNREFUSED errors persist',
    fallback: 'Use direct MongoClient connection instead'
  },

  prevention: {
    rule_created: 'Rule 3.5 in CLAUDE.md',
    behavioral_change: 'Always use direct MongoClient for production, MCP as convenience tool only',
    enforcement: 'Immediate stop of MCP usage if ECONNREFUSED appears',
    documentation: 'Comprehensive 260-line rule with examples and alternatives'
  },

  when_to_use: [
    'MCP MongoDB tools failing with ECONNREFUSED',
    'Terminal showing connection refused errors',
    'Setting up new Claude Code environment',
    'After Claude Code updates that reset config',
    'Teaching others about MCP MongoDB configuration',
    'Debugging MongoDB connection issues'
  ],

  files_modified: [
    {
      file: '~/.claude.json',
      change: 'Added/updated MONGODB_URI in mcpServers.mongodb.env',
      backup: 'Always backup before editing'
    },
    {
      file: '~/CLAUDE.md',
      change: 'Added Rule 3.5: MCP MongoDB Atlas Connection Protocol',
      lines_added: 260
    }
  ],

  key_insights: [
    'MCP tools are convenience wrappers, not production-critical',
    'Direct MongoClient is more reliable than MCP',
    'ECONNREFUSED = configuration issue, not code bug',
    'Always have direct connection alternative ready',
    'Terminal pollution degrades user experience',
    'Immutable rules prevent repeated mistakes'
  ],

  lessons_learned: [
    'Check ~/.claude.json before using MCP tools',
    'Default to direct MongoClient for important operations',
    'Document configuration requirements clearly',
    'Create enforcement mechanisms (rules) for common issues',
    'Always provide alternative approaches in documentation',
    'User experience matters - clean terminal output is professional'
  ],

  related_patterns: [
    'Environment variable configuration',
    'Fallback strategies for unreliable tools',
    'Configuration management best practices',
    'Error handling for external dependencies'
  ],

  impact: {
    before: 'ECONNREFUSED errors every time MCP tools used, terminal spam, unprofessional',
    after: 'Clean execution, no errors, professional appearance, clear guidance',
    prevention: 'Rule 3.5 ensures this never happens again'
  },

  statistics: {
    rule_lines: 260,
    subsections: 10,
    code_examples: 8,
    time_to_implement: '~30 minutes',
    future_occurrences_prevented: 'All future sessions'
  },

  tags: [
    'mcp',
    'mongodb',
    'atlas',
    'configuration',
    'econnrefused',
    'localhost',
    'claude-code',
    'system-config',
    'error-prevention',
    'behavioral-rule'
  ],

  created_at: new Date('2025-10-19T16:00:00Z'),
  session_context: 'Puppeteer silent scanning session revealed MCP localhost issues',
  user: 'wakibaba',
  status: 'solved'
};

async function savePattern() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('🐾 Connected to MongoDB Atlas, nyaa~!\n');

    const db = client.db('neko-defense-system');
    const collection = db.collection('case-patterns');

    // Check if pattern exists
    const existing = await collection.findOne({ pattern_id: casePattern.pattern_id });

    if (existing) {
      console.log('⚠️  Pattern already exists! Updating...\n');
      await collection.replaceOne(
        { pattern_id: casePattern.pattern_id },
        casePattern
      );
      console.log('✅ Pattern UPDATED successfully!');
    } else {
      await collection.insertOne(casePattern);
      console.log('✅ Pattern SAVED successfully!');
    }

    console.log('\n📊 CASE PATTERN SUMMARY');
    console.log('════════════════════════════════════════════════════════════');
    console.log(`🆔 Pattern ID: ${casePattern.pattern_id}`);
    console.log(`📛 Name: ${casePattern.name}`);
    console.log(`📁 Category: ${casePattern.category}`);
    console.log(`🎯 Difficulty: ${casePattern.difficulty}`);
    console.log(`♻️  Reusability: ${casePattern.reusability}`);
    console.log(`\n💡 Problem: ${casePattern.problem}`);
    console.log(`\n🔍 Symptoms: ${casePattern.symptoms.length} symptoms documented`);
    console.log(`✨ Solution Steps: ${casePattern.solution.steps.length} steps`);
    console.log(`\n📝 Files Modified: ${casePattern.files_modified.length} files`);
    console.log(`📈 Impact: ${casePattern.impact.after}`);
    console.log(`\n🏷️  Tags: ${casePattern.tags.slice(0, 5).join(', ')}...`);
    console.log('════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error saving pattern:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, desu~!\n');
  }
}

savePattern().catch(console.error);
