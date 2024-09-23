import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import m from './ThirdPage.module.scss'
import bg from './bgLayer.png'

import svg1 from '../../../assets/Site/ThirdPage/1.webp'
import svg2 from '../../../assets/Site/ThirdPage/2.webp'
import svg3 from '../../../assets/Site/ThirdPage/3.webp'
import svg4 from '../../../assets/Site/ThirdPage/4.webp'
import svg5 from '../../../assets/Site/ThirdPage/5.webp'

gsap.registerPlugin(ScrollTrigger)

function ThirdPage() {
  const sectionRef = useRef(null)
  const secondPageTextRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    // Анимация для секции
    gsap.fromTo(
      section,
      { y: 100, opacity: 0, willChange: 'transform, opacity' },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      },
    )
  }, [])

  useEffect(() => {
    gsap.from(secondPageTextRef.current, {
      opacity: 0, // Начальная прозрачность
      y: 50, // Начальная позиция (снизу)
      duration: 1.5, // Длительность анимации
      ease: 'power3.out', // Тип анимации
    })
  }, [])

  return (
    <div ref={sectionRef} className="relative" id="ThirdPage">
      <div id="second-page" className="relative">
        <GradientBGSvg className="absolute top-0 w-full h-full -z-10" />
        <StarsSSSvg className="absolute top-0 w-full h-full -z-10" />
        <SetkaSvg className="absolute top-0 w-full h-full -z-10" />

        <div className="max-w-[1240px] w-full mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-white text-base font-normal">Особенности</p>
            <h2
              ref={secondPageTextRef}
              className={`text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3 pb-10`}
            >
              Почему нас выбирают?
            </h2>
          </div>

          <div
            className={`${m.cardWrapper} mt-14 h-full flex gap-4 justify-center`}
          >
            <div className={`${m.cardFirst} gap-4 justify-between`}>
              <Card
                ref={secondPageTextRef}
                title="Аналитика производительности"
                text="Отслеживайте производительность своей рекламы с помощью подробной аналитики и идей для оптимизации ваших кампаний."
                gifSrc={svg1}
                bgSetka
              />
              <Card
                ref={secondPageTextRef}
                title="Оптимизация размещения рекламы"
                text="Максимизируйте свою аудиторию и воздействие с помощью стратегий размещения рекламы, основанных на данных, на различных платформах."
                gifSrc={svg2}
                bgSetka
              />
            </div>

            <Card
              ref={secondPageTextRef}
              title="Видеопроизводство высокого качества"
              text="Создавайте профессиональные видеоролики высокого качества, которые завораживают и превращают зрителей."
              gifSrc={svg3}
              gifcustomClass={'h-full w-full'}
              customClass={'custom-845:h-full h-[400px] justify-between '}
            />

            <div className={`${m.cardSecond} gap-5 justify-between `}>
              <Card
                ref={secondPageTextRef}
                title="A/B-тестирование"
                text="Тестируйте различные версии рекламы, чтобы найти то, что работает лучше всего."
                gifSrc={svg4}
                bgSetka
                customClass={'h-full justify-between  '}
                customGifClass={'h-[280px] w-full flex'}
              />
              <Card
                ref={secondPageTextRef}
                title="Целевая реклама"
                text="Достигайте правильной аудитории с помощью точно настроенных видеореклам, основанных на демографии, интересах и онлайн-поведении."
                gifSrc={svg5}
                bgSetka
                customClass={'h-full justify-between '}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Добавляем эффекты свечения и блесток при наведении
const Card = (
  { title, text, gifSrc, customClass, bgSetka, gifcustomClass, customGifClass },
  ref,
) => {
  const cardRef = useRef(null)
  const sparkleRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const sparkles = sparkleRef.current

    // Анимация при наведении
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      gsap.to(sparkles, {
        x: clientX - card.getBoundingClientRect().left,
        y: clientY - card.getBoundingClientRect().top,
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(sparkles, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        background:
          'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
        border: '0.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow:
          'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
        borderRadius: '20px',
        willChange: 'transform, opacity',
      }}
      className={`${m.cardWrapper} w-[400px] lg:w-full p-6 rounded-lg shadow-lg h-auto hover:scale-105 	transition delay-150 duration-300 ease-in-out	 ${customClass}`}
    >
      <div
        className={`flex flex-col h-full items-center text-center ${customClass}`}
      >
        <div ref={sparkleRef} className={m.sparkles} />
        <div className={`w-auto h-auto relative ${gifcustomClass}`}>
          {bgSetka && <img loading="lazy" src={bg} alt="" />}
          <img
            loading="lazy"
            src={gifSrc}
            alt={title}
            className={`absolute top-0 ${customGifClass}`}
          />
        </div>
        <div>
          <h2 className="text-white text-[22px] font-medium mb-2 mt-5">
            {title}
          </h2>
          <p className="text-slate-500 text-sm leading-[16.80px]">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default ThirdPage
