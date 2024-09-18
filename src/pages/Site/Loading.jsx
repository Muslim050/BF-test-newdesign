import {
  GradientBGSvg,
  EllipseSvg,
  EllipseSvg2,
} from '@/assets/Site/site-svg.jsx'
import m from './Loading.module.scss'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from '@/assets/Logo.png'

const Loading = ({ onComplete }) => {
  const textRef = useRef(null)
  const circleRef = useRef(null)
  const circleRef2 = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5, // Уменьшаем длительность скрытия
          ease: 'power1.inOut',
          onComplete,
        })
      },
    })

    timeline
      .fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'circ.inOut' },
      )
      .fromTo(
        circleRef.current,
        { opacity: 0, rotation: 0 },
        { opacity: 1, rotation: 360, duration: 1.5, ease: 'circ.inOut' },
        '-=0.5',
      )
      .fromTo(
        circleRef2.current,
        { opacity: 0, rotation: 0 },
        { opacity: 1, rotation: 380, duration: 2, ease: 'circ.inOut' },
        '-=1',
      )
      .fromTo(
        circleRef2.current,
        { opacity: 0, rotation: 0 },
        { opacity: 1, rotation: 380, duration: 2, ease: 'circ.inOut' },
        '-=1',
      )
  }, [onComplete])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px] overflow-hidden" />
      <div className="absolute top-1/2 transform -translate-y-1/2 w-[100%] ">
        <div ref={circleRef} className="relative ">
          <EllipseSvg className="absolute top-1/2 transform -translate-y-1/2 w-full -z-[5px]" />
        </div>
        <div ref={circleRef2} className="relative" style={{ opacity: 0 }}>
          <EllipseSvg2 className="absolute top-1/2 transform -translate-y-1/2 w-[100%] -z-[5px]" />
        </div>

        <div
          ref={textRef}
          className="relative left-0 -top-12 w-full  flex flex-col justify-center "
        >
          <div className="flex justify-center">
            <img src={Logo} alt="" className="w-[54px] h-[60px] " />
          </div>
          <div
            style={{
              background:
                'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              letterSpacing: '-0.03em',

              textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
            }}
            className={` animated-element  text-[32px] font-bold pt-3  text-center `}
            // className="text-white text-[32px] font-bold"
          >
            Brandformance
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
