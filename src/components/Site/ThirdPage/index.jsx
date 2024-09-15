import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import m from './ThirdPage.module.scss'
import bg from './bgLayer.png'

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
    const secondPageText = secondPageTextRef.current

    // Разбиваем текст на слова и оборачиваем каждое слово в span только при монтировании компонента
    if (secondPageText) {
      const words = secondPageText.innerText.split(' ')
      secondPageText.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(' ')

      const wordSpans = secondPageText.querySelectorAll('.word')

      gsap.set(wordSpans, {
        opacity: 0,
        y: 20,
        willChange: 'transform, opacity',
      })

      // Анимация текста
      gsap.to(wordSpans, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: secondPageText,
          start: 'top 80%',
          end: 'top 60%',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative" id="ThirdPage">
      <div id="second-page" className="relative">
        <GradientBGSvg className="absolute top-0 w-full -z-10" />
        <StarsSSSvg className="absolute top-0 w-full h-auto  -z-10" />
        <SetkaSvg className="absolute top-0 w-full -z-10" />

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
                title="Аналитика производительности"
                text="Отслеживайте производительность своей рекламы с помощью подробной аналитики и идей для оптимизации ваших кампаний."
                gifSrc="/ThirdPage/1.gif"
                bgSetka
              />
              <Card
                title="Оптимизация размещения рекламы"
                text="Максимизируйте свою аудиторию и воздействие с помощью стратегий размещения рекламы, основанных на данных, на различных платформах."
                gifSrc="/ThirdPage/2.gif"
                bgSetka
              />
            </div>

            <Card
              title="Видеопроизводство высокого качества"
              text="Создавайте профессиональные видеоролики высокого качества, которые завораживают и превращают зрителей."
              gifSrc="/ThirdPage/3.gif"
              gifcustomClass={'h-full w-full'}
              customClass={'custom-845:h-full h-[400px] justify-between '}
            />

            <div className={`${m.cardSecond} gap-5 justify-between `}>
              <Card
                title="A/B-тестирование"
                text="Тестируйте различные версии рекламы, чтобы найти то, что работает лучше всего."
                gifSrc="/ThirdPage/4.gif"
                bgSetka
                customClass={'h-full justify-between  '}
                customGifClass={'h-[280px] w-full flex'}
              />
              <Card
                title="Целевая реклама"
                text="Достигайте правильной аудитории с помощью точно настроенных видеореклам, основанных на демографии, интересах и онлайн-поведении."
                gifSrc="/ThirdPage/5.gif"
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
const Card = ({
  title,
  text,
  gifSrc,
  customClass,
  bgSetka,
  gifcustomClass,
  customGifClass,
}) => {
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
          {bgSetka && <img src={bg} alt="" />}
          <img
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

// import React, { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
// import m from './ThirdPage.module.scss'
// import bg from './bgLayer.png'
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// gsap.registerPlugin(MotionPathPlugin)
// gsap.registerPlugin(ScrollTrigger)

// function ThirdPage() {
//   const sectionRef = useRef(null)
//   const secondPageTextRef = useRef(null)

//   useEffect(() => {
//     const section = sectionRef.current

//     // Анимация для секции
//     gsap.fromTo(
//       section,
//       { y: 100, opacity: 0, willChange: 'transform, opacity' },
//       {
//         y: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: 'top bottom',
//           end: 'top center',
//           scrub: true,
//         },
//       },
//     )
//   }, [])

//   useEffect(() => {
//     const secondPageText = secondPageTextRef.current

//     // Разбиваем текст на слова и оборачиваем каждое слово в span только при монтировании компонента
//     if (secondPageText) {
//       const words = secondPageText.innerText.split(' ')
//       secondPageText.innerHTML = words
//         .map((word) => `<span class="word">${word}</span>`)
//         .join(' ')

//       const wordSpans = secondPageText.querySelectorAll('.word')

//       gsap.set(wordSpans, {
//         opacity: 0,
//         y: 20,
//         willChange: 'transform, opacity',
//       })

//       // Анимация текста
//       gsap.to(wordSpans, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: 0.1,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: secondPageText,
//           start: 'top 80%',
//           end: 'top 60%',
//           scrub: true,
//         },
//       })
//     }
//   }, [])

//   return (
//     <div ref={sectionRef} className="relative" id="ThirdPage">
//       <div id="second-page" className="relative">
//         <GradientBGSvg className="absolute top-0 w-full -z-10" />
//         <StarsSSSvg className="absolute top-0 w-full h-auto  -z-10" />
//         <SetkaSvg className="absolute top-0 w-full -z-10" />

//         <div className="max-w-[1240px] w-full mx-auto px-4 py-20">
//           <div className="text-center">
//             <p className="text-white text-base font-normal">Особенности</p>
//             <h2
//               ref={secondPageTextRef}
//               className={`text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3 pb-10`}
//             >
//               Почему нас выбирают?
//             </h2>
//           </div>

//           <div
//             className={`${m.cardWrapper} mt-14 h-full flex gap-4 justify-center`}
//           >
//             <div className={`${m.cardFirst} gap-4 justify-between`}>
//               <Card
//                 title="Аналитика производительности"
//                 text="Отслеживайте производительность своей рекламы с помощью подробной аналитики и идей для оптимизации ваших кампаний."
//                 gifSrc="/ThirdPage/1.gif"
//                 bgSetka
//               />
//               <Card
//                 title="Оптимизация размещения рекламы"
//                 text="Максимизируйте свою аудиторию и воздействие с помощью стратегий размещения рекламы, основанных на данных, на различных платформах."
//                 gifSrc="/ThirdPage/2.gif"
//                 bgSetka
//               />
//             </div>

//             <Card
//               title="Видеопроизводство высокого качества"
//               text="Создавайте профессиональные видеоролики высокого качества, которые завораживают и превращают зрителей."
//               gifSrc="/ThirdPage/3.gif"
//               gifcustomClass={'h-full w-full'}
//               customClass={'custom-845:h-full h-[400px] justify-between '}
//             />

//             <div className={`${m.cardSecond} gap-5 justify-between `}>
//               <Card
//                 title="A/B-тестирование"
//                 text="Тестируйте различные версии рекламы, чтобы найти то, что работает лучше всего."
//                 gifSrc="/ThirdPage/4.gif"
//                 bgSetka
//                 customClass={'h-full justify-between  '}
//                 customGifClass={'h-[280px] w-full flex justify-center'}
//               />
//               <Card
//                 title="Целевая реклама"
//                 text="Достигайте правильной аудитории с помощью точно настроенных видеореклам, основанных на демографии, интересах и онлайн-поведении."
//                 gifSrc="/ThirdPage/5.gif"
//                 bgSetka
//                 customClass={'h-full justify-between '}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Добавляем эффекты свечения и блесток при наведении
// const Card = ({
//   title,
//   text,
//   gifSrc,
//   customClass,
//   bgSetka,
//   gifcustomClass,
//   customGifClass,
// }) => {
//   const cardRef = useRef(null)
//   const dotRef = useRef(null)

//   useEffect(() => {
//     const card = cardRef.current
//     const dot = dotRef.current

//     const setupTimeline = () => {
//       const cardWidth = card.offsetWidth
//       const cardHeight = card.offsetHeight
//       const dotSize = 20 // Размер точки

//       // Убедитесь, что анимация сбрасывается перед пересчетом
//       gsap.set(dot, { x: 0, y: 0 })

//       // Анимация движения точки по периметру карточки
//       const timeline = gsap.timeline({ paused: true, repeat: -1 })

//       timeline
//         .set(dot, { x: 0, y: 0 }) // Исходное положение в верхнем левом углу
//         .to(dot, {
//           x: cardWidth - dotSize, // Двигаем вправо по верхней границе с учетом размера точки
//           duration: 1,
//           ease: 'linear',
//         })
//         .to(dot, {
//           y: cardHeight - dotSize, // Двигаем вниз по правой границе с учетом размера точки
//           duration: 1,
//           ease: 'linear',
//         })
//         .to(dot, {
//           x: 0, // Двигаем влево по нижней границе
//           duration: 1,
//           ease: 'linear',
//         })
//         .to(dot, {
//           y: 0, // Двигаем вверх по левой границе
//           duration: 1,
//           ease: 'linear',
//         })

//       card.addEventListener('mouseenter', () => {
//         gsap.to(dot, { opacity: 1, duration: 0.3 }) // Плавно показываем точку
//         timeline.play()
//       })

//       card.addEventListener('mouseleave', () => {
//         gsap.to(dot, { opacity: 0, duration: 0.3 }) // Плавно скрываем точку
//         timeline.pause()
//       })
//     }

//     // Используем requestAnimationFrame для корректного расчета размеров после рендера
//     requestAnimationFrame(setupTimeline)

//     return () => {
//       card.removeEventListener('mouseenter', () => timeline.play())
//       card.removeEventListener('mouseleave', () => timeline.pause())
//     }
//   }, [])

//   return (
//     <div
//       ref={cardRef}
//       style={{
//         background:
//           'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//         border: '0.5px solid rgba(255, 255, 255, 0.1)',
//         boxShadow:
//           'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//         borderRadius: '20px',
//         willChange: 'transform, opacity',
//         position: 'relative', // Добавляем позиционирование
//       }}
//       className={`card w-[400px] lg:w-full p-6 rounded-lg shadow-lg h-auto hover:scale-105 transition delay-150 duration-300 ease-in-out ${customClass}`}
//     >
//       {/* Точка для анимации */}
//       <div
//         ref={dotRef}
//         style={{
//           position: 'absolute',
//           width: '10px',
//           height: '10px',
//           backgroundColor: 'white',
//           borderRadius: '50%',
//           top: 0,
//           left: 0,
//           zIndex: 10,
//         }}
//       ></div>
//       <div
//         className={`flex flex-col h-full items-center text-center ${customClass}`}
//       >
//         <div className={`w-auto h-auto relative ${gifcustomClass}`}>
//           {bgSetka && <img src={bg} alt="" />}
//           <img
//             src={gifSrc}
//             alt={title}
//             className={`absolute top-0 ${customGifClass}`}
//           />
//         </div>
//         <div>
//           <h2 className="text-white text-[22px] font-medium mb-2 mt-5">
//             {title}
//           </h2>
//           <p className="text-slate-500 text-sm leading-[16.80px]">{text}</p>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default ThirdPage
