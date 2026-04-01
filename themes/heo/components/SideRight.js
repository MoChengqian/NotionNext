import Card from './Card'
import Catalog from './Catalog'
import { InfoCard } from './InfoCard'
import TagGroups from './TagGroups'
import EVIDENCE_CONFIG from '../evidence.config'

/**
 * Right sidebar for desktop
 */
export default function SideRight(props) {
  const { post, tagOptions, currentTag, rightAreaSlot } = props

  return (
    <div id='sideRight' className='hidden xl:block w-72 space-y-4 h-full'>
      <InfoCard {...props} />

      <div className='sticky top-20 space-y-4'>
        {post && post.toc && post.toc.length > 0 && (
          <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
            <Catalog toc={post.toc} />
          </Card>
        )}

        <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
          <div className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-500'>
            {EVIDENCE_CONFIG.sidebar.title}
          </div>
          <p className='mb-4 text-sm leading-6 text-slate-600'>
            {EVIDENCE_CONFIG.sidebar.description}
          </p>
          <TagGroups
            tags={tagOptions || []}
            currentTag={currentTag}
            names={EVIDENCE_CONFIG.sidebar.tags}
          />
        </Card>

        {rightAreaSlot}
      </div>
    </div>
  )
}
