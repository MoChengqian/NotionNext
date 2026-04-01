import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { buildFocusTags, buildSidebarTags } from '../evidence.helpers'

/**
 * Tag group
 */
const TagGroups = ({ tags = [], className, names }) => {
  const router = useRouter()
  const { tag: currentTag } = router.query
  const focusTags = names ? buildSidebarTags(tags, names) : buildFocusTags(tags)
  if (!focusTags || focusTags.length === 0) return <></>

  return (
    <div id='tags-group' className='flex flex-wrap gap-2'>
      {focusTags.map((tag, index) => {
        const selected = currentTag === tag.name

        return (
          <SmartLink
            passHref
            key={`${tag.name}-${index}`}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-xs transition-colors ${
              selected
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
            } ${className || ''}`}>
            <span>{tag.name}</span>
            {tag.count ? <sup>{tag.count}</sup> : null}
          </SmartLink>
        )
      })}
    </div>
  )
}

export default TagGroups
