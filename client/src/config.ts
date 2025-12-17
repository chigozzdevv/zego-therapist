import { z } from 'zod'

const configSchema = z.object({
  ZEGO_APP_ID: z.string().min(1, 'ZEGO App ID is required'),
  API_BASE_URL: z.string().url('Valid API base URL required'),
  ZEGO_SERVER: z.string().url('Valid ZEGO server URL required'),
})

const rawConfig = {
  ZEGO_APP_ID: import.meta.env.VITE_ZEGO_APP_ID,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ZEGO_SERVER: import.meta.env.VITE_ZEGO_SERVER || 'wss://webrtc-api.zegocloud.com/ws',
}

export const config = configSchema.parse(rawConfig)

export const STORAGE_KEYS = {
  CONVERSATIONS: 'ai_conversations',
  USER_PREFERENCES: 'ai_user_preferences',
  SESSION_HISTORY: 'ai_session_history',
} as const