# SSM-Based Voice Agent Testing Suite

A comprehensive testing suite for evaluating Speech-to-Text (STT) technologies in customer service scenarios. This repository includes both a legacy web-based comparison tool and a modern SSM-based voice agent for customer service.

## Repository Contents

### 1. SSM-Based Voice Agent (Main Application)
Located in `/main/` - A production-ready Next.js voice agent application powered by Cartesia AI for customer service interactions.

**Features:**
- Real-time voice conversations with AI agents
- SSM-based speech-to-text transcription
- Voice Activity Detection (VAD)
- Customer service metrics dashboard
- Webhook integration for call tracking

**See:** [main/README.md](main/README.md) for complete documentation.

### 2. Legacy STT Comparison Tool
Simple web-based tool for comparing two STT technologies side-by-side.

**Features:**
- Audio file upload and playback
- Side-by-side transcription comparison
- Real-time metrics tracking (processing time, accuracy)
- Clean, responsive UI

## Project Structure

```
SSM Voice Agent Repository/
├── main/                    # Main SSM-based voice agent application
│   ├── app/                   # Next.js application
│   ├── server.js              # WebSocket server
│   ├── package.json           # Dependencies
│   └── README.md              # Main documentation
├── index.html                 # Legacy comparison tool
├── src/
│   ├── js/
│   │   └── app.js            # Legacy tool JavaScript
│   └── styles/
│       └── main.css          # Legacy tool styles
├── assets/
│   └── audio/                # Test audio files
└── README.md                 # This file
```

## Getting Started

### For SSM-Based Voice Agent (Recommended)

1. Navigate to the main directory:
```bash
cd main
```

2. Follow the installation and setup instructions in [main/README.md](main/README.md)

3. Configure your Cartesia API credentials in `.env.local`

4. Start the application:
```bash
npm run dev
```

### For Legacy Comparison Tool

1. Open `index.html` in a modern web browser
2. Upload audio files for testing
3. Compare transcription results side-by-side

## Use Cases

This SSM-based voice agent testing suite is ideal for:

- **Customer Support Centers**: Evaluate AI-powered voice agents for handling customer inquiries
- **Help Desk Services**: Test 24/7 automated customer assistance capabilities
- **Technical Support**: Assess voice agent performance in troubleshooting scenarios
- **Product Support**: Test real-time voice interaction for product-related questions
- **Quality Assurance**: Compare transcription accuracy across different STT technologies

## File Structure Details

### `/assets/audio/`
Store your audio test files here. Supported formats:
- MP3
- WAV
- OGG
- M4A

### Legacy Tool Files
- `index.html` - Simple web interface for STT comparison
- `src/js/app.js` - Audio playback and processing logic
- `src/styles/main.css` - UI styling

## Technologies

### Modern Voice Agent (main/)
- Next.js 16 with App Router
- React 19
- TypeScript
- Cartesia AI (SSM-based STT)
- WebSocket for real-time communication
- Material-UI

### Legacy Tool
- HTML5 Audio API
- ES6 JavaScript
- CSS Grid and Flexbox

## Browser Compatibility

- Modern browsers supporting HTML5 Audio API
- ES6 JavaScript
- WebSocket support (for voice agent)
- Microphone access (for voice agent)

## Documentation

- [SSM Voice Agent Documentation](main/README.md) - Complete setup and usage guide
- [Setup Guide](SETUP.md) - Detailed configuration instructions
- [Voice Call Setup](main/VOICE_CALL_SETUP.md) - Voice call configuration
- [Webhook Setup](main/WEBHOOK_SETUP.md) - Webhook integration guide

## License

This project is proprietary. All rights reserved.

## Support

For issues related to:
- **SSM Voice Agent**: See [main/README.md](main/README.md)
- **Cartesia API**: Visit [Cartesia Documentation](https://docs.cartesia.ai)
- **General Issues**: Open an issue in the project repository
