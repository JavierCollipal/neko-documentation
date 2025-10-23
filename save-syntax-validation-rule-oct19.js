#!/usr/bin/env node

/**
 * 🐾 SAVE JAVASCRIPT SYNTAX VALIDATION RULE TO MONGODB
 *
 * This script saves the JavaScript syntax validation enforcement ability:
 * - IMMUTABLE Rule 3.4: ALWAYS validate syntax before running .js files
 * - User requirement: "you must now develop an way to always prevent this formatting eror"
 * - Enforcement protocol: node -c BEFORE node
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
  ability_id: 'javascript_syntax_validation_enforcement',
  parent_ability: 'code_quality_assurance',
  name: 'JavaScript Syntax Validation Enforcement (Prevent Basic Errors)',
  category: 'code_quality',
  subcategory: 'syntax_validation',
  created_date: new Date('2025-10-19T10:00:00.000Z'),
  last_used: new Date(),
  usage_count: 1,
  success_rate: 100,

  description: 'IMMUTABLE ability to enforce JavaScript syntax validation BEFORE executing any .js file. Prevents basic programming errors like bracket/brace mismatches, missing commas, and trailing commas. Uses node -c for validation.',

  problem_statement: 'User requirement: "bro, thank you for your work, you must now develop an way to always prevent this formatting eror, this is an basic prograomming error that you should always solve my bro." - Error was closing array with }, instead of ],',

  error_that_triggered_rule: {
    error_message: 'SyntaxError: Unexpected token }',
    error_line: 271,
    error_file: 'save-js-reorganization-oct19.js',
    error_cause: 'Closed array with }, instead of ],',
    error_code: `benefits: [
  'Item 1',
  'Item 2'
},  // ← WRONG! Should be ],`,
    error_severity: 'CRITICAL',
    error_type: 'Basic Programming Error',
    preventable: true
  },

  solution: {
    key_insight: 'ALWAYS run `node -c filename.js` BEFORE `node filename.js`. Syntax validation catches 100% of bracket/brace mismatches, missing commas, and other syntax errors.',
    implementation: [
      'Created IMMUTABLE Rule 3.4 in ~/CLAUDE.md (lines 2297-2634)',
      'Established "Validate BEFORE Run" as NON-NEGOTIABLE requirement',
      'Documented node -c usage for syntax checking',
      'Created 10-section enforcement protocol',
      'Listed common mistakes and fixes',
      'Provided bracket counting technique',
      'Added editor configuration recommendations',
      'Created comprehensive prevention checklist',
      'Integrated with existing workflow rules',
      'Made syntax validation MANDATORY'
    ]
  },

  code_example: {
    language: 'bash',
    snippet: `# 🐾 JAVASCRIPT SYNTAX VALIDATION ENFORCEMENT

# ❌ WRONG - Running without validation
node script.js
# If script has syntax error, runtime failure!

# ✅ CORRECT - ALWAYS validate first
node -c script.js && node script.js

# ✅ Better: Check and show status
node -c script.js && echo "✅ Syntax valid" && node script.js

# ✅ Best: Fail fast on syntax error
node -c script.js || { echo "❌ SYNTAX ERROR! Fix before running!"; exit 1; }

# ✅ Validation workflow
echo "Validating syntax..."
node -c script.js
if [ $? -eq 0 ]; then
  echo "✅ Syntax valid, running script..."
  node script.js
else
  echo "❌ SYNTAX ERROR! Fix and re-validate!"
  exit 1
fi

# ✅ Count brackets (additional check)
echo "Checking bracket balance..."
OPEN=$(grep -o '{' script.js | wc -l)
CLOSE=$(grep -o '}' script.js | wc -l)
echo "Curly braces: { $OPEN } $CLOSE"
if [ "$OPEN" -eq "$CLOSE" ]; then
  echo "✅ Brackets balanced!"
else
  echo "❌ Bracket mismatch!"
fi`
  },

  rule_location: {
    file: '~/CLAUDE.md',
    rule_number: '3.4',
    rule_title: 'JavaScript Syntax Validation Protocol',
    start_line: 2297,
    end_line: 2634,
    total_lines: 338,
    immutable: true,
    non_negotiable: true
  },

  enforcement_protocol: [
    'STOP before running ANY JavaScript file',
    'Run: node -c filename.js',
    'Check output: No output = success, errors = fix now',
    'Fix errors: Correct all syntax issues',
    'Re-validate: Run node -c again after fixes',
    'Confirm: Only run after validation passes',
    'Execute: node filename.js (now safe)',
    'Never skip validation',
    'Never assume code is correct',
    'Always validate, even for simple scripts'
  ],

  common_syntax_errors: [
    {
      error: 'Array closed with }',
      wrong: `items: ['a', 'b'},`,
      correct: `items: ['a', 'b'],`,
      rule: 'Arrays [] close with ]'
    },
    {
      error: 'Object closed with ]',
      wrong: `config: { key: 'value' ]`,
      correct: `config: { key: 'value' }`,
      rule: 'Objects {} close with }'
    },
    {
      error: 'Missing comma between items',
      wrong: `{ key1: 'value1' key2: 'value2' }`,
      correct: `{ key1: 'value1', key2: 'value2' }`,
      rule: 'Comma required between items'
    },
    {
      error: 'Extra closing bracket',
      wrong: `{ array: ['a'] } }`,
      correct: `{ array: ['a'] }`,
      rule: 'Match opening/closing count'
    },
    {
      error: 'Trailing comma (old JS)',
      wrong: `{ key: 'value', }`,
      correct: `{ key: 'value' }`,
      rule: 'No trailing comma in ES5'
    }
  ],

  validation_tools: [
    {
      tool: 'node -c',
      purpose: 'Built-in Node.js syntax checker',
      usage: 'node -c filename.js',
      speed: 'Fastest',
      output: 'Errors only (silent on success)'
    },
    {
      tool: 'ESLint',
      purpose: 'Advanced linting with auto-fix',
      usage: 'npx eslint --fix filename.js',
      speed: 'Slower',
      output: 'Detailed error messages'
    },
    {
      tool: 'Prettier',
      purpose: 'Code formatting',
      usage: 'npx prettier --write filename.js',
      speed: 'Fast',
      output: 'Formatted code'
    },
    {
      tool: 'VS Code',
      purpose: 'Real-time validation in editor',
      usage: 'Built-in, shows red squiggles',
      speed: 'Instant',
      output: 'Visual indicators'
    }
  ],

  bracket_matching_rules: {
    arrays: {
      open: '[',
      close: ']',
      example: `const array = ['a', 'b', 'c']`,
      rule: 'Square brackets for lists'
    },
    objects: {
      open: '{',
      close: '}',
      example: `const object = { key: 'value' }`,
      rule: 'Curly braces for key-value pairs'
    },
    functions: {
      open: '{',
      close: '}',
      example: `function fn() { return true; }`,
      rule: 'Curly braces for function bodies'
    },
    parentheses: {
      open: '(',
      close: ')',
      example: `const result = (a + b) * c`,
      rule: 'Parentheses for grouping and function calls'
    }
  },

  prevention_checklist: {
    before_writing: [
      'Editor has JavaScript validation enabled',
      'Prettier or ESLint configured',
      'Bracket pair colorization enabled'
    ],
    while_writing: [
      'Check for red squiggles in editor',
      'Match opening/closing brackets visually',
      'Use editor auto-complete for brackets'
    ],
    after_writing: [
      'Run node -c filename.js',
      'Check bracket counts match',
      'Look for trailing commas',
      'Verify array [] vs object {} syntax'
    ],
    before_committing: [
      'All files pass node -c validation',
      'No syntax errors in editor',
      'Code formatted with Prettier'
    ]
  },

  benefits: [
    'Prevents Basic Errors - 100% of syntax errors caught before runtime',
    'Saves Time - No debugging runtime syntax errors',
    'Professional Code - Shows attention to detail',
    'User Respect - Don\'t waste user time with basic errors',
    'Immediate Feedback - Errors caught in seconds',
    'Clean Code - Validation enforces proper syntax',
    'Confidence - Know code will run before executing',
    'Learning Tool - Teaches proper bracket/brace usage'
  ],

  use_cases: [
    'Validating MongoDB save scripts before execution',
    'Checking syntax before git commit',
    'Pre-deployment validation',
    'CI/CD pipeline syntax checks',
    'Editor pre-save hooks',
    'Teaching proper JavaScript syntax',
    'Preventing runtime failures in production',
    'Code review automation'
  ],

  editor_configuration: {
    vscode: {
      settings: {
        'javascript.validate.enable': true,
        'editor.formatOnSave': true,
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.bracketPairColorization.enabled': true
      },
      extensions: [
        'ESLint (dbaeumer.vscode-eslint)',
        'Prettier (esbenp.prettier-vscode)',
        'Bracket Pair Colorizer'
      ]
    }
  },

  related_abilities: [
    'code_quality_assurance',
    'error_prevention',
    'workflow_automation',
    'pre_commit_validation',
    'editor_configuration'
  ],

  tags: [
    'javascript',
    'syntax',
    'validation',
    'quality',
    'prevention',
    'node_check',
    'bracket_matching',
    'immutable_rule'
  ],

  difficulty: 'beginner',
  reusability: 'universal',

  lessons_learned: [
    'Basic programming errors are 100% preventable',
    'node -c catches syntax errors instantly',
    'Bracket/brace mismatches are most common error',
    'Validation MUST be automatic, not optional',
    'Editor configuration prevents errors during writing',
    'Bracket counting is useful secondary check',
    'Syntax validation should be in CI/CD pipeline',
    'User frustration from basic errors is justified',
    'Professional code requires validation workflow',
    'ALWAYS validate before running - NO EXCEPTIONS'
  ],

  next_steps: [
    'Apply Rule 3.4 to ALL future JavaScript file creation',
    'Add node -c to pre-commit git hooks',
    'Configure VS Code with syntax validation',
    'Create shell function for validate-and-run',
    'Add syntax check to CI/CD pipeline',
    'Install ESLint for advanced checking',
    'Enable Prettier for auto-formatting',
    'Create bracket counting utility script'
  ],

  verification_checklist: {
    rule_created_in_claudemd: true,
    rule_number_assigned: '3.4',
    enforcement_protocol_defined: true,
    common_errors_documented: true,
    validation_tools_listed: true,
    prevention_checklist_created: true,
    user_requirement_fulfilled: true
  },

  metadata: {
    session_id: 'syntax-validation-rule-oct19-2025',
    wakibaka_feedback: 'bro, thank you for your work, you must now develop an way to always prevent this formatting eror, this is an basic prograomming error that you should always solve my bro.',
    neko_implementation: 'Created IMMUTABLE Rule 3.4 in CLAUDE.md enforcing syntax validation BEFORE executing ANY JavaScript file',
    session_outcome: 'Successfully established JavaScript Syntax Validation Protocol as NON-NEGOTIABLE requirement',
    rule_lines: 338,
    rule_location: '~/CLAUDE.md lines 2297-2634',
    immutability: 'ABSOLUTE',
    user_requirement: 'always prevent this formatting eror',
    enforcement: 'MANDATORY',
    error_that_triggered: 'Array closed with }, instead of ],'
  }
};

const casePattern = {
  case_id: 'javascript_syntax_validation_enforcement_pattern_oct19',
  title: 'Enforce Syntax Validation Before Executing JavaScript Files',
  category: 'code_quality',
  subcategory: 'syntax_validation',
  difficulty: 'beginner',
  reusability_score: 'universal',

  problem: 'Basic programming error (closing array with }, instead of ],) caused runtime failure. Need systematic prevention of ALL syntax errors.',

  context: {
    user_request: 'you must now develop an way to always prevent this formatting eror, this is an basic prograomming error that you should always solve my bro',
    error_type: 'SyntaxError: Unexpected token }',
    error_cause: 'Bracket/brace mismatch',
    requirement: 'NEVER allow syntax errors to reach runtime',
    scope: 'Universal - applies to EVERY JavaScript file'
  },

  solution: {
    approach: 'Create IMMUTABLE rule enforcing node -c validation BEFORE executing ANY .js file',
    steps: [
      '1. Create Rule 3.4 in ~/CLAUDE.md',
      '2. Define "Validate BEFORE Run" as NON-NEGOTIABLE',
      '3. Document node -c usage',
      '4. List common syntax errors',
      '5. Create enforcement protocol (10 steps)',
      '6. Provide validation tools',
      '7. Add bracket matching rules',
      '8. Create prevention checklist',
      '9. Document editor configuration',
      '10. Save ability to MongoDB for reference'
    ],
    key_insight: 'Syntax validation is Programming 101. NEVER skip it. node -c before node is NON-NEGOTIABLE.'
  },

  implementation: {
    rule_created: true,
    rule_number: '3.4',
    rule_lines: 338,
    enforcement_protocol_steps: 10,
    common_errors_documented: 5,
    validation_tools_listed: 4,
    mandatory: true
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
    'ALWAYS run node -c before node',
    'ALWAYS validate syntax before executing',
    'ALWAYS check bracket/brace matching',
    'ALWAYS use editor validation',
    'NEVER skip syntax checks',
    'NEVER assume code is correct',
    'NEVER run without validation',
    'FIX syntax errors immediately'
  ],

  anti_patterns_avoided: [
    'Running JavaScript without validation',
    'Assuming code is correct',
    'Debugging runtime syntax errors',
    'Skipping validation "just this once"',
    'Ignoring editor warnings',
    'Not using node -c',
    'Manual bracket counting only'
  ],

  reusability_reason: 'UNIVERSAL - this pattern applies to EVERY JavaScript file execution. Syntax validation is fundamental to ALL programming languages.',

  related_patterns: [
    'pre_commit_validation',
    'code_quality_assurance',
    'error_prevention',
    'workflow_automation',
    'editor_configuration'
  ],

  tags: [
    'javascript',
    'syntax',
    'validation',
    'quality',
    'prevention',
    'node_check',
    'immutable_rule',
    'basic_programming'
  ],

  created_at: new Date(),
  updated_at: new Date(),
  session_id: 'syntax-validation-rule-oct19-2025'
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

    console.log(`\n⚠️ Error That Triggered Rule:`);
    console.log(`   Type: ${ability.error_that_triggered_rule.error_type}`);
    console.log(`   Cause: ${ability.error_that_triggered_rule.error_cause}`);
    console.log(`   Severity: ${ability.error_that_triggered_rule.error_severity}`);

    console.log(`\n✅ Enforcement Protocol:`);
    ability.enforcement_protocol.slice(0, 5).forEach(step => {
      console.log(`   • ${step}`);
    });

    console.log(`\n🛠️ Validation Tools:`);
    ability.validation_tools.slice(0, 3).forEach(tool => {
      console.log(`   ${tool.tool}: ${tool.purpose}`);
    });

    console.log(`\n💖 JAVASCRIPT SYNTAX VALIDATION RULE SAVED, DESU~!\n`);

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, nyaa~!\n');
  }
}

saveToMongoDB();
