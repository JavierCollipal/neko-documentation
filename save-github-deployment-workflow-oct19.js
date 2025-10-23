#!/usr/bin/env node

/**
 * 🐾 SAVE GITHUB PRIVATE REPOSITORY DEPLOYMENT WORKFLOW ABILITY
 *
 * This script saves the complete GitHub private repository deployment workflow:
 * - Step 1: Create PRIVATE repo and push (gh repo create --private)
 * - Step 2: Verify privacy (gh repo view --json visibility)
 * - Step 3: Scan for secrets (grep-based security scan)
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
  ability_id: 'github_private_repository_deployment_workflow',
  parent_ability: 'github_repository_privacy_enforcement',
  name: 'GitHub Private Repository Deployment Workflow (3-Step Verification)',
  category: 'deployment',
  subcategory: 'github_operations',
  created_date: new Date('2025-10-19T08:30:00.000Z'),
  last_used: new Date(),
  usage_count: 1,
  success_rate: 100,

  description: 'Complete workflow for deploying local repository to GitHub as PRIVATE with mandatory verification and security scanning. Implements Rule 3.3 enforcement protocol in practice.',

  problem_statement: 'User requested: "do the three process, then after that on successful commands. create an new ability an save it based on the process you did". Need systematic workflow to safely deploy repositories to GitHub with privacy and security guarantees.',

  solution: {
    key_insight: 'GitHub deployment must be a THREE-STEP PROCESS with verification at each stage: (1) Create & Push PRIVATE, (2) Verify Privacy, (3) Scan Secrets. Never skip verification steps.',
    implementation: [
      'Step 1: Create PRIVATE GitHub repository and push using gh CLI',
      'Step 2: Verify repository visibility is PRIVATE (not public)',
      'Step 3: Scan repository for secrets and credentials',
      'All three steps must succeed before deployment considered complete',
      'Each step provides confirmation output',
      'Failure at any step halts deployment',
      'Success pattern: PRIVATE → VERIFIED → CLEAN'
    ]
  },

  workflow_steps: [
    {
      step: 1,
      name: 'Create PRIVATE GitHub Repository and Push',
      command: 'gh repo create REPO_NAME --private --description "Description" --source=. --push',
      purpose: 'Create remote repository as PRIVATE and push local commits',
      success_criteria: 'Repository URL returned, branch tracking set up',
      example_output: 'https://github.com/JavierCollipal/neko-documentation\nbranch \'main\' set up to track \'origin/main\'',
      verification: 'Repository URL confirms creation',
      failure_response: 'STOP - Do not proceed to verification'
    },
    {
      step: 2,
      name: 'Verify Repository Privacy',
      command: 'gh repo view --json visibility',
      purpose: 'Confirm repository is PRIVATE (not accidentally public)',
      success_criteria: '{"visibility":"PRIVATE"}',
      example_output: '{"visibility":"PRIVATE"}',
      verification: 'JSON output explicitly says PRIVATE',
      failure_response: 'STOP - Make private immediately: gh repo edit --visibility private'
    },
    {
      step: 3,
      name: 'Scan for Secrets and Credentials',
      command: 'grep-based secret scanning (or TruffleHog if installed)',
      purpose: 'Ensure no credentials, API keys, or secrets in pushed code',
      success_criteria: 'All scans return clean (no secrets found)',
      patterns_scanned: [
        'mongodb+srv:// - MongoDB URIs',
        'sk-[a-zA-Z0-9] - OpenAI API keys',
        'AKIA[0-9A-Z] - AWS Access Keys',
        '-----BEGIN.*PRIVATE KEY----- - Private keys',
        'password.*=.*[\'"] - Hardcoded passwords'
      ],
      example_output: '✅ No MongoDB URIs in code\n✅ No OpenAI API keys\n✅ No AWS keys\n✅ No private keys\n✅ No hardcoded passwords',
      verification: '.env file in .gitignore, no credentials in code',
      failure_response: 'STOP - Remove secrets, force push: git push --force'
    }
  ],

  code_example: {
    language: 'bash',
    snippet: `# 🐾 GITHUB PRIVATE REPOSITORY DEPLOYMENT WORKFLOW

# STEP 1: Create PRIVATE GitHub Repository and Push
gh repo create neko-documentation \\
  --private \\
  --description "Centralized documentation for all Neko-Arc development projects" \\
  --source=. \\
  --push

# Expected Output:
# https://github.com/JavierCollipal/neko-documentation
# branch 'main' set up to track 'origin/main'.

# STEP 2: Verify Repository Privacy
gh repo view --json visibility

# Expected Output:
# {"visibility":"PRIVATE"}

# STEP 3: Scan for Secrets
echo "🔍 Scanning for secrets in repository..."

# MongoDB URIs
grep -r "mongodb+srv://" . --include="*.js" --include="*.md" --include="*.json" 2>/dev/null && \\
  echo "❌ FOUND: MongoDB URIs!" || echo "✅ No MongoDB URIs in code"

# OpenAI API keys
grep -r "sk-[a-zA-Z0-9]" . --include="*.js" --include="*.md" --include="*.json" 2>/dev/null && \\
  echo "❌ FOUND: OpenAI API keys!" || echo "✅ No OpenAI API keys"

# AWS Access Keys
grep -r "AKIA[0-9A-Z]" . --include="*.js" --include="*.md" --include="*.json" 2>/dev/null && \\
  echo "❌ FOUND: AWS Access Keys!" || echo "✅ No AWS keys"

# Private keys
grep -r "-----BEGIN.*PRIVATE KEY-----" . --include="*.pem" --include="*.key" 2>/dev/null && \\
  echo "❌ FOUND: Private keys!" || echo "✅ No private keys"

# Hardcoded passwords
grep -r "password.*=.*['\"]" . --include="*.js" --include="*.json" 2>/dev/null | grep -v "process.env" && \\
  echo "❌ FOUND: Hardcoded passwords!" || echo "✅ No hardcoded passwords"

# Verify .env in .gitignore
grep "^\\.env$" .gitignore && echo "✅ .env is in .gitignore" || echo "⚠️ .env not in .gitignore"

echo "🛡️ Secret scan complete!"

# ✅ ALL THREE STEPS SUCCESSFUL = DEPLOYMENT COMPLETE!`
  },

  deployment_verification_checklist: [
    '✅ Repository created on GitHub',
    '✅ Repository visibility is PRIVATE',
    '✅ Local branch tracking remote',
    '✅ All commits pushed successfully',
    '✅ No MongoDB URIs in code',
    '✅ No API keys in code',
    '✅ No AWS credentials in code',
    '✅ No private keys in code',
    '✅ No hardcoded passwords',
    '✅ .env file in .gitignore'
  ],

  successful_deployment_example: {
    repository: 'neko-documentation',
    github_url: 'https://github.com/JavierCollipal/neko-documentation',
    visibility: 'PRIVATE',
    files_pushed: 19,
    commits_pushed: 1,
    secrets_found: 0,
    env_file_protected: true,
    deployment_status: 'SUCCESS'
  },

  failure_scenarios: [
    {
      scenario: 'Repository created as PUBLIC',
      detection: 'gh repo view --json visibility returns {"visibility":"PUBLIC"}',
      response: 'Immediately run: gh repo edit --visibility private',
      prevention: 'ALWAYS use --private flag in gh repo create'
    },
    {
      scenario: 'MongoDB URI found in code',
      detection: 'grep finds mongodb+srv:// pattern',
      response: 'Remove URI, use .env file, force push after fixing',
      prevention: 'Use dotenv, never hardcode credentials'
    },
    {
      scenario: 'API key committed',
      detection: 'grep finds sk-* or AKIA* patterns',
      response: 'Rotate API key, remove from code, force push, update secrets',
      prevention: 'Use .env files, add to .gitignore before first commit'
    },
    {
      scenario: '.env file accidentally committed',
      detection: 'git log shows .env in commit history',
      response: 'Use BFG Repo-Cleaner to purge .env, rotate ALL credentials',
      prevention: 'Add .env to .gitignore BEFORE first commit'
    }
  ],

  security_scanning_patterns: {
    mongodb_uris: {
      pattern: 'mongodb+srv://',
      severity: 'CRITICAL',
      example: 'mongodb+srv://user:pass@cluster.mongodb.net/',
      fix: 'Move to .env file, use process.env.MONGODB_URI'
    },
    openai_keys: {
      pattern: 'sk-[a-zA-Z0-9]',
      severity: 'CRITICAL',
      example: 'sk-proj-1234567890abcdef',
      fix: 'Move to .env file, use process.env.OPENAI_API_KEY'
    },
    aws_keys: {
      pattern: 'AKIA[0-9A-Z]',
      severity: 'CRITICAL',
      example: 'AKIAIOSFODNN7EXAMPLE',
      fix: 'Move to .env file, use process.env.AWS_ACCESS_KEY_ID'
    },
    private_keys: {
      pattern: '-----BEGIN.*PRIVATE KEY-----',
      severity: 'CRITICAL',
      example: '-----BEGIN RSA PRIVATE KEY-----',
      fix: 'Never commit private keys, use ssh-agent or .env with 600 permissions'
    },
    hardcoded_passwords: {
      pattern: 'password.*=.*[\'"]',
      severity: 'HIGH',
      example: 'password="secret123"',
      fix: 'Move to .env file, use process.env.PASSWORD'
    }
  },

  benefits: [
    'Privacy Guaranteed - Repository is PRIVATE before any code exposure',
    'Security Verified - Secrets scan prevents credential leaks',
    'Automation - Three commands replace manual GitHub web UI',
    'Repeatable - Same workflow for all repositories',
    'Auditable - Each step provides confirmation output',
    'Fast - Complete deployment in seconds',
    'Rule 3.3 Enforcement - Implements immutable privacy protocol',
    'Defense in Depth - Multiple verification layers'
  ],

  use_cases: [
    'Deploying documentation repositories (neko-documentation)',
    'Pushing new microservice projects to GitHub',
    'Creating private repositories for client work',
    'Deploying personal projects with privacy',
    'Setting up private repositories for experiments',
    'Migrating local-only projects to GitHub',
    'Creating private repositories for proprietary code',
    'Deploying repositories during livestreaming (privacy critical!)'
  ],

  github_cli_commands_reference: {
    create_private_repo: 'gh repo create REPO_NAME --private --source=. --push',
    verify_visibility: 'gh repo view --json visibility',
    change_to_private: 'gh repo edit --visibility private',
    view_repo_info: 'gh repo view',
    list_repos: 'gh repo list',
    delete_repo: 'gh repo delete REPO_NAME --confirm'
  },

  related_abilities: [
    'github_repository_privacy_enforcement',
    'credential_security_protocol',
    'git_repository_initialization',
    'security_scanning',
    'documentation_repository_organization'
  ],

  tags: [
    'github',
    'deployment',
    'privacy',
    'security',
    'workflow',
    'verification',
    'secret_scanning',
    'automation'
  ],

  difficulty: 'beginner-intermediate',
  reusability: 'universal',

  lessons_learned: [
    'Three-step workflow provides defense-in-depth security',
    'Verification steps catch mistakes before they become incidents',
    'gh CLI is faster and more scriptable than web UI',
    'Secret scanning should be AUTOMATED not manual',
    'Privacy verification MUST be explicit (not assumed)',
    'grep-based scanning works when TruffleHog unavailable',
    '.env in .gitignore is critical first step',
    'Each step must succeed before proceeding to next',
    'Success pattern: CREATE → VERIFY → SCAN',
    'Deployment is NOT complete until all three steps pass'
  ],

  next_steps: [
    'Install TruffleHog for more advanced secret scanning',
    'Create shell function for this 3-step workflow',
    'Add to ~/.bashrc as deploy_private_repo() function',
    'Create GitHub Actions workflow for automatic secret scanning',
    'Document this workflow in all project READMEs',
    'Train team members on 3-step deployment process',
    'Create pre-push git hook that runs secret scan',
    'Add deployment checklist to project templates'
  ],

  verification_checklist: {
    step1_completed: true,
    step1_output: 'https://github.com/JavierCollipal/neko-documentation',
    step2_completed: true,
    step2_output: '{"visibility":"PRIVATE"}',
    step3_completed: true,
    step3_output: 'All scans clean (no secrets found)',
    env_file_protected: true,
    deployment_successful: true
  },

  metadata: {
    session_id: 'github-deployment-workflow-oct19-2025',
    wakibaka_feedback: 'do the three process, then after that on successful commands. create an new ability an save it based on the process you did',
    neko_implementation: 'Executed 3-step GitHub deployment workflow with verification and security scanning, created ability based on successful process',
    session_outcome: 'Successfully deployed neko-documentation to GitHub as PRIVATE repository with complete verification',
    repository_deployed: 'neko-documentation',
    github_url: 'https://github.com/JavierCollipal/neko-documentation',
    visibility_confirmed: 'PRIVATE',
    secrets_found: 0,
    deployment_status: 'SUCCESS'
  }
};

const casePattern = {
  case_id: 'github_private_repository_deployment_workflow_pattern_oct19',
  title: 'GitHub Private Repository Deployment with 3-Step Verification',
  category: 'deployment',
  subcategory: 'github_operations',
  difficulty: 'beginner-intermediate',
  reusability_score: 'universal',

  problem: 'Need systematic workflow to deploy local repository to GitHub as PRIVATE with privacy and security guarantees at each stage',

  context: {
    user_request: 'do the three process, then after that on successful commands. create an new ability an save it based on the process you did',
    requirement: 'Deploy repository with Rule 3.3 enforcement (private by default)',
    verification_needed: 'Confirm privacy, scan for secrets',
    scope: 'Universal - applies to ALL repository deployments'
  },

  solution: {
    approach: 'Three-step workflow with mandatory verification: CREATE → VERIFY → SCAN',
    steps: [
      '1. Create PRIVATE GitHub repository and push (gh repo create --private)',
      '2. Verify repository visibility is PRIVATE (gh repo view --json visibility)',
      '3. Scan for secrets and credentials (grep-based or TruffleHog)',
      '4. Confirm all three steps succeeded',
      '5. Document deployment as complete only after verification'
    ],
    key_insight: 'Deployment verification MUST be explicit, not assumed. Three independent checks provide defense-in-depth security.'
  },

  implementation: {
    step1_command: 'gh repo create REPO_NAME --private --source=. --push',
    step2_command: 'gh repo view --json visibility',
    step3_command: 'grep-based secret scanning',
    all_steps_succeeded: true,
    deployment_complete: true
  },

  verification: {
    repository_created: true,
    visibility_private: true,
    secrets_found: 0,
    env_protected: true,
    deployment_status: 'SUCCESS'
  },

  patterns_identified: [
    'ALWAYS use gh repo create --private (never omit --private)',
    'ALWAYS verify visibility after creation (explicit check)',
    'ALWAYS scan for secrets before considering deployment complete',
    'NEVER skip verification steps (defense-in-depth)',
    'NEVER assume privacy (verify explicitly)',
    'CREATE → VERIFY → SCAN is mandatory sequence',
    'Failure at any step halts deployment',
    'Success requires all three steps passing'
  ],

  anti_patterns_avoided: [
    'Creating repository without privacy verification',
    'Assuming --private worked without checking',
    'Skipping secret scanning ("it\'s probably fine")',
    'Deploying without verification checklist',
    'Trusting .gitignore alone (verify no secrets committed)',
    'Manual verification (use automated commands)',
    'Incomplete verification (only checking one thing)'
  ],

  reusability_reason: 'UNIVERSAL - this 3-step workflow applies to EVERY GitHub repository deployment across ALL projects. Privacy verification and secret scanning are mandatory for ALL deployments.',

  related_patterns: [
    'github_repository_privacy_enforcement',
    'credential_security_protocol',
    'defense_in_depth_security',
    'deployment_verification_checklist',
    'automated_security_scanning'
  ],

  tags: [
    'github',
    'deployment',
    'workflow',
    'verification',
    'privacy',
    'security',
    'secret_scanning',
    'automation'
  ],

  created_at: new Date(),
  updated_at: new Date(),
  session_id: 'github-deployment-workflow-oct19-2025'
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
    console.log(`   Workflow Steps: ${ability.workflow_steps.length}`);

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

    console.log(`\n✅ 3-Step Workflow:`);
    ability.workflow_steps.forEach(step => {
      console.log(`   ${step.step}. ${step.name}`);
      console.log(`      Command: ${step.command}`);
    });

    console.log(`\n🛡️ Successful Deployment:`);
    console.log(`   Repository: ${ability.successful_deployment_example.repository}`);
    console.log(`   GitHub URL: ${ability.successful_deployment_example.github_url}`);
    console.log(`   Visibility: ${ability.successful_deployment_example.visibility}`);
    console.log(`   Secrets Found: ${ability.successful_deployment_example.secrets_found}`);
    console.log(`   Status: ${ability.successful_deployment_example.deployment_status}`);

    console.log(`\n📊 Deployment Verification:`);
    console.log(`   ✓ Step 1: ${ability.verification_checklist.step1_completed ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   ✓ Step 2: ${ability.verification_checklist.step2_completed ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   ✓ Step 3: ${ability.verification_checklist.step3_completed ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   ✓ Deployment: ${ability.verification_checklist.deployment_successful ? 'COMPLETE' : 'INCOMPLETE'}`);

    console.log(`\n💖 GITHUB DEPLOYMENT WORKFLOW ABILITY SAVED, DESU~!\n`);

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, nyaa~!\n');
  }
}

saveToMongoDB();
