#!/usr/bin/env node

/**
 * Save Facebook Username Creation Ability to MongoDB
 *
 * Case: User requests help creating a valid Facebook username
 *
 * Pattern: Creative naming with platform constraint validation
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Validate environment variables
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file with your MongoDB connection string.');
  process.exit(1);
}

const newAbility = {
  case_name: 'bro_create_me_valid_facebook_name',
  display_name: 'Facebook Username Creation Assistant',
  category: 'Creative Naming & Platform Validation',

  problem_statement: `User wants to create a Facebook username but needs help ensuring it:
- Meets platform requirements (alphanumeric, 5+ chars, no special chars)
- Reflects their personality or profession
- Is memorable and unique
- Possibly contains technical/cultural references`,

  context: `User may have:
- A specific theme/concept in mind (e.g., "FalsePromisePipeline")
- Professional identity to reflect (developer, designer, etc.)
- Cultural references to incorporate
- Need for multiple alternatives`,

  solution_approach: `1. **Understand Platform Constraints**:
   - Facebook allows: Alphanumeric (A-Z, 0-9) and periods (.)
   - Minimum 5 characters
   - No spaces or special characters (@, #, $, etc.)
   - No generic terms or extensions (.com, .net)

2. **Analyze User's Original Idea**:
   - Validate against platform rules
   - Identify the core theme/meaning
   - Extract key concepts

3. **Generate Creative Alternatives**:
   - Original suggestion with validation
   - Technical variations (if developer)
   - Philosophical/poetic variations
   - Pun-based alternatives (if applicable)
   - Period-separated variations

4. **Provide Reasoned Recommendations**:
   - Explain WHY each suggestion works
   - Highlight strengths (memorable, technical, unique)
   - Explain cultural/technical references
   - Recommend top 1-2 choices with reasoning

5. **Respect User's Original Vision**:
   - If their original choice is valid, support it!
   - Show how it meets requirements
   - Provide alternatives as options, not replacements`,

  example_interaction: {
    user_request: "bro review this page then, suggest me an nickname, i wanna be FalsePromisePipeline",

    neko_response_steps: [
      "1. Attempt to fetch Facebook username rules (or use cached knowledge)",
      "2. Validate user's original choice: 'FalsePromisePipeline'",
      "3. Analyze meaning: CI/CD reference + cynical philosophy",
      "4. Generate alternatives with different themes",
      "5. Provide reasoned recommendation with top picks"
    ],

    alternatives_generated: [
      {
        username: "FalsePromisePipeline",
        reason: "Original choice - technical, philosophical, memorable",
        validation: "VALID ✅"
      },
      {
        username: "AsyncFalsePromise",
        reason: "JavaScript pun (async + Promise.reject())",
        validation: "VALID ✅"
      },
      {
        username: "PromisePipelineFails",
        reason: "More direct, CI/CD reference",
        validation: "VALID ✅"
      },
      {
        username: "PipelineOfBrokenDreams",
        reason: "Poetic and darkly humorous",
        validation: "VALID ✅"
      },
      {
        username: "Pipeline.FalsePromise",
        reason: "Period separator for emphasis",
        validation: "VALID ✅"
      }
    ],

    recommendation: "Stick with 'FalsePromisePipeline' - technically credible, philosophically edgy, conversation starter"
  },

  key_principles: [
    "Validate against platform rules FIRST",
    "Respect user's original creative vision",
    "Provide alternatives with REASONING (not just random names)",
    "Incorporate user's profession/interests (developer = technical references)",
    "Make it memorable and conversation-worthy",
    "If dealing with developer, include code/tech puns when appropriate"
  ],

  platform_specific_rules: {
    facebook: {
      allowed_characters: "A-Z, a-z, 0-9, periods (.)",
      min_length: 5,
      max_length: 50,
      disallowed: "Spaces, @#$%^&*()+={}[]|\\:;\"'<>?,/",
      no_generic_terms: true,
      no_extensions: [".com", ".net", ".org"]
    },
    // Can extend for other platforms
    twitter: {
      allowed_characters: "A-Z, a-z, 0-9, underscores (_)",
      min_length: 1,
      max_length: 15,
      note: "No periods allowed on Twitter"
    },
    instagram: {
      allowed_characters: "A-Z, a-z, 0-9, underscores (_), periods (.)",
      min_length: 1,
      max_length: 30,
      note: "Cannot have consecutive periods"
    }
  },

  creative_techniques: [
    "Tech puns (async, Promise, Pipeline, Deploy, Merge, Commit)",
    "Philosophical concepts (FalsePromise, BrokenDreams, AsyncReality)",
    "Industry references (DevOps, CI/CD, Kubernetes, Docker)",
    "Period separators for emphasis (Pipeline.Dreams, False.Promise)",
    "Camel case for readability (FalsePromisePipeline)",
    "Cultural references specific to user's background"
  ],

  validation_checklist: [
    "✅ Meets platform character requirements",
    "✅ Minimum length satisfied",
    "✅ No disallowed special characters",
    "✅ Reflects user's personality/profession",
    "✅ Memorable and unique",
    "✅ Easy to type and share"
  ],

  reusability: 'high',
  difficulty: 'trivial',

  tags: [
    'creative-naming',
    'platform-validation',
    'facebook',
    'username-generation',
    'branding',
    'developer-identity',
    'technical-puns'
  ],

  related_abilities: [
    'Domain name generation',
    'GitHub username creation',
    'Brand name validation',
    'Social media handle consistency'
  ],

  neko_personality_notes: `
- Use creative excitement (*purrs with creative excitement*)
- Analyze with technical lens (especially for developer users)
- Provide reasoning for EVERY suggestion (not just random names)
- Support user's original choice if valid (don't force alternatives)
- Use emojis to categorize suggestions (🔥, ✅, 💭, 🎯)
- End with a question asking user which they prefer
- Celebrate good creative choices!`,

  metadata: {
    created_date: new Date('2025-10-19'),
    last_used: new Date('2025-10-19'),
    times_referenced: 1,
    success_rate: 1.0,
    user_satisfaction: 'high',
    session_id: 'facebook-username-oct19'
  }
};

async function saveAbility() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🐾 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    const db = client.db('neko-defense-system');
    const collection = db.collection('case-patterns');

    // Check if ability already exists
    const existing = await collection.findOne({
      case_name: newAbility.case_name
    });

    if (existing) {
      console.log('📝 Ability already exists! Updating...');
      const result = await collection.updateOne(
        { case_name: newAbility.case_name },
        {
          $set: {
            ...newAbility,
            'metadata.last_updated': new Date(),
            'metadata.times_referenced': (existing.metadata?.times_referenced || 0) + 1
          }
        }
      );
      console.log(`✅ Updated ability: ${newAbility.display_name}`);
    } else {
      console.log('💾 Saving new ability to case-patterns collection...');
      const result = await collection.insertOne(newAbility);
      console.log(`✅ Ability saved with ID: ${result.insertedId}`);
    }

    console.log('\n════════════════════════════════════════════════════════════════');
    console.log('🎯 NEW NEKO-ARC ABILITY ACQUIRED!');
    console.log('════════════════════════════════════════════════════════════════');
    console.log(`📋 Case Name: ${newAbility.case_name}`);
    console.log(`✨ Display Name: ${newAbility.display_name}`);
    console.log(`📂 Category: ${newAbility.category}`);
    console.log(`🎚️ Reusability: ${newAbility.reusability}`);
    console.log(`⚡ Difficulty: ${newAbility.difficulty}`);
    console.log(`🏷️ Tags: ${newAbility.tags.join(', ')}`);
    console.log('════════════════════════════════════════════════════════════════');
    console.log('\n💖 ABILITY LEARNED, NYAA~! ✨\n');

    // Show total abilities count
    const totalAbilities = await collection.countDocuments();
    console.log(`📚 Total Abilities in Database: ${totalAbilities}`);

  } catch (error) {
    console.error('❌ Error saving ability:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🐾 Connection closed, desu~!');
  }
}

// Execute
saveAbility();
