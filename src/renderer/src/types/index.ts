import OpenAI from 'openai'

export type Assistant = {
  id: string
  name: string
  prompt: string
  topics: Topic[]
  emoji?: string
  description?: string
  model?: Model
  settings?: AssistantSettings
}

export type AssistantSettings = {
  contextCount: number
  temperature: number
  maxTokens: number | undefined
  enableMaxTokens: boolean
}

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  assistantId: string
  topicId: string
  modelId?: string
  createdAt: string
  status: 'sending' | 'pending' | 'success' | 'paused' | 'error'
  usage?: OpenAI.Completions.CompletionUsage
  type?: 'text' | '@'
}

export type Topic = {
  id: string
  name: string
  messages: Message[]
}

export type User = {
  id: string
  name: string
  avatar: string
  email: string
}

export type Provider = {
  id: string
  name: string
  apiKey: string
  apiHost: string
  models: Model[]
  enabled?: boolean
  isSystem?: boolean
}

export type Model = {
  id: string
  provider: string
  name: string
  group: string
  owned_by?: string
  description?: string
}

export type Agent = {
  id: string
  name: string
  emoji: string
  description?: string
  prompt: string
  group: string
}

export type Suggestion = {
  content: string
}
