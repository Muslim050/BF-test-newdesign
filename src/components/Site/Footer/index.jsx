import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GradientBGSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import imageBranformance from './brandformance.png'
// import Logo from '/Logo.png'

function Footer() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const phoneRef = useRef(null)

  useEffect(() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 })
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 })
    gsap.from(descriptionRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 1,
    })
    gsap.from(phoneRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 })
  }, [])

  return (
    <div className="relative ">
      <GradientBGSvg className="absolute top-0 w-full -z-10 h-full" />
      <StarsSSSvg className="absolute top-0 w-full -z-10 h-full" />
      <div className="max-w-[1240px] w-full mx-auto px-4 pt-28 pb-10 text-white">
        <div className=" flex justify-between flex-wrap gap-7">
          <div className="text-base text-[#ffffffbf] w-[250px]">
            <div className="text-lg	font-bold flex gap-3 items-center">
              <img src={Logo} className="w-[27px] h-[30px]" alt="" />{' '}
              Brandformance
            </div>
            <div className="mt-5">
              Реклама, которая увеличивает ценность вашего бренда
            </div>
          </div>

          <div className="text-base text-[#ffffffbf] w-[250px] flex flex-col justify-start gap-4">
            <div>Технологии</div>
            <div>Форматы рекламы</div>
          </div>

          <div className="text-base text-[#ffffffbf] w-[250px] flex flex-col justify-start gap-4">
            <div>Работы</div>
            <div>Партнеры</div>
            <div>Новости</div>
          </div>

          <div className="text-base text-[#ffffffbf] w-[250px] flex flex-col justify-start gap-4">
            {' '}
            <div>adtechmediainfo@gmail.com</div>
            <div>998 50 570 57 57</div>{' '}
            <div>Tashkent, st. Mustaqillik 88A, BC “Darkhan”</div>
          </div>
        </div>
        <div className="flex justify-center pb-10 pt-28">
          <img src={imageBranformance} alt="" />
        </div>

        <div className="flex justify-center md:justify-between">
          <div className="text-base text-[#ffffff78] ">2024 Brandformance</div>
          <div className="text-base text-[#ffffff78] hidden md:block">
            Все права защищены
          </div>
          <div className="text-base text-[#ffffff78] hidden md:block">
            Политика конфиденциальности
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
