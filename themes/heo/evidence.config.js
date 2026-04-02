export const EVIDENCE_CONFIG = {
  githubUrl: 'https://github.com/MoChengqian',
  noticeBar: [],
  navLinks: [
    { name: '首页', href: '/', show: true },
    {
      name: '关于我',
      href: 'https://notion-next-iota-amber-43.vercel.app/article/0',
      show: true
    },
    { name: '归档', href: '/archive', show: true }
  ],
  routeDescriptions: {
    '/': '默认内容流 · 全部文章 / 主线主题 / 工程证据',
    '/recommended-reading': '推荐阅读 · 只看带推荐标签的文章',
    '/interview-reading': '推荐顺序 · 一页看完当前阅读路径',
    '/series': '系列索引 · 源码 / 治理 / 可观测 / 观点',
    '/archive': '时间线归档 · 按时间回看持续积累'
  },
  contentTabs: [
    {
      id: 'all',
      title: '全部',
      href: '/',
      match: {}
    },
    {
      id: 'recommended-reading',
      title: '推荐阅读',
      href: '/recommended-reading',
      match: {
        tags: ['推荐'],
        keywords: ['推荐']
      }
    },
    {
      id: 'open-source',
      title: '开源贡献',
      href: '/category/开源贡献',
      match: {
        categories: ['开源贡献'],
        tags: ['dubbo', 'open-source'],
        keywords: ['pull request', 'merged', 'review', 'issue', '开源']
      }
    },
    {
      id: 'llm-access-gateway',
      title: '自研LLM Access Gateway项目',
      href: '/tag/gateway',
      match: {
        categories: ['流量与服务治理', '观点与模型'],
        tags: ['gateway'],
        keywords: [
          'gateway',
          'access gateway',
          'llm access gateway',
          'llmops',
          'model',
          'policy',
          'token',
          'cost'
        ]
      }
    }
  ],
  pageLeads: {
    home: {
      eyebrow: 'All Posts',
      title: '全部文章',
      description:
        '默认按主线优先排序，同时保留完整文章流，进入首页就能直接开始阅读。'
    },
    archive: {
      eyebrow: 'Archive',
      title: '更早文章',
      description: '按时间继续查看更早内容，维持同一套主题流骨架。'
    },
    recommendedReading: {
      eyebrow: 'Recommended Posts',
      title: '推荐阅读',
      description: '只保留带推荐标签的文章，作为一条更短、更直接的内容入口。'
    },
    series: {
      eyebrow: 'Series',
      title: '主题系列',
      description: '系列页继续沿统一骨架展开，负责索引长期主线，而不是再造一个入口页。'
    },
    interviewReading: {
      eyebrow: 'Interview Reading',
      title: '推荐阅读',
      description: '给读者一个稳定、克制、可验证的阅读起点。'
    }
  },
  hero: {
    eyebrow: 'Platform / Infrastructure Backend',
    title: '平台后端 / 基础设施后端 / 网关治理',
    subtitle:
      '主线围绕 Dubbo、Service Governance、Observability、Reliability 与 AI Gateway / LLMOps Bridge，持续沉淀可复现、可评审的工程证据。',
    keywords: [
      'Dubbo',
      'Gateway',
      'Traffic Governance',
      'Observability',
      'Reliability',
      'AI Gateway'
    ],
    actions: [
      {
        title: '推荐阅读',
        href: '/interview-reading',
        variant: 'primary'
      }
    ],
    panelTitle: '主线聚焦',
    panelPoints: [
      {
        title: '平台后端',
        summary: '围绕服务入口、协议栈、注册发现与服务治理建立长期主线。'
      },
      {
        title: '工程证据',
        summary: '优先展示源码分析、压测实验、开源贡献与技术复盘。'
      },
      {
        title: 'AI Gateway',
        summary: '把模型接入治理视为平台入口问题，继续延伸到 LLMOps bridge。'
      }
    ]
  },
  infoCard: {
    stack: 'Platform / Infrastructure Backend',
    intro:
      '聚焦网关、服务治理、可观测性、稳定性与 AI Gateway，把过程沉淀成可复现、可评审的工程证据。',
    actions: [
      { title: '推荐阅读', href: '/recommended-reading' },
      {
        title: 'GitHub',
        href: 'https://github.com/MoChengqian',
        target: '_blank'
      }
    ]
  },
  primaryCategories: [
    '证据库',
    '源码与协议',
    '流量与服务治理',
    '可观测性与稳定性',
    '开源贡献',
    '观点与模型'
  ],
  focusTags: [
    'dubbo',
    'ai-gateway'
  ],
  homepage: {
    featuredTitle: '代表证据',
    featuredDescription:
      '如果只看三项，先看这里。优先展示能快速验证工程判断、实现过程和结果产出的内容。',
    seriesTitle: '主题系列',
    seriesDescription:
      '主系列服务于长期技术路线，帮助从代表证据继续下钻到问题域和机制层。',
    feedTitle: '主线文章',
    feedDescription:
      '首页优先展示基础设施后端、网关治理、可观测性、稳定性与 AI Gateway 相关内容，其他更新继续通过归档和分类访问。',
    minimumPrimaryPosts: 3
  },
  primaryTrack: {
    categories: [
      '证据库',
      '源码与协议',
      '流量与服务治理',
      '可观测性与稳定性',
      '开源贡献',
      '观点与模型'
    ],
    tags: [
      'dubbo',
      'gateway',
      'observability',
      'reliability',
      'tracing',
      'traffic-governance',
      'rate-limit',
      'platform-engineering',
      'ai-gateway',
      'llmops'
    ],
    keywords: [
      'dubbo',
      'gateway',
      'service governance',
      'observability',
      'reliability',
      'tracing',
      'traffic',
      'rate limit',
      'circuit-breaker',
      'retry',
      'timeout',
      'ai gateway',
      'llmops',
      '模型接入'
    ]
  },
  sidebar: {
    title: '主线主题词',
    description: '平台后端,努力向模型服务接入与治理基础设施靠近',
    tags: ['dubbo', 'ai-gateway']
  },
  evidenceTypes: [
    {
      label: 'Merged PR',
      tags: ['dubbo', 'open-source'],
      keywords: ['pr', 'pull request', 'merged', 'review', 'issue', '开源']
    },
    {
      label: 'Source Analysis',
      categories: ['源码与协议'],
      keywords: ['源码', 'protocol', 'metadata', 'service-discovery', 'dubbo']
    },
    {
      label: 'Gateway Testing',
      categories: ['流量与服务治理'],
      keywords: ['gateway', 'traffic', 'rate-limit', 'timeout', 'retry', '压测']
    },
    {
      label: 'Observability',
      categories: ['可观测性与稳定性'],
      keywords: ['observability', 'reliability', 'tracing', 'prometheus', 'otel']
    },
    {
      label: 'Thinking',
      categories: ['观点与模型'],
      keywords: ['ai gateway', 'llmops', 'model', 'policy', 'token', 'cost']
    }
  ],
  articleDigest: {
    enabled: true,
    fallbackLinks: [
      { title: '推荐阅读', href: '/interview-reading' },
      { title: '系列索引', href: '/series' },
      { title: '归档', href: '/archive' }
    ]
  },
  seriesEntries: [
    {
      id: 'dubbo-source',
      title: 'Dubbo 源码',
      href: '/series#dubbo-source',
      summary: '围绕协议、元数据、注册发现、调用链与扩展点展开。',
      match: {
        categories: ['源码与协议'],
        keywords: ['dubbo', 'triple', 'rpc', 'metadata', 'protocol', '源码']
      }
    },
    {
      id: 'gateway-governance',
      title: '网关治理',
      href: '/series#gateway-governance',
      summary: '关注流量入口、路由策略、限流熔断、重试超时与灰度治理。',
      match: {
        categories: ['流量与服务治理'],
        keywords: [
          'gateway',
          'traffic',
          'governance',
          'rate-limit',
          'circuit-breaker',
          'retry',
          'timeout',
          '网关',
          '治理'
        ]
      }
    },
    {
      id: 'observability-reliability',
      title: '可观测实验',
      href: '/series#observability-reliability',
      summary: '沉淀 tracing、metrics、logging、压测、稳定性实验与复盘。',
      match: {
        categories: ['可观测性与稳定性'],
        keywords: [
          'observability',
          'reliability',
          'tracing',
          'prometheus',
          'opentelemetry',
          'sre',
          '压测',
          '实验',
          '复盘',
          '稳定性'
        ]
      }
    }
  ],
  featuredRoles: [
    {
      key: 'interview-reading',
      type: 'page',
      label: '导读',
      item: {
        title: '推荐阅读导读',
        href: '/interview-reading',
        summary: '给读者的第一入口，集中回答方向、路线、代表作品与推荐顺序。',
        meta: '静态导读页'
      }
    },
    {
      key: 'reliability-experiment',
      type: 'post',
      label: '实验',
      match: {
        categories: ['证据库', '可观测性与稳定性'],
        keywords: [
          '压测',
          '实验',
          '复盘',
          '故障',
          'reliability',
          'observability',
          'timeout',
          'retry',
          'rate-limit',
          'circuit-breaker'
        ]
      },
      fallback: {
        title: '稳定性实验代表作',
        href: '/series#observability-reliability',
        summary: '优先放压测、故障复盘、稳定性实验与观测链路验证类文章。',
        meta: 'Gateway Testing / Observability'
      }
    },
    {
      key: 'source-analysis',
      type: 'post',
      label: '源码',
      match: {
        categories: ['源码与协议'],
        keywords: [
          'dubbo',
          'triple',
          'rpc',
          'metadata',
          'service-discovery',
          '源码',
          '协议'
        ]
      },
      fallback: {
        title: '源码分析代表作',
        href: '/series#dubbo-source',
        summary: '优先放 Dubbo / 协议 / 元数据 / 服务发现机制分析类文章。',
        meta: 'Source Analysis'
      }
    },
    {
      key: 'thinking',
      type: 'post',
      label: '思考',
      match: {
        categories: ['观点与模型'],
        keywords: [
          'model',
          'ai gateway',
          '观点',
          '模型',
          '取舍',
          '设计',
          '思考'
        ]
      },
      fallback: {
        title: '思考型文章代表作',
        href: '/series#perspectives-models',
        summary: '优先放路线取舍、架构判断、AI Gateway 与模型接入治理思考。',
        meta: 'AI Gateway / Engineering Decision'
      }
    }
  ],
  pages: {
    interviewReading: {
      slug: 'interview-reading',
      eyebrow: '推荐顺序',
      title: '推荐阅读顺序',
      description:
        '当前只保留一条稳定的阅读顺序，帮助快速了解先看什么、再看什么。',
      actions: [
        {
          title: '关于我',
          href: 'https://notion-next-iota-amber-43.vercel.app/article/0',
          target: '_blank'
        },
        { title: '归档', href: '/archive' },
        {
          title: 'GitHub',
          href: 'https://github.com/MoChengqian',
          target: '_blank'
        }
      ],
      sections: [
        {
          type: 'steps',
          id: 'reading-order',
          title: '推荐阅读顺序',
          items: [
            {
              title: '先看关于我'
            },
            {
              title: '再看推荐阅读'
            },
            {
              title: '最后看一眼我的GitHub主页'
            },
            {
              title: '亲爱的读者朋友,祝您生活愉快,再见!'
            }
          ]
        }
      ]
    },
    series: {
      slug: 'series',
      eyebrow: '系列索引',
      title: '系列',
      description:
        '系列页不再承担入口导航职责，当前仅保留占位路径，避免增加新的阅读分叉。',
      actions: [],
      sections: []
    }
  }
}

export default EVIDENCE_CONFIG
