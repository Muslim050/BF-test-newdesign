import React, { useEffect } from 'react'
import Header from 'src/components/Site/Header/Header'

import style from './site.module.scss'
import FirstPage from '@/components/Site/FirstPage/FirstPage.jsx'
import { gsap } from 'gsap'
import FourthPage from '@/components/Site/FourthPage/index.jsx'

import FifthPage from '@/components/Site/FifthPage/index.jsx'
import SixthPage from '@/components/Site/SixthPage/index.jsx'
import SeventhPage from '@/components/Site/SeventhPage/index.jsx'
import Footer from '../../components/Site/Footer'
import ThirdPage from '../../components/Site/ThirdPage'
import Loading from './PreLoad/PreLoad'
import FifthPage2 from '../../components/Site/FifthPage2'

function Site() {
  const [loading, setLoading] = React.useState(true)

  const handleLoadingComplete = () => {
    setLoading(false)
  }
  return (
    <div className={`${style.wrapperSite} `}>
      {loading ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <div>
          <Header />
          <FirstPage />
          <ThirdPage />
          <FourthPage />
          <FifthPage />
          <FifthPage2 />
          <SixthPage />
          <SeventhPage />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Site
