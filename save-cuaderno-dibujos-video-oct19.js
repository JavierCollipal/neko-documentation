#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveVideoCreationTask() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('neko-defense-system');

    // 1. HUNT CONVERSATION
    const conversation = {
      session_id: 'cuaderno-dibujos-video-oct19-2025',
      date: new Date('2025-10-19'),
      title: 'Cuaderno Dibujos YouTube Video - Complete Creation',
      category: 'video-production',
      subcategory: 'slideshow-creation',
      objective: 'Create YouTube-ready video with 70 drawings and Carabineros de Chile hymn',
      conversation_summary: {
        initial_request: 'User requested finishing video of drawings with Carabineros hymn',
        problem_discovered: 'Original video only showed 55 images, cutting when audio ended',
        solution_implemented: 'Re-calculated timing (2.36s per image) to fit all 70 images in 165s audio',
        phases: [
          'Analysis: Found 70 images, 165s audio, existing 20MB video',
          'Problem: Video cut at audio end, missing 15 images',
          'Solution: Option 1 selected - adjust timing to show ALL images',
          'Calculation: 165s ÷ 70 images = 2.36s per image',
          'Execution: Modified script, regenerated video with ffmpeg',
          'Verification: Confirmed 4,955 frames = all 70 images included'
        ],
        outcome: 'SUCCESS - Complete 25MB YouTube-ready video created'
      },
      key_exchanges: [
        {
          user: 'work on the documents folder dibujos folder, you must finish the video',
          neko: 'Found folder with 70 drawings and hymn audio, analyzed existing video'
        },
        {
          user: 'option 1',
          neko: 'Selected optimal timing adjustment to fit all 70 images to audio duration'
        },
        {
          user: 'thank you for your beautiful job bro',
          neko: 'Video completed successfully with all images included!'
        }
      ],
      technical_details: {
        tools_used: ['ffmpeg', 'ffprobe', 'bash'],
        files_modified: ['create-youtube-video.sh'],
        files_created: ['cuaderno-dibujos-youtube.mp4 (final version)'],
        commands_executed: [
          './create-youtube-video.sh',
          'ffprobe (multiple verification commands)'
        ],
        video_specs: {
          images: 70,
          duration: '165s (2m 45s)',
          timing_per_image: '2.36s',
          resolution: '1920x1080',
          codec: 'H.264',
          audio_codec: 'AAC 192kbps',
          fps: 30,
          total_frames: 4955,
          file_size: '25MB'
        },
        lines_of_code: 152,
        script_modifications: 1
      },
      outcome: 'SUCCESS - YouTube-ready video with all 70 drawings synchronized to Carabineros de Chile hymn',
      tags: ['video-production', 'ffmpeg', 'youtube', 'slideshow', 'chile', 'carabineros', 'hymn', 'drawings'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const convResult = await db.collection('hunt-conversations').insertOne(conversation);
    console.log('✅ Hunt conversation saved:', convResult.insertedId);

    // 2. ABILITY
    const ability = {
      ability_id: 'video-slideshow-timing-optimization-oct19',
      name: 'Video Slideshow Timing Optimization for Audio Sync',
      category: 'video-production',
      subcategory: 'timing-calculation',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-19'),
      description: 'Ability to calculate optimal timing per image to perfectly synchronize slideshow with audio duration',
      problem_solved: 'Slideshow video cuts off before showing all images when audio duration is shorter than total slideshow time at fixed timing',
      approach: [
        'Measure audio duration using ffprobe',
        'Count total number of images',
        'Calculate: optimal_timing = audio_duration ÷ image_count',
        'Modify video creation script with calculated timing',
        'Regenerate video with ffmpeg concat demuxer',
        'Verify all images included by counting frames'
      ],
      technical_implementation: {
        calculation: 'timing_per_image = total_audio_seconds / total_images',
        example: '165 seconds ÷ 70 images = 2.36 seconds per image',
        ffmpeg_parameters: [
          'concat demuxer with duration per file',
          'scale and pad to target resolution',
          'libx264 encoder with H.264 codec',
          'AAC audio at 192kbps',
          '-shortest flag to stop at audio end'
        ]
      },
      reusability: 'high',
      applicable_to: [
        'YouTube slideshow videos',
        'Photo montages with music',
        'Memorial videos',
        'Educational content with timed narration',
        'Any image+audio synchronization task'
      ],
      tools_required: ['ffmpeg', 'ffprobe', 'bash'],
      benefits: [
        'Ensures all content is shown',
        'Perfect audio synchronization',
        'YouTube-ready output format',
        'Professional quality results',
        'Automated calculation eliminates guesswork'
      ],
      tags: ['ffmpeg', 'video', 'slideshow', 'timing', 'synchronization', 'youtube'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const abilityResult = await db.collection('abilities').insertOne(ability);
    console.log('✅ Ability saved:', abilityResult.insertedId);

    console.log('');
    console.log('📊 Documentation Summary:');
    console.log('  Hunt Conversation: cuaderno-dibujos-video-oct19-2025');
    console.log('  Ability: video-slideshow-timing-optimization-oct19');
    console.log('  Category: video-production');
    console.log('  Outcome: SUCCESS - 70 images, 165s video, 25MB, YouTube-ready');
    console.log('');
    console.log('✅ Task documentation complete, nyaa~!');

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

saveVideoCreationTask();
