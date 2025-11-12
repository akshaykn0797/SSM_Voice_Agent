# Setup Instructions for SSM-Based Voice Agent Testing Suite

## Audio File Setup

To use test audio files with the application, copy them to the Next.js public directory:

```bash
cp assets/audio/testAudio.wav maptest/public/testAudio.wav
```

## Transcript Combination Scripts

Two scripts are provided to combine XML transcript files into a single JSON file with timing information for ground truth comparison:

### Option 1: Python Script

```bash
python3 combine_transcripts.py
```

### Option 2: Node.js Script

```bash
node combine_transcripts.js
```

Both scripts will:
1. Read all ES2007a.*.words.xml files from `assets/audio/`
2. Extract words with start/end timestamps
3. Combine and sort them by timestamp
4. Output to `maptest/public/ground_truth.json`

## Running the SSM-Based Voice Agent Application

### 1. Environment Setup

First, create your environment configuration:

```bash
cd maptest
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:
```bash
CARTESIA_API_KEY=your_cartesia_api_key_here
NEXT_PUBLIC_AGENT_ID=your_cartesia_customer_service_agent_id_here
CARTESIA_WEBHOOK_SECRET=your_webhook_secret_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

### Customer Service Voice Agent Features
- **Real-time Voice Calls**: Interactive AI-powered customer service conversations
- **SSM-Based Transcription**: Accurate speech-to-text using Speech State Models
- **Voice Activity Detection**: Automatic detection of customer speech
- **Live Metrics**: Real-time performance monitoring
- **Call Transcript**: Complete conversation history with timestamps
- **Webhook Integration**: Automated call tracking and logging

### Legacy Testing Features
- **Default Audio**: Audio files load automatically for testing
- **Interactive Ground Truth**: Click any word to jump to that position
- **Real-time Highlighting**: Words highlight as audio plays, color-coded by speaker
- **Auto-scroll**: Transcript automatically scrolls to keep current word in view
- **Side-by-side Comparison**: Compare multiple STT technologies

## File Structure

```
SSM Voice Agent Repository/
├── assets/
│   └── audio/
│       ├── testAudio.wav              # Source audio file
│       ├── ES2007a.A.words.xml        # Speaker A transcript
│       ├── ES2007a.B.words.xml        # Speaker B transcript
│       ├── ES2007a.C.words.xml        # Speaker C transcript
│       └── ES2007a.D.words.xml        # Speaker D transcript
├── maptest/                           # Main voice agent application
│   ├── app/
│   │   ├── api/                      # API routes
│   │   ├── components/               # React components
│   │   │   ├── VoiceCallInterface.tsx    # Main voice UI
│   │   │   ├── CallMetrics.tsx           # Metrics display
│   │   │   └── CallTranscript.tsx        # Transcript display
│   │   └── page.tsx                  # Home page
│   ├── public/
│   │   ├── testAudio.wav             # Copy audio here
│   │   └── ground_truth.json         # Generated transcript
│   ├── server.js                     # WebSocket server
│   ├── .env.local.example            # Environment template
│   └── package.json
├── combine_transcripts.py            # Python transcript combiner
├── combine_transcripts.js            # Node.js transcript combiner
└── SETUP.md                          # This file
```

## Cartesia Agent Configuration for Customer Service

When setting up your Cartesia agent, configure it for customer service scenarios:

### Recommended Voice Settings
- **Tone**: Professional, friendly, and helpful
- **Speed**: Normal to slightly slower for clarity
- **Language**: Match your customer base (English recommended)

### Personality Traits
- Patient and understanding
- Professional yet approachable
- Solution-oriented
- Clear communicator

### Behavior Configuration
- Acknowledge customer concerns
- Ask clarifying questions
- Provide step-by-step guidance
- Offer to escalate when necessary
- Confirm understanding before ending

## Speaker Color Coding (for Ground Truth)

- **Speaker A**: Blue (#1976d2)
- **Speaker B**: Green (#388e3c)
- **Speaker C**: Orange (#f57c00)
- **Speaker D**: Purple (#7b1fa2)

## Troubleshooting

### Microphone Not Working
- Ensure browser has microphone permissions
- Check system audio settings
- Try a different browser (Chrome recommended)

### WebSocket Connection Issues
- Verify Cartesia API key is valid
- Check that agent ID exists in your Cartesia account
- Ensure port 3000 is not blocked

### Transcription Quality Issues
- Test your microphone quality
- Reduce background noise
- Speak clearly and at normal pace
- Adjust VAD threshold if needed

## Production Deployment

For production deployment:

```bash
npm run build
npm start
```

Set `NODE_ENV=production` in your environment variables.

## Support

For detailed documentation, see:
- [Main README](maptest/README.md) - Complete application documentation
- [Voice Call Setup](maptest/VOICE_CALL_SETUP.md) - Voice configuration
- [Webhook Setup](maptest/WEBHOOK_SETUP.md) - Webhook integration
