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
    <div ref={containerRef}>
      <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
      <div className="absolute top-1/2 transform -translate-y-1/2 w-[100%]">
        <div ref={circleRef} className="relative">
          <EllipseSvg className="absolute top-1/2 transform -translate-y-1/2 w-[100%] -z-[5px]" />
        </div>
        <div ref={circleRef2} className="relative" style={{ opacity: 0 }}>
          <EllipseSvg2 className="absolute top-1/2 transform -translate-y-1/2 w-[100%] -з-[5px]" />
        </div>

        <div
          ref={textRef}
          className="absolute left-0 w-full flex justify-center"
        >
          <div className="text-white text-[32px] font-bold">
            <img
              src={Logo}
              alt=""
              className="w-[54px] h-[60px] absolute -top-20 left-[49%]"
            />
            Brandformance
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
