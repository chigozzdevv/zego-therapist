# AI Therapist

A compassionate AI-powered therapy companion that provides 24/7 mental health support through voice and text conversations.

## Features

- **Voice & Text Chat**: Natural conversations with empathetic AI therapist
- **Real-time Communication**: Powered by ZEGO Cloud for seamless voice interaction
- **Session History**: Keep track of your therapy sessions
- **Privacy-Focused**: Secure and confidential conversations
- **Minimal UI**: Clean, distraction-free interface with dark theme

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **AI**: Qwen-Plus model via DashScope API
- **Voice**: ZEGO Cloud real-time communication
- **Styling**: Black background with purple accent theme

## Getting Started

### Prerequisites

- Node.js 18+
- ZEGO Cloud account
- DashScope API key

### Environment Setup

1. **Server Environment** (`server/.env`):
```env
ZEGO_APP_ID=your_zego_app_id
ZEGO_SERVER_SECRET=your_zego_server_secret
DASHSCOPE_API_KEY=your_dashscope_api_key
PORT=8080
```

2. **Client Environment** (`client/.env`):
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_ZEGO_APP_ID=your_zego_app_id
```

### Installation & Running

1. **Install dependencies**:
```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

2. **Start development servers**:
```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

3. **Access the application**:
   - Open http://localhost:5173 in your browser
   - Click "Start Session" to begin therapy conversation

## Usage

1. **Start a Session**: Click the purple "Start Session" button
2. **Choose Input Mode**: Toggle between voice and text input
3. **Have a Conversation**: Share your thoughts and feelings with the AI therapist
4. **View History**: Access previous sessions through the history panel
5. **End Session**: Click "End Session" when you're done

## Architecture

- **Client**: React SPA with real-time voice communication
- **Server**: Express API handling ZEGO Cloud integration and AI requests
- **AI Integration**: Qwen-Plus model configured for therapeutic conversations
- **Voice Processing**: ZEGO Cloud handles voice-to-text and text-to-voice

## Therapeutic Approach

The AI therapist is configured to:
- Listen actively and validate emotions
- Ask thoughtful, open-ended questions
- Provide supportive guidance without judgment
- Help users explore their feelings and find solutions
- Maintain appropriate therapeutic boundaries

## Privacy & Security

- All conversations are processed securely
- No personal data is permanently stored on servers
- Session history is kept locally in browser storage
- Voice data is processed in real-time without recording

## Contributing

This is a personal mental health tool. Please ensure any contributions maintain the therapeutic and supportive nature of the application.

## License

Private project - All rights reserved.
