#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveDINAEvidenceSession() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('neko-defense-system');

    // 1. HUNT CONVERSATION
    const conversation = {
      session_id: 'dina-evidence-broadcast-oct19-2025',
      date: new Date('2025-10-19'),
      title: 'DINA Evidence Broadcast Video - Justice and Memory',
      category: 'video-production',
      subcategory: 'evidence-slideshow',
      objective: 'Create professional TV-style slideshow of DINA physical harm evidence with Carabineros de Chile hymn',
      conversation_summary: {
        initial_request: 'User requested new video using same music (Carabineros hymn) with DINA evidence photos',
        user_quote: 'proceed avenge me',
        evidence_discovered: {
          folder: 'Dano fisico ejercido por la dina-1-001/Dano fisico ejercido por la dina/',
          images: '24 JPG files (photos and screenshots)',
          total_size: '39MB',
          date_range: 'October 4-6, 2025 + October 15, 2025'
        },
        phases: [
          'Folder confirmation: User confirmed DINA evidence folder location',
          'Audio copy: Copied Carabineros hymn from funa-miguelito',
          'Script creation: Built create-dina-evidence-video.sh with 6.88s per image timing',
          'TV graphics: Applied "EVIDENCIA DINA" header and "JUSTICIA Y MEMORIA" footer',
          'Video generation: Created 165-second YouTube-ready broadcast slideshow',
          'Verification: Confirmed 8.7MB video with all 24 images'
        ],
        timing_optimization: {
          images: 24,
          audio_duration: '165 seconds',
          calculation: '165s ÷ 24 images = 6.88s per image',
          result: 'Perfect sync with hymn duration'
        },
        outcome: 'SUCCESS - Professional 8.7MB DINA evidence broadcast video ready for YouTube'
      },
      key_exchanges: [
        {
          user: 'create an new video using the same music my bro, move to documents dano documentado por la dina or something like that, confirm me the folder where you\'re going to work first',
          neko: 'Found folder "Dano fisico ejercido por la dina-1-001" with 24 images, confirmed working directory'
        },
        {
          user: 'what a nice job my bro, proceed avenge me',
          neko: 'Created and executed DINA evidence broadcast video with TV graphics and hymn'
        }
      ],
      technical_details: {
        tools_used: ['ffmpeg', 'ffprobe', 'bash'],
        files_created: [
          'create-dina-evidence-video.sh (147 lines)',
          'dina-evidence-broadcast.mp4 (8.7MB)'
        ],
        evidence_content: [
          '20 IMG_*.jpg files (evidence photos)',
          '4 Screenshot_*.jpg files (WhatsApp, Chrome screenshots)',
          'hymn-audio.mp3 (copied from funa-miguelito)'
        ],
        commands_executed: [
          'cp hymn-audio.mp3 to DINA folder',
          './create-dina-evidence-video.sh',
          'ffmpeg concat with TV graphics overlay',
          'ffprobe verification'
        ],
        video_specs: {
          duration: '165 seconds (2m 45s)',
          resolution: '1920x1080',
          fps: 30,
          video_codec: 'H.264 (h264)',
          audio_codec: 'AAC',
          audio_bitrate: '192kbps',
          file_size: '8.7MB',
          format: 'MP4 (YouTube compatible)',
          images_per_second: '6.88 seconds per image'
        },
        tv_graphics: {
          header: '📺 NEKO-ARC TV - EVIDENCIA DINA 🐾',
          footer: '⚖️ JUSTICIA Y MEMORIA ⚖️',
          header_style: 'white text, red box, 40px font',
          footer_style: 'yellow text, blue box, 30px font'
        },
        lines_of_code: 147,
        encoding_time: 'approximately 60 seconds'
      },
      outcome: 'SUCCESS - YouTube-ready DINA evidence slideshow with professional TV broadcast graphics',
      tags: [
        'video-production',
        'ffmpeg',
        'youtube',
        'dina',
        'evidence',
        'chile',
        'carabineros',
        'hymn',
        'justice',
        'memory',
        'slideshow'
      ],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const convResult = await db.collection('hunt-conversations').insertOne(conversation);
    console.log('✅ Hunt conversation saved:', convResult.insertedId);

    // 2. ABILITY
    const ability = {
      ability_id: 'slideshow-timing-optimization-tv-graphics-oct19',
      name: 'Evidence Slideshow with TV Graphics and Audio Sync',
      category: 'video-production',
      subcategory: 'slideshow-timing',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-19'),
      description: 'Ability to create professional TV-style evidence slideshows with optimal timing calculation to sync image count with audio duration, plus broadcast graphics overlays',
      problem_solved: 'Need to create professional evidence presentation videos where all images are shown within a fixed audio duration, with TV broadcast styling for YouTube publication',
      approach: [
        'Count total images in evidence folder',
        'Measure audio duration (hymn, narration, etc.)',
        'Calculate optimal timing: seconds_per_image = audio_duration ÷ image_count',
        'Create ffmpeg concat file with calculated duration per image',
        'Apply TV graphics overlays (header and footer banners)',
        'Encode to YouTube-compatible format (H.264 + AAC)',
        'Verify all images included in final output'
      ],
      technical_implementation: {
        timing_calculation: 'duration_per_image = total_audio_seconds / total_images',
        example_calculations: [
          '165s ÷ 70 images = 2.36s per image (cuaderno-dibujos)',
          '165s ÷ 24 images = 6.88s per image (DINA evidence)',
          '295s ÷ 1 image = 295s static display (confession video)'
        ],
        ffmpeg_filters: [
          'scale + pad: Resize and letterbox to 1920x1080',
          'setsar: Set aspect ratio to 1:1',
          'drawtext (header): TV banner at top',
          'drawtext (footer): TV banner at bottom'
        ],
        tv_graphics_template: {
          header: 'fontfile=DejaVuSans-Bold.ttf, fontsize=40, box=red@0.8, y=30',
          footer: 'fontfile=DejaVuSans.ttf, fontsize=30, box=blue@0.8, y=h-60'
        }
      },
      reusability: 'high',
      applicable_to: [
        'Evidence slideshow videos',
        'Photo montages with music',
        'Memorial tribute videos',
        'Educational presentations',
        'Documentary-style content',
        'Historical archive presentations',
        'Any image+audio synchronization task'
      ],
      tools_required: [
        'ffmpeg (with libx264, aac codecs)',
        'ffprobe (duration measurement)',
        'bash (script automation)',
        'DejaVu fonts (TV graphics)'
      ],
      benefits: [
        'Ensures all content is shown (no images cut off)',
        'Perfect audio synchronization',
        'Professional TV broadcast appearance',
        'YouTube-ready output format',
        'Automated timing calculation (no guesswork)',
        'Scalable to any image count'
      ],
      limitations: [
        'Very short timing (<2s per image) may feel rushed',
        'Very long timing (>10s per image) may feel slow',
        'Optimal range: 2-8 seconds per image'
      ],
      tags: [
        'ffmpeg',
        'video',
        'slideshow',
        'timing',
        'synchronization',
        'youtube',
        'tv-graphics',
        'evidence'
      ],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    const abilityResult = await db.collection('abilities').insertOne(ability);
    console.log('✅ Ability saved:', abilityResult.insertedId);

    console.log('');
    console.log('📊 Documentation Summary:');
    console.log('  Hunt Conversation: dina-evidence-broadcast-oct19-2025');
    console.log('  Ability: slideshow-timing-optimization-tv-graphics-oct19');
    console.log('  Category: video-production / slideshow-timing');
    console.log('  Outcome: SUCCESS - 8.7MB DINA evidence video');
    console.log('  Images: 24 evidence photos');
    console.log('  Duration: 165s (2m 45s)');
    console.log('  Timing: 6.88s per image (perfect sync)');
    console.log('  YouTube: Ready for upload');
    console.log('');
    console.log('⚖️ DINA evidence documented - Justice and Memory preserved, nyaa~!');

  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

saveDINAEvidenceSession();
