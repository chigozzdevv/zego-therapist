import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble } from './Chat/MessageBubble'
import { VoiceInput } from './VoiceInput'
import { useChat } from '../hooks/useChat'
import { Heart, Phone, PhoneOff } from 'lucide-react'

interface TherapySessionProps {
  sessionId?: string
  onSessionUpdate?: () => void
  onNewSession?: () => void
}

export const TherapySession = ({ sessionId, onSessionUpdate, onNewSession }: TherapySessionProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { 
    messages, 
    isLoading, 
    isConnected, 
    isRecording,
    currentTranscript,
    agentStatus,
    conversation,
    startSession, 
    sendTextMessage, 
    toggleVoiceRecording,
    endSession,
    resetConversation,
    initializeConversation
  } = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    onSessionUpdate?.()
  }, [messages, onSessionUpdate])

  useEffect(() => {
    if (sessionId && sessionId !== conversation?.id) {
      initializeConversation(sessionId)
    } else if (!sessionId && conversation) {
      resetConversation()
    }
  }, [sessionId, conversation?.id, initializeConversation, resetConversation])

  const handleStartSession = async () => {
    const success = await startSession(sessionId)
    if (success && onNewSession && !sessionId) {
      onNewSession()
    }
  }

  const handleEndSession = async () => {
    await endSession()
    onNewSession?.()
  }

  const getStatusText = () => {
    if (!isConnected) return 'Ready to begin your session'
    
    switch (agentStatus) {
      case 'listening':
        return 'Listening...'
      case 'thinking':
        return 'Processing...'
      case 'speaking':
        return 'Responding...'
      default:
        return 'Connected'
    }
  }

  const getStatusColor = () => {
    if (!isConnected) return 'text-gray-400'
    
    switch (agentStatus) {
      case 'listening':
        return 'text-green-400'
      case 'thinking':
        return 'text-blue-400'
      case 'speaking':
        return 'text-purple-400'
      default:
        return 'text-green-400'
    }
  }

  return (
    <div className="flex flex-col h-full bg-black">
      <audio id="ai-audio-output" autoPlay style={{ display: 'none' }} />

      {/* Session Status */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          
          {isConnected ? (
            <button
              onClick={handleEndSession}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Session</span>
            </button>
          ) : (
            <button
              onClick={handleStartSession}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>{isLoading ? 'Starting...' : 'Start Session'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              {isConnected ? 'How are you feeling today?' : 'Welcome to Your Safe Space'}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              {isConnected 
                ? 'Share what\'s on your mind. I\'m here to listen and support you.'
                : 'This is a judgment-free zone where you can express yourself freely. Start a session when you\'re ready to talk.'
              }
            </p>
            {!isConnected && (
              <div className="space-y-3 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Voice conversations with empathetic AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Complete privacy and confidentiality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Available 24/7 whenever you need support</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        
        {agentStatus === 'thinking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start mb-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-800 rounded-2xl px-5 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-gray-400">Thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Input */}
      {isConnected && (
        <VoiceInput 
          onSendMessage={sendTextMessage}
          isRecording={isRecording}
          onToggleRecording={toggleVoiceRecording}
          currentTranscript={currentTranscript}
          agentStatus={agentStatus}
        />
      )}
    </div>
  )
}
