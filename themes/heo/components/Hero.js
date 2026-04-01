import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 顶部英雄区
 * 左侧：职业方向、关键词、主入口
 * 右侧：主线聚焦说明
 */
const Hero = () => {
  const reverse = siteConfig('HEO_HERO_REVERSE', false, CONFIG)

  return (
    <div
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${reverse ? 'xl:flex-row-reverse' : ''}
          recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] w-full mx-auto flex flex-col gap-3 xl:flex-row relative`}>
        <PrimaryPanel />
        <SecondaryPanel />
      </div>
    </div>
  )
}

function PrimaryPanel() {
  const eyebrow = siteConfig('HEO_HERO_EYEBROW', '', CONFIG)
  const title = siteConfig('HEO_HERO_TITLE', '', CONFIG)
  const subtitle = siteConfig('HEO_HERO_SUBTITLE', '', CONFIG)
  const keywords = siteConfig('HEO_HERO_KEYWORDS', [], CONFIG)
  const actions = siteConfig('HEO_HERO_ACTIONS', [], CONFIG)

  return (
    <div className='flex min-h-[20rem] flex-1 flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e] md:p-8'>
      <div className='max-w-4xl'>
        <div className='text-xs uppercase tracking-[0.22em] text-slate-500'>
          {eyebrow || 'Platform / Infrastructure Backend'}
        </div>
        <h1 className='mt-4 max-w-4xl text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-[2.9rem] md:leading-[3.4rem]'>
          {title}
        </h1>
        {subtitle && (
          <p className='mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-gray-300 md:text-base'>
            {subtitle}
          </p>
        )}

        <div className='mt-6 flex flex-wrap gap-2.5'>
          {keywords.map(keyword => (
            <span
              key={keyword}
              className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium tracking-[0.04em] text-slate-600 dark:border-gray-600 dark:bg-[#25242b] dark:text-gray-300 md:text-sm'>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-8 flex flex-wrap gap-3'>
        {actions.map(action => (
          <SmartLink
            key={action.title}
            href={action.href}
            target={action.target}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              action.variant === 'primary'
                ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200'
                : action.variant === 'ghost'
                  ? 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white dark:border-gray-600 dark:bg-[#25242b] dark:text-gray-200 dark:hover:bg-[#2d2c34]'
            }`}>
            {action.title}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function SecondaryPanel() {
  const panelTitle = siteConfig('HEO_HERO_PANEL_TITLE', '', CONFIG)
  const panelPoints = siteConfig('HEO_HERO_PANEL_POINTS', [], CONFIG)

  return (
    <div className='w-full shrink-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e] xl:w-[24rem]'>
      <div className='text-xs uppercase tracking-[0.18em] text-slate-500'>
        工程主线
      </div>
      <h2 className='mt-2 text-2xl font-semibold text-slate-900 dark:text-white'>
        {panelTitle}
      </h2>

      <div className='mt-5 space-y-3'>
        {panelPoints.map((point, index) => (
          <div
            key={point.title}
            className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-gray-700 dark:bg-[#25242b]'>
            <div className='flex items-center gap-3'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900'>
                {index + 1}
              </div>
              <div className='text-base font-semibold text-slate-900 dark:text-white'>
                {point.title}
              </div>
            </div>
            <p className='mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300'>
              {point.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
