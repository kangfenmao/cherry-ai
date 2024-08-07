import { SYSTEM_MODELS } from '@renderer/config/models'
import i18n from '@renderer/i18n'
import { Assistant } from '@renderer/types'
import { isEmpty } from 'lodash'
import { createMigrate } from 'redux-persist'

import { RootState } from '.'

const migrateConfig = {
  '2': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'yi',
            name: 'Yi',
            apiKey: '',
            apiHost: 'https://api.lingyiwanwu.com',
            isSystem: true,
            models: SYSTEM_MODELS.yi.filter((m) => m.enabled)
          }
        ]
      }
    }
  },
  '3': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'zhipu',
            name: 'ZhiPu',
            apiKey: '',
            apiHost: 'https://open.bigmodel.cn/api/paas/v4/',
            isSystem: true,
            models: SYSTEM_MODELS.zhipu.filter((m) => m.enabled)
          }
        ]
      }
    }
  },
  '4': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'ollama',
            name: 'Ollama',
            apiKey: '',
            apiHost: 'http://localhost:11434/v1/',
            isSystem: true,
            models: []
          }
        ]
      }
    }
  },
  '5': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'moonshot',
            name: 'Moonshot',
            apiKey: '',
            apiHost: 'https://api.moonshot.cn',
            isSystem: true,
            models: SYSTEM_MODELS.moonshot.filter((m) => m.enabled)
          }
        ]
      }
    }
  },
  '6': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'openrouter',
            name: 'OpenRouter',
            apiKey: '',
            apiHost: 'https://openrouter.ai/api/v1/',
            models: SYSTEM_MODELS.openrouter.filter((m) => m.enabled),
            isSystem: true
          }
        ]
      }
    }
  },
  '7': (state: RootState) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        language: navigator.language
      }
    }
  },
  '8': (state: RootState) => {
    const fixAssistantName = (assistant: Assistant) => {
      if (isEmpty(assistant.name)) {
        assistant.name = i18n.t(`assistant.${assistant.id}.name`)
      }

      assistant.topics = assistant.topics.map((topic) => {
        if (isEmpty(topic.name)) {
          topic.name = i18n.t(`assistant.${assistant.id}.topic.name`)
        }
        return topic
      })

      return assistant
    }

    return {
      ...state,
      assistants: {
        ...state.assistants,
        defaultAssistant: fixAssistantName(state.assistants.defaultAssistant),
        assistants: state.assistants.assistants.map((assistant) => fixAssistantName(assistant))
      }
    }
  },
  '9': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: state.llm.providers.map((provider) => {
          if (provider.id === 'zhipu' && provider.models[0] && provider.models[0].id === 'llama3-70b-8192') {
            provider.models = SYSTEM_MODELS.zhipu.filter((m) => m.enabled)
          }
          return provider
        })
      }
    }
  },
  '10': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'baichuan',
            name: 'BAICHUAN AI',
            apiKey: '',
            apiHost: 'https://api.baichuan-ai.com',
            models: SYSTEM_MODELS.baichuan.filter((m) => m.enabled),
            isSystem: true,
            enabled: false
          }
        ]
      }
    }
  },
  '11': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'dashscope',
            name: 'DashScope',
            apiKey: '',
            apiHost: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
            models: SYSTEM_MODELS.dashscope.filter((m) => m.enabled),
            isSystem: true,
            enabled: false
          },
          {
            id: 'anthropic',
            name: 'Anthropic',
            apiKey: '',
            apiHost: 'https://api.anthropic.com/',
            models: SYSTEM_MODELS.anthropic.filter((m) => m.enabled),
            isSystem: true,
            enabled: false
          }
        ]
      }
    }
  },
  '12': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'aihubmix',
            name: 'AiHubMix',
            apiKey: '',
            apiHost: 'https://aihubmix.com',
            models: SYSTEM_MODELS.aihubmix.filter((m) => m.enabled),
            isSystem: true,
            enabled: false
          }
        ]
      }
    }
  },
  '13': (state: RootState) => {
    return {
      ...state,
      assistants: {
        ...state.assistants,
        defaultAssistant: {
          ...state.assistants.defaultAssistant,
          name: ['Default Assistant', '默认助手'].includes(state.assistants.defaultAssistant.name)
            ? i18n.t(`assistant.default.name`)
            : state.assistants.defaultAssistant.name
        }
      }
    }
  },
  '14': (state: RootState) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        showAssistants: true,
        proxyUrl: undefined
      }
    }
  },
  '15': (state: RootState) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        userName: '',
        showMessageDivider: true
      }
    }
  },
  '16': (state: RootState) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        messageFont: 'system',
        showInputEstimatedTokens: false
      }
    }
  },
  '17': (state: RootState) => {
    return {
      ...state,
      settings: {
        ...state.settings,
        theme: 'auto'
      }
    }
  },
  '19': (state: RootState) => {
    return {
      ...state,
      agents: {
        agents: []
      },
      llm: {
        ...state.llm,
        settings: {
          ollama: {
            keepAliveTime: 5
          }
        }
      }
    }
  }
}

const migrate = createMigrate(migrateConfig as any)

export default migrate
