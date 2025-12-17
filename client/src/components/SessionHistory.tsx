import { motion } from 'framer-motion'
import type { ConversationMemory } from '../types'
import { Trash2, MessageCircle } from 'lucide-react'

interface SessionHistoryProps {
  conversations: ConversationMemory[]
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
  currentSessionId?: string
}

export const SessionHistory = ({ 
  conversations, 
  onSelectSession, 
  onDeleteSession, 
  currentSessionId 
}: SessionHistoryProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getPreview = (conv: ConversationMemory) => {
    const lastMessage = conv.messages[conv.messages.length - 1]
    if (!lastMessage) return 'New session'
    
    const preview = lastMessage.content.substring(0, 60)
    return preview.length < lastMessage.content.length ? preview + '...' : preview
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No sessions yet</p>
          <p className="text-sm text-gray-500 mt-2">Start a new session to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        {conversations.map((conv) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
              currentSessionId === conv.id 
                ? 'bg-purple-600/20 border border-purple-600/30' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => onSelectSession(conv.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-xs text-gray-400">
                    {formatDate(conv.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 truncate">
                  {getPreview(conv)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-gray-500">
                    {conv.messages.length} messages
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteSession(conv.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
