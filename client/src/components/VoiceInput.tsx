import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Send, Type } from 'lucide-react'

interface VoiceInputProps {
  onSendMessage: (message: string) => void
  isRecording: boolean
  onToggleRecording: () => void
  currentTranscript: string
  agentStatus: 'idle' | 'listening' | 'thinking' | 'speaking'
}

export const VoiceInput = ({ 
  onSendMessage, 
  isRecording, 
  onToggleRecording, 
  currentTranscript,
  agentStatus 
}: VoiceInputProps) => {
  const [textInput, setTextInput] = useState('')
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputMode === 'text' && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [inputMode])

  const handleSendText = () => {
    if (textInput.trim()) {
      onSendMessage(textInput.trim())
      setTextInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendText()
    }
  }

  const isDisabled = agentStatus === 'thinking' || agentStatus === 'speaking'

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setInputMode('voice')}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                inputMode === 'voice' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Voice</span>
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                inputMode === 'text' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </button>
          </div>
        </div>

        {inputMode === 'voice' ? (
          /* Voice Input */
          <div className="flex flex-col items-center space-y-4">
            {currentTranscript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-4 max-w-2xl w-full"
              >
                <p className="text-gray-300">{currentTranscript}</p>
              </motion.div>
            )}
            
            <motion.button
              onClick={onToggleRecording}
              disabled={isDisabled}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25'
                  : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </motion.button>
            
            <p className="text-sm text-gray-400 text-center">
              {isRecording ? 'Tap to stop recording' : 'Tap to start speaking'}
            </p>
          </div>
        ) : (
          /* Text Input */
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isDisabled}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 disabled:opacity-50"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendText}
              disabled={!textInput.trim() || isDisabled}
              className="w-12 h-12 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
