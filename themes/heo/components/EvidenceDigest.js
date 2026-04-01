import SmartLink from '@/components/SmartLink'
import { buildArticleDigest } from '../evidence.helpers'
import Card from './Card'

const DigestItem = ({ label, content }) => {
  if (!content) {
    return null
  }

  return (
    <div className='grid gap-2 md:grid-cols-[7rem,1fr] md:gap-4'>
      <div className='text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>
        {label}
      </div>
      <div className='text-sm leading-7 text-slate-700'>{content}</div>
    </div>
  )
}

export default function EvidenceDigest({ post }) {
  const digest = buildArticleDigest(post)

  if (!digest) {
    return null
  }

  return (
    <Card className='evidence-digest wow fadeInUp border-slate-200 bg-slate-50/80 shadow-sm'>
      <div className='mb-4 flex flex-wrap items-center gap-2'>
        <span className='rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600'>
          {digest.type}
        </span>
        {digest.tags?.slice(0, 3).map(tag => (
          <span
            key={tag}
            className='rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-500'>
            {tag}
          </span>
        ))}
      </div>

      <div className='space-y-4'>
        <DigestItem label='问题' content={digest.problem} />
        <DigestItem label='动作' content={digest.action} />
        <DigestItem label='结果' content={digest.result} />
      </div>

      {digest.links?.length > 0 && (
        <div className='mt-5 border-t border-dashed border-slate-200 pt-4'>
          <div className='mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>
            相关证据
          </div>
          <div className='flex flex-wrap gap-2'>
            {digest.links.map(link => {
              const key = `${link.title}-${link.href || 'local'}`
              const content = (
                <span className='inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900'>
                  {link.title}
                </span>
              )

              if (!link.href) {
                return <div key={key}>{content}</div>
              }

              return (
                <SmartLink
                  key={key}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}>
                  {content}
                </SmartLink>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
