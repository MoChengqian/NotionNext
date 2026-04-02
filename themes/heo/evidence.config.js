export const EVIDENCE_CONFIG = {
  githubUrl: 'https://github.com/MoChengqian',
  noticeBar: [],
  navLinks: [
    { name: '首页', href: '/', show: true },
    { name: '面试阅读', href: '/interview-reading', show: true },
    { name: '开源贡献', href: '/open-source', show: true },
    { name: '分类', href: '/category', show: true },
    { name: '标签', href: '/tag', show: true },
    { name: '归档', href: '/archive', show: true },
    { name: '关于', href: '/about', show: true },
    { name: '搜索', href: '/search', show: true }
  ],
  routeDescriptions: {
    '/': '默认内容流 · 全部文章 / 主线主题 / 工程证据',
    '/interview-reading': '面试导读 · 路线、代表作与推荐阅读顺序',
    '/open-source': '开源贡献 · PR / Issue / Review / 复盘入口',
    '/series': '系列索引 · 源码 / 治理 / 可观测 / 观点',
    '/about': '个人说明书 · 技术主线、边界与入口',
    '/archive': '时间线归档 · 按时间回看持续积累',
    '/category': '栏目索引 · 以主题而非泛推荐组织内容',
    '/tag': '主题词索引 · 收敛长期技术词表'
  },
  contentTabs: [
    {
      id: 'all',
      title: '全部',
      href: '/',
      match: {}
    },
    {
      id: 'source-protocol',
      title: '源码与协议',
      href: '/category/源码与协议',
      match: {
        categories: ['源码与协议'],
        tags: ['dubbo', 'metadata', 'service-discovery'],
        keywords: ['dubbo', 'protocol', 'metadata', 'rpc', '源码']
      }
    },
    {
      id: 'traffic-governance',
      title: '流量与服务治理',
      href: '/category/流量与服务治理',
      match: {
        categories: ['流量与服务治理'],
        tags: ['gateway', 'traffic-governance', 'rate-limit'],
        keywords: ['gateway', 'traffic', 'rate limit', 'retry', 'timeout']
      }
    },
    {
      id: 'observability-reliability',
      title: '可观测性与稳定性',
      href: '/category/可观测性与稳定性',
      match: {
        categories: ['可观测性与稳定性'],
        tags: ['observability', 'reliability', 'tracing', 'prometheus'],
        keywords: ['observability', 'reliability', 'tracing', 'opentelemetry']
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
      id: 'thinking-models',
      title: '观点与模型',
      href: '/category/观点与模型',
      match: {
        categories: ['观点与模型'],
        tags: ['ai-gateway', 'llmops'],
        keywords: ['ai gateway', 'llmops', 'model', 'policy', '观点']
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
    categoryIndex: {
      eyebrow: 'Categories',
      title: '栏目总览',
      description: '栏目只保留主线结构，不再扩散为多套重复入口。'
    },
    tagIndex: {
      eyebrow: 'Tags',
      title: '主题词总览',
      description: '主题词作为辅助导航使用，帮助沿问题域继续下钻。'
    },
    series: {
      eyebrow: 'Series',
      title: '主题系列',
      description: '系列页继续沿统一骨架展开，负责索引长期主线，而不是再造一个入口页。'
    },
    interviewReading: {
      eyebrow: 'Interview Reading',
      title: '面试阅读',
      description: '给招聘方一个稳定、克制、可验证的阅读起点。'
    },
    openSource: {
      eyebrow: 'Open Source',
      title: '开源贡献',
      description: '集中展示 PR、Issue、Review 与复盘，作为技术档案的一部分。'
    },
    about: {
      eyebrow: 'About',
      title: '个人说明',
      description: '围绕技术主线、边界与取舍展开，而不是泛化自我介绍。'
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
        title: '面试阅读',
        href: '/interview-reading',
        variant: 'primary'
      },
      {
        title: '开源贡献',
        href: '/open-source',
        variant: 'secondary'
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
      { title: '面试阅读', href: '/interview-reading' },
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
    'ai-gateway',
    'llmops',
    'gateway',
    'service-discovery',
    'metadata',
    'traffic-governance',
    'observability',
    'reliability',
    'sre',
    'platform-engineering',
    'dubbo',
    'kubernetes',
    'opentelemetry',
    'prometheus',
    'tracing',
    'rate-limit',
    'circuit-breaker',
    'retry',
    'timeout'
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
    description: '侧栏只保留少量高价值主题词，作为辅助导航而不是主内容。',
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
    ]
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
      { title: '面试阅读', href: '/interview-reading' },
      { title: '开源贡献', href: '/open-source' },
      { title: '系列索引', href: '/series' }
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
        title: '面试阅读导读',
        href: '/interview-reading',
        summary: '给面试官的第一入口，集中回答方向、路线、代表作品与推荐顺序。',
        meta: '静态导读页'
      }
    },
    {
      key: 'open-source',
      type: 'page',
      label: '贡献',
      item: {
        title: '开源贡献证据页',
        href: '/open-source',
        summary: '把 Dubbo 生态中的 PR、Issue、Review 与复盘放在同一阅读链路里。',
        meta: 'Merged PR / Review'
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
      eyebrow: '面试导读',
      title: '面试阅读',
      description:
        '给面试官的一页导读，先看定位、技术主线、代表作品，再按顺序继续阅读具体文章与开源贡献。',
      actions: [
        { title: '开源贡献', href: '/open-source' },
        { title: '系列索引', href: '/series' },
        {
          title: 'GitHub',
          href: 'https://github.com/MoChengqian',
          target: '_blank'
        }
      ],
      sections: [
        {
          type: 'text',
          id: 'who-am-i',
          title: '我是谁',
          paragraphs: [
            '我目前以平台 / 基础设施后端方向为主线，重点关注网关、服务治理、可观测性、稳定性，以及模型接入治理这一条链路。',
            '博客不是用来堆泛化教程，而是把学习过程、实验记录、故障复盘和开源参与整理成可复现、可评审的工程证据。'
          ]
        },
        {
          type: 'text',
          id: 'roadmap',
          title: '我的路线',
          paragraphs: [
            '路线从 Dubbo / RPC / 服务发现与元数据出发，逐步延伸到网关与流量治理，再进入 tracing、metrics、logging、SLO 等可观测与稳定性主题。',
            '最近在继续补齐 AI Gateway / Model Routing / Token & Cost Governance / Policy Enforcement 这类模型接入治理问题，目标不是追热点，而是把平台入口的治理链路补完整。'
          ]
        },
        {
          type: 'cards',
          id: 'representative-work',
          title: '代表作品',
          items: [
            {
              title: '压测 / 稳定性实验代表作',
              href: '/series#observability-reliability',
              summary: '优先放压测设计、故障注入、观测链路验证、瓶颈定位与复盘类文章。',
              meta: '证据库 / 可观测性与稳定性'
            },
            {
              title: '源码分析代表作',
              href: '/series#dubbo-source',
              summary: '优先放 Dubbo、协议、元数据、服务发现和调用链机制分析。',
              meta: '源码与协议'
            },
            {
              title: '治理设计代表作',
              href: '/series#gateway-governance',
              summary: '优先放网关入口、路由策略、限流熔断、重试超时等治理设计。',
              meta: '流量与服务治理'
            }
          ]
        },
        {
          type: 'cards',
          id: 'open-source-entry',
          title: '开源贡献入口',
          items: [
            {
              title: 'Dubbo 生态贡献概览',
              href: '/open-source',
              summary: '把 PR / Issue / Review / 复盘放在同一个证据页，方便连续阅读。',
              meta: 'PR / Issue / Review / 复盘'
            }
          ]
        },
        {
          type: 'steps',
          id: 'reading-order',
          title: '推荐阅读顺序',
          items: [
            {
              title: '先看这一页',
              summary: '确认方向、技术主线、代表作品和推荐顺序。'
            },
            {
              title: '再看开源贡献',
              summary: '把真实参与过的贡献链路集中浏览。'
            },
            {
              title: '然后看 Dubbo / 网关 / 可观测系列',
              summary: '按主题树继续下钻到具体文章。'
            },
            {
              title: '最后回到归档或最新文章',
              summary: '按时间线观察持续积累，而不是只看一次性展示。'
            }
          ]
        },
        {
          type: 'cards',
          id: 'links',
          title: 'GitHub / 博客 / 联系方式入口',
          items: [
            {
              title: 'GitHub',
              href: 'https://github.com/MoChengqian',
              target: '_blank',
              summary: '代码、贡献记录与仓库入口。',
              meta: '外部链接'
            },
            {
              title: '博客首页',
              href: '/',
              summary: '返回证据系统入口页，按首页路径继续浏览。',
              meta: '站内入口'
            },
            {
              title: '联系方式（待补充）',
              summary: '建议后续补充邮箱或 LinkedIn，便于招聘场景直接联系。',
              meta: '联系入口'
            }
          ]
        }
      ]
    },
    openSource: {
      slug: 'open-source',
      eyebrow: '开源贡献',
      title: '开源贡献',
      description:
        '把 Dubbo 生态中的贡献事实集中成一个可持续补充的证据页，优先展示 PR、Issue、Review 与复盘。',
      actions: [
        { title: '面试阅读', href: '/interview-reading' },
        { title: '系列索引', href: '/series' },
        {
          title: 'GitHub',
          href: 'https://github.com/MoChengqian',
          target: '_blank'
        }
      ],
      sections: [
        {
          type: 'text',
          id: 'overview',
          title: 'Dubbo 生态贡献概览',
          paragraphs: [
            '这里用于集中展示我在 Dubbo 生态中的 PR、Issue、Review 与相关复盘。目标不是堆数量，而是让每一条贡献都能说明我如何理解问题、验证方案、推进闭环。',
            '当前先把阅读结构和入口固定下来，后续可以逐步补充真实链接、截图、讨论串和对应的文章复盘。'
          ]
        },
        {
          type: 'cards',
          id: 'entries',
          title: 'PR / Issue / Review / 复盘入口',
          items: [
            {
              title: 'PR 列表',
              href: 'https://github.com/apache/dubbo-go/pulls?q=is%3Apr',
              target: '_blank',
              summary: '后续补真实参与的 PR 记录、链接和背景说明。',
              meta: '外部入口'
            },
            {
              title: 'Issue / Discussion',
              href: 'https://github.com/apache/dubbo-go/issues',
              target: '_blank',
              summary: '后续补问题定位、讨论参与和问题闭环记录。',
              meta: '外部入口'
            },
            {
              title: 'Review / Comment',
              summary: '后续补 review 记录，说明我如何看设计、兼容性和测试风险。',
              meta: '后续补充'
            },
            {
              title: '贡献复盘',
              href: '/series#perspectives-models',
              summary: '后续用文章形式沉淀为什么这样改、踩过哪些坑、有哪些权衡。',
              meta: '站内沉淀入口'
            }
          ]
        },
        {
          type: 'cards',
          id: 'future',
          title: '后续扩展方向',
          items: [
            {
              title: '贡献时间线',
              summary: '按时间补齐每次参与的上下文、动作和结果。',
              meta: '后续补充'
            },
            {
              title: '问题域归档',
              summary: '按协议、注册发现、网关治理、观测链路等主题归类。',
              meta: '后续补充'
            },
            {
              title: '证据补件',
              summary: 'PR 链接、Issue 链接、review 截图、实验文章与提交说明。',
              meta: '后续补充'
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
    },
    about: {
      slug: 'about',
      eyebrow: '个人说明书',
      title: '关于',
      description:
        '一份可核验的个人说明书，说明我当前的技术主线、取舍边界，以及你应该从哪里开始阅读。',
      actions: [
        { title: '面试阅读', href: '/interview-reading' },
        { title: '开源贡献', href: '/open-source' },
        { title: '系列索引', href: '/series' }
      ],
      sections: [
        {
          type: 'text',
          id: 'positioning',
          title: '一句话定位',
          paragraphs: [
            '以平台 / 基础设施后端方向为主线，围绕网关、服务治理、可观测性、稳定性与模型接入治理持续积累，并把过程沉淀为可复现、可评审的工程证据。'
          ]
        },
        {
          type: 'cards',
          id: 'theme-tree',
          title: '技术主线（母题树）',
          items: [
            {
              title: '源码与协议',
              href: '/series#dubbo-source',
              summary: '从 Dubbo / Triple / Metadata / Service Discovery 理解基础机制。',
              meta: '底层机制'
            },
            {
              title: '流量与服务治理',
              href: '/series#gateway-governance',
              summary: '把入口流量、路由策略与治理能力组织起来。',
              meta: '治理链路'
            },
            {
              title: '可观测性与稳定性',
              href: '/series#observability-reliability',
              summary: '通过实验、观测和复盘验证系统行为。',
              meta: '验证链路'
            },
            {
              title: '模型接入治理',
              href: '/series#perspectives-models',
              summary: '把 AI Gateway 视为新入口问题，而非单点接 SDK。',
              meta: '延伸方向'
            }
          ]
        },
        {
          type: 'cards',
          id: 'three-entries',
          title: '三个入口',
          items: [
            {
              title: '面试阅读',
              href: '/interview-reading',
              summary: '先看路线、代表作与推荐顺序。',
              meta: '导读入口'
            },
            {
              title: '开源贡献',
              href: '/open-source',
              summary: '集中看真实参与的开源贡献事实。',
              meta: '证据入口'
            },
            {
              title: '系列索引',
              href: '/series',
              summary: '按主题树继续下钻到具体文章。',
              meta: '内容入口'
            }
          ]
        },
        {
          type: 'text',
          id: 'boundary',
          title: '学习边界与路线取舍',
          paragraphs: [
            '我更关注可维护系统、复杂链路治理和工程验证，而不是追求覆盖一切技术栈的宽而浅展示。',
            '这意味着我会优先把时间投入到协议、服务治理、网关入口、观测与稳定性上，再决定哪些问题值得继续扩展到 AI Gateway 与模型接入治理。'
          ]
        },
        {
          type: 'cards',
          id: 'links',
          title: 'GitHub / 联系方式',
          items: [
            {
              title: 'GitHub',
              href: 'https://github.com/MoChengqian',
              target: '_blank',
              summary: '代码、仓库与开源活动入口。',
              meta: '外部链接'
            },
            {
              title: '博客首页',
              href: '/',
              summary: '返回证据系统入口页。',
              meta: '站内入口'
            },
            {
              title: '联系方式（待补充）',
              summary: '建议补充邮箱或 LinkedIn，增强招聘沟通闭环。',
              meta: '联系入口'
            }
          ]
        }
      ]
    }
  }
}

export default EVIDENCE_CONFIG
