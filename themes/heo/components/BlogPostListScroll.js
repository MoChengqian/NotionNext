import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getListByPage } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 博客列表滚动分页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  showSummary = siteConfig('HEO_POST_LIST_SUMMARY', null, CONFIG),
  siteInfo
}) => {
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)
  const postsToShow = getListByPage(posts, page, POSTS_PER_PAGE)

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 监听滚动自动分页加载
  const scrollTrigger = () => {
    requestAnimationFrame(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    })
  }

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [page, posts.length])

  const targetRef = useRef(null)
  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id='container' ref={targetRef} className='w-full'>
        {/* 文章列表 */}
        <div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
          {postsToShow.map(post => (
            <BlogPostCard
              key={post.id}
              post={post}
              compact
              showSummary={showSummary}
              siteInfo={siteInfo}
            />
          ))}
        </div>

        {/* 更多按钮 */}
        {hasMore && (
          <div
            onClick={() => {
              handleGetMore()
            }}
            className='mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-gray-300 dark:hover:text-white'>
            {locale.COMMON.MORE}
          </div>
        )}
      </div>
    )
  }
}

export default BlogPostListScroll
