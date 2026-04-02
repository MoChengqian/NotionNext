import { siteConfig } from '@/lib/config'
import { useRef } from 'react'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import RandomRecommendedButton from './RandomRecommendedButton'
import ReadingProgress from './ReadingProgress'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'

/**
 * 页头：顶部导航
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const slideOverRef = useRef()

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  return (
    <nav
      id='nav'
      className='sticky top-0 z-30 h-16 w-full border-b border-slate-200 bg-white/95 text-black shadow-sm backdrop-blur dark:border-gray-700 dark:bg-[#18171d]/95 dark:text-white'>
      <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-4 md:px-6'>
        <Logo {...props} />

        <div className='hidden lg:flex flex-1 items-center justify-center px-6'>
          <MenuListTop {...props} />
        </div>

        <div className='flex flex-shrink-0 justify-end items-center gap-1 md:w-40'>
          <SearchButton {...props} />
          <RandomRecommendedButton {...props} />
          {!JSON.parse(siteConfig('THEME_SWITCH')) && (
            <div className='hidden md:block'>
              <DarkModeButton {...props} />
            </div>
          )}
          <ReadingProgress />

          <div
            onClick={toggleMenuOpen}
            className='flex lg:hidden w-8 justify-center items-center h-8 cursor-pointer'>
            <i className='fas fa-bars' />
          </div>
        </div>

        <SlideOver cRef={slideOverRef} {...props} />
      </div>
    </nav>
  )
}

export default Header
