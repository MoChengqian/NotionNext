import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import Card from './Card'

/**
 * Brand profile card
 */
export function InfoCard(props) {
  const { siteInfo } = props
  const profileName = siteConfig('AUTHOR')
  const stack = siteConfig(
    'HEO_INFO_CARD_STACK',
    'AI与全栈开发工程师',
    CONFIG
  )
  const intro = siteConfig(
    'HEO_INFO_CARD_INTRO',
    '记录技术、思考与成长，关注可维护系统与工程实践。',
    CONFIG
  )

  const githubUrl = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const moreUrl = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)

  return (
    <Card className='wow fadeInUp w-72 border-slate-200 bg-white shadow-sm'>
      <div className='flex items-center gap-4'>
        <LazyImage
          src={siteInfo?.icon}
          className='h-14 w-14 rounded-xl border border-slate-200 object-cover'
          width={56}
          height={56}
          alt={profileName}
        />
        <div>
          <div className='text-[11px] uppercase tracking-[0.16em] text-slate-500'>
            Personal Brand
          </div>
          <h2 className='mt-1 text-xl font-semibold text-slate-900'>
            {profileName}
          </h2>
        </div>
      </div>

      <div className='mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-600'>
        {stack}
      </div>

      <p className='mt-4 text-sm leading-6 text-slate-600'>{intro}</p>

      <div className='mt-5 flex gap-2'>
        {githubUrl && (
          <SmartLink
            href={githubUrl}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600'>
            <i className='fab fa-github text-base' />
            GitHub
          </SmartLink>
        )}

        {moreUrl && (
          <SmartLink
            href={moreUrl}
            className='inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100'>
            About
          </SmartLink>
        )}
      </div>
    </Card>
  )
}
