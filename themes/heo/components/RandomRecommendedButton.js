import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'

const isRecommendedPost = post =>
  post?.type === 'Post' &&
  post?.status === 'Published' &&
  Array.isArray(post?.tags) &&
  post.tags.includes('推荐') &&
  post?.slug

export default function RandomRecommendedButton(props) {
  const router = useRouter()
  const sourcePosts = [
    ...(Array.isArray(props.homePosts) ? props.homePosts : []),
    ...(Array.isArray(props.allNavPages) ? props.allNavPages : []),
    ...(Array.isArray(props.posts) ? props.posts : [])
  ]
  const recommendedPosts = sourcePosts.filter(isRecommendedPost)

  const handleClick = () => {
    if (!recommendedPosts.length) {
      return
    }

    const randomIndex = Math.floor(Math.random() * recommendedPosts.length)
    const randomPost = recommendedPosts[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost.slug}`)
  }

  if (!recommendedPosts.length) {
    return null
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='随机一篇'
      title='随机一篇'
      className='flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all hover:bg-black/10 dark:text-gray-200 dark:hover:bg-white/10'>
      <i className='fas fa-dice text-sm' />
    </button>
  )
}
