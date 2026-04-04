import Card from './Card'
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
      <div className='sticky top-20'>
        <Card className='wow fadeInUp h-[calc(100vh-6rem)] bg-white border-slate-200 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e]'>
          <Catalog toc={post.toc} />
        </Card>
      </div>
    </div>
  )
}
