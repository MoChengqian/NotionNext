import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * Latest posts list in sidebar
 */
export default function LatestPostsGroupMini({ latestPosts = [], siteInfo }) {
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()
  const SUB_PATH = siteConfig('SUB_PATH', '')

  if (!latestPosts || latestPosts.length === 0) {
    return null
  }

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div className='text-xs uppercase tracking-[0.16em] text-slate-500'>
          {locale.COMMON.LATEST_POSTS}
        </div>
      </div>

      {latestPosts.slice(0, 6).map(post => {
        const selected = currentPath === `${SUB_PATH}/${post.slug}`
        const headerImage = post?.pageCoverThumbnail
          ? post.pageCoverThumbnail
          : siteInfo?.pageCover

        return (
          <SmartLink
            key={post.id}
            title={post.title}
            href={post?.href}
            passHref
            className='my-3 flex gap-3'>
            <div className='h-14 w-20 overflow-hidden rounded-lg border border-slate-200'>
              <LazyImage
                src={headerImage}
                className='h-full w-full object-cover'
              />
            </div>

            <div
              className={`w-full rounded text-sm transition-colors ${
                selected
                  ? 'text-blue-700'
                  : 'text-slate-700 hover:text-blue-600'
              }`}>
              <div className='line-clamp-2 leading-5'>{post.title}</div>
              {post?.lastEditedDay && (
                <div className='mt-1 text-xs text-slate-400'>
                  {post.lastEditedDay}
                </div>
              )}
            </div>
          </SmartLink>
        )
      })}
    </>
  )
}
