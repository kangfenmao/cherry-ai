import BaichuanModelLogo from '@renderer/assets/images/models/baichuan.png'
import ChatGLMModelLogo from '@renderer/assets/images/models/chatglm.jpeg'
import ChatGPTModelLogo from '@renderer/assets/images/models/chatgpt.jpeg'
import ClaudeModelLogo from '@renderer/assets/images/models/claude.png'
import DeepSeekModelLogo from '@renderer/assets/images/models/deepseek.png'
import GemmaModelLogo from '@renderer/assets/images/models/gemma.jpeg'
import LlamaModelLogo from '@renderer/assets/images/models/llama.jpeg'
import MicrosoftModelLogo from '@renderer/assets/images/models/microsoft.png'
import MixtralModelLogo from '@renderer/assets/images/models/mixtral.jpeg'
import QwenModelLogo from '@renderer/assets/images/models/qwen.png'
import YiModelLogo from '@renderer/assets/images/models/yi.svg'
import AiHubMixProviderLogo from '@renderer/assets/images/providers/aihubmix.jpg'
import AnthropicProviderLogo from '@renderer/assets/images/providers/anthropic.jpeg'
import BaichuanProviderLogo from '@renderer/assets/images/providers/baichuan.png'
import DashScopeProviderLogo from '@renderer/assets/images/providers/dashscope.png'
import DeepSeekProviderLogo from '@renderer/assets/images/providers/deepseek.png'
import GroqProviderLogo from '@renderer/assets/images/providers/groq.png'
import MoonshotProviderLogo from '@renderer/assets/images/providers/moonshot.jpeg'
import MoonshotModelLogo from '@renderer/assets/images/providers/moonshot.jpeg'
import OllamaProviderLogo from '@renderer/assets/images/providers/ollama.png'
import OpenAiProviderLogo from '@renderer/assets/images/providers/openai.jpeg'
import OpenRouterProviderLogo from '@renderer/assets/images/providers/openrouter.png'
import SiliconFlowProviderLogo from '@renderer/assets/images/providers/silicon.png'
import YiProviderLogo from '@renderer/assets/images/providers/yi.svg'
import ZhipuProviderLogo from '@renderer/assets/images/providers/zhipu.png'

export function getProviderLogo(providerId: string) {
  switch (providerId) {
    case 'openai':
      return OpenAiProviderLogo
    case 'silicon':
      return SiliconFlowProviderLogo
    case 'deepseek':
      return DeepSeekProviderLogo
    case 'yi':
      return YiProviderLogo
    case 'groq':
      return GroqProviderLogo
    case 'zhipu':
      return ZhipuProviderLogo
    case 'ollama':
      return OllamaProviderLogo
    case 'moonshot':
      return MoonshotProviderLogo
    case 'openrouter':
      return OpenRouterProviderLogo
    case 'baichuan':
      return BaichuanProviderLogo
    case 'dashscope':
      return DashScopeProviderLogo
    case 'anthropic':
      return AnthropicProviderLogo
    case 'aihubmix':
      return AiHubMixProviderLogo
    default:
      return undefined
  }
}

export function getModelLogo(modelId: string) {
  if (!modelId) {
    return undefined
  }

  const logoMap = {
    gpt: ChatGPTModelLogo,
    glm: ChatGLMModelLogo,
    deepseek: DeepSeekModelLogo,
    qwen: QwenModelLogo,
    gemma: GemmaModelLogo,
    'yi-': YiModelLogo,
    llama: LlamaModelLogo,
    mixtral: MixtralModelLogo,
    mistral: MixtralModelLogo,
    moonshot: MoonshotModelLogo,
    phi: MicrosoftModelLogo,
    baichuan: BaichuanModelLogo,
    claude: ClaudeModelLogo
  }

  for (const key in logoMap) {
    if (modelId.toLowerCase().includes(key)) {
      return logoMap[key]
    }
  }

  return undefined
}

export const PROVIDER_CONFIG = {
  openai: {
    api: {
      url: 'https://api.openai.com',
      editable: true
    },
    websites: {
      official: 'https://openai.com/',
      apiKey: 'https://platform.openai.com/api-keys',
      docs: 'https://platform.openai.com/docs',
      models: 'https://platform.openai.com/docs/models'
    }
  },
  silicon: {
    api: {
      url: 'https://cloud.siliconflow.cn',
      editable: false
    },
    websites: {
      official: 'https://www.siliconflow.cn/',
      apiKey: 'https://cloud.siliconflow.cn/account/ak?referrer=clxty1xuy0014lvqwh5z50i88',
      docs: 'https://docs.siliconflow.cn/',
      models: 'https://docs.siliconflow.cn/docs/model-names'
    }
  },
  deepseek: {
    api: {
      url: 'https://api.deepseek.com',
      editable: false
    },
    websites: {
      official: 'https://deepseek.com/',
      apiKey: 'https://platform.deepseek.com/api_keys',
      docs: 'https://platform.deepseek.com/api-docs/',
      models: 'https://platform.deepseek.com/api-docs/'
    }
  },
  yi: {
    api: {
      url: 'https://api.lingyiwanwu.com',
      editable: false
    },
    websites: {
      official: 'https://platform.lingyiwanwu.com/',
      apiKey: 'https://platform.lingyiwanwu.com/apikeys',
      docs: 'https://platform.lingyiwanwu.com/docs',
      models: 'https://platform.lingyiwanwu.com/docs#%E6%A8%A1%E5%9E%8B'
    }
  },
  zhipu: {
    api: {
      url: 'https://open.bigmodel.cn/api/paas/v4/',
      editable: false
    },
    websites: {
      official: 'https://open.bigmodel.cn/',
      apiKey: 'https://open.bigmodel.cn/usercenter/apikeys',
      docs: 'https://open.bigmodel.cn/dev/howuse/introduction',
      models: 'https://open.bigmodel.cn/modelcenter/square'
    }
  },
  moonshot: {
    api: {
      url: 'https://api.moonshot.cn',
      editable: false
    },
    websites: {
      official: 'https://moonshot.ai/',
      apiKey: 'https://platform.moonshot.cn/console/api-keys',
      docs: 'https://platform.moonshot.cn/docs/',
      models: 'https://platform.moonshot.cn/docs/intro#%E6%A8%A1%E5%9E%8B%E5%88%97%E8%A1%A8'
    }
  },
  baichuan: {
    api: {
      url: 'https://api.baichuan-ai.com',
      editable: false
    },
    websites: {
      official: 'https://www.baichuan-ai.com/',
      apiKey: 'https://platform.baichuan-ai.com/console/apikey',
      docs: 'https://platform.baichuan-ai.com/docs',
      models: 'https://platform.baichuan-ai.com/price'
    }
  },
  dashscope: {
    api: {
      url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
      editable: false
    },
    websites: {
      official: 'https://dashscope.aliyun.com/',
      apiKey: 'https://help.aliyun.com/zh/dashscope/developer-reference/acquisition-and-configuration-of-api-key',
      docs: 'https://help.aliyun.com/zh/dashscope/',
      models: 'https://dashscope.console.aliyun.com/model'
    }
  },
  openrouter: {
    api: {
      url: 'https://openrouter.ai/api/v1/',
      editable: false
    },
    websites: {
      official: 'https://openrouter.ai/',
      apiKey: 'https://openrouter.ai/settings/keys',
      docs: 'https://openrouter.ai/docs/quick-start',
      models: 'https://openrouter.ai/docs/models'
    }
  },
  groq: {
    api: {
      url: 'https://api.groq.com/openai',
      editable: false
    },
    websites: {
      official: 'https://groq.com/',
      apiKey: 'https://console.groq.com/keys',
      docs: 'https://console.groq.com/docs/quickstart',
      models: 'https://console.groq.com/docs/models'
    }
  },
  ollama: {
    api: {
      url: 'http://localhost:11434/v1/',
      editable: true
    },
    websites: {
      official: 'https://ollama.com/',
      docs: 'https://github.com/ollama/ollama/tree/main/docs',
      models: 'https://ollama.com/library'
    }
  },
  anthropic: {
    api: {
      url: 'https://api.anthropic.com/',
      editable: false
    },
    websites: {
      official: 'https://anthropic.com/',
      apiKey: 'https://console.anthropic.com/settings/keys',
      docs: 'https://docs.anthropic.com/en/docs',
      models: 'https://docs.anthropic.com/en/docs/about-claude/models'
    }
  },
  aihubmix: {
    api: {
      url: 'https://aihubmix.com',
      editable: false
    },
    websites: {
      official: 'https://aihubmix.com/',
      apiKey: 'https://aihubmix.com/token',
      docs: 'https://doc.aihubmix.com/',
      models: 'https://aihubmix.com/models'
    }
  }
}
