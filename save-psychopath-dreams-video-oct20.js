#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveConversation() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('neko-defense-system');

    // 1. HUNT CONVERSATION
    const conversation = {
      session_id: 'psychopath-dreams-video-oct20-2025',
      date: new Date('2025-10-20'),
      title: 'Los sueños de un psicópata - Video Creation with Carabineros Hymn',
      category: 'video-creation',
      subcategory: 'ffmpeg-multimedia',
      objective: 'Create MP4 video from 30 screenshot images with Carabineros de Chile hymn as background music',
      conversation_summary: {
        user_request: 'go to documents los suenos de un psicopata then make an video mp four file, remember always with the hymn of carabineros',
        neko_interpretation: 'User wants video created from screenshot images in "Los sueños de un psicópata" directory with Carabineros hymn audio',
        approach: 'Bash script using ffmpeg concat demuxer with duration control to sync images with hymn length',
        outcome: 'SUCCESS - 5.5MB MP4 video created (1920x1080, 2:45 duration, 30 images)'
      },
      key_exchanges: [
        {
          phase: 'directory-location',
          exchange: 'User requested "los suenos de un psicopata" - Neko found "Los sueños de un psicópata -1-001" directory with proper accent marks'
        },
        {
          phase: 'content-discovery',
          exchange: 'Found 30 screenshot images (.jpg) from MIUI Notes app'
        },
        {
          phase: 'hymn-location',
          exchange: 'Located Carabineros hymn audio at ~/Documents/mi primera base de datos del yiyo/carabineros-hymn.mp3 (165.2s duration)'
        },
        {
          phase: 'script-creation',
          exchange: 'Created create-psychopath-dreams-video.sh with ffmpeg concat demuxer approach'
        },
        {
          phase: 'video-generation',
          exchange: 'Executed script successfully - calculated 5.5s per image to match hymn duration'
        },
        {
          phase: 'verification',
          exchange: 'Verified video: 5.5MB, 1920x1080, H.264/AAC, 165.17s duration - PERFECT!'
        }
      ],
      technical_details: {
        input_images: 30,
        image_format: 'JPEG (1080x2400 mobile screenshots)',
        audio_source: 'carabineros-hymn.mp3 (165.216s)',
        duration_per_image: '5.5 seconds',
        output_format: 'MP4 (H.264 + AAC)',
        output_resolution: '1920x1080',
        output_duration: '165.175 seconds',
        output_size: '5.5 MB',
        bitrate: '277.8 kbits/s',
        framerate: '30 fps',
        ffmpeg_method: 'concat demuxer with duration control',
        script_location: '/home/wakibaka/Documents/Los sueños de un psicópata -1-001/create-psychopath-dreams-video.sh',
        video_location: '/home/wakibaka/Documents/Los sueños de un psicópata -1-001/los-suenos-psicopata-carabineros.mp4'
      },
      outcome: 'SUCCESS - Professional MP4 video created from 30 psychopath dreams screenshots with Carabineros hymn perfectly synchronized',
      files_created: [
        'create-psychopath-dreams-video.sh',
        'los-suenos-psicopata-carabineros.mp4'
      ],
      tags: ['video-creation', 'ffmpeg', 'multimedia', 'carabineros-hymn', 'screenshot-video', 'bash-scripting', 'mp4', 'concat-demuxer'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    await db.collection('hunt-conversations').insertOne(conversation);
    console.log('✅ Conversation saved to hunt-conversations');

    // 2. ABILITY: FFmpeg Image-to-Video with Audio Synchronization
    const ability = {
      ability_id: 'ffmpeg-image-video-sync-oct20',
      name: 'FFmpeg Image-to-Video with Audio Synchronization',
      category: 'video-creation',
      subcategory: 'multimedia-processing',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-20'),
      description: 'Create synchronized video from multiple images with audio track, calculating per-image duration to match audio length perfectly',
      problem_solved: 'Need to create MP4 video from collection of images where total video duration matches audio track duration, with smooth transitions and professional output',
      approach: [
        'Count total number of images in directory',
        'Get audio track duration using ffprobe',
        'Calculate duration per image: audio_duration / image_count',
        'Create ffmpeg concat demuxer file with calculated durations',
        'Use ffmpeg to generate video with H.264 encoding and AAC audio',
        'Apply scaling/padding to ensure consistent 1920x1080 output',
        'Verify output matches audio duration perfectly'
      ],
      technical_implementation: {
        tools: ['ffmpeg', 'ffprobe', 'bash', 'bc calculator'],
        ffmpeg_features: [
          'concat demuxer',
          'libx264 codec',
          'AAC audio encoding',
          'scale and pad filters',
          'duration control'
        ],
        key_parameters: {
          video_codec: 'libx264',
          audio_codec: 'aac',
          audio_bitrate: '192k',
          framerate: '30 fps',
          pixel_format: 'yuv420p',
          shortest: 'true (stops at shortest stream)'
        }
      },
      ffmpeg_command_pattern: 'ffmpeg -f concat -safe 0 -i concat_file.txt -i audio.mp3 -c:v libx264 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1" -r 30 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest output.mp4',
      reusability: 'high',
      applicable_to: [
        'Creating tribute videos from photo collections',
        'Memorial videos with background music',
        'Screenshot slideshows with narration',
        'Photo album videos synchronized to songs',
        'Educational content from image sequences',
        'Any image-to-video conversion with audio'
      ],
      benefits: [
        'Perfect synchronization: video length = audio length',
        'Professional quality: 1080p HD output',
        'Automatic duration calculation',
        'Handles any number of images',
        'YouTube-ready MP4 format',
        'Maintains aspect ratios with padding'
      ],
      example_use_case: 'Created video from 30 "Los sueños de un psicópata" screenshots (1080x2400) with 165s Carabineros hymn - automatically calculated 5.5s per image for perfect sync',
      tags: ['ffmpeg', 'video-creation', 'audio-sync', 'concat-demuxer', 'multimedia', 'bash-automation', 'image-slideshow'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    await db.collection('abilities').insertOne(ability);
    console.log('✅ Ability saved to abilities collection');

    console.log('\n🎬 Psychopath Dreams Video Creation Session Documented! 🐾');
    console.log('📹 Video: los-suenos-psicopata-carabineros.mp4 (5.5MB, 2:45, 1920x1080)');
    console.log('🎵 Audio: Carabineros de Chile hymn perfectly synchronized');
    console.log('💾 MongoDB: hunt-conversations + abilities collections updated');

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

saveConversation();
