import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import Card from './Card'

/**
 * 个人信息卡片
 */
export function InfoCard(props) {
  const { siteInfo } = props
  const profileName = siteConfig('AUTHOR')
  const stack = siteConfig(
    'HEO_INFO_CARD_STACK',
    'Platform / Infrastructure Backend',
    CONFIG
  )
  const intro = siteConfig(
    'HEO_INFO_CARD_INTRO',
    '围绕网关、服务治理、可观测性、稳定性与模型接入治理持续积累。',
    CONFIG
  )
  const actions = siteConfig('HEO_INFO_CARD_ACTIONS', [], CONFIG)

  const githubUrl = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const moreUrl = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)

  return (
    <Card className='wow fadeInUp w-full border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e]'>
      <div className='flex items-center gap-4'>
        <LazyImage
          src={siteInfo?.icon}
          className='h-14 w-14 rounded-xl border border-slate-200 object-cover dark:border-gray-700'
          width={56}
          height={56}
          alt={profileName}
        />
        <div>
          <div className='text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-gray-400'>
            个人说明
          </div>
          <h2 className='mt-1 text-xl font-semibold text-slate-900 dark:text-white'>
            {profileName}
          </h2>
        </div>
      </div>

      <div className='mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-gray-700 dark:bg-[#25242b] dark:text-gray-300'>
        {stack}
      </div>

      <p className='mt-4 text-sm leading-6 text-slate-600 dark:text-gray-300'>{intro}</p>

      <div className='mt-5 flex flex-wrap gap-2'>
        {actions?.map(action => (
          <SmartLink
            key={action.title}
            href={action.href}
            target={action.target}
            className='inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-gray-700 dark:bg-[#25242b] dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-[#2c2b33]'>
            {action.title}
          </SmartLink>
        ))}

        {!actions?.length && githubUrl && (
          <SmartLink
            href={githubUrl}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600'>
            <i className='fab fa-github text-base' />
            GitHub
          </SmartLink>
        )}

        {!actions?.length && moreUrl && (
          <SmartLink
            href={moreUrl}
            className='inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100'>
            关于
          </SmartLink>
        )}
      </div>
    </Card>
  )
}
