import React, { useEffect, useRef } from 'react'
import Header from 'src/components/Site/Header/Header'

import style from './site.module.scss'
import FirstPage from '@/components/Site/FirstPage/FirstPage.jsx'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import FourthPage from '@/components/Site/FourthPage/index.jsx'

import FifthPage from '@/components/Site/FifthPage/index.jsx'
import SixthPage from '@/components/Site/SixthPage/index.jsx'
import SeventhPage from '@/components/Site/SeventhPage/index.jsx'
import Footer from '../../components/Site/Footer'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import ThirdPage from '../../components/Site/ThirdPage'
import Loading from './Loading'
gsap.registerPlugin(ScrollTrigger)

function Site() {
  const [loading, setLoading] = React.useState(true)

  // gsap
  const firstRef = useRef(null)
  const secondaryRef = useRef(null)
  const thirdRef = useRef(null)
  const sixthRef = useRef(null)
  const seventhRef = useRef(null)
  const mainContentRef = useRef(null)

  // gsap

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: 'easeOut' },
      })

      tl.to(mainContentRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut',
        onStart: () => {
          gsap.fromTo(
            firstRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'easeOut' },
          )
        },
      })
        .from(secondaryRef.current, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: secondaryRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        })
        .from(thirdRef.current, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: thirdRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        })

        .from(sixthRef.current, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: sixthRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        })
        .from(seventhRef.current, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: seventhRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        })
    }
  }, [loading])

  // React.useEffect(() => {
  //   setTimeout(() => setLoading(false), 4000)
  // }, [])
  return (
    <div className={`${style.wrapperSite} ${loading ? 'loading' : 'loaded'}`}>
      {loading ? (
        <Loading onComplete={() => setLoading(false)} />
      ) : (
        <div
          ref={mainContentRef}
          className="main-content relative"
          style={{ opacity: 0 }}
        >
          <GradientBGSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <StarsSSSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <SetkaSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <Header />
          <div id="firstRef" ref={firstRef}>
            <FirstPage />
          </div>
          {/* Почему нас выбирают?*/}
          <div id="ThirdPage" ref={thirdRef}>
            <ThirdPage />
          </div>
          {/* Почему нас выбирают?*/}

          {/* Видео */}
          <div id="FourthPageP">
            <FourthPage />
          </div>
          {/* Видео */}

          {/* Вертикальный слайд */}
          <div id="FifthPage">
            <FifthPage />
          </div>
          {/* Вертикальный слайд */}

          {/* FAQ */}
          <div id="SixthPage">
            <SixthPage />
          </div>
          {/* FAQ */}

          {/* Форма обратной связи */}
          <div id="seventhRef" ref={seventhRef}>
            <SeventhPage />
          </div>
          {/* Форма обратной связи */}

          <Footer />
        </div>
      )}
    </div>
  )
}

export default Site
