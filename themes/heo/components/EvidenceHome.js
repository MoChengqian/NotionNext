import SmartLink from '@/components/SmartLink'
import {
  buildEvidenceHighlights,
  buildSeriesEntries
} from '../evidence.helpers'
import EVIDENCE_CONFIG from '../evidence.config'
import Card from './Card'

const SectionHeader = ({ title, description }) => {
  return (
    <div className='mb-4 px-1'>
      <div className='text-xs uppercase tracking-[0.16em] text-slate-500'>
        首页结构
      </div>
      <h2 className='mt-1 text-2xl font-semibold text-slate-900'>{title}</h2>
      {description && (
        <p className='mt-2 max-w-3xl text-sm leading-6 text-slate-600'>
          {description}
        </p>
      )}
    </div>
  )
}

const LinkCard = ({ item, emphasize = false }) => {
  const cardClassName = emphasize
    ? 'border-slate-200 bg-white shadow-sm hover:border-slate-900 hover:shadow-md'
    : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'

  const content = (
    <Card
      className={`h-full transition-all duration-200 ${cardClassName}`}
      headerSlot={
        <div className='mb-3 flex items-center justify-between gap-3'>
          {item.label ? (
            <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600'>
              {item.label}
            </span>
          ) : (
            <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600'>
              入口
            </span>
          )}
          {item.meta && (
            <span className='text-xs text-slate-400'>{item.meta}</span>
          )}
        </div>
      }>
      <div className='space-y-3'>
        <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
        {item.summary && (
          <p className='text-sm leading-6 text-slate-600'>{item.summary}</p>
        )}
        <div className='text-sm font-medium text-slate-900'>
          {item.href ? '查看证据' : '入口已预留，后续补入内容'}
        </div>
      </div>
    </Card>
  )

  if (!item.href) {
    return <div className='h-full'>{content}</div>
  }

  return (
    <SmartLink
      href={item.href}
      target={item.target}
      className='block h-full rounded-xl'>
      {content}
    </SmartLink>
  )
}

export default function EvidenceHome({ allNavPages = [] }) {
  const highlightItems = buildEvidenceHighlights(allNavPages).slice(0, 3)
  const seriesEntries = buildSeriesEntries(allNavPages)
  const {
    featuredTitle,
    featuredDescription,
    seriesTitle,
    seriesDescription
  } = EVIDENCE_CONFIG.homepage

  return (
    <div className='mb-8 space-y-8'>
      <section>
        <SectionHeader
          title={featuredTitle}
          description={featuredDescription}
        />
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {highlightItems.map(item => (
            <LinkCard
              key={`${item.label}-${item.title}`}
              item={item}
              emphasize
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title={seriesTitle}
          description={seriesDescription}
        />
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {seriesEntries.map(entry => (
            <LinkCard
              key={entry.id}
              item={{
                title: entry.title,
                href: entry.href,
                summary: entry.summary,
                meta: entry.meta
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
