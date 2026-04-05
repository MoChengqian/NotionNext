import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ toc }) => {
  const { locale } = useGlobal()
  const tocEntries = useMemo(() => {
    return (toc || [])
      .map((tocItem, index) => {
        const id = tocItem?.id ? uuidToId(tocItem.id) : null
        if (!id) {
          return null
        }

        return {
          ...tocItem,
          id,
          key: id || `toc-${index}`,
          indentLevel: tocItem.indentLevel || 0
        }
      })
      .filter(tocItem => (tocItem?.indentLevel || 0) <= 1)
      .filter(Boolean)
  }, [toc])

  // 监听滚动事件
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  // 目录自动滚动
  const tRef = useRef(null)
  const tocItemRefs = useRef({})
  const activeSectionRef = useRef(null)
  const visibleTocIdsRef = useRef(new Set())
  const firstVisibleTocIdRef = useRef(null)

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    visibleTocIdsRef.current = new Set(tocEntries.map(item => item.id))
    firstVisibleTocIdRef.current = tocEntries[0]?.id || null
  }, [tocEntries])

  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId =
        activeSectionRef.current || firstVisibleTocIdRef.current
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const sectionId = section.getAttribute('data-id')
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          if (sectionId && visibleTocIdsRef.current.has(sectionId)) {
            currentSectionId = sectionId
          }
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      setActiveSection(currentSectionId)
    }, 200)
  , [])

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    if (!activeSection) {
      return
    }

    const container = tRef.current
    const activeItem = tocItemRefs.current?.[activeSection]
    if (!container || !activeItem) {
      return
    }

    const maxScrollTop = Math.max(
      0,
      container.scrollHeight - container.clientHeight
    )
    const viewportTop = container.scrollTop
    const viewportHeight = container.clientHeight
    const viewportBottom = viewportTop + viewportHeight
    const itemTop = activeItem.offsetTop
    const itemBottom = itemTop + activeItem.offsetHeight
    const upperThreshold = viewportTop + viewportHeight * 0.22
    const lowerThreshold = viewportBottom - viewportHeight * 0.32

    let nextScrollTop = viewportTop

    // 当前目录项接近底部时，提前上推目录，露出后面的新内容。
    if (itemBottom > lowerThreshold) {
      nextScrollTop = itemTop - viewportHeight * 0.45
    } else if (itemTop < upperThreshold) {
      nextScrollTop = itemTop - viewportHeight * 0.18
    }

    nextScrollTop = Math.max(0, Math.min(nextScrollTop, maxScrollTop))

    if (Math.abs(container.scrollTop - nextScrollTop) < 4) {
      return
    }

    container.scrollTop = nextScrollTop
  }, [activeSection])

  // 无目录就直接返回空
  if (!tocEntries || tocEntries.length < 1) {
    return <></>
  }

  return (
    <div className='flex h-full min-h-0 flex-col px-3 py-1 text-black dark:text-white'>
      <div className='w-full shrink-0'>
        <i className='mr-1 fas fa-stream' />
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>
      <div
        className='mt-3 min-h-0 flex-1 overflow-y-auto overscroll-none scroll-hidden'
        ref={tRef}>
        <nav className='h-full'>
          {tocEntries.map(tocItem => {
            return (
              <a
                key={tocItem.key}
                href={`#${tocItem.id}`}
                ref={node => {
                  if (!node) {
                    delete tocItemRefs.current[tocItem.id]
                    return
                  }
                  tocItemRefs.current[tocItem.id] = node
                }}
                className={`notion-table-of-contents-item duration-300 transform dark:text-gray-200
            notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `}>
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 16
                  }}
                  className={`truncate ${activeSection === tocItem.id ? 'font-bold text-indigo-600' : ''}`}>
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
