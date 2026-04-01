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
  const allPosts = Array.isArray(posts) ? posts.filter(Boolean) : []
  const primaryPosts = allPosts.filter(isPrimaryTrackPost)

  return primaryPosts.length >= EVIDENCE_CONFIG.homepage.minimumPrimaryPosts
    ? primaryPosts
    : allPosts
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
