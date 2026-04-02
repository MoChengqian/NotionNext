import EVIDENCE_CONFIG from './evidence.config'

const normalizeText = value => String(value || '').toLowerCase().trim()

const postText = post =>
  normalizeText(
    [
      post?.title,
      post?.summary,
      post?.category,
      post?.slug,
      ...(post?.tags || [])
    ]
      .filter(Boolean)
      .join(' ')
  )

const hasTag = (post, tag) =>
  Array.isArray(post?.tags) &&
  post.tags.some(item => normalizeText(item) === normalizeText(tag))

const firstNonEmpty = values =>
  values.find(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value) return Object.keys(value).length > 0
    return Boolean(String(value || '').trim())
  })

const pickExtField = (ext = {}, keys = []) =>
  firstNonEmpty(keys.map(key => ext?.[key]))

const normalizeLinks = rawLinks => {
  if (!rawLinks) {
    return []
  }

  if (Array.isArray(rawLinks)) {
    return rawLinks
      .map(item => {
        if (typeof item === 'string') {
          return {
            title: item.startsWith('http') ? '相关链接' : item,
            href: item.startsWith('http') ? item : null
          }
        }

        if (item?.href || item?.url) {
          return {
            title: item?.title || item?.name || '相关链接',
            href: item?.href || item?.url
          }
        }

        return null
      })
      .filter(item => item?.title)
  }

  if (typeof rawLinks === 'object') {
    return Object.entries(rawLinks)
      .map(([title, href]) => {
        if (typeof href === 'string') {
          return {
            title,
            href
          }
        }

        if (href?.href || href?.url) {
          return {
            title: href?.title || title,
            href: href?.href || href?.url
          }
        }

        return null
      })
      .filter(item => item?.title)
  }

  if (typeof rawLinks === 'string') {
    return [
      {
        title: rawLinks.startsWith('http') ? '相关链接' : rawLinks,
        href: rawLinks.startsWith('http') ? rawLinks : null
      }
    ]
  }

  return []
}

const isRenderablePost = post =>
  post &&
  String(post?.type || '').includes('Post') &&
  (!post?.status || post.status === 'Published')

const isTruthyFlag = value => {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value > 0
  }

  const normalized = normalizeText(value)
  return ['true', '1', 'yes', 'on', 'pinned', 'featured', 'sticky'].includes(
    normalized
  )
}

const toNumber = value => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const resolvePinnedWeight = post => {
  const ext = post?.ext || {}
  const orderedFlags = [
    ext.pinOrder,
    ext.pinnedOrder,
    ext.featuredOrder,
    ext.topOrder,
    ext.stickyOrder
  ]
    .map(toNumber)
    .filter(value => value !== null)

  if (orderedFlags.length > 0) {
    return Math.max(0, 100 - orderedFlags[0])
  }

  const booleanFlags = [
    post?.pinned,
    post?.featured,
    post?.top,
    post?.sticky,
    post?.recommend,
    ext.pinned,
    ext.featured,
    ext.top,
    ext.sticky,
    ext.recommend,
    ext.homepage,
    ext.representative
  ]

  return booleanFlags.some(isTruthyFlag) ? 100 : 0
}

const resolvePostTimestamp = post => {
  const candidates = [
    post?.publishDate,
    post?.publishDay,
    post?.date?.start_date,
    post?.date?.startDate,
    post?.lastEditedDate,
    post?.lastEditedDay,
    post?.createdTime,
    post?.createdDate
  ]

  for (const candidate of candidates) {
    if (!candidate) {
      continue
    }

    const timestamp = new Date(candidate).getTime()
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }

  return 0
}

export const buildPrimaryCategories = (categoryOptions = []) => {
  const categoryMap = new Map(
    categoryOptions.map(category => [category.name, category])
  )

  return EVIDENCE_CONFIG.primaryCategories.map(name => {
    const current = categoryMap.get(name)
    return {
      name,
      count: current?.count || 0
    }
  })
}

export const buildFocusTags = (tagOptions = []) => {
  const tagMap = new Map(tagOptions.map(tag => [tag.name, tag]))

  return EVIDENCE_CONFIG.focusTags.map(name => {
    const current = tagMap.get(name)
    return {
      name,
      count: current?.count || 0
    }
  })
}

const calculateMatchScore = (post, matcher = {}) => {
  const text = postText(post)
  let score = 0

  if (
    matcher.categories?.length &&
    matcher.categories.some(
      category => normalizeText(category) === normalizeText(post?.category)
    )
  ) {
    score += 5
  }

  if (matcher.tags?.length) {
    matcher.tags.forEach(tag => {
      if (hasTag(post, tag)) {
        score += 4
      }
    })
  }

  if (matcher.keywords?.length) {
    matcher.keywords.forEach(keyword => {
      if (text.includes(normalizeText(keyword))) {
        score += 2
      }
    })
  }

  return score
}

const buildSyntheticTrackSource = ({ category, tag, pathname }) => ({
  category,
  tags: tag ? [tag] : [],
  title: pathname || '',
  summary: '',
  slug: ''
})

export const resolveEvidenceType = post => {
  const matchedType = EVIDENCE_CONFIG.evidenceTypes
    .map(type => ({
      ...type,
      score: calculateMatchScore(post, type)
    }))
    .sort((left, right) => right.score - left.score)[0]

  return matchedType?.score > 0 ? matchedType.label : null
}

export const isPrimaryTrackPost = post =>
  calculateMatchScore(post, EVIDENCE_CONFIG.primaryTrack) > 0

export const buildHomeFeedPosts = posts => {
  const allPosts = Array.isArray(posts) ? posts.filter(isRenderablePost) : []

  return [...allPosts].sort((left, right) => {
    const leftPinnedWeight = resolvePinnedWeight(left)
    const rightPinnedWeight = resolvePinnedWeight(right)
    if (leftPinnedWeight !== rightPinnedWeight) {
      return rightPinnedWeight - leftPinnedWeight
    }

    const leftPrimaryWeight = isPrimaryTrackPost(left) ? 1 : 0
    const rightPrimaryWeight = isPrimaryTrackPost(right) ? 1 : 0
    if (leftPrimaryWeight !== rightPrimaryWeight) {
      return rightPrimaryWeight - leftPrimaryWeight
    }

    const leftEvidenceWeight = resolveEvidenceType(left) ? 1 : 0
    const rightEvidenceWeight = resolveEvidenceType(right) ? 1 : 0
    if (leftEvidenceWeight !== rightEvidenceWeight) {
      return rightEvidenceWeight - leftEvidenceWeight
    }

    return resolvePostTimestamp(right) - resolvePostTimestamp(left)
  })
}

export const resolveActiveContentTab = ({ pathname, category, tag }) => {
  if (
    pathname === '/' ||
    pathname === '/archive' ||
    pathname === '/page/[page]' ||
    pathname === '/series'
  ) {
    return 'all'
  }

  if (category) {
    const matchedTab = EVIDENCE_CONFIG.contentTabs.find(tab =>
      tab.match?.categories?.some(
        item => normalizeText(item) === normalizeText(category)
      )
    )
    return matchedTab?.id || 'all'
  }

  if (tag) {
    const source = buildSyntheticTrackSource({ pathname, tag })
    const matchedTab = EVIDENCE_CONFIG.contentTabs
      .filter(tab => tab.id !== 'all')
      .map(tab => ({
        id: tab.id,
        score: calculateMatchScore(source, tab.match)
      }))
      .sort((left, right) => right.score - left.score)[0]

    return matchedTab?.score > 0 ? matchedTab.id : 'all'
  }

  return 'all'
}

export const getPageLeadConfig = ({ pathname, category, tag }) => {
  if (pathname === '/') {
    return EVIDENCE_CONFIG.pageLeads.home
  }

  if (pathname === '/archive') {
    return EVIDENCE_CONFIG.pageLeads.archive
  }

  if (pathname === '/series') {
    return EVIDENCE_CONFIG.pageLeads.series
  }

  if (pathname === '/interview-reading') {
    return EVIDENCE_CONFIG.pageLeads.interviewReading
  }

  if (category) {
    const matchedTab = EVIDENCE_CONFIG.contentTabs.find(
      tab => resolveActiveContentTab({ pathname, category, tag }) === tab.id
    )
    return {
      eyebrow: 'Category',
      title: category,
      description:
        matchedTab?.match?.keywords?.length > 0
          ? `围绕 ${category} 相关主题持续归档，保持统一内容流和稳定阅读路径。`
          : '围绕当前栏目持续归档，不再通过多入口模块分散注意力。'
    }
  }

  if (tag) {
    return {
      eyebrow: 'Tag',
      title: `主题词 · ${tag}`,
      description:
        '当前标签页继续使用统一主框架，主题词只作为问题域入口，不再派生出另一套信息架构。'
    }
  }

  if (pathname === '/page/[page]') {
    return {
      eyebrow: 'All Posts',
      title: '全部文章',
      description: '继续浏览更早文章，保持主线优先、完整可读的默认内容流。'
    }
  }

  return null
}

const buildPostHighlight = (post, role) => {
  const evidenceType = resolveEvidenceType(post)
  const meta = [evidenceType, post?.category, ...(post?.tags || []).slice(0, 1)]
    .filter(Boolean)
    .join(' / ')

  return {
    title: post?.title,
    href: post?.href || `/${post?.slug}`,
    summary: post?.summary || role.fallback?.summary,
    meta: meta || role.fallback?.meta,
    label: role.label,
    isFallback: false
  }
}

export const buildEvidenceHighlights = posts => {
  const allPosts = Array.isArray(posts) ? posts : []
  const usedSlug = new Set()

  return EVIDENCE_CONFIG.featuredRoles.map(role => {
    if (role.type === 'page') {
      return {
        ...role.item,
        label: role.label,
        isFallback: false
      }
    }

    const matchedPost = allPosts
      .filter(post => post?.slug && !usedSlug.has(post.slug))
      .map(post => ({
        post,
        score: calculateMatchScore(post, role.match)
      }))
      .sort((left, right) => right.score - left.score)[0]

    if (matchedPost?.score > 0) {
      usedSlug.add(matchedPost.post.slug)
      return buildPostHighlight(matchedPost.post, role)
    }

    return {
      ...role.fallback,
      label: role.label,
      isFallback: true
    }
  })
}

const countSeriesMatches = (posts, matcher = {}) => {
  const allPosts = Array.isArray(posts) ? posts : []

  return allPosts.filter(post => calculateMatchScore(post, matcher) > 0).length
}

export const buildSeriesEntries = posts =>
  EVIDENCE_CONFIG.seriesEntries.map(entry => {
    const count = countSeriesMatches(posts, entry.match)
    return {
      ...entry,
      meta: count > 0 ? `${count} 篇可继续归档` : '入口已就绪，可继续补入文章'
    }
  })

export const getRouteDescription = pathname =>
  EVIDENCE_CONFIG.routeDescriptions[pathname] ||
  '围绕网关、服务治理、可观测性与稳定性持续积累'

export const getStaticPageConfig = pageKey =>
  EVIDENCE_CONFIG.pages[pageKey] || null

export const buildSidebarTags = (
  tagOptions = [],
  names = EVIDENCE_CONFIG.sidebar.tags
) => {
  const tagMap = new Map(tagOptions.map(tag => [tag.name, tag]))

  return names.map(name => {
    const current = tagMap.get(name)
    return {
      name,
      count: current?.count || 0
    }
  })
}

export const buildArticleDigest = post => {
  const digestEnabled = EVIDENCE_CONFIG.articleDigest?.enabled
  if (!digestEnabled || post?.type !== 'Post') {
    return null
  }

  const ext = post?.ext || {}
  const evidenceType = resolveEvidenceType(post)
  const primaryTrack = isPrimaryTrackPost(post)

  const problem = pickExtField(ext, [
    'problem',
    'question',
    'issue',
    'goal',
    'context'
  ])
  const action = pickExtField(ext, [
    'action',
    'actions',
    'work',
    'solution',
    'implementation'
  ])
  const result = pickExtField(ext, [
    'result',
    'results',
    'outcome',
    'impact',
    'conclusion'
  ])
  const links = normalizeLinks(
    pickExtField(ext, ['links', 'evidenceLinks', 'references', 'artifacts'])
  )

  if (!problem && !action && !result && !primaryTrack && !evidenceType) {
    return null
  }

  const digestLinks =
    links.length > 0 ? links : EVIDENCE_CONFIG.articleDigest.fallbackLinks

  return {
    type: evidenceType || 'Engineering Note',
    problem:
      problem ||
      post?.summary ||
      '围绕一个基础设施后端问题展开，关注机制、边界、代价与可验证结果。',
    action:
      action ||
      `通过${post?.category || '工程实践'}视角拆解问题，并结合源码、实验或治理路径给出可复查过程。`,
    result:
      result ||
      '形成一份可继续复盘、引用或扩展的阶段性工程证据，便于后续在系列文章和开源贡献中继续下钻。',
    links: digestLinks,
    tags: [post?.category, evidenceType, ...(post?.tags || []).slice(0, 3)].filter(
      Boolean
    )
  }
}
