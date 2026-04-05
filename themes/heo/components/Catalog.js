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
  // 目录自动滚动
  const tRef = useRef(null)
  const tocItemRefs = useRef({})
  const activeSectionRef = useRef(null)
  const visibleTocIdsRef = useRef(new Set())
  const firstVisibleTocIdRef = useRef(null)

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  const [activeProgress, setActiveProgress] = useState(0)

  useEffect(() => {
    visibleTocIdsRef.current = new Set(tocEntries.map(item => item.id))
    firstVisibleTocIdRef.current = tocEntries[0]?.id || null
  }, [tocEntries])

  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      const visibleSections = []

      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const sectionId = section.getAttribute('data-id')
        if (!sectionId || !visibleTocIdsRef.current.has(sectionId)) continue
        visibleSections.push({
          id: sectionId,
          bbox: section.getBoundingClientRect()
        })
      }

      if (visibleSections.length < 1) {
        return
      }

      let prevBBox = null
      let currentSectionId =
        activeSectionRef.current || firstVisibleTocIdRef.current
      let currentIndex = 0

      for (let i = 0; i < visibleSections.length; ++i) {
        const { id: sectionId, bbox } = visibleSections[i]
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = sectionId
          currentIndex = i
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }

      const currentSection = visibleSections[currentIndex]
      const nextSection = visibleSections[currentIndex + 1]
      let nextProgress = 0

      if (currentSection && nextSection) {
        const anchorTop = Math.max(140, window.innerHeight * 0.2)
        const sectionSpan = Math.max(
          nextSection.bbox.top - currentSection.bbox.top,
          1
        )
        nextProgress = (anchorTop - currentSection.bbox.top) / sectionSpan
        nextProgress = Math.max(0, Math.min(nextProgress, 1))
      }

      setActiveSection(currentSectionId)
      setActiveProgress(nextProgress)
    }, 120)
  , [])

  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [actionSectionScrollSpy])

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

    const activeIndex = tocEntries.findIndex(item => item.id === activeSection)
    const nextItem =
      activeIndex >= 0
        ? tocItemRefs.current?.[tocEntries[activeIndex + 1]?.id]
        : null
    const maxScrollTop = Math.max(
      0,
      container.scrollHeight - container.clientHeight
    )
    const viewportHeight = container.clientHeight
    const currentTop = activeItem.offsetTop
    let targetItemTop = currentTop

    if (nextItem) {
      targetItemTop =
        currentTop + (nextItem.offsetTop - currentTop) * activeProgress
    }

    let nextScrollTop = targetItemTop - viewportHeight * 0.3
    nextScrollTop = Math.max(0, Math.min(nextScrollTop, maxScrollTop))

    if (Math.abs(container.scrollTop - nextScrollTop) < 4) {
      return
    }

    container.scrollTop = nextScrollTop
  }, [activeProgress, activeSection, tocEntries])

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
