import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import bg from './1.png'
import m from './FifthPage.module.scss'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import fImage from '@/assets/Site/FirstPage/1.png'
import { ArrowUp } from 'lucide-react'
import { ArrowDown } from 'lucide-react'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'
gsap.registerPlugin(ScrollTrigger)

import bg1 from './11.png'
import bg2 from './222.png'
import bg3 from './333.png'
import bgLayer from './bgLayer.png'
import PageTitle from '../module/PageTitle'

gsap.registerPlugin(ScrollTrigger)
const sliderData = [
  { id: 1, image: fImage, title: 'Video1', subtitle: 'subVideo1' },
  { id: 2, image: fImage, title: 'Video2', subtitle: 'subVideo2' },
  { id: 3, image: fImage, title: 'Video3', subtitle: 'subVideo3' },
  { id: 4, image: fImage, title: 'Video4', subtitle: 'subVideo4' },
  { id: 5, image: fImage, title: 'Video5', subtitle: 'subVideo5' },
  { id: 6, image: fImage, title: 'Video6', subtitle: 'subVideo6' },
  { id: 7, image: fImage, title: 'Video7', subtitle: 'subVideo7' },
  { id: 8, image: fImage, title: 'Video8', subtitle: 'subVideo8' },
]
function FifthPage() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const swiperRef = useRef()

  //section2
  const sectionMainTitle = useRef(null)

  //section2

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-100vw',
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '1000 top',
          scrub: 0.6,
          pin: true,
        },
      },
    )
    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill()
    }
  }, [])

  //section2
  useEffect(() => {
    gsap.from(sectionMainTitle.current, {
      scrollTrigger: {
        trigger: sectionMainTitle.current,
        start: 'left center', // Начало анимации, когда элемент достигнет середины экрана по горизонтали
        end: 'right center', // Конец анимации
        scrub: true,
        // markers: true, // Включите, если хотите видеть маркеры для отладки
        // horizontal: true, // Указываем, что скролл горизонтальный
      },
      duration: 1,
      opacity: 0,
      x: -50, // Смещение по горизонтали
    })
    // gsap.from(section2Title.current, { duration: 1, opacity: 0, y: -50 })
    // gsap.from(section2Subtitle.current, { duration: 1, opacity: 0, y: -50 })
  }, [])
  //section2

  return (
    <section className="overflow-hidden ">
      <div ref={triggerRef} className="horizontal-scroll-container">
        <div ref={sectionRef} className="flex">
          <div className="scroll-section flex-shrink-0 w-screen">
            <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
            <StarsSSSvg className="absolute top-0 w-[100%] -z-[5px]" />
            <SetkaSvg className="absolute top-0 w-[100%] -z-[5px]" />

            <div className="relative  flex-col justify-between  py-20	 h-screen max-w-[900px] w-full m-auto overflow-hidden">
              <div className="text-center">
                <p className="text-white text-base font-normal">Особенности</p>
                <h2 className="text-white text-[35px] md:text-[40px] lg:text-[60px]  pt-5">
                  Реклама которую Увидели Миллионы Людей
                </h2>
              </div>
              <div className="absolute w-[800px] lg:w-[1200px] top-[240px] lg:top-auto -left-[75px] lg:left-[-30%] z-10">
                <img className="  h-full" draggable="false" src={bg} alt="" />
              </div>

              <Swiper
                direction={'vertical'}
                centeredSlides={true}
                modules={[Navigation]}
                navigation={true}
                loop={true}
                slidesPerView={3}
                effect={'fade'}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 5,
                  slideShadows: false,
                }}
                spaceBetween={150}
                className="mySwiperFifth"
                onSlideChangeTransitionStart={(swiper) => {
                  const slides = swiper.slides
                  slides.forEach((slide, index) => {
                    slide.classList.remove(
                      'swiper-slide-prev',
                      'swiper-slide-next',
                      'swiper-slide-active',
                    )
                    if (index === swiper.activeIndex) {
                      slide.classList.add('swiper-slide-active')
                    } else if (
                      index === swiper.activeIndex - 1 ||
                      (swiper.activeIndex === 0 && index === slides.length - 1)
                    ) {
                      slide.classList.add('swiper-slide-prev')
                    } else if (
                      index === swiper.activeIndex + 1 ||
                      (swiper.activeIndex === slides.length - 1 && index === 0)
                    ) {
                      slide.classList.add('swiper-slide-next')
                    }
                  })
                }}
              >
                {sliderData.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative rounded-[35px] lg:rounded-[60px] left-0 ">
                      <div className="w-[550px] lg:w-[750px] h-[250px] lg:h-[360px]  flex items-center justify-center flex-col slideFifth border-0 mx-auto">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="rounded-[35px] lg:rounded-[60px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <div className="absolute z-10 block gap-1 top-1/2 w-[190px] right-0">
                <button
                  style={{
                    background:
                      'linear-gradient(180.4deg, rgba(2, 3, 8, 0) -44.34%, rgba(255, 255, 255, 0.15) 99.65%)',
                    boxShadow:
                      'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(6px)',
                  }}
                  onClick={() => swiperRef.current?.slidePrev()}
                  className={`h-[55px] w-[55px]  bg-[#020308] rounded-full flex items-center justify-center`}
                >
                  <ArrowUp className="text-white " />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className={`h-[55px] w-[55px]  bg-[#020308] rounded-full flex items-center justify-center`}
                >
                  <ArrowDown className="text-white" />
                </button>
              </div> */}
            </div>
          </div>

          <div className="scroll-section2 flex-shrink-0 w-screen overflow-hidden">
            <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
            <StarsSSSvg className="absolute top-0 w-[100%] -z-[5px]" />
            <SetkaSvg className="absolute top-0 w-[100%] -z-[5px]" />

            <div className=" relative	max-w-[1240px] w-full m-auto pt-20 px-5">
              <div
                ref={sectionMainTitle}
                className="text-center flex flex-col w-full justify-center "
              >
                <PageTitle
                  topTitle={'Statistics'}
                  title={'    300 Million Users Every Month '}
                />
              </div>

              <div
                className={` h-full flex-wrap flex  gap-5 justify-center max-w-[1240px] w-full m-auto px-5`}
              >
                <div className="flex flex-col  justify-between gap-5">
                  <div
                    style={{
                      background:
                        ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                      boxShadow:
                        'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                      borderRadius: '20px',
                    }}
                    className={`  p-6 rounded-[20px] shadow-lg px-7 w-[400px] h-[400px]	`}
                  >
                    <div className="flex flex-col items-center ">
                      <div className="w-full h-[280px] relative ">
                        <img
                          src="/FifthPage/1.gif"
                          alt="Example GIF"
                          className="absolute top-0 h-auto w-full"
                        />
                      </div>
                      <h2 className="text-white text-[40px] font-medium mb-2 ">
                        15 миллионов
                      </h2>
                      <p className="text-[#6D768F] text-sm	">
                        Уникальные зрители
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                      boxShadow:
                        'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                      borderRadius: '20px',
                    }}
                    className={`p-6 rounded-[20px] shadow-lg 	w-[400px] h-[200px]`}
                  >
                    <div className="flex flex-col items-center ">
                      <h2 className="text-white text-[40px] font-medium  ">
                        ... которые фактически видят вашу рекламу
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5 justify-between">
                  <div
                    style={{
                      background:
                        ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                      boxShadow:
                        'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                      borderRadius: '20px',
                    }}
                    className={` p-6 rounded-[20px] shadow-lg w-[400px] h-[300px]`}
                  >
                    <div className="flex flex-col items-center ">
                      <div className="w-full h-[180px] relative ">
                        <img
                          src="/FifthPage/3.gif"
                          alt="Example GIF"
                          className="absolute top-0 h-auto w-full"
                        />
                      </div>
                      <h2 className="text-white text-[40px] font-medium mb-2 ">
                        300 миллионов
                      </h2>
                      <p className="text-[#6D768F] text-sm	">
                        Ежемесячные зрители
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                      boxShadow:
                        'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                      borderRadius: '20px',
                    }}
                    className={` bg-[#BACFF7] bg-opacity-20 p-6 rounded-[20px] shadow-lg h-[300px] w-[400px]`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-full h-[180px] relative ">
                        <img
                          src="/FifthPage/4.gif"
                          alt="Example GIF"
                          className="absolute top-0 h-auto w-full"
                        />
                      </div>
                      <h2 className="text-white text-[40px] font-medium mb-2 ">
                        18-44
                      </h2>
                      <p className="text-[#6D768F] text-sm	">Возраст зрителей</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FifthPage

// import React, { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
// import bg from './1.png'
// import m from './FifthPage.module.scss'
// // Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/pagination'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import fImage from '@/assets/Site/FirstPage/1.png'
// import { ArrowUp } from 'lucide-react'
// import { ArrowDown } from 'lucide-react'

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules'
// gsap.registerPlugin(ScrollTrigger)

// import bg1 from './11.png'
// import bg2 from './222.png'
// import bg3 from './333.png'
// import bgLayer from './bgLayer.png'
// import PageTitle from '../module/PageTitle'

// gsap.registerPlugin(ScrollTrigger)
// const sliderData = [
//   { id: 1, image: fImage, title: 'Video1', subtitle: 'subVideo1' },
//   { id: 2, image: fImage, title: 'Video2', subtitle: 'subVideo2' },
//   { id: 3, image: fImage, title: 'Video3', subtitle: 'subVideo3' },
//   { id: 4, image: fImage, title: 'Video4', subtitle: 'subVideo4' },
//   { id: 5, image: fImage, title: 'Video5', subtitle: 'subVideo5' },
//   { id: 6, image: fImage, title: 'Video6', subtitle: 'subVideo6' },
//   { id: 7, image: fImage, title: 'Video7', subtitle: 'subVideo7' },
//   { id: 8, image: fImage, title: 'Video8', subtitle: 'subVideo8' },
// ]
// function FifthPage() {
//   const sectionRef = useRef(null)
//   const triggerRef = useRef(null)
//   const swiperRef = useRef()

//   //section2
//   const sectionMainTitle = useRef(null)

//   //section2

//   useEffect(() => {
//     const pin = gsap.fromTo(
//       sectionRef.current,
//       {
//         translateX: 0,
//       },
//       {
//         translateX: '-100vw',
//         ease: 'none',
//         duration: 1,
//         scrollTrigger: {
//           trigger: triggerRef.current,
//           start: 'top top',
//           end: '1000 top',
//           scrub: 0.6,
//           pin: true,
//         },
//       },
//     )
//     return () => {
//       {
//         /* A return function for killing the animation on component unmount */
//       }
//       pin.kill()
//     }
//   }, [])

//   //section2
//   useEffect(() => {
//     gsap.from(sectionMainTitle.current, {
//       scrollTrigger: {
//         trigger: sectionMainTitle.current,
//         start: 'left center', // Начало анимации, когда элемент достигнет середины экрана по горизонтали
//         end: 'right center', // Конец анимации
//         scrub: true,
//         // markers: true, // Включите, если хотите видеть маркеры для отладки
//         // horizontal: true, // Указываем, что скролл горизонтальный
//       },
//       duration: 1,
//       opacity: 0,
//       x: -50, // Смещение по горизонтали
//     })
//     // gsap.from(section2Title.current, { duration: 1, opacity: 0, y: -50 })
//     // gsap.from(section2Subtitle.current, { duration: 1, opacity: 0, y: -50 })
//   }, [])
//   //section2

//   return (
//     <section className="overflow-hidden ">
//       <div ref={triggerRef} className="horizontal-scroll-container">
//         <div ref={sectionRef} className="flex">
//           <div className="scroll-section flex-shrink-0 w-screen">
//             <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
//             <StarsSSSvg className="absolute top-0 w-[100%] -z-[5px]" />
//             <SetkaSvg className="absolute top-0 w-[100%] -z-[5px]" />

//             <div className="relative  flex-col justify-between  py-20	 h-screen max-w-[900px] w-full m-auto overflow-hidden">
//               <div className="text-center">
//                 <p className="text-white text-base font-normal">Особенности</p>
//                 <h2 className="text-white text-[35px] md:text-[40px] lg:text-[60px]  pt-5">
//                   Реклама которую Увидели Миллионы Людей
//                 </h2>
//               </div>
//               <div className="absolute w-[800px] lg:w-[1200px] top-[240px] lg:top-auto -left-[75px] lg:left-[-30%] z-10">
//                 <img className="  h-full" draggable="false" src={bg} alt="" />
//               </div>

//               <Swiper
//                 direction={'vertical'}
//                 centeredSlides={true}
//                 modules={[Navigation]}
//                 navigation={true}
//                 loop={true}
//                 slidesPerView={3}
//                 effect={'fade'}
//                 onBeforeInit={(swiper) => {
//                   swiperRef.current = swiper
//                 }}
//                 coverflowEffect={{
//                   rotate: 0,
//                   stretch: 0,
//                   depth: 100,
//                   modifier: 5,
//                   slideShadows: false,
//                 }}
//                 spaceBetween={0}
//                 className="mySwiperFifth"
//                 onSlideChangeTransitionStart={(swiper) => {
//                   const slides = swiper.slides
//                   slides.forEach((slide, index) => {
//                     slide.classList.remove(
//                       'swiper-slide-prev',
//                       'swiper-slide-next',
//                       'swiper-slide-active',
//                     )
//                     if (index === swiper.activeIndex) {
//                       slide.classList.add('swiper-slide-active')
//                     } else if (
//                       index === swiper.activeIndex - 1 ||
//                       (swiper.activeIndex === 0 && index === slides.length - 1)
//                     ) {
//                       slide.classList.add('swiper-slide-prev')
//                     } else if (
//                       index === swiper.activeIndex + 1 ||
//                       (swiper.activeIndex === slides.length - 1 && index === 0)
//                     ) {
//                       slide.classList.add('swiper-slide-next')
//                     }
//                   })
//                 }}
//               >
//                 {sliderData.map((slide) => (
//                   <SwiperSlide key={slide.id}>
//                     <div className="relative rounded-[35px] lg:rounded-[60px] left-0 ">
//                       <div className="w-[550px] lg:w-[750px] h-[250px] lg:h-[360px]  flex items-center justify-center flex-col slideFifth border-0 mx-auto">
//                         <img
//                           src={slide.image}
//                           alt={slide.title}
//                           className="rounded-[60px]"
//                         />
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               {/* <div className="absolute z-10 block gap-1 top-1/2 w-[190px] right-0">
//                 <button
//                   style={{
//                     background:
//                       'linear-gradient(180.4deg, rgba(2, 3, 8, 0) -44.34%, rgba(255, 255, 255, 0.15) 99.65%)',
//                     boxShadow:
//                       'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
//                     backdropFilter: 'blur(6px)',
//                   }}
//                   onClick={() => swiperRef.current?.slidePrev()}
//                   className={`h-[55px] w-[55px]  bg-[#020308] rounded-full flex items-center justify-center`}
//                 >
//                   <ArrowUp className="text-white " />
//                 </button>
//                 <button
//                   onClick={() => swiperRef.current?.slideNext()}
//                   className={`h-[55px] w-[55px]  bg-[#020308] rounded-full flex items-center justify-center`}
//                 >
//                   <ArrowDown className="text-white" />
//                 </button>
//               </div> */}
//             </div>
//           </div>

//           <div className="scroll-section2 flex-shrink-0 w-screen overflow-hidden">
//             <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
//             <StarsSSSvg className="absolute top-0 w-[100%] -z-[5px]" />
//             <SetkaSvg className="absolute top-0 w-[100%] -z-[5px]" />

//             <div className=" relative	max-w-[1240px] w-full m-auto pt-20 px-5">
//               <div
//                 ref={sectionMainTitle}
//                 className="text-center flex flex-col w-full justify-center "
//               >
//                 <PageTitle
//                   topTitle={'Statistics'}
//                   title={'    300 Million Users Every Month '}
//                 />
//               </div>

//               <div
//                 className={` h-full flex-wrap flex  gap-5 justify-center max-w-[1240px] w-full m-auto px-5`}
//               >
//                 <div className="flex flex-col  justify-between gap-5">
//                   <div
//                     style={{
//                       background:
//                         ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//                       boxShadow:
//                         'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//                       borderRadius: '20px',
//                     }}
//                     className={`  p-6 rounded-[20px] shadow-lg px-7 w-[400px] h-[400px]	`}
//                   >
//                     <div className="flex flex-col items-center ">
//                       <div className="w-full h-[280px] relative ">
//                         <img
//                           src="/FifthPage/1.gif"
//                           alt="Example GIF"
//                           className="absolute top-0 h-auto w-full"
//                         />
//                       </div>
//                       <h2 className="text-white text-[40px] font-medium mb-2 ">
//                         15 миллионов
//                       </h2>
//                       <p className="text-[#6D768F] text-sm	">
//                         Уникальные зрители
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     style={{
//                       background:
//                         ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//                       boxShadow:
//                         'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//                       borderRadius: '20px',
//                     }}
//                     className={`p-6 rounded-[20px] shadow-lg 	w-[400px] h-[200px]`}
//                   >
//                     <div className="flex flex-col items-center ">
//                       <h2 className="text-white text-[40px] font-medium  ">
//                         ... которые фактически видят вашу рекламу
//                       </h2>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-5 justify-between">
//                   <div
//                     style={{
//                       background:
//                         ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//                       boxShadow:
//                         'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//                       borderRadius: '20px',
//                     }}
//                     className={` p-6 rounded-[20px] shadow-lg w-[400px] h-[300px]`}
//                   >
//                     <div className="flex flex-col items-center ">
//                       <div className="w-full h-[180px] relative ">
//                         <img
//                           src="/FifthPage/3.gif"
//                           alt="Example GIF"
//                           className="absolute top-0 h-auto w-full"
//                         />
//                       </div>
//                       <h2 className="text-white text-[40px] font-medium mb-2 ">
//                         300 миллионов
//                       </h2>
//                       <p className="text-[#6D768F] text-sm	">
//                         Ежемесячные зрители
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     style={{
//                       background:
//                         ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//                       boxShadow:
//                         'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//                       borderRadius: '20px',
//                     }}
//                     className={` bg-[#BACFF7] bg-opacity-20 p-6 rounded-[20px] shadow-lg h-[300px] w-[400px]`}
//                   >
//                     <div className="flex flex-col items-center">
//                       <div className="w-full h-[180px] relative ">
//                         <img
//                           src="/FifthPage/4.gif"
//                           alt="Example GIF"
//                           className="absolute top-0 h-auto w-full"
//                         />
//                       </div>
//                       <h2 className="text-white text-[40px] font-medium mb-2 ">
//                         18-44
//                       </h2>
//                       <p className="text-[#6D768F] text-sm	">Возраст зрителей</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default FifthPage
