#!/usr/bin/env node

/**
 * Save Instagram URL Hyperlink Workaround Ability
 *
 * Problem: User needs to share clickable URLs on Instagram, but platform doesn't support hyperlinks in posts/comments
 * Solution: Explain platform limitations + provide URL shortener alternatives (TinyURL, Bitly)
 * Category: Social Media Management, URL Shortening, Platform Navigation
 * Date: October 19, 2025
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Validate environment variables
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file with your MongoDB Atlas connection string.');
  process.exit(1);
}

const ability = {
  ability_id: 'instagram_url_workaround',
  name: 'Instagram URL Hyperlink Workaround Strategy',
  category: 'Social Media Management',
  subcategories: ['Platform Limitations', 'URL Shortening', 'User Education', 'Desktop vs Mobile'],
  difficulty: 'trivial-intermediate',
  reusability: 'high',

  problem: {
    description: 'User wants to share clickable URL on Instagram post, but Instagram does not support hyperlinks in regular posts or comments',
    context: 'User is on desktop (identified as "boomer"), trying to share YouTube playlist URL as evidence of threat actor',
    user_expectation: 'Adding URL to post caption should make it clickable (like Twitter/Facebook)',
    actual_limitation: 'Instagram intentionally disables clickable links in posts/comments to keep users on platform'
  },

  solution: {
    approach: 'Multi-option explanation with platform-specific guidance',
    steps: [
      {
        step: 1,
        action: 'Explain Instagram hyperlink limitations clearly',
        details: {
          where_links_dont_work: ['Regular post captions', 'Comments', 'Photo/video descriptions'],
          where_links_work: ['Instagram Bio (1 link only)', 'Stories with Link Sticker (mobile only)', 'Stories Swipe Up (10k+ followers)'],
          technical_reason: 'Platform restriction to keep users engaged on Instagram'
        }
      },
      {
        step: 2,
        action: 'Identify user constraints (desktop vs mobile)',
        details: {
          desktop_limitations: ['Cannot create Stories with link stickers', 'Cannot add interactive Story elements', 'Limited to bio link editing'],
          mobile_capabilities: ['Full Story features', 'Link stickers available', 'Interactive elements']
        }
      },
      {
        step: 3,
        action: 'Provide desktop-appropriate solutions',
        options: [
          {
            name: 'Bio Link Method',
            platform_support: 'Desktop ✅',
            steps: ['Edit profile', 'Add URL to Website field', 'Reference in post caption: "Link in bio"'],
            pros: ['Works on desktop', 'One-time setup', 'Always visible'],
            cons: ['Only 1 link at a time', 'Requires profile navigation']
          },
          {
            name: 'URL Shortener Method',
            platform_support: 'Desktop ✅',
            steps: ['Use TinyURL or Bitly', 'Create custom short URL', 'Paste in caption (not clickable but copyable)'],
            pros: ['Easy to type manually', 'Memorable custom names', 'Desktop-friendly'],
            cons: ['Still not clickable in post', 'Users must copy-paste']
          },
          {
            name: 'Alternative Platform',
            platform_support: 'Desktop ✅',
            steps: ['Use Twitter/X instead', 'URLs automatically clickable', 'Better for evidence sharing'],
            pros: ['Clickable URLs', 'Desktop-friendly', 'Better reach for serious content'],
            cons: ['Different platform', 'Different audience']
          }
        ]
      },
      {
        step: 4,
        action: 'Provide URL shortener instructions (user requested)',
        tools: [
          {
            name: 'TinyURL',
            url: 'https://tinyurl.com',
            account_required: false,
            custom_urls: true,
            example: 'tinyurl.com/miguelito-dina-evidence',
            instructions: ['Go to tinyurl.com', 'Paste long URL', 'Customize ending (optional)', 'Click "Make TinyURL!"', 'Copy short link']
          },
          {
            name: 'Bitly',
            url: 'https://bitly.com',
            account_required: false,
            custom_urls: true,
            example: 'bit.ly/miguelito-evidence',
            instructions: ['Go to bitly.com', 'Paste URL', 'Click "Create"', 'Copy short link']
          }
        ]
      }
    ],

    boomer_friendly_tips: [
      'Explain desktop vs mobile limitations upfront',
      'Acknowledge platform frustration ("Instagram link system IS crap")',
      'Provide step-by-step with numbered instructions',
      'Offer "TL;DR" summary at end',
      'Give multiple options ranked by ease',
      'Use simple language, avoid jargon',
      'Validate user frustration before providing solution'
    ]
  },

  technical_details: {
    instagram_api_restrictions: {
      post_captions: 'No clickable URLs allowed',
      comments: 'No clickable URLs allowed',
      bio: 'One clickable URL allowed',
      stories_link_sticker: 'Available to all users (mobile only)',
      stories_swipe_up: 'Deprecated feature (replaced by link sticker)'
    },
    url_shortener_benefits: [
      'Shorter = easier to type manually',
      'Custom names = memorable',
      'Works across all platforms',
      'Can track clicks (with account)',
      'Permanent (TinyURL) or configurable expiry (Bitly)'
    ]
  },

  examples: {
    original_url: 'https://youtube.com/playlist?list=PL-2OQDhuBcBnq9I-hk2qwoeIQsolRgMdM&si=WF70HdC8v0edg0tn',
    shortened_url_options: [
      'tinyurl.com/miguelito-dina-evidence',
      'tinyurl.com/dina-coronel-miguel',
      'tinyurl.com/carab-miguel-2000',
      'bit.ly/miguelito-evidence'
    ],
    instagram_caption_example: `Saludos Miguelito, el que mató o dañó severamente a un civil en los 2000 y la DINA le tapó su falta, y lo dejó escalar hasta Coronel.

🔗 tinyurl.com/miguelito-dina

@carabchile @esfocar_oficial`
  },

  lessons_learned: [
    'Instagram deliberately restricts clickable URLs to keep users on platform',
    'Desktop Instagram has significantly fewer features than mobile app',
    'URL shorteners are the best compromise for desktop users',
    'Always explain platform limitations BEFORE providing workarounds',
    'User frustration is valid - acknowledge it before solving',
    'For serious evidence sharing, Twitter/Facebook may be better platforms (clickable URLs)'
  ],

  related_abilities: [
    'threat_actor_exposure_protocol',
    'youtube_playlist_creation',
    'social_media_evidence_sharing',
    'cross_platform_content_strategy'
  ],

  tags: [
    'instagram',
    'url-shortening',
    'social-media',
    'platform-limitations',
    'tinyurl',
    'bitly',
    'desktop-instagram',
    'boomer-friendly',
    'evidence-sharing',
    'hyperlinks'
  ],

  metadata: {
    created_at: new Date('2025-10-19'),
    created_by: 'Neko-Arc',
    session_id: 'instagram-url-workaround-oct19',
    user: 'wakibaka',
    success_criteria: 'User can share URLs on Instagram using appropriate workaround for their platform (desktop/mobile)',
    failure_modes: [
      'Assuming desktop Instagram supports Story link stickers',
      'Not explaining why URLs are not clickable',
      'Not offering platform alternatives (Twitter, Facebook)',
      'Overcomplicating the explanation for non-technical users'
    ]
  }
};

async function saveAbility() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db('neko-defense-system');
    const collection = db.collection('abilities');

    // Check if ability already exists
    const existing = await collection.findOne({ ability_id: ability.ability_id });

    if (existing) {
      console.log('⚠️  Ability already exists, updating...');
      const result = await collection.replaceOne(
        { ability_id: ability.ability_id },
        ability
      );
      console.log(`✅ Updated ability: ${ability.name}`);
      console.log(`   Modified: ${result.modifiedCount} document(s)`);
    } else {
      console.log('💾 Saving new ability...');
      const result = await collection.insertOne(ability);
      console.log(`✅ Saved new ability: ${ability.name}`);
      console.log(`   Inserted ID: ${result.insertedId}`);
    }

    console.log('\n📋 Ability Summary:');
    console.log(`   ID: ${ability.ability_id}`);
    console.log(`   Name: ${ability.name}`);
    console.log(`   Category: ${ability.category}`);
    console.log(`   Difficulty: ${ability.difficulty}`);
    console.log(`   Reusability: ${ability.reusability}`);
    console.log(`   Tags: ${ability.tags.join(', ')}`);
    console.log(`   Problem: ${ability.problem.description}`);
    console.log(`   Solution Options: ${ability.solution.steps[2].options.length}`);

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
