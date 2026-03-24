import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import {
  getAccessibleRandomPosts,
  getRandomPostPath
} from './random-post.helper'

/**
 * 随机跳转到一个文章
 */
export default function RandomPostButton(props) {
  const { latestPosts } = props
  const router = useRouter()
  const { locale } = useGlobal()
  const randomPosts = getAccessibleRandomPosts(latestPosts)
  /**
   * 随机跳转文章
   */
  function handleClick() {
    if (!randomPosts.length) return

    const randomIndex = Math.floor(Math.random() * randomPosts.length)
    const randomPost = randomPosts[randomIndex]
    const randomPath = getRandomPostPath(randomPost, siteConfig('SUB_PATH', ''))
    if (!randomPath) return

    router.push(randomPath)
  }

  return (
        <div title={locale.MENU.WALK_AROUND} className='cursor-pointer hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all' onClick={handleClick}>
            <i className="fa-solid fa-podcast"></i>
        </div>
  )
}
