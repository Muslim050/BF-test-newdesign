import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'tailwindcss/tailwind.css'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import Blestki from './Blestki.svg'
gsap.registerPlugin(ScrollTrigger)
const items = [
  {
    title: 'Какие услуги предлагает Brandformance?',
    description:
      'Подробное описание предоставляемых услуг в области маркетинга и брендинга. 1',
    image: '/SixthPage/1.png',
  },
  {
    title: 'Как Brandformance может помочь моему бизнесу вырасти?',
    description:
      'Подробное описание предоставляемых услуг в области маркетинга и брендинга. 2',
    image: '/SixthPage/2.png',
  },
  {
    title: 'В каких отраслях вы специализируетесь?',
    description:
      'Подробное описание предоставляемых услуг в области маркетинга и брендинга. 3',
    image: '/SixthPage/3.png',
  },
  {
    title: 'Как начать работу с Brandformance?',
    description:
      'Подробное описание предоставляемых услуг в области маркетинга и брендинга. 4',
    image: '/SixthPage/4.png',
  },
  {
    title: 'Каков типичный график проекта?',
    description:
      'Подробное описание предоставляемых услуг в области маркетинга и брендинга. 5',
    image: '/SixthPage/5.png',
  },
]

const SixthPage = () => {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    const elements = container.querySelectorAll('.containerCart')

    gsap.set(elements, { opacity: 0, y: 50 })

    elements.forEach((element) => {
      const description = element.querySelector('.description')
      const progressBar = element.querySelector('.progress-bar')

      gsap.set(progressBar, { height: 0 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        })
        .to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
        })
        .to(description, {
          opacity: 1,
          height: 'auto',
          duration: 1,
        })
        .to(progressBar, {
          height: '100%',
          duration: 1,
        })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-full">
      <GradientBGSvg className="absolute top-0 w-full h-full -z-10" />
      <StarsSSSvg className="absolute top-0 w-full  h-auto -z-10" />
      <SetkaSvg className="absolute top-0 w-full h-full -z-10" />
      <div
        className="max-w-[1240px] w-full mx-auto px-4 flex  justify-center xl:justify-between flex-wrap xl:flex-nowrap  py-28 
"
      >
        <div className="text-center xl:text-start w-full xl:w-1/2 ">
          <p className="text-white text-base font-normal">FAQ</p>

          <h2
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
            className={`text-[35px] md:text-[40px] lg:text-[60px] pt-3 pb-10  custom-845:pb-20 `}
          >
            Часто задаваемые вопросы?{' '}
          </h2>
        </div>
        <div className="flex flex-col justify-center  items-center gap-12  w-auto lg:w-[600px]   pt-10 xl:pt-0 ">
          {items.map((item, index) => (
            <div
              key={index}
              className="item flex flex-col items-center text-white containerCart relative md:w-full w-auto "
            >
              <div className=" flex gap-5 w-full ">
                {' '}
                <div className="relative bg-[#ffffff26] h-[105px] border border-[#ffffff24]   w-1.5 rounded-md">
                  <div
                    className=" progress-bar absolute top-0 left-0 w-1.5 rounded-md "
                    style={{
                      background:
                        'linear-gradient(0deg, #BACFF7, #BACFF7), rgba(2, 3, 8, 0.8)',
                    }}
                  >
                    {' '}
                  </div>
                </div>
                <img
                  src={Blestki}
                  alt=""
                  className="absolute h-auto w-auto z-20 -top-4 -left-[10.5px]"
                />
                <div className="flex flex-col justify-between   md:w-[330px] w-full ">
                  <h2 className="text-xl ">{item.title}</h2>
                  <p className="description opacity-0 h-0 overflow-hidden ">
                    {item.description}
                  </p>
                </div>
                <div
                  className="md:w-[190px] w-full h-[100px]  flex items-center rounded-[10px] justify-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                    boxShadow:
                      'inset 0px 1.65868px 1.65868px rgba(216, 236, 248, 0.3), inset 0px 39.8082px 79.6164px rgba(168, 216, 245, 0.06)',
                    borderRadius: '10px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="image md:w-[180px] w-full h-[90px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SixthPage
