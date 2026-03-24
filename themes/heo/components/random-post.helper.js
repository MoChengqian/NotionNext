import { isHttpLink, isMailOrTelLink } from '@/lib/utils'

function isDangerousOrExternalPath(path) {
  if (!path || typeof path !== 'string') return true

  const trimmed = path.trim()
  if (!trimmed || trimmed === '#') return true

  // article/https://xxx.com 这类错误拼接 slug 也排除
  if (/https?:\/\//i.test(trimmed)) return true
  if (isHttpLink(trimmed) || isMailOrTelLink(trimmed)) return true
  if (/^(javascript:|data:)/i.test(trimmed)) return true

  return false
}

export function isAccessibleRandomPost(post) {
  if (!post) return false

  // 某些精简数据结构可能不带 type/status；带了就必须满足 Post + Published
  if (post.type && post.type !== 'Post') return false
  if (post.status && post.status !== 'Published') return false

  const slug = typeof post.slug === 'string' ? post.slug.trim() : ''
  const href = typeof post.href === 'string' ? post.href.trim() : ''
  if (!slug) return false
  if (isDangerousOrExternalPath(slug)) return false
  if (href && isDangerousOrExternalPath(href)) return false

  return true
}

export function getAccessibleRandomPosts(posts = []) {
  if (!Array.isArray(posts)) return []
  return posts.filter(isAccessibleRandomPost)
}

export function getRandomPostPath(post, subPath = '') {
  if (!isAccessibleRandomPost(post)) return null

  const raw = (post?.href || post?.slug || '').trim()
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`
  return `${subPath || ''}${normalizedPath}`.replace(/\/{2,}/g, '/')
}

