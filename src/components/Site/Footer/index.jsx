import { GradientBGSvg, StarsSSSvg, SetkaSvg } from '@/assets/Site/site-svg.jsx'
import imageBranformance from './brandformance.png'
import Logo from '../../../assets/Logo.png'
import React, { useRef } from 'react'
import gsap from 'gsap'
import m from './Footer.module.scss'
function Footer() {
  const phoneRightCart = useRef(null)
  const phoneLeftCart = useRef(null)
  React.useEffect(() => {
    if (phoneLeftCart.current && phoneRightCart.current) {
      gsap.fromTo(
        phoneLeftCart.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneLeftCart.current,
            start: 'top center+=500',
            scrub: true,
          },
        },
      )
    }
  }, [])

  const cardRef = useRef(null)
  const sparkleRef = useRef(null)
  const setkaRef = useRef(null)

  React.useEffect(() => {
    const card = cardRef.current
    const sparkles = sparkleRef.current
    const setka = setkaRef.current

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      const cardRect = card.getBoundingClientRect()
      const x = clientX - cardRect.left
      const y = clientY - cardRect.top

      // Обновляем положение и видимость свечения
      gsap.to(sparkles, {
        x: x - sparkles.offsetWidth / 2, // Центрируем по оси X
        y: y - sparkles.offsetHeight / 2, // Центрируем по оси Y
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      })
      gsap.to(setka, {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(sparkles, {
        opacity: 0, // Скроем свечение при уходе
        duration: 0.3,
        ease: 'power3.out',
      })

      // Скрываем SetkaSvg при уходе мыши
      gsap.to(setka, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    // Навешиваем обработчики событий
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  return (
    <div className="relative " id="contact">
      <GradientBGSvg className="absolute top-0 w-full -z-10 h-full" />
      <StarsSSSvg className="absolute top-0 w-full -z-10 h-full" />

      <div className="max-w-[1240px] w-full mx-auto px-4 pt-28 pb-10 text-white">
        <div
          className=" flex justify-between flex-wrap gap-7"
          ref={phoneLeftCart}
        >
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
            <a href="#ThirdPage">Технология</a>

            <a href="#second-page">Форматы рекламы</a>
          </div>

          <div className="text-base text-[#ffffffbf] w-[250px] flex flex-col justify-start gap-4">
            <a href="#FifthPage">Размещения</a>
            {/* <div ref={addToRightMenuRefs} className="header_button">
              Новости
            </div> */}
            <a href="#FourthPageP">Партнеры</a>
            <a href="#contact">Контакты</a>
          </div>

          <div className="text-base text-[#ffffffbf] w-[250px] flex flex-col justify-start gap-4">
            {' '}
            <div>adtechmediainfo@gmail.com</div>
            <div>998 50 570 57 57</div>{' '}
            <div>Tashkent, st. Mustaqillik 88A, BC “Darkhan”</div>
          </div>
        </div>

        <div ref={cardRef}>
          <div ref={sparkleRef}>
            <div
              className="flex justify-center pb-10 pt-28"
              ref={phoneRightCart}
            >
              <img src={imageBranformance} alt="" />
            </div>
          </div>
        </div>

        <div ref={sparkleRef} className={m.sparkles} />
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
