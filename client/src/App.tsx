import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TherapySession } from './components/TherapySession'
import { SessionHistory } from './components/SessionHistory'
import { memoryService } from './services/memory'
import type { ConversationMemory } from './types'
import { Heart, History, X } from 'lucide-react'

function App() {
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>()
  const [showHistory, setShowHistory] = useState(false)
  const [conversations, setConversations] = useState<ConversationMemory[]>([])

  const refreshConversations = useCallback(() => {
    const allConversations = memoryService.getAllConversations()
    setConversations(allConversations)
  }, [])

  const handleNewSession = useCallback(() => {
    setCurrentSessionId(undefined)
    setShowHistory(false)
  }, [])

  const handleSelectSession = useCallback((id: string) => {
    setCurrentSessionId(id)
    setShowHistory(false)
  }, [])

  const handleDeleteSession = useCallback((id: string) => {
    memoryService.deleteConversation(id)
    refreshConversations()
    if (currentSessionId === id) {
      setCurrentSessionId(undefined)
    }
  }, [currentSessionId])

  const handleSessionCreated = useCallback(() => {
    refreshConversations()
    const latest = memoryService.getAllConversations()
    if (latest.length > 0) {
      setCurrentSessionId(latest[0].id)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* History Sidebar */}
        {showHistory && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col"
          >
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Session History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <SessionHistory
              conversations={conversations}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
              currentSessionId={currentSessionId}
            />
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">AI Therapist</h1>
                  <p className="text-sm text-gray-400">Your personal mental health companion</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    refreshConversations()
                    setShowHistory(!showHistory)
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
                
                <button
                  onClick={handleNewSession}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
                >
                  New Session
                </button>
              </div>
            </div>
          </div>

          {/* Therapy Session */}
          <div className="flex-1">
            <TherapySession
              sessionId={currentSessionId}
              onSessionUpdate={refreshConversations}
              onNewSession={handleSessionCreated}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
