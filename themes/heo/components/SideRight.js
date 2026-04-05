import Catalog from './Catalog'

/**
 * Right sidebar for desktop
 */
export default function SideRight(props) {
  const { post, tagOptions, currentTag, mobile = false } = props

  if (mobile) {
    return (
      <></>
    )
  }

  if (!post || !post.toc || post.toc.length < 1) {
    return null
  }

  return (
    <div id='sideRight' className='hidden xl:block w-[21rem] 2xl:w-[22rem] h-full'>
      <div className='sticky top-0'>
        <div className='card wow fadeInUp flex h-screen flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:p-5 p-4 dark:border-gray-700 dark:bg-[#1e1e1e]'>
          <Catalog toc={post.toc} />
        </div>
      </div>
    </div>
  )
}
