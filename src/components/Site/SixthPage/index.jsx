import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'tailwindcss/tailwind.css'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'

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

    elements.forEach((element, index) => {
      const description = element.querySelector('.description')
      const progressBar = element.querySelector('.progress-bar')

      gsap.set(progressBar, { height: 0 })

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      })

      gsap.to(description, {
        opacity: 1,
        height: 'auto',
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(description, {
        opacity: 1,
        height: 'auto',
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })
      gsap.to(progressBar, {
        height: '100%',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 10%',
          scrub: true,
        },
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="relative h-full">
      <GradientBGSvg className="absolute top-0 w-full h-full -z-10" />
      <StarsSSSvg className="absolute top-0 w-full  h-full -z-10" />
      <SetkaSvg className="absolute top-0 w-full h-full -z-10" />
      <div
        className="max-w-[1240px] w-full mx-auto px-4 flex  justify-center xl:justify-between flex-wrap xl:flex-nowrap  py-28 
"
      >
        <div className="text-center xl:text-start w-full xl:w-1/2 ">
          {/* FAQ
          <p className="text-white text-base font-normal">FAQ</p>
          <h2 className="text-white text-[60px] pt-10  pb-16">
            Часто задаваемые вопросы?{' '}
          </h2> */}
          <p className="text-white text-base font-normal">FAQ</p>

          <h2
            className={`text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3  pb-10 `}
          >
            Часто задаваемые вопросы?{' '}
          </h2>

          <div className="w-[230px]	 h-[50px] px-[30px] py-[15px] bg-gradient-to-b from-black to-white rounded-[500px] shadow-inner border border-white/opacity-10 backdrop-blur-md justify-center items-center gap-2.5 inline-flex">
            <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">
              Узнать больше{' '}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center  items-center gap-12  w-full lg:w-[600px]   pt-10 xl:pt-0 ">
          {items.map((item, index) => (
            <div
              key={index}
              className="item flex flex-col items-center text-white containerCart relative  "
            >
              <div className="flex gap-5 ">
                {' '}
                <div className="bg-[#ffffff26] h-[105px] border border-[#ffffff24]   w-1.5 rounded-md">
                  <div className="progress-bar absolute top-0 left-0 w-1.5 bg-white rounded-md"></div>
                </div>
                <div className="flex flex-col justify-between   w-[330px]">
                  <h2 className="text-xl ">{item.title}</h2>
                  <p className="description opacity-0 h-0 overflow-hidden ">
                    {item.description}
                  </p>
                </div>
                <div className="w-[190px] h-[100px] border flex items-center rounded-[10px] justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="image w-[180px] h-[90px] object-cover"
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
