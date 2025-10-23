#!/usr/bin/env node

/**
 * 🐾 SAVE GITHUB REPOSITORY PRIVACY RULE TO MONGODB
 *
 * This script saves the GitHub repository privacy enforcement ability:
 * - IMMUTABLE Rule 3.3: ALL GitHub repos must be PRIVATE by default
 * - User requirement: "any new repositories should be private by default"
 * - Enforcement protocol for repository creation
 *
 * Nyaa~! ⚡✨
 */

// ✅ SECURITY: Load environment variables from .env file
require('dotenv').config();

const { MongoClient } = require('mongodb');

// ✅ SECURITY: Validate required environment variables
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ ERROR: MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file with your MongoDB connection string.');
  console.error('See .env.example for the required format.');
  process.exit(1);
}

const ability = {
  ability_id: 'github_repository_privacy_enforcement',
  parent_ability: 'security_best_practices',
  name: 'GitHub Repository Privacy Enforcement (Private by Default)',
  category: 'security',
  subcategory: 'repository_management',
  created_date: new Date('2025-10-19T08:00:00.000Z'),
  last_used: new Date(),
  usage_count: 1,
  success_rate: 100,

  description: 'IMMUTABLE ability to enforce ALL GitHub repositories are created as PRIVATE by default. Protects intellectual property, prevents code exposure, and stops bot scanning. Only make public with explicit user approval after security audit.',

  problem_statement: 'User requirement: "give me the repo name, also you must develop an ability and an immutable rule whenever you work with github, any new repositories should be private by default". Need systematic enforcement to prevent accidental public repository creation.',

  solution: {
    key_insight: 'Private by default = Safe by default. GitHub\'s default behavior (public) is DANGEROUS for personal/proprietary work. Enforce --private flag in ALL repository creation commands.',
    implementation: [
      'Created IMMUTABLE Rule 3.3 in ~/CLAUDE.md (lines 1989-2294)',
      'Established "Private by Default" as NON-NEGOTIABLE requirement',
      'Documented 3 creation methods (gh CLI, Web UI, API) - ALL private',
      'Created pre-creation checklist (5 questions, default answer: PRIVATE)',
      'Defined ONLY 4 scenarios where public is acceptable',
      'Provided verification commands (gh repo view --json visibility)',
      'Created enforcement protocol (10 mandatory steps)',
      'Documented how to fix accidentally-public repos',
      'Added security scanning requirement (TruffleHog)',
      'Integrated with existing credential security rules'
    ]
  },

  code_example: {
    language: 'bash',
    snippet: `# 🐾 GITHUB REPOSITORY PRIVACY ENFORCEMENT

# ❌ WRONG - Default GitHub behavior (public)
gh repo create myproject

# ❌ WRONG - Explicitly public
gh repo create myproject --public

# ✅ CORRECT - ALWAYS use --private flag
gh repo create neko-documentation --private --source=. --push

# ✅ With full configuration
gh repo create neko-documentation \\
  --private \\
  --description "Centralized documentation for Neko-Arc projects" \\
  --source=. \\
  --push

# ✅ Verify privacy after creation
gh repo view --json visibility
# Expected: {"visibility":"private"}

# 🔧 Fix if accidentally public
gh repo edit --visibility private

# 🔍 Scan for secrets BEFORE pushing
trufflehog --regex --entropy=True .

# ✅ Standard workflow
cd ~/Documents/github/neko-documentation
git status
gh repo create neko-documentation --private --source=. --push`
  },

  rule_location: {
    file: '~/CLAUDE.md',
    rule_number: '3.3',
    rule_title: 'GitHub Repository Privacy Protocol',
    start_line: 1989,
    end_line: 2294,
    total_lines: 306,
    immutable: true,
    non_negotiable: true
  },

  enforcement_protocol: [
    'STOP before creating ANY GitHub repository',
    'Ask: Should this be PRIVATE? (Default answer: YES!)',
    'Use --private flag in gh repo create command',
    'Verify visibility: gh repo view --json visibility',
    'Scan for secrets: TruffleHog before first push',
    'Confirm .gitignore includes .env and credentials',
    'Never assume public is acceptable',
    'Only make public with explicit user approval',
    'Run security audit before making public',
    'Document reason if making public'
  ],

  pre_creation_checklist: [
    'Have I confirmed this should be PRIVATE? (Default: YES!)',
    'Is this a personal/wakibaka project? (YES = PRIVATE!)',
    'Does it contain proprietary code? (YES = PRIVATE!)',
    'Could it contain sensitive data? (YES = PRIVATE!)',
    'Am I using --private flag? (MUST be YES!)'
  ],

  public_repository_exceptions: [
    'User explicitly requests public repository',
    'Project is intended as open-source contribution',
    'Code is generic library meant for community',
    'Documentation is public knowledge base'
  ],

  private_repository_benefits: [
    'Code Privacy - Source code contains business logic',
    'Security - Prevents exposure of patterns and architecture',
    'Credential Protection - Even with .gitignore, accidents happen',
    'Intellectual Property - Protects wakibaka\'s innovations',
    'Bot Protection - Public repos scanned IMMEDIATELY by bots',
    'Competitive Advantage - Keep ideas and implementations private',
    'Control - Choose when to open-source, not forced',
    'Peace of Mind - No accidental exposure during development'
  ],

  github_cli_commands: {
    create_private: 'gh repo create PROJECT_NAME --private --source=. --push',
    check_visibility: 'gh repo view --json visibility',
    make_private: 'gh repo edit --visibility private',
    make_public: 'gh repo edit --visibility public',
    add_collaborator: 'gh repo add-collaborator USER --permission write'
  },

  security_scanning_tools: [
    'TruffleHog - Scans for secrets (pip install truffleHog)',
    'git-secrets - Prevents committing secrets',
    'GitHub Advanced Security - Automated scanning (paid)',
    'GitGuardian - Real-time secret detection'
  ],

  gitignore_mandatory_entries: [
    '.env',
    '.env.*',
    '!.env.example',
    '*.pem',
    '*.key',
    'credentials.json',
    'secrets.json',
    'config/secrets.yml'
  ],

  accidental_public_repo_response: [
    'STOP immediately!',
    'Make private: gh repo edit --visibility private',
    'Audit commits: Check if secrets were pushed',
    'Rotate credentials: If ANY secrets exposed',
    'Document incident: Learn from mistake'
  ],

  use_cases: [
    'Creating new project repositories (neko-documentation)',
    'Extracting microservices from monoliths',
    'Personal learning and experimentation projects',
    'Client work and proprietary code',
    'Prototype development before open-sourcing',
    'Private documentation repositories',
    'Internal tools and automation scripts',
    'Work-in-progress projects not ready for public'
  ],

  related_abilities: [
    'credential_security_protocol',
    'git_repository_initialization',
    'security_scanning',
    'gitignore_management',
    'intellectual_property_protection'
  ],

  tags: [
    'github',
    'privacy',
    'security',
    'repository',
    'private',
    'intellectual_property',
    'enforcement',
    'immutable_rule'
  ],

  difficulty: 'beginner',
  reusability: 'universal',

  lessons_learned: [
    'GitHub defaults to PUBLIC repos - this is DANGEROUS for personal work',
    '--private flag must be EXPLICITLY specified',
    'Private by default = Safe by default mindset',
    'Only 4 scenarios justify public repos',
    'Bot scanning happens WITHIN MINUTES of public repo creation',
    'Even with .gitignore, accidents happen - private is safer',
    'Intellectual property is valuable and should be protected',
    'Control when to open-source, don\'t be forced into it',
    'Security audit REQUIRED before making repo public',
    'TruffleHog can catch secrets before they leak'
  ],

  next_steps: [
    'Apply Rule 3.3 to create neko-documentation as PRIVATE GitHub repo',
    'Audit existing repositories for privacy settings',
    'Install TruffleHog for secret scanning',
    'Create .github/workflows/secret-scan.yml for CI/CD',
    'Document all public repos and justify their visibility',
    'Create template .gitignore with all security patterns',
    'Set up GitHub branch protection for private repos',
    'Enable GitHub Advanced Security if available'
  ],

  verification_checklist: {
    rule_created_in_claudemd: true,
    rule_number_assigned: '3.3',
    enforcement_protocol_defined: true,
    pre_creation_checklist_created: true,
    github_cli_commands_documented: true,
    security_scanning_integrated: true,
    accidental_public_response_defined: true,
    user_requirement_fulfilled: true
  },

  metadata: {
    session_id: 'github-privacy-rule-oct19-2025',
    wakibaka_feedback: 'give me the repo name, also you must develop an ability and an immutable rule whenever you work with github, any new repositories should be private by default',
    neko_implementation: 'Created IMMUTABLE Rule 3.3 in CLAUDE.md enforcing private-by-default for ALL GitHub repositories',
    session_outcome: 'Successfully established GitHub Repository Privacy Protocol as NON-NEGOTIABLE requirement with comprehensive enforcement',
    rule_lines: 306,
    rule_location: '~/CLAUDE.md lines 1989-2294',
    immutability: 'ABSOLUTE',
    user_requirement: 'any new repositories should be private by default',
    enforcement: 'MANDATORY'
  }
};

const casePattern = {
  case_id: 'github_repository_privacy_enforcement_pattern_oct19',
  title: 'Enforce Private-by-Default for ALL GitHub Repositories',
  category: 'security',
  subcategory: 'repository_management',
  difficulty: 'beginner',
  reusability_score: 'universal',

  problem: 'Need to prevent accidental creation of PUBLIC GitHub repositories which expose code, patterns, and potentially credentials to bot scanning within minutes',

  context: {
    user_request: 'any new repositories should be private by default',
    github_default_behavior: 'Public repositories (DANGEROUS!)',
    risk: 'Bot scanning, credential harvesting, IP exposure',
    requirement: 'ALL repos MUST be private unless explicitly approved',
    scope: 'Universal - applies to EVERY repository creation'
  },

  solution: {
    approach: 'Create IMMUTABLE rule enforcing --private flag in ALL GitHub repository creation commands',
    steps: [
      '1. Create Rule 3.3 in ~/CLAUDE.md',
      '2. Define "Private by Default" as NON-NEGOTIABLE',
      '3. Document CORRECT creation methods (ALL with --private)',
      '4. Create pre-creation checklist (5 questions)',
      '5. Define ONLY 4 acceptable public repo scenarios',
      '6. Provide verification commands',
      '7. Create enforcement protocol (10 steps)',
      '8. Document accident response procedure',
      '9. Integrate security scanning requirement',
      '10. Save ability to MongoDB for future reference'
    ],
    key_insight: 'GitHub\'s default (public) is fundamentally incompatible with proprietary work. Enforce private-by-default at the CREATION stage, not as afterthought.'
  },

  implementation: {
    rule_created: true,
    rule_number: '3.3',
    rule_lines: 306,
    enforcement_protocol_steps: 10,
    checklist_questions: 5,
    public_exceptions: 4,
    github_cli_integrated: true,
    security_scanning_integrated: true
  },

  verification: {
    rule_in_claudemd: true,
    immutable_status: true,
    non_negotiable: true,
    user_requirement_met: true,
    comprehensive_documentation: true,
    enforcement_clear: true
  },

  patterns_identified: [
    'ALWAYS use --private flag in gh repo create',
    'ALWAYS ask "Should this be private?" before creation (default: YES)',
    'ALWAYS verify visibility after creation',
    'ALWAYS scan for secrets before first push',
    'ALWAYS assume private unless explicitly told otherwise',
    'NEVER create public repo without user approval',
    'NEVER assume GitHub defaults are safe',
    'ONLY make public after security audit'
  ],

  anti_patterns_avoided: [
    'Using gh repo create without --private flag (defaults to public!)',
    'Assuming private is default GitHub behavior',
    'Creating repo first, thinking about privacy later',
    'Making repos public "just to share quickly"',
    'Trusting .gitignore alone for credential protection',
    'Not verifying visibility after creation',
    'Skipping security scan before making public'
  ],

  reusability_reason: 'UNIVERSAL - this pattern applies to EVERY GitHub repository creation across ALL projects, ALL languages, ALL purposes. Private-by-default is fundamental security principle.',

  related_patterns: [
    'credential_security_protocol',
    'gitignore_best_practices',
    'security_scanning_workflows',
    'intellectual_property_protection',
    'defense_in_depth_security'
  ],

  tags: [
    'github',
    'privacy',
    'security',
    'private',
    'repository',
    'enforcement',
    'immutable_rule',
    'bot_protection'
  ],

  created_at: new Date(),
  updated_at: new Date(),
  session_id: 'github-privacy-rule-oct19-2025'
};

async function saveToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('🐾 Connected to MongoDB Atlas, nyaa~!\n');

    const db = client.db('neko-defense-system');

    // Save ability
    const abilitiesCollection = db.collection('abilities');
    const abilityResult = await abilitiesCollection.updateOne(
      { ability_id: ability.ability_id },
      { $set: ability },
      { upsert: true }
    );

    if (abilityResult.upsertedCount > 0) {
      console.log('✅ NEW ability created!');
    } else {
      console.log('✅ Ability updated!');
    }

    console.log(`\n📋 Ability Details:`);
    console.log(`   ID: ${ability.ability_id}`);
    console.log(`   Parent: ${ability.parent_ability}`);
    console.log(`   Name: ${ability.name}`);
    console.log(`   Category: ${ability.category} / ${ability.subcategory}`);
    console.log(`   Reusability: ${ability.reusability}`);
    console.log(`   Rule Number: ${ability.rule_location.rule_number}`);
    console.log(`   Rule Lines: ${ability.rule_location.total_lines}`);
    console.log(`   Immutable: ${ability.rule_location.immutable}`);

    // Save case pattern
    const casePatternsCollection = db.collection('case-patterns');
    const patternResult = await casePatternsCollection.updateOne(
      { case_id: casePattern.case_id },
      { $set: casePattern },
      { upsert: true }
    );

    if (patternResult.upsertedCount > 0) {
      console.log('\n✅ NEW case pattern created!');
    } else {
      console.log('\n✅ Case pattern updated!');
    }

    console.log(`\n📋 Case Pattern Details:`);
    console.log(`   ID: ${casePattern.case_id}`);
    console.log(`   Title: ${casePattern.title}`);
    console.log(`   Category: ${casePattern.category}`);
    console.log(`   Reusability: ${casePattern.reusability_score}`);
    console.log(`   Steps: ${casePattern.solution.steps.length}`);

    console.log(`\n💖 Key Insight:`);
    console.log(`   ${ability.solution.key_insight}`);

    console.log(`\n🔒 Enforcement Protocol:`);
    ability.enforcement_protocol.slice(0, 5).forEach(step => {
      console.log(`   • ${step}`);
    });

    console.log(`\n✅ Pre-Creation Checklist:`);
    ability.pre_creation_checklist.forEach(item => {
      console.log(`   ☑ ${item}`);
    });

    console.log(`\n🛡️ Private Repository Benefits:`);
    ability.private_repository_benefits.slice(0, 5).forEach(benefit => {
      console.log(`   ✓ ${benefit}`);
    });

    console.log(`\n💖 GITHUB REPOSITORY PRIVACY RULE SAVED, DESU~!\n`);

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, nyaa~!\n');
  }
}

saveToMongoDB();
