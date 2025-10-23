#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveNekoArcTVSession() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('neko-defense-system');

    // 1. HUNT CONVERSATION
    const conversation = {
      session_id: 'neko-arc-tv-creation-oct19-2025',
      date: new Date('2025-10-19'),
      title: 'Neko-Arc TV Evidence Broadcast System - Complete Creation',
      category: 'video-production',
      subcategory: 'evidence-broadcast',
      objective: 'Create professional TV-style evidence broadcast video for YouTube with evidence preservation protocol',
      conversation_summary: {
        initial_request: 'User requested creating Neko-Arc TV style video in funa-miguelito folder with evidence preservation',
        evidence_discovered: {
          evidence_image: 'Screenshot_2021-07-31-18-00-11-900_com.facebook.katana.jpg (187KB)',
          confession_audio: 'confesión .m4a (6.9MB, 294.5s)',
          hymn_audio: 'hymn-audio.mp3 (5.3MB, 165.2s)'
        },
        phases: [
          'Evidence location: Found in /home/wakibaka/Documents/funa al amarcelita por youtube/',
          'Preservation: Copied evidence files to working directory (originals preserved)',
          'Script creation: Built neko-arc-tv-maker.sh with TV graphics overlays',
          'Audio mixing: Combined confession (1.5x volume) + hymn (0.3x volume, 2s fade-in)',
          'Video generation: Created 295-second YouTube-ready broadcast video',
          'Documentation: Created comprehensive NEKO-ARC-TV.md guide'
        ],
        challenges_and_solutions: [
          {
            challenge: 'ffmpeg pad filter syntax error with $RESOLUTION variable',
            error: '[Eval] Invalid chars \'x1080\' at the end of expression \'1920x1080\'',
            solution: 'Changed from variable $RESOLUTION to hardcoded 1920:1080 in scale and pad filters',
            fix_location: 'neko-arc-tv-maker.sh lines 120-121'
          }
        ],
        outcome: 'SUCCESS - Professional 11MB YouTube-ready TV broadcast video created with all evidence preserved'
      },
      key_exchanges: [
        {
          user: 'save and enrich the assigned collections, then move into the folder funa Miguelito an make an neko arc tv style video, but please preserve the photos because that are evidences, output the .md in the documents in the neko arc tv then start the show my bro',
          neko: 'Analyzed evidence location, created TV-style video creation script, preserved all originals'
        }
      ],
      technical_details: {
        tools_used: ['ffmpeg', 'ffprobe', 'bash', 'MongoDB'],
        files_created: [
          'neko-arc-tv-maker.sh (177 lines)',
          'NEKO-ARC-TV.md (313 lines comprehensive documentation)',
          'neko-arc-tv-exposure.mp4 (11MB final video)'
        ],
        evidence_preserved: [
          'evidence.jpg (copied from original screenshot)',
          'confession.m4a (copied from original audio)',
          'hymn-audio.mp3 (copied from cuaderno-dibujos folder)'
        ],
        commands_executed: [
          './neko-arc-tv-maker.sh',
          'ffmpeg audio mixing (confession + hymn)',
          'ffmpeg video encoding with TV graphics',
          'ffprobe duration/size verification'
        ],
        video_specs: {
          duration: '295 seconds (4m 55s)',
          resolution: '1920x1080',
          fps: 30,
          video_codec: 'H.264 (libx264)',
          video_bitrate: '3000kbps',
          audio_codec: 'AAC',
          audio_bitrate: '192kbps',
          file_size: '11MB',
          format: 'MP4 (YouTube compatible)'
        },
        tv_graphics: {
          header: '📺 NEKO-ARC TV - EVIDENCE BROADCAST 🐾',
          footer: '⚖️ JUSTICIA CIUDADANA ⚖️',
          header_style: 'white text, red box, 40px font',
          footer_style: 'yellow text, blue box, 30px font'
        },
        audio_mixing: {
          confession_volume: '1.5x (clarity)',
          hymn_volume: '0.3x (background)',
          hymn_fade_in: '2 seconds',
          mixing_strategy: 'Confession + hymn play simultaneously, video continues until longest audio ends'
        },
        lines_of_code: 490,
        files_modified: 0,
        script_bugs_fixed: 1
      },
      outcome: 'SUCCESS - YouTube-ready evidence broadcast video with professional TV graphics and preserved evidence',
      tags: [
        'video-production',
        'ffmpeg',
        'youtube',
        'evidence-preservation',
        'tv-broadcast',
        'audio-mixing',
        'neko-arc-tv',
        'chile',
        'carabineros'
      ],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const convResult = await db.collection('hunt-conversations').insertOne(conversation);
    console.log('✅ Hunt conversation saved:', convResult.insertedId);

    // 2. ABILITY
    const ability = {
      ability_id: 'neko-arc-tv-broadcast-system-oct19',
      name: 'Professional Evidence Broadcast Video Creation (Neko-Arc TV Style)',
      category: 'video-production',
      subcategory: 'evidence-broadcasting',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-19'),
      description: 'Ability to create professional TV-style broadcast videos combining evidence screenshots, confession audio, background music, and TV graphics overlays for YouTube publication',
      problem_solved: 'Need to present evidence in professional, broadcast-quality format for YouTube while preserving original evidence files and maintaining chain of custody',
      approach: [
        'Locate and copy evidence files (NEVER modify originals)',
        'Mix audio tracks: confession at high volume + background music at low volume',
        'Apply TV-style graphics overlays with header and footer banners',
        'Encode to YouTube-compatible format (H.264 + AAC)',
        'Verify output quality and duration',
        'Create comprehensive documentation'
      ],
      technical_implementation: {
        evidence_preservation: 'Copy files from source to working directory, never touch originals',
        audio_mixing: 'ffmpeg amix filter with volume control and fade-in effects',
        video_encoding: 'Loop static image, apply scale/pad filters for 1920x1080, add text overlays',
        tv_graphics: 'ffmpeg drawtext filter with colored boxes and emojis',
        quality_settings: {
          preset: 'medium',
          tune: 'stillimage',
          crf: 23,
          pix_fmt: 'yuv420p'
        }
      },
      ffmpeg_filters_used: [
        'scale (resize to target resolution with aspect ratio preservation)',
        'pad (add black borders for letterboxing)',
        'drawtext (TV graphics overlays with colored boxes)',
        'volume (audio level adjustment)',
        'afade (audio fade-in effect)',
        'amix (combine multiple audio tracks)'
      ],
      reusability: 'high',
      applicable_to: [
        'Evidence broadcast videos',
        'YouTube exposure videos',
        'Professional announcements',
        'News-style reporting',
        'Public service announcements',
        'Documentary-style presentations'
      ],
      tools_required: [
        'ffmpeg (with libx264, aac codecs)',
        'bash',
        'DejaVu Sans fonts (system fonts)',
        'Evidence files (images, audio)'
      ],
      benefits: [
        'Professional TV broadcast appearance',
        'YouTube-ready output format',
        'Evidence preservation (originals never modified)',
        'Automated audio mixing',
        'Customizable graphics overlays',
        'High-quality H.264 encoding'
      ],
      tags: [
        'ffmpeg',
        'video',
        'broadcast',
        'tv-style',
        'evidence',
        'youtube',
        'audio-mixing',
        'preservation'
      ],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const abilityResult = await db.collection('abilities').insertOne(ability);
    console.log('✅ Ability saved:', abilityResult.insertedId);

    console.log('');
    console.log('📊 Documentation Summary:');
    console.log('  Hunt Conversation: neko-arc-tv-creation-oct19-2025');
    console.log('  Ability: neko-arc-tv-broadcast-system-oct19');
    console.log('  Category: video-production / evidence-broadcasting');
    console.log('  Outcome: SUCCESS - 11MB professional TV broadcast video');
    console.log('  Evidence: Preserved (originals untouched)');
    console.log('  Duration: 295s (4m 55s)');
    console.log('  YouTube: Ready for upload');
    console.log('');
    console.log('✅ Neko-Arc TV session documented, nyaa~!');

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

saveNekoArcTVSession();
