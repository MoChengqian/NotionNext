import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import NotionIcon from './NotionIcon'
import TagItemMini from './TagItemMini'
import { resolveEvidenceType } from '../evidence.helpers'

const normalizeTagItems = post => {
  if (Array.isArray(post?.tagItems) && post.tagItems.length > 0) {
    return post.tagItems
  }

  if (Array.isArray(post?.tags) && post.tags.length > 0) {
    return post.tags.slice(0, 3).map(name => ({ name }))
  }

  return []
}

const resolveDateLabel = post => {
  if (post?.publishDay) {
    return post.publishDay
  }

  const rawDate =
    post?.publishDate ||
    post?.date?.start_date ||
    post?.date?.startDate ||
    post?.lastEditedDate

  if (!rawDate) {
    return ''
  }

  return String(rawDate).slice(0, 10)
}

const BlogPostCard = ({ post, compact = true }) => {
  const evidenceType = resolveEvidenceType(post)
  const topTags = normalizeTagItems(post).slice(0, 1)
  const dateLabel = resolveDateLabel(post)
  const showSummary = compact
    ? true
    : siteConfig('HEO_POST_LIST_SUMMARY', null, CONFIG)

  if (!post) {
    return null
  }

  return (
    <article className='group h-full'>
      <div className='wow fadeInUp flex h-full flex-col rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-colors duration-200 hover:border-slate-300 dark:border-gray-700 dark:bg-[#1e1e1e]'>
        <header>
          <div className='mb-1.5 flex flex-wrap items-center gap-1.5 text-[10px] font-medium md:text-[11px]'>
            {evidenceType && (
              <span className='inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 uppercase tracking-[0.1em] text-slate-600 dark:border-gray-600 dark:bg-[#25242b] dark:text-gray-300'>
                {evidenceType}
              </span>
            )}

            {post?.category && (
              <SmartLink
                passHref
                href={`/category/${encodeURIComponent(post.category)}`}
                className='inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-gray-600 dark:text-gray-300 dark:hover:text-white'>
                {post.category}
              </SmartLink>
            )}

            {dateLabel && (
              <span className='text-slate-400 dark:text-gray-500'>
                {dateLabel}
              </span>
            )}
          </div>

          <SmartLink
            href={post?.href}
            passHref
            className='replace cursor-pointer text-[15px] font-semibold leading-6 text-slate-900 transition-colors group-hover:text-slate-700 dark:text-gray-100 dark:group-hover:text-white md:text-base'>
            {siteConfig('POST_TITLE_ICON') && post?.pageIcon && (
              <NotionIcon
                icon={post.pageIcon}
                className='heo-icon mr-1 inline h-4 w-4 translate-y-[-4%] align-middle'
              />
            )}
            <span className='menu-link line-clamp-1'>{post.title}</span>
          </SmartLink>

          {showSummary && post?.summary && (
            <p className='mt-1 line-clamp-1 text-[13px] leading-5 text-slate-600 dark:text-gray-300'>
              {post.summary}
            </p>
          )}
        </header>

        {topTags.length > 0 && (
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {topTags.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
            {Array.isArray(post?.tagItems) && post.tagItems.length > topTags.length && (
              <span className='inline-flex items-center rounded-md border border-dashed border-slate-200 px-2 py-0.5 text-[11px] text-slate-400 dark:border-gray-600 dark:text-gray-500'>
                +{post.tagItems.length - topTags.length}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogPostCard
