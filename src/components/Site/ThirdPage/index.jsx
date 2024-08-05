import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import m from './ThirdPage.module.scss'
import bg from './bgLayer.png'
function ThirdPage() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const phoneRef = useRef(null)
  const secondPageTextRef = useRef(null)

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

  useEffect(() => {
    const secondPageText = secondPageTextRef.current

    // Разбиваем текст на слова и оборачиваем каждое слово в span
    const words = secondPageText.innerText.split(' ')
    secondPageText.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')

    const wordSpans = secondPageText.querySelectorAll('.word')

    gsap.set(wordSpans, { opacity: 0, y: 20 })

    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: secondPageText,
        start: 'top 80%', // Начало анимации, когда элемент достигает 80% от верхней части экрана
        end: 'top 60%', // Завершение анимации, когда элемент достигает 60% от верхней части экрана
        scrub: true, // Анимация будет "привязана" к прокрутке
      },
    })
  }, [])

  return (
    <div ref={sectionRef} className="relative  ">
      <div id="second-page" className="relative ">
        <GradientBGSvg className="absolute top-0 w-full -z-10" />
        <StarsSSSvg className="absolute top-0 w-full -z-10" />
        <SetkaSvg className="absolute top-0 w-full -z-10" />

        <div className="max-w-[1240px]  w-full mx-auto px-4 py-20">
          {/* <div className="text-center">
            <p className="text-white text-base font-normal">Особенности</p>
            <h2 className="text-[30px] md:text-[40px] lg:text-[50px] text-white flex justify-center text-center">
              Почему нас выбирают?
            </h2>
          </div> */}
          <div className="text-center">
            <p className="text-white text-base font-normal">Особенности</p>

            <h2
              ref={secondPageTextRef}
              className={`text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3  pb-10 `}
            >
              Почему нас выбирают?
            </h2>
          </div>
          <div
            className={`${m.cardWrapper} mt-14 h-full flex gap-4 justify-center `}
          >
            <div className={`${m.cardFirst} gap-4 justify-between`}>
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className={` w-[400px] lg:w-full  p-6 rounded-lg shadow-lg px-7 h-fit	`}
              >
                <div className="flex flex-col items-center ">
                  <div className="w-auto h-auto relative ">
                    <img src={bg} alt="" />
                    <img
                      src="/ThirdPage/1.gif"
                      alt="Example GIF"
                      className="absolute top-0"
                    />
                  </div>
                  <h2 className="text-white text-[22px] font-medium mb-2 mt-5 ">
                    Аналитика производительности
                  </h2>
                  <p className="text-slate-500 text-sm leading-[16.80px]">
                    Отслеживайте производительность своей рекламы с помощью
                    подробной аналитики и идей для оптимизации ваших кампаний.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className={` w-[400px] lg:w-full  p-6 rounded-lg shadow-lg h-full`}
              >
                <div className="flex flex-col justify-between">
                  <div className="w-auto h-auto relative ">
                    <img src={bg} alt="" />
                    <img
                      src="/ThirdPage/2.gif"
                      alt="Example GIF"
                      className="absolute top-0"
                    />
                  </div>
                  <div>
                    <h2 className="text-white text-[22px] font-medium mb-2 ">
                      Оптимизация размещения рекламы
                    </h2>
                    <p className="text-slate-500 text-sm leading-[16.80px]">
                      Максимизируйте свою аудиторию и воздействие с помощью
                      стратегий размещения рекламы, основанных на данных, на
                      различных платформах.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                borderRadius: '20px',
              }}
              className={` max-w-[400px] w-full    p-6 rounded-lg shadow-lg h-auto`}
            >
              <div className="flex flex-col items-center text-center justify-start h-full">
                <div className="w-auto h-[400px] relative ">
                  <img src="/ThirdPage/3.gif" alt="Example GIF" className="" />
                </div>

                <div>
                  <h2 className="text-white text-[22px] font-medium mb-2 ">
                    Видеопроизводство высокого качества
                  </h2>
                  <p className="text-slate-500 text-sm leading-[16.80px]">
                    Создавайте профессиональные видеоролики высокого качества,
                    которые завораживают и превращают зрителей.
                  </p>
                </div>
              </div>
            </div>
            {/* flex  lg:flex-col  */}
            <div className={`${m.cardSecond} gap-5 justify-between`}>
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className={`  w-[400px] lg:w-full p-6 rounded-lg shadow-lg lg:h-full h-[400px]`}
              >
                <div className="flex flex-col items-center h-full justify-between">
                  <div className="w-auto h-auto relative ">
                    <img src={bg} alt="" />
                    <img
                      src="/ThirdPage/4.gif"
                      alt="Example GIF"
                      className="absolute top-0"
                    />
                  </div>
                  <div>
                    <h2 className="text-white text-[22px] font-medium mb-2 ">
                      A/B-тестирование
                    </h2>
                    <p className="text-slate-500 text-sm leading-[16.80px]">
                      Тестируйте различные версии рекламы, чтобы найти то, что
                      работает лучше всего.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className={` w-[400px] lg:w-full p-6 rounded-lg shadow-lg h-auto`}
              >
                <div className="flex flex-col justify-between items-center h-full">
                  <div className="w-auto h-auto relative ">
                    <img src={bg} alt="" />
                    <img
                      src="/ThirdPage/5.gif"
                      alt="Example GIF"
                      className="absolute top-0"
                    />
                  </div>
                  <div>
                    <h2 className="text-white text-[22px] font-medium mb-2 ">
                      Целевая реклама
                    </h2>
                    <p className="text-slate-500 text-sm leading-[16.80px]">
                      Достигайте правильной аудитории с помощью точно
                      настроенных видеореклам, основанных на демографии,
                      интересах и онлайн-поведении.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdPage
