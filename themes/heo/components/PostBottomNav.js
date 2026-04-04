import SmartLink from '@/components/SmartLink'

/**
 * 文章底部快捷导航
 */
export default function PostBottomNav() {
  const scrollToTop = () => {
    if (typeof window === 'undefined') {
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className='mt-6 mx-1'>
      <div className='grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 dark:border-gray-700 dark:bg-[#202026] dark:text-gray-200'>
        <SmartLink
          href='/'
          className='flex items-center justify-center gap-2 px-4 py-4 transition-colors hover:bg-slate-100 dark:hover:bg-[#25242b]'>
          <i className='fas fa-house text-xs' />
          <span>回到首页</span>
        </SmartLink>

        <button
          type='button'
          onClick={scrollToTop}
          className='flex items-center justify-center gap-2 border-l border-slate-200 px-4 py-4 transition-colors hover:bg-slate-100 dark:border-gray-700 dark:hover:bg-[#25242b]'>
          <span>回到顶部</span>
          <i className='fas fa-arrow-up text-xs' />
        </button>
      </div>
    </section>
  )
}
