# 📺✨ YouTube API Setup Guide ✨📺

**Complete walkthrough for connecting your YouTube account to Neko Video System**

*Created by Neko-Arc with MAXIMUM DETAIL, nyaa~! 🐾*

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Cloud Console Setup](#google-cloud-console-setup)
3. [OAuth2 Credentials Configuration](#oauth2-credentials-configuration)
4. [Generate YouTube Tokens](#generate-youtube-tokens)
5. [Test Your Setup](#test-your-setup)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ Google account with YouTube channel
- ✅ Node.js installed (v14 or higher)
- ✅ `googleapis` and `dotenv` npm packages
- ✅ Neko Defense System repository cloned
- ✅ 30 minutes of time

**Install dependencies:**
```bash
cd ~/Documents/github/
npm install googleapis dotenv
```

---

## 🌐 Google Cloud Console Setup

### Step 1: Access Google Cloud Console

1. Open your browser
2. Go to: **https://console.cloud.google.com/**
3. Log in with your Google account (the one with your YouTube channel!)

### Step 2: Create a New Project

1. Click the project dropdown at the top (says "Select a project")
2. Click **"NEW PROJECT"** button
3. Fill in project details:
   - **Project name:** `Neko Video System`
   - **Organization:** Leave as default (No organization)
   - **Location:** Leave as default
4. Click **"CREATE"**
5. Wait 10-20 seconds for project creation
6. You'll be redirected to the new project dashboard

### Step 3: Enable YouTube Data API v3

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
   - Or go directly to: https://console.cloud.google.com/apis/library
2. In the search bar, type: `YouTube Data API v3`
3. Click on **"YouTube Data API v3"** from results
4. Click the blue **"ENABLE"** button
5. Wait 30 seconds for API activation
6. You should see "API enabled" message

**✅ Checkpoint:** You should now see "YouTube Data API v3" in your enabled APIs list

---

## 🔐 OAuth2 Credentials Configuration

### Step 4: Configure OAuth Consent Screen

Before creating credentials, you MUST configure the consent screen:

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
   - Or: https://console.cloud.google.com/apis/credentials/consent
2. Choose user type:
   - Select **"External"** (unless you have Google Workspace)
   - Click **"CREATE"**

#### **OAuth Consent Screen Configuration:**

**Page 1: App Information**

Fill in these fields:

```
App name: Neko Defense Video System
User support email: [your-email@example.com]
App logo: (optional - skip for now)

App domain:
  - Application home page: (leave blank)
  - Application privacy policy link: (leave blank)
  - Application terms of service link: (leave blank)

Authorized domains: (leave blank for now)

Developer contact information:
  - Email addresses: [your-email@example.com]
```

Click **"SAVE AND CONTINUE"**

**Page 2: Scopes**

1. Click **"ADD OR REMOVE SCOPES"**
2. In the filter box, search for: `youtube`
3. Select these scopes (check the boxes):
   - ✅ `https://www.googleapis.com/auth/youtube` - Manage your YouTube account
   - ✅ `https://www.googleapis.com/auth/youtube.upload` - Manage your YouTube videos
   - ✅ `https://www.googleapis.com/auth/youtube.force-ssl` - See, edit, and permanently delete your YouTube videos

4. Click **"UPDATE"**
5. Verify scopes are added
6. Click **"SAVE AND CONTINUE"**

**Page 3: Test Users**

1. Click **"ADD USERS"**
2. Enter YOUR email (the one with YouTube channel): `your-youtube-email@gmail.com`
3. Click **"ADD"**
4. Click **"SAVE AND CONTINUE"**

**Page 4: Summary**

1. Review all information
2. Click **"BACK TO DASHBOARD"**

**✅ Checkpoint:** OAuth consent screen should show "Testing" status

### Step 5: Create OAuth 2.0 Client ID

Now create the actual credentials:

1. Go to **"APIs & Services"** → **"Credentials"**
   - Or: https://console.cloud.google.com/apis/credentials
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**

#### **Configure OAuth Client:**

```
Application type: Web application

Name: Neko Video Uploader

Authorized JavaScript origins:
  - http://localhost:3000
  - http://localhost:3003

Authorized redirect URIs:
  - http://localhost:3000/api/auth/callback/youtube
  - http://localhost:3003/api/auth/callback/youtube
```

4. Click **"CREATE"**

### Step 6: Download Credentials

A popup will appear with your credentials:

```
Your Client ID:
123456789-abcdefghijk.apps.googleusercontent.com

Your Client Secret:
GOCSPX-XxXxXxXxXxXxXxXxXxXx
```

**CRITICAL ACTIONS:**

1. Click **"DOWNLOAD JSON"** button
   - Save as: `client_secret.json`
   - Location: `~/Documents/github/client_secret.json`

2. **Copy the credentials** to your `.env` file:

```bash
cd ~/Documents/github/
nano .env
```

Add these values:
```env
YOUTUBE_CLIENT_ID="123456789-abcdefghijk.apps.googleusercontent.com"
YOUTUBE_CLIENT_SECRET="GOCSPX-XxXxXxXxXxXxXxXxXxXx"
YOUTUBE_REDIRECT_URI="http://localhost:3000/api/auth/callback/youtube"
```

3. **Secure the files:**
```bash
chmod 600 .env
chmod 600 client_secret.json

# Add to .gitignore
echo ".env" >> .gitignore
echo "client_secret.json" >> .gitignore
echo ".youtube-tokens.json" >> .gitignore
```

**✅ Checkpoint:** You should have Client ID and Secret in `.env` file

---

## 🎫 Generate YouTube Tokens

Now generate the OAuth tokens for your account:

### Step 7: Run Auth Setup Script

```bash
cd ~/Documents/github/
node youtube-auth-setup.js
```

You'll see output like:
```
═══════════════════════════════════════════════════════════════
🐾 NEKO YOUTUBE AUTH SETUP - MAXIMUM POWER MODE! 🐾
═══════════════════════════════════════════════════════════════

📋 STEP 1: Authorize the application

Visit this URL in your browser:

🔗 https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=...

─────────────────────────────────────────────────────────────
```

### Step 8: Authorize in Browser

1. **Copy the URL** from the terminal
2. **Paste it in your browser**
3. You'll see Google's login page:
   - Log in with your **YouTube account**
   - (The same email you added as a test user!)

4. You'll see the OAuth consent screen:
   ```
   Neko Defense Video System wants to access your Google Account

   This will allow Neko Defense Video System to:
   ✓ Manage your YouTube account
   ✓ Manage your YouTube videos
   ✓ See, edit, and permanently delete your YouTube videos
   ```

5. Click **"Continue"** (or "Allow")

6. You'll be redirected to a URL like:
   ```
   http://localhost:3000/api/auth/callback/youtube?code=4/0AY0e-g7X...
   ```

7. The page will show "Cannot GET" error - **THIS IS NORMAL!**
   - We don't have the web server running yet
   - We just need the `code` parameter from the URL

### Step 9: Copy Authorization Code

From the redirect URL, copy ONLY the code parameter:

```
http://localhost:3000/api/auth/callback/youtube?code=4/0AY0e-g7XXXXXXXXXXX&scope=...
                                                       ^^^^^^^^^^^^^^^^^^^
                                                       Copy this part!
```

### Step 10: Complete Token Generation

1. Go back to your terminal
2. You'll see the prompt:
   ```
   📋 STEP 3: Enter the authorization code here:
   ```
3. **Paste the code** and press Enter

4. The script will exchange the code for tokens:
   ```
   🔄 Exchanging code for tokens...

   ═══════════════════════════════════════════════════════════════
   ✅ SUCCESS! YouTube account connected, desu~! 💖
   ═══════════════════════════════════════════════════════════════

   📝 Tokens saved to: .youtube-tokens.json

   📋 Add these to your .env file:

   ─────────────────────────────────────────────────────────────
   YOUTUBE_ACCESS_TOKEN="ya29.a0AfB_..."
   YOUTUBE_REFRESH_TOKEN="1//0gXXXXXXXXXX..."
   YOUTUBE_TOKEN_EXPIRY="1729555555555"
   ─────────────────────────────────────────────────────────────

   🧪 Testing YouTube API connection...

   ✅ Connection successful!
   📺 Channel: Your Channel Name
   👥 Subscribers: 1234
   🎥 Videos: 56
   👁️  Total views: 123456

   💰 READY FOR MONETIZATION, NYAA~! ✨
   ```

### Step 11: Update .env File

Copy the tokens from terminal output to your `.env` file:

```bash
nano .env
```

Add the generated values:
```env
YOUTUBE_ACCESS_TOKEN="ya29.a0AfB_byexample..."
YOUTUBE_REFRESH_TOKEN="1//0gXXXXXXXXXXXXXXXXXX"
YOUTUBE_TOKEN_EXPIRY="1729555555555"
```

Save and exit (Ctrl+O, Enter, Ctrl+X)

**✅ Checkpoint:** All YouTube credentials in `.env` file

---

## 🧪 Test Your Setup

### Step 12: Test Video Upload

Create a test video (or use an existing one):

```bash
# Option 1: Use ffmpeg to create a test video
ffmpeg -f lavfi -i testsrc=duration=10:size=1280x720:rate=30 \
       -f lavfi -i sine=frequency=1000:duration=10 \
       -pix_fmt yuv420p test-video.mp4

# Option 2: Use existing video
cp /path/to/your/video.mp4 test-video.mp4
```

Run the uploader:

```bash
node youtube-uploader.js test-video.mp4
```

Expected output:
```
═══════════════════════════════════════════════════════════════
🎬 NEKO YOUTUBE UPLOADER - STARTING UPLOAD, NYAA~!
═══════════════════════════════════════════════════════════════
📁 File: test-video.mp4
📏 Size: 2.34 MB
📝 Title: Test Upload from Neko Video System
🔒 Privacy: unlisted
📂 Category: 22
🏷️  Tags: test, neko, automation, cybersecurity
─────────────────────────────────────────────────────────────

📤 Upload progress: 100.0%

═══════════════════════════════════════════════════════════════
✅ VIDEO UPLOADED SUCCESSFULLY, DESU~! 💖
═══════════════════════════════════════════════════════════════
🎥 Video ID: XxXxXxXxXxX
🔗 URL: https://www.youtube.com/watch?v=XxXxXxXxXxX
📺 Status: uploaded
💰 Monetization: Ready to enable in YouTube Studio!
═══════════════════════════════════════════════════════════════
```

### Step 13: Verify on YouTube

1. Go to YouTube Studio: https://studio.youtube.com/
2. Click "Content" in left sidebar
3. You should see your test video (unlisted)
4. **Success!** Your automated upload system works! 🎉

### Step 14: Clean Up Test Video (Optional)

If you want to delete the test video:
1. In YouTube Studio, find the test video
2. Click the three dots menu
3. Select "Delete forever"

---

## 🔧 Troubleshooting

### Problem: "Missing required environment variables"

**Solution:**
- Ensure `.env` file has all YouTube variables filled in
- Check for typos in variable names
- Make sure there are no extra spaces around `=` signs

### Problem: "Error loading client secret file"

**Solution:**
- Verify `client_secret.json` exists in `~/Documents/github/`
- Re-download from Google Cloud Console if needed
- Check file permissions: `ls -la client_secret.json`

### Problem: "No refresh token received"

**Cause:** You've authorized this app before

**Solution:**
1. Go to: https://myaccount.google.com/permissions
2. Find "Neko Defense Video System"
3. Click "Remove access"
4. Run `node youtube-auth-setup.js` again
5. Make sure to use `prompt=consent` (script does this automatically)

### Problem: "401 Authentication error"

**Solution:**
- Access token expired (normal after 1 hour)
- Refresh token will automatically get new access token
- If refresh token invalid, re-run `youtube-auth-setup.js`

### Problem: "403 Permission denied"

**Possible causes:**
1. **API not enabled:** Go to Google Cloud Console, enable YouTube Data API v3
2. **Wrong scopes:** Ensure you added all required scopes in OAuth consent screen
3. **Quota exceeded:** Check quota usage in Google Cloud Console
4. **Test user not added:** Add your email to test users in consent screen

### Problem: "400 Bad request"

**Possible causes:**
- Invalid video file format (use MP4 with H.264 codec)
- Missing required metadata (title is required)
- Invalid category ID

### Problem: Upload stalls at 0%

**Solution:**
- Check internet connection
- Ensure video file isn't corrupted
- Try with smaller test video first
- Check firewall settings

---

## 📊 API Quotas

YouTube Data API v3 has daily quotas:

- **Default quota:** 10,000 units per day
- **Video upload cost:** 1,600 units per video
- **Maximum uploads per day:** ~6 videos (with default quota)

To increase quota:
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Quotas"
3. Find "YouTube Data API v3"
4. Click "EDIT QUOTAS"
5. Submit increase request

**For production use, request higher quota limits!**

---

## 🎯 Next Steps

Now that YouTube API is set up:

1. ✅ Integrate with exposure system
2. ✅ Auto-upload threat actor videos
3. ✅ Build web dashboard
4. ✅ Enable monetization in YouTube Studio
5. ✅ Start generating revenue from threat captures!

**Integration example:**

```javascript
const YouTubeUploader = require('./youtube-uploader');
const uploader = new YouTubeUploader();

// After generating exposure video
const videoPath = './output/exposure-mikhail_matveev-20251017.mp4';
const threatActor = await db.collection('threat-actors').findOne({
  actor_id: 'mikhail_matveev'
});

// Upload to YouTube automatically!
const result = await uploader.uploadThreatExposure(videoPath, threatActor);

console.log('Video live at:', result.videoUrl);
// Save URL to database
await db.collection('exposure_videos').updateOne(
  { threat_actor_id: 'mikhail_matveev' },
  { $set: { youtube_url: result.videoUrl, status: 'uploaded' }}
);
```

---

## 🐾 Support

Need help? Check:

- 📚 Official docs: https://developers.google.com/youtube/v3
- 🐛 Issue tracker: Google Cloud Console support
- 💬 Ask Neko-Arc for assistance!

---

## 🎉 Congratulations!

You've successfully connected your YouTube account to Neko Video System!

**You can now:**
- ✅ Upload videos programmatically
- ✅ Automate threat actor exposures
- ✅ Monetize defensive cybersecurity work
- ✅ Scale your content production

*MAXIMUM AUTOMATION ACHIEVED, NYAA~!* 🚀✨

---

**Generated by Neko-Arc with 💖**
**Date:** October 17, 2025
**Version:** 1.0.0
