/**
 *   HEO 主题说明
 *  > 主题设计者 [张洪](https://zhheo.com/)
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
 */

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import ContentTabs from './components/ContentTabs'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import Header from './components/Header'
import LatestPostsGroup from './components/LatestPostsGroup'
import PageLead from './components/PageLead'
import PostAdjacent from './components/PostAdjacent'
import PostBottomNav from './components/PostBottomNav'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'
import {
  buildFocusTags,
  buildHomeFeedPosts,
  buildPrimaryCategories,
  getPageLeadConfig,
  getStaticPageConfig,
  resolveActiveContentTab
} from './evidence.helpers'

/**
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()
  const isArticleLayout = Boolean(props.post)
  const hiddenPostHeaderRoutes = new Set([
    '/interview-reading',
    '/series',
  ])
  const contentTabRoutes = new Set([
    '/',
    '/recommended-reading',
    '/growth-notes',
    '/category',
    '/category/[category]',
    '/category/[category]/page/[page]',
    '/tag',
    '/tag/[tag]',
    '/tag/[tag]/page/[page]',
    '/archive',
    '/page/[page]',
    '/series'
  ])

  const headerSlot = (
    <header>
      <Header {...props} />
      {contentTabRoutes.has(router.route) ? <ContentTabs {...props} /> : null}
      {fullWidth || hiddenPostHeaderRoutes.has(router.route) ? null : (
        <PostHeader {...props} isDarkMode={isDarkMode} />
      )}
    </header>
  )

  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  const maxWidth = fullWidth
    ? 'max-w-[96rem] mx-auto'
    : isArticleLayout
      ? 'max-w-[92rem]'
      : 'max-w-[86rem]' // 文章页放宽桌面容器，让正文获得更多横向空间

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5 ${isArticleLayout ? 'xl:px-2' : ''}`}>
        <div
          id='container-inner'
          className={`${isArticleLayout ? 'xl:grid xl:grid-cols-[15.5rem_minmax(0,1fr)] xl:items-start xl:gap-6' : `${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} lg:flex justify-center`} w-full mx-auto relative z-10`}>
          {isArticleLayout && slotRight ? (
            <div className='hidden xl:block xl:self-stretch xl:justify-self-start'>
              {slotRight}
            </div>
          ) : null}

          <div className={`w-full h-auto ${className || ''} ${isArticleLayout ? 'xl:min-w-0' : ''}`}>
            {slotTop}
            {children}
            {slotRight ? (
              <div className='mt-6 px-5 md:px-0 xl:hidden'>
                <SideRight {...props} mobile />
              </div>
            ) : null}
          </div>

          {isArticleLayout ? null : <div className='lg:px-2'></div>}

          <div className={`hidden xl:block ${isArticleLayout ? 'xl:hidden' : ''}`}>
            {/* 主区快右侧 */}
            {slotRight}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const homeSource =
    (Array.isArray(props.homePosts) && props.homePosts.length > 0
      ? props.homePosts
      : null) ||
    (Array.isArray(props.allNavPages) && props.allNavPages.length > 0
      ? props.allNavPages
      : null) ||
    props.posts ||
    []
  const allHomePosts = buildHomeFeedPosts(homeSource)
  const postsPerPage = siteConfig('POSTS_PER_PAGE', 12, props.NOTION_CONFIG)
  const listStyle = siteConfig('POST_LIST_STYLE')
  const readingPageConfig = getStaticPageConfig('interviewReading')
  const readingOrderSection = readingPageConfig?.sections?.find(
    section => section.id === 'reading-order'
  )
  const readingEntryPanel = readingPageConfig?.entryPanel
  const readingWelcomePanel = readingPageConfig?.welcomePanel
  const homeFeedProps = {
    ...props,
    posts:
      listStyle === 'page' ? allHomePosts.slice(0, postsPerPage) : allHomePosts,
    postCount: allHomePosts.length
  }

  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {readingOrderSection ? (
        <section className='mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-none dark:border-gray-700 dark:bg-[#202026] md:px-5'>
            <div
              className={`grid gap-5 ${readingEntryPanel && readingWelcomePanel
              ? 'xl:grid-cols-[minmax(0,0.58fr)_minmax(0,1.42fr)_15rem] xl:items-stretch'
              : readingEntryPanel
                ? 'xl:grid-cols-[minmax(0,1fr)_17.5rem] xl:items-stretch'
                : ''}`}>
              <div className='order-1 rounded-2xl border border-slate-300 bg-white px-5 py-5 shadow-sm ring-1 ring-slate-100 dark:border-gray-600 dark:bg-[#24232a] dark:ring-white/5 xl:order-2 xl:px-6'>
                <h2 className='text-xl font-semibold text-slate-950 dark:text-white md:text-2xl'>
                  {readingOrderSection.title}
                </h2>
                <ol className='mt-5 space-y-3.5'>
                  {readingOrderSection.items?.map((item, index) => (
                    <li
                      key={`home-reading-order-${index}`}
                      className='flex items-center gap-3'>
                      <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900'>
                        {index + 1}
                      </div>
                      <div>
                        <div className='text-base font-semibold text-slate-950 dark:text-white'>
                          {item.title || item}
                        </div>
                        {item.summary && (
                          <p className='mt-1 text-sm leading-6 text-slate-600 dark:text-gray-300'>
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {readingWelcomePanel ? (
                <section className='order-2 flex h-full flex-col justify-center rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-none dark:border-gray-700 dark:bg-[#24232a] xl:order-1'>
                  {readingWelcomePanel.eyebrow && (
                    <div className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-gray-400'>
                      {readingWelcomePanel.eyebrow}
                    </div>
                  )}

                  <h3 className='mt-1 text-base font-semibold text-slate-900 dark:text-white'>
                    {readingWelcomePanel.title}
                  </h3>

                  {readingWelcomePanel.description && (
                    <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-gray-300'>
                      {readingWelcomePanel.description}
                    </p>
                  )}

                  {readingWelcomePanel.signature && (
                    <p className='mt-3 text-sm font-medium text-slate-700 dark:text-gray-200'>
                      {readingWelcomePanel.signature}
                    </p>
                  )}

                  {readingWelcomePanel.keywords?.length > 0 && (
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {readingWelcomePanel.keywords.map(keyword => (
                        <span
                          key={keyword}
                          className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-gray-600 dark:bg-[#1e1e1e] dark:text-gray-300'>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              ) : null}

              {readingEntryPanel ? (
                <aside className='order-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-none dark:border-gray-700 dark:bg-[#24232a]'>
                  {readingEntryPanel.eyebrow && (
                    <div className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-gray-400'>
                      {readingEntryPanel.eyebrow}
                    </div>
                  )}

                  <h3 className='mt-1 text-base font-semibold text-slate-900 dark:text-white'>
                    {readingEntryPanel.title}
                  </h3>

                  {readingEntryPanel.description && (
                    <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-gray-300'>
                      {readingEntryPanel.description}
                    </p>
                  )}

                  {readingEntryPanel.actions?.length > 0 && (
                    <div className='mt-4 flex flex-wrap gap-2 xl:flex-col'>
                      {readingEntryPanel.actions.map((action, index) => {
                        const primary = index === 0
                        return (
                          <SmartLink
                            key={action.title}
                            href={action.href}
                            target={action.target}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${primary
                              ? 'border border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-100 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
                              : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-gray-600 dark:bg-[#1e1e1e] dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-[#2b2a31]'}`}>
                            {action.icon ? <i className={action.icon} /> : null}
                            {action.title}
                          </SmartLink>
                        )
                      })}
                    </div>
                  )}
                </aside>
              ) : null}
          </div>
        </section>
      ) : (
        <PageLead {...getPageLeadConfig({ pathname: '/' })} compact />
      )}
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...homeFeedProps} />
      ) : (
        <BlogPostListScroll {...homeFeedProps} />
      )}
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const router = useRouter()
  const activeTab = resolveActiveContentTab({
    pathname: router.pathname,
    category: props.category,
    tag: props.tag || router.query?.tag
  })
  const lead = getPageLeadConfig({
    pathname: router.pathname,
    category: props.category,
    tag: props.tag
  })

  return (
    <div id='post-outer-wrapper' className='px-5  md:px-0'>
      {activeTab === 'all' && lead ? <PageLead {...lead} compact /> : null}
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [])
  return (
    <div currentSearch={currentSearch}>
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  const lead = getPageLeadConfig({ pathname: '/archive' })

  return (
    <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
      <PageLead
        {...lead}
        compact
        className='mb-5 border-none bg-slate-50 shadow-none dark:bg-[#202026]'
      />

      <div className='px-3'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-[60rem] 2xl:max-w-[64rem] xl:mx-auto'} bg-white dark:bg-[#18171d] dark:border-gray-600 lg:border rounded-2xl lg:px-2 lg:py-4`}>
        {/* 文章锁 */}
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='mx-auto w-full md:px-5 xl:px-6'>
            {/* 文章主体 */}
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'>
              {/* Notion文章主体 */}
              <section
                className='wow fadeInUp p-5 justify-center mx-auto space-y-4'
                data-wow-delay='.2s'>
                <ArticleExpirationNotice post={post} />
                <AISummary aiSummary={post.aiSummary} />
                {post && <NotionPage post={post} />}
              </section>

              {/* 上一篇\下一篇文章 */}
              <PostAdjacent {...props} />

              {post?.type === 'Post' && (
                <div className='px-5 pb-2'>
                  <PostBottomNav />
                  <div className='mt-4 border-t border-dashed border-slate-200 pt-4 dark:border-gray-700'>
                    <ShareBar post={post} />
                  </div>
                  {/* 文章推荐 */}
                  <PostRecommend {...props} />
                </div>
              )}
            </article>

            {/* 评论区 */}
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                {/* 评论区上方广告 */}
                <div className='py-2'>
                  <AdSlot />
                </div>
                {/* 评论互动 */}
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  // const { meta, siteInfo } = props
  const { onLoading, fullWidth } = useGlobal()
  return (
    <>
      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-16'
            unmount={false}>
            {/* 404卡牌 */}
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
              {/* 左侧动图 */}
              <LazyImage
                className='error-img h-60 md:h-full p-4'
                src={
                  'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
                }></LazyImage>

              {/* 右侧文字 */}
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
                  404
                </h1>
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
                <SmartLink href='/'>
                  <button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>
                    回到主页
                  </button>
                </SmartLink>
              </div>
            </div>

            {/* 404页面底部显示最新文章 */}
            <div className='mt-12'>
              <LatestPostsGroup {...props} />
            </div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const categories = buildPrimaryCategories(categoryOptions)
  const lead = getPageLeadConfig({ pathname: '/category' })

  return (
    <div id='category-outer-wrapper' className='px-5 md:px-0'>
      <PageLead {...lead} compact />
      <div
        id='category-list'
        className='duration-200 flex flex-wrap gap-5 justify-start'>
        {categories?.map(category => {
          return (
            <SmartLink
              key={category.name}
              href={`/category/${encodeURIComponent(category.name)}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'group flex flex-nowrap items-center border bg-white text-xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-slate-900 transition-all duration-150'
                }>
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
                {category.name}
                <div className='bg-[#f1f3f8] ml-2 px-2 rounded-lg text-base group-hover:text-slate-900 '>
                  {category.count > 0 ? category.count : '未归档'}
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const tags = buildFocusTags(tagOptions)
  const lead = getPageLeadConfig({ pathname: '/tag' })

  return (
    <div id='tag-outer-wrapper' className='px-5 md:px-0'>
      <PageLead {...lead} compact />
      <div
        id='tag-list'
        className='duration-200 flex flex-wrap gap-4 justify-start'>
        {tags.map(tag => {
          return (
            <SmartLink
              key={tag.name}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'group flex flex-nowrap items-center border bg-white text-xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-slate-900 transition-all duration-150'
                }>
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
                {tag.name}
                <div className='bg-[#f1f3f8] ml-2 px-2 rounded-lg text-base group-hover:text-slate-900 '>
                  {tag.count}
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
