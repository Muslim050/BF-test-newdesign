import React, {useRef} from 'react'
import Header from 'src/components/Site/Header/Header'
import Footer from 'src/components/Site/Footer/Footer'
import SecondaryPage from '@/components/Site/SecondaryPage/SecondaryPage.jsx'
import Loading from "@/pages/Site/Loading.jsx";
import style from './site.module.scss'
import FirstPage from "@/components/Site/FirstPage/FirstPage.jsx";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import ThirdPage from "@/components/Site/ThirdPage/index.jsx";
import FourthPage from "@/components/Site/FourthPage/index.jsx";
import FifthPage from "@/components/Site/FifthPage/index.jsx";
import SixthPage from "@/components/Site/SixthPage/index.jsx";
import SeventhPage from "@/components/Site/SeventhPage/index.jsx";

gsap.registerPlugin(ScrollTrigger);

function Site() {
  const [loading, setLoading] = React.useState(true);

  // gsap
  const firstRef = useRef(null)
  const secondaryRef = useRef(null)
  const thirdRef = useRef(null)
  const fourthRef = useRef(null)
  const fifthRef = useRef(null)
  const sixthRef = useRef(null)
  const seventhRef = useRef(null)
  // gsap

  React.useEffect(() => {
    if (!loading) {
      gsap.fromTo(firstRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'easeOut' },
      )
      gsap.from(secondaryRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: secondaryRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
      gsap.from(thirdRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: thirdRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
      gsap.from(fourthRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: fourthRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
      gsap.from(fifthRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: fifthRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
      gsap.from(sixthRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: sixthRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })

      gsap.from(seventhRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: seventhRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })
    }
  }, [loading]);
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3300);
  }, []);

  return (
    <div className={`${style.wrapperSite}  ${loading ? 'loading' : 'loaded'}`}>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <Header/>
          <div ref={firstRef}>
            <FirstPage/>
          </div>
          {/*<div ref={secondaryRef}>*/}
          {/*  <SecondaryPage/>*/}
          {/*</div>*/}
          {/*<div ref={thirdRef}>*/}
          {/*  <ThirdPage/>*/}
          {/*</div>*/}
          {/*<div ref={fourthRef}>*/}
          {/*  <FourthPage/>*/}
          {/*</div>*/}
          {/*/!*<div ref={fifthRef}>*!/*/}
          {/*  <FifthPage/>*/}
          {/*/!*</div>*!/*/}

          {/*<div ref={sixthRef}>*/}
          {/*  <SixthPage/>*/}
          {/*</div>*/}

          {/*<div ref={seventhRef}>*/}
          {/*  <SeventhPage/>*/}
          {/*</div>*/}

          {/*<Footer/>*/}
        </>
      )}
    </div>
  )
}


export default Site
