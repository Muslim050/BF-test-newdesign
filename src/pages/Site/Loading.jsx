import {
  GradientBGSvg,
  EllipseSvg,
  EllipseSvg2,
  StarsSSSvg,
  SetkaSvg,
} from '@/assets/Site/site-svg.jsx'
import m from './Loading.module.scss'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Logo from '@/assets/Site/Logo.png'

const Loading = ({ onComplete }) => {
  const [loadingValue, setLoadingValue] = useState(0)
  const digitRefs = useRef([[], []])
  const textRef = useRef(null)
  const circleRef = useRef(null)
  const circleRef2 = useRef(null)
  const dotsRef = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingValue((prev) => {
        if (prev < 100) {
          return prev + 1
        } else {
          clearInterval(interval)
          return 100
        }
      })
    }, 33)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const digits = Math.floor(loadingValue).toString().split('')
    const oldDigits = Math.floor(loadingValue - 1)
      .toString()
      .split('')

    digits.forEach((digit, index) => {
      const oldDigit = oldDigits[index] || '0'
      const currentDigitRef = digitRefs.current[0][index]
      const newDigitRef = digitRefs.current[1][index]

      if (digit !== oldDigit) {
        gsap.fromTo(
          currentDigitRef,
          { y: '0%' },
          { y: '-100%', duration: 0.5, ease: 'power1.inOut' },
        )
        gsap.fromTo(
          newDigitRef,
          { y: '100%' },
          { y: '0%', duration: 0.5, ease: 'power1.inOut' },
        )
      }
    })

    if (loadingValue >= 100) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
        onComplete: onComplete, // Обновляем состояние загрузки
      })
    }
  }, [loadingValue, onComplete])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
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
        dotsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'circ.inOut' },
        '-=1',
      )
  }, [])

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
        <div ref={dotsRef} className="relative">
          <StarsSSSvg className="absolute top-1/2 transform -translate-y-1/2 w-[100%] -з-[5px]" />
          <SetkaSvg className="absolute top-1/2 transform -translate-y-1/2 w-[100%] -з-[5px]" />
        </div>
        <div
          ref={textRef}
          className="absolute left-0 w-full flex justify-center"
        >
          <div className="text-white text-[32px] font-bold">
            <img
              src={Logo}
              alt=""
              className="w-[54px] h-[60px] absolute -top-20 left-[48%]"
            />
            Brandformance
          </div>
        </div>
      </div>
      <div className={m.container}>
        <div className={m.loadingText}>Загрузка...</div>
        <div className="flex">
          {Math.floor(loadingValue)
            .toString()
            .split('')
            .map((digit, index) => (
              <div key={index} className={m.digitContainer}>
                <div
                  ref={(el) => (digitRefs.current[0][index] = el)}
                  className={m.digit}
                  style={{ position: 'absolute' }}
                >
                  {Math.floor(loadingValue - 1)
                    .toString()
                    .split('')[index] || '0'}
                </div>
                <div
                  ref={(el) => (digitRefs.current[1][index] = el)}
                  className={m.digit}
                >
                  {digit}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
