import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownToDot } from 'lucide-react'

import { useGSAP } from '@gsap/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'tailwindcss/tailwind.css'
import {
  FacebookSvg,
  GradientBGSvg,
  InstagramSvg,
  SetkaSvg,
  StarsSSSvg,
  YoutubeSvg,
} from '@/assets/Site/site-svg.jsx'
import { sliderData } from './sliderData'
import PhoneButtonBottom from './ButtonBottom/PhoneButtonBottom'
import style from './FirstPage.module.scss'

//
import Phone from '@/assets/Site/FirstPage/Phone.png'
import Phonebg from '@/assets/Site/FirstPage/bgphone.png'
import Gradient from '@/assets/Site/FirstPage/Gradient.png'
import CardLeft from '@/assets/Site/FirstPage/cardLeft.png'
import CardRight from '@/assets/Site/FirstPage/cardright.png'
import prerollImage from '@/assets/Site/FirstPage/preroll.png'
import mixrollImage from '@/assets/Site/FirstPage/mixroll.png'
import { useFirstPage } from './useFirstPage'
//
gsap.registerPlugin(ScrollTrigger, useGSAP)

const FirstPage = () => {
  const phoneRef = useRef(null)
  const swiperWRef = useRef(null)
  const phoneWRef = useRef(null)

  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const swiperRef = useRef()

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const socialMediaRef = useRef(null)
  const starsRef = useRef(null)

  const phoneRightCart = useRef(null)
  const phoneLeftCart = useRef(null)

  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4.95)
  const [isSecondPage, setIsSecondPage] = useState(false)

  const { windowWidth } = useFirstPage()

  useEffect(() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 })
    gsap.from(sliderRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.9 })
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 })
    gsap.from(descriptionRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 1,
    })
    gsap.from(buttonsRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 1.5,
    })
    gsap.from(socialMediaRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 2,
    })

    gsap.from(starsRef.current, {
      duration: 1,
      opacity: 0,
      y: 0,
      x: 0,
      delay: 2,
    })
  }, [])
  const secondPageTextRef = useRef(null)
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
    gsap.to(phoneRightCart.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        start: 'top 80%', // Начало анимации, когда элемент достигает 80% от верхней части экрана
        end: 'top 60%', // Завершение анимации, когда элемент достигает 60% от верхней части экрана
        scrub: true, // Анимация будет "привязана" к прокрутке
      },
    })
    gsap.to(phoneLeftCart.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        start: 'top 80%', // Начало анимации, когда элемент достигает 80% от верхней части экрана
        end: 'top 60%', // Завершение анимации, когда элемент достигает 60% от верхней части экрана
        scrub: true, // Анимация будет "привязана" к прокрутке
      },
    })
  }, [])
  useEffect(() => {
    const handleSlideChange = (swiper) => {
      setActiveSlide(swiper.realIndex)
    }

    if (sliderRef.current && sliderRef.current.swiper) {
      const swiperInstance = sliderRef.current.swiper
      swiperInstance.on('slideChange', () => handleSlideChange(swiperInstance))
    }
  }, [sliderRef.current])

  //Анимация телефона
  useEffect(() => {
    if (windowWidth >= 1100) {
      gsap.to(phoneRef.current, {
        y: window.innerHeight - 200,
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#second-page',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          onEnter: () => {
            setSlidesToShow(4.95)
            setIsSecondPage(true)
          },
          onLeaveBack: () => {
            setSlidesToShow(4.95)
            setIsSecondPage(false)
          },
        },
      })
    } else {
      gsap.killTweensOf(phoneRef.current)
    }
  }, [windowWidth])

  useEffect(() => {
    gsap.from(phoneRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1.5,
    })
  }, [])
  useEffect(() => {
    gsap.from(swiperWRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.7,
      delay: 1.5,
    })
  }, [])

  useEffect(() => {
    gsap.fromTo(
      phoneRightCart.current,
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: phoneRightCart.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      },
    )

    gsap.fromTo(
      phoneLeftCart.current,
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,

        duration: 1,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: phoneLeftCart.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      },
    )
  }, [])
  useEffect(() => {
    if (isSecondPage) {
      gsap.fromTo(
        '.mySwiper',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      )
    }
  }, [isSecondPage])

  return (
    <div className="relative min-h-screen  flex flex-col justify-between ">
      <div className="overflow-hidden relative">
        {' '}
        {/* FirstSection */}
        <FirstSection />
        {/* FirstSection */}
      </div>
      {/* Вторая страница */}
      <section
        id="second-page"
        className={`relative max-w-[1240px] w-full m-auto h-full min-h-screen py-24 ${
          windowWidth < 845 ? 'pt-14' : ' '
        }`}
      >
        <GradientBGSvg className="absolute top-0 w-[100%] -z-[5px]" />
        <StarsSSSvg className="absolute top-0 w-[100%] -z-[5px]" />
        <SetkaSvg className="absolute top-0 w-[100%] -z-[5px]" />
        <div className={`flex flex-col`}>
          <div className="text-center">
            <h2
              ref={secondPageTextRef}
              className={`text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3  pb-10 ${
                windowWidth < 845 ? 'mb-14' : ' '
              }`}
            >
              Развивайте свой бизнес с нами{' '}
            </h2>
          </div>
          <div
            className={`${
              windowWidth < 845 ? 'justify-center' : 'justify-between '
            } flex   items-center flex-wrap px-4 gap-4`}
          >
            <div
              ref={phoneLeftCart}
              className={`${
                windowWidth < 1100 ? 'bottom-0' : 'bottom-52 '
              } w-[400px] h-[500px]  z-10 p-7 flex flex-col justify-between`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: ' 0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    ' inset 0px 1.65868px 1.65868px rgba(216, 236, 248, 0.3), inset 0px 39.8082px 79.6164px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className="h-[280px]"
              >
                <div>
                  <div className="flex justify-end flex-col w-full">
                    <div className="relative">
                      <img
                        src={CardLeft}
                        className="w-full bg-black rounded-t-[20px] h-[192px]"
                        alt=""
                      />
                    </div>

                    <div className="absolute w-[342px]">
                      <img src={prerollImage} alt="" className="w-full " />
                    </div>
                  </div>
                  <div className="text-white bg-black h-[86px] rounded-b-[20px] p-5">
                    <div className="text-[13px]">
                      Chery: Embrace Comfort in Every Drive
                    </div>
                    <div className="text-[10px] text-[#ffffff85] mt-2">
                      Chery · 777K views · 3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl	text-white">Pre-Roll</h1>
                <p className="text-[#6D768F] text-sm	">
                  Рекламное видео длительностью до 20 секунд размещается перед
                  началом видеоконтента.
                </p>
              </div>
            </div>

            <div
              ref={phoneRightCart}
              className={`${
                windowWidth < 1100 ? 'bottom-0' : 'bottom-52 '
              } w-[400px] h-[500px] right-0 z-10 p-7 flex flex-col justify-between`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                  border: ' 0.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    ' inset 0px 1.65868px 1.65868px rgba(216, 236, 248, 0.3), inset 0px 39.8082px 79.6164px rgba(168, 216, 245, 0.06)',
                  borderRadius: '20px',
                }}
                className="h-[280px]"
              >
                <div>
                  <div className="flex justify-end flex-col w-full">
                    <div className="relative">
                      <img
                        src={CardRight}
                        className="w-full bg-black rounded-t-[20px] h-[192px]"
                        alt=""
                      />
                    </div>

                    <div className="absolute w-[342px]">
                      <img src={mixrollImage} alt="" className="w-full " />
                    </div>
                  </div>
                  <div className="text-white bg-black h-[86px] rounded-b-[20px] p-5">
                    <div>Chery: Embrace Comfort in Every Drive</div>
                    <div className="text-[10px] text-[#ffffff85] mt-2">
                      Chery · 777K views · 3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl	text-white">Mid-Roll</h1>
                <p className="text-[#6D768F] text-sm	">
                  Рекламное видео длительностью до 20 секунд размещается
                  примерно через 7-10 минут после начала видеоконтента.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`
                      ${windowWidth < 845 ? 'bottom-[90%]' : 'bottom-[86%]'}

      fixed  text-white p-4 text-2xl rounded-lg shadow-lg w-full`}
      >
        <div className="flex relative justify-center ">
          <div
            ref={swiperWRef} // добавляем ref здесь
            className={`
                                    ${
                                      windowWidth < 845
                                        ? 'top-[19%]'
                                        : 'top-[25%]'
                                    }

              fixed  z-10 left-1/2 transform -translate-x-1/2 w-full max-w-[1240px]`}
          >
            {' '}
            <div className="w-auto slider-container">
              <div
                className=" w-10 h-44 absolute -left-4 top-[-10%] z-10"
                style={{
                  background:
                    'linear-gradient(351.63deg, #020308 6.87%, rgba(2, 3, 8, 0.55) 353.23%)',
                  filter: ' blur(13.6px)',
                  transform: 'rotate(0deg)',
                }}
              ></div>
              <Swiper
                slidesPerView={5.5} // по умолчанию для разрешений выше 1150px
                spaceBetween={0}
                centeredSlides={true}
                navigation={true}
                loop={true}
                className="mySwiperFirst"
                modules={[Navigation]}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  500: {
                    slidesPerView: 2.5,
                  },
                  640: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1150: {
                    slidesPerView: 5.5,
                  },
                }}
              >
                {sliderData.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <div
                      className={`relative md:w-[205px] w-[180px]  h-[230px]   ${
                        index === activeSlide ? 'h-[320px]' : ''
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center flex-col slide
                        ${
                          index === activeSlide
                            ? isSecondPage
                              ? 'firstBorder secondBorder shadow-inner bg-[#BACFF70A]'
                              : 'border-0 mx-auto '
                            : 'firstBorder secondBorder shadow-inner bg-[#BACFF70A] '
                        }
                      `}
                      >
                        <video
                          src={slide.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="rounded-[12px]"
                        ></video>
                        {/* <img
                          src={slide.image}
                          alt={slide.title}
                          className=" w-[185px] h-[100px]"
                        /> */}
                      </div>
                      {isSecondPage ? null : (
                        <div
                          className={`absolute bottom-0 top-[115px] w-full 
                      flex items-center justify-center slide
                      ${index === activeSlide ? 'text-white' : 'hidden'}
                    `}
                        >
                          <div
                            className={`relative ${
                              index === activeSlide
                                ? ' h-full w-full'
                                : 'hidden'
                            }`}
                          >
                            <div
                              className="w-full p-3 text-start "
                              style={{
                                background:
                                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), #020308',
                                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                                boxShadow:
                                  'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                                borderRadius: '12px',
                              }}
                            >
                              <div className=" leading-3	 text-[8px] text-white">
                                {slide.title}
                              </div>
                              <div className="leading-3 text-[6px] text-[#ffffff70]">
                                {slide.title}
                              </div>

                              <div className="flex gap-1 mt-2 mb-2">
                                <div
                                  className="w-fit "
                                  style={{
                                    background:
                                      'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                    border:
                                      '0.5px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow:
                                      'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(6px)',
                                    borderRadius: '500px',
                                  }}
                                >
                                  <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                    <svg
                                      width="8"
                                      height="9"
                                      viewBox="0 0 8 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        opacity="0.4"
                                        d="M7.21695 3.84324C7.08695 3.65658 6.85695 3.54991 6.59362 3.54991H5.22695C5.13695 3.54991 5.05362 3.51324 4.99695 3.44658C4.93695 3.37991 4.91362 3.28658 4.92695 3.18991L5.09695 2.09658C5.17029 1.76991 4.95362 1.40324 4.62695 1.29324C4.32362 1.17991 3.96695 1.33324 3.82362 1.54991L2.41695 3.63991L2.37695 3.70658V6.65324L2.42695 6.70324L3.48362 7.51991C3.62362 7.65991 3.94029 7.73658 4.16362 7.73658H5.46362C5.91029 7.73658 6.36029 7.39991 6.46029 6.98991L7.28029 4.49324C7.36695 4.25658 7.34362 4.02658 7.21695 3.84324Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M1.73602 2.62695H1.39268C0.876016 2.62695 0.666016 2.82695 0.666016 3.32029V6.67362C0.666016 7.16695 0.876016 7.36695 1.39268 7.36695H1.73602C2.25268 7.36695 2.46268 7.16695 2.46268 6.67362V3.32029C2.46268 2.82695 2.25268 2.62695 1.73602 2.62695Z"
                                        fill="white"
                                      />
                                    </svg>
                                    {slide.likeCount}

                                    <div className="border-r border-[#2B2D33] h-[8px]"></div>
                                    {slide.disLikeCount}
                                    <svg
                                      width="8"
                                      height="9"
                                      viewBox="0 0 8 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        opacity="0.4"
                                        d="M0.783664 5.1531C0.913664 5.33977 1.14366 5.44643 1.407 5.44643H2.77366C2.86366 5.44643 2.947 5.4831 3.00366 5.54977C3.06366 5.61643 3.087 5.70977 3.07366 5.80643L2.90366 6.89977C2.83033 7.22643 3.047 7.5931 3.37366 7.7031C3.677 7.81643 4.03366 7.6631 4.177 7.44643L5.58033 5.35643L5.62033 5.28977V2.3431L5.57033 2.2931L4.51366 1.47643C4.37366 1.33643 4.057 1.25977 3.83366 1.25977H2.53366C2.087 1.25977 1.637 1.59643 1.537 2.00643L0.716997 4.5031C0.633664 4.73977 0.656997 4.9731 0.783664 5.1531Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M6.26378 6.37046H6.60711C7.12378 6.37046 7.33378 6.17046 7.33378 5.67712V2.32712C7.33378 1.83379 7.12378 1.63379 6.60711 1.63379H6.26378C5.74711 1.63379 5.53711 1.83379 5.53711 2.32712V5.68046C5.53711 6.17046 5.74711 6.37046 6.26378 6.37046Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                <div
                                  className="w-fit "
                                  style={{
                                    background:
                                      'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                    border:
                                      '0.5px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow:
                                      'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(6px)',
                                    borderRadius: '500px',
                                  }}
                                >
                                  <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                    <svg
                                      width="8"
                                      height="9"
                                      viewBox="0 0 8 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        opacity="0.4"
                                        d="M4.29602 2.45996H1.70268C1.13268 2.45996 0.666016 2.92662 0.666016 3.49662V7.28329C0.666016 7.76663 1.01268 7.97329 1.43601 7.73662L2.74601 7.00662C2.88601 6.92996 3.11268 6.92996 3.24935 7.00662L4.55935 7.73662C4.98268 7.97329 5.32935 7.76663 5.32935 7.28329V3.49662C5.33268 2.92662 4.86602 2.45996 4.29602 2.45996Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M7.33268 2.20365V5.99033C7.33268 6.47366 6.98602 6.67699 6.56268 6.44365L5.33268 5.75699V3.49699C5.33268 2.92699 4.86602 2.46033 4.29602 2.46033H2.66602V2.20365C2.66602 1.63365 3.13268 1.16699 3.70268 1.16699H6.29602C6.86602 1.16699 7.33268 1.63365 7.33268 2.20365Z"
                                        fill="white"
                                      />
                                    </svg>
                                    Save
                                  </div>
                                </div>

                                <div
                                  className="w-fit "
                                  style={{
                                    background:
                                      'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                    border:
                                      '0.5px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow:
                                      'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(6px)',
                                    borderRadius: '500px',
                                  }}
                                >
                                  <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                    <svg
                                      width="9"
                                      height="9"
                                      viewBox="0 0 9 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        opacity="0.4"
                                        d="M2.86948 2.48708L5.87615 1.48375C7.22615 1.03375 7.95948 1.77042 7.51281 3.12042L6.50948 6.12708C5.83615 8.15042 4.72948 8.15042 4.05615 6.12708L3.75948 5.23375L2.86615 4.93708C0.846146 4.26708 0.846146 3.16375 2.86948 2.48708Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M4.53906 4.37685L5.80906 3.10352L4.53906 4.37685Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M4.54018 4.62699C4.47685 4.62699 4.41352 4.60366 4.36352 4.55366C4.26685 4.45699 4.26685 4.29699 4.36352 4.20033L5.63018 2.92699C5.72685 2.83033 5.88685 2.83033 5.98352 2.92699C6.08018 3.02366 6.08018 3.18366 5.98352 3.28033L4.71685 4.55366C4.66685 4.60033 4.60352 4.62699 4.54018 4.62699Z"
                                        fill="white"
                                      />
                                    </svg>
                                    Share
                                  </div>
                                </div>

                                <div
                                  className="w-fit "
                                  style={{
                                    background:
                                      'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                    border:
                                      '0.5px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow:
                                      'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(6px)',
                                    borderRadius: '500px',
                                  }}
                                >
                                  <div className="text-[6px] leading-[9px]	 text-[#ffffff70] flex items-center gap-1 p-1">
                                    <svg
                                      width="9"
                                      height="9"
                                      viewBox="0 0 9 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.6674 5.41667H3.83406C3.6974 5.41667 3.58406 5.30333 3.58406 5.16667C3.58406 5.03 3.6974 4.91667 3.83406 4.91667H4.6674C5.54073 4.91667 6.25073 4.20667 6.25073 3.33333C6.25073 2.46 5.54073 1.75 4.6674 1.75H3.00073C2.1274 1.75 1.4174 2.46 1.4174 3.33333C1.4174 3.7 1.5474 4.05666 1.78073 4.34C1.8674 4.44666 1.85406 4.60333 1.7474 4.69333C1.64073 4.78 1.48406 4.76667 1.39406 4.66C1.08406 4.28667 0.914062 3.81667 0.914062 3.33333C0.914062 2.18333 1.8474 1.25 2.9974 1.25H4.66406C5.81406 1.25 6.7474 2.18333 6.7474 3.33333C6.7474 4.48333 5.8174 5.41667 4.6674 5.41667Z"
                                        fill="white"
                                      />
                                      <path
                                        opacity="0.4"
                                        d="M6 7.74967H4.33333C3.18333 7.74967 2.25 6.81634 2.25 5.66634C2.25 4.51634 3.18333 3.58301 4.33333 3.58301H5.16667C5.30333 3.58301 5.41667 3.69634 5.41667 3.83301C5.41667 3.96967 5.30333 4.08301 5.16667 4.08301H4.33333C3.46 4.08301 2.75 4.79301 2.75 5.66634C2.75 6.53967 3.46 7.24967 4.33333 7.24967H6C6.87333 7.24967 7.58333 6.53967 7.58333 5.66634C7.58333 5.29967 7.45333 4.94301 7.22 4.65968C7.13333 4.55301 7.14667 4.39635 7.25333 4.30635C7.36 4.21635 7.51667 4.233 7.60667 4.33967C7.91667 4.713 8.08667 5.18301 8.08667 5.66634C8.08333 6.81634 7.15 7.74967 6 7.74967Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className=" w-10 h-44 absolute -right-4 top-[-10%] z-10"
                style={{
                  background:
                    'linear-gradient(351.63deg, #020308 6.87%, rgba(2, 3, 8, 0.55) 353.23%)',
                  filter: ' blur(13.6px)',
                  transform: 'rotate(0deg)',
                }}
              ></div>
            </div>
          </div>

          <div
            ref={phoneRef}
            className={`relative flex    ${
              isSecondPage && windowWidth < 1100 ? 'hidden' : ''
            }`}
            id="second-page"
          >
            <div
              ref={phoneWRef}
              className={`
              
              isSecondPagePhone relative  flex  bottom-[-125%] justify-between w-full md:left-[-38px] left-[-35px]`}
            >
              <img
                src={Phone}
                alt="Phone"
                draggable="false"
                className="md:w-auto h-auto w-[330px]"
              />
              <img
                src={Phonebg}
                alt="Phone Background"
                className="absolute -z-10 top-[0px] right-[1px]"
                draggable="false"
              />
              <img
                src={Gradient}
                className="absolute -bottom-10 w-full z-10"
                alt=""
              />
            </div>

            <div
              className={`fixed top-[135%] z-10 md:left-[183px] left-[164px]  transform -translate-x-1/2 w-full max-w-[1240px]`}
            >
              <div
                className={`w-auto slider-container ${
                  isSecondPage && windowWidth < 1100 ? 'hidden' : ''
                }`}
              >
                {isSecondPage ? (
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={true}
                    navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                  >
                    {sliderData
                      .filter((_, index) => index === activeSlide)
                      .map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                          <div className="relative md:w-[205px] w-[180px]  h-[300px]">
                            <div className="flex items-center justify-center flex-col slide border-0 mx-auto">
                              {/* <video
                                src={slide.image}
                                alt={slide.title}
                                className="w-[185px] h-[100px]"
                              /> */}
                              <video
                                src={slide.image}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="rounded-[12px]"
                              ></video>
                            </div>
                            <div
                              className={`absolute bottom-0 w-full
                      flex items-center justify-center slide
                     
                    `}
                            >
                              <div
                                className={`relative  h-full w-full top-[-60px]`}
                              >
                                <div
                                  className="w-full p-3 text-start "
                                  style={{
                                    background:
                                      'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), #020308',
                                    border:
                                      '0.5px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow:
                                      'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                                    borderRadius: '12px',
                                  }}
                                >
                                  <div className=" leading-3	 text-[8px] text-white">
                                    {slide.title}
                                  </div>
                                  <div className="leading-3 text-[6px] text-[#ffffff70]">
                                    {slide.title}
                                  </div>

                                  <div className="flex gap-1 mt-2 mb-4">
                                    <div
                                      className="w-fit "
                                      style={{
                                        background:
                                          'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                        border:
                                          '0.5px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow:
                                          'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(6px)',
                                        borderRadius: '500px',
                                      }}
                                    >
                                      <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                        <svg
                                          width="8"
                                          height="9"
                                          viewBox="0 0 8 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            opacity="0.4"
                                            d="M7.21695 3.84324C7.08695 3.65658 6.85695 3.54991 6.59362 3.54991H5.22695C5.13695 3.54991 5.05362 3.51324 4.99695 3.44658C4.93695 3.37991 4.91362 3.28658 4.92695 3.18991L5.09695 2.09658C5.17029 1.76991 4.95362 1.40324 4.62695 1.29324C4.32362 1.17991 3.96695 1.33324 3.82362 1.54991L2.41695 3.63991L2.37695 3.70658V6.65324L2.42695 6.70324L3.48362 7.51991C3.62362 7.65991 3.94029 7.73658 4.16362 7.73658H5.46362C5.91029 7.73658 6.36029 7.39991 6.46029 6.98991L7.28029 4.49324C7.36695 4.25658 7.34362 4.02658 7.21695 3.84324Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M1.73602 2.62695H1.39268C0.876016 2.62695 0.666016 2.82695 0.666016 3.32029V6.67362C0.666016 7.16695 0.876016 7.36695 1.39268 7.36695H1.73602C2.25268 7.36695 2.46268 7.16695 2.46268 6.67362V3.32029C2.46268 2.82695 2.25268 2.62695 1.73602 2.62695Z"
                                            fill="white"
                                          />
                                        </svg>
                                        {slide.likeCount}

                                        <div className="border-r border-[#2B2D33] h-[8px]"></div>
                                        {slide.disLikeCount}
                                        <svg
                                          width="8"
                                          height="9"
                                          viewBox="0 0 8 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            opacity="0.4"
                                            d="M0.783664 5.1531C0.913664 5.33977 1.14366 5.44643 1.407 5.44643H2.77366C2.86366 5.44643 2.947 5.4831 3.00366 5.54977C3.06366 5.61643 3.087 5.70977 3.07366 5.80643L2.90366 6.89977C2.83033 7.22643 3.047 7.5931 3.37366 7.7031C3.677 7.81643 4.03366 7.6631 4.177 7.44643L5.58033 5.35643L5.62033 5.28977V2.3431L5.57033 2.2931L4.51366 1.47643C4.37366 1.33643 4.057 1.25977 3.83366 1.25977H2.53366C2.087 1.25977 1.637 1.59643 1.537 2.00643L0.716997 4.5031C0.633664 4.73977 0.656997 4.9731 0.783664 5.1531Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M6.26378 6.37046H6.60711C7.12378 6.37046 7.33378 6.17046 7.33378 5.67712V2.32712C7.33378 1.83379 7.12378 1.63379 6.60711 1.63379H6.26378C5.74711 1.63379 5.53711 1.83379 5.53711 2.32712V5.68046C5.53711 6.17046 5.74711 6.37046 6.26378 6.37046Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </div>
                                    </div>

                                    <div
                                      className="w-fit "
                                      style={{
                                        background:
                                          'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                        border:
                                          '0.5px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow:
                                          'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(6px)',
                                        borderRadius: '500px',
                                      }}
                                    >
                                      <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                        <svg
                                          width="8"
                                          height="9"
                                          viewBox="0 0 8 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            opacity="0.4"
                                            d="M4.29602 2.45996H1.70268C1.13268 2.45996 0.666016 2.92662 0.666016 3.49662V7.28329C0.666016 7.76663 1.01268 7.97329 1.43601 7.73662L2.74601 7.00662C2.88601 6.92996 3.11268 6.92996 3.24935 7.00662L4.55935 7.73662C4.98268 7.97329 5.32935 7.76663 5.32935 7.28329V3.49662C5.33268 2.92662 4.86602 2.45996 4.29602 2.45996Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M7.33268 2.20365V5.99033C7.33268 6.47366 6.98602 6.67699 6.56268 6.44365L5.33268 5.75699V3.49699C5.33268 2.92699 4.86602 2.46033 4.29602 2.46033H2.66602V2.20365C2.66602 1.63365 3.13268 1.16699 3.70268 1.16699H6.29602C6.86602 1.16699 7.33268 1.63365 7.33268 2.20365Z"
                                            fill="white"
                                          />
                                        </svg>
                                        Save
                                      </div>
                                    </div>

                                    <div
                                      className="w-fit "
                                      style={{
                                        background:
                                          'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                        border:
                                          '0.5px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow:
                                          'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(6px)',
                                        borderRadius: '500px',
                                      }}
                                    >
                                      <div className="text-[6px] leading-[9px]		 text-[#ffffff70] flex items-center gap-1 p-1">
                                        <svg
                                          width="9"
                                          height="9"
                                          viewBox="0 0 9 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            opacity="0.4"
                                            d="M2.86948 2.48708L5.87615 1.48375C7.22615 1.03375 7.95948 1.77042 7.51281 3.12042L6.50948 6.12708C5.83615 8.15042 4.72948 8.15042 4.05615 6.12708L3.75948 5.23375L2.86615 4.93708C0.846146 4.26708 0.846146 3.16375 2.86948 2.48708Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M4.53906 4.37685L5.80906 3.10352L4.53906 4.37685Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M4.54018 4.62699C4.47685 4.62699 4.41352 4.60366 4.36352 4.55366C4.26685 4.45699 4.26685 4.29699 4.36352 4.20033L5.63018 2.92699C5.72685 2.83033 5.88685 2.83033 5.98352 2.92699C6.08018 3.02366 6.08018 3.18366 5.98352 3.28033L4.71685 4.55366C4.66685 4.60033 4.60352 4.62699 4.54018 4.62699Z"
                                            fill="white"
                                          />
                                        </svg>
                                        Share
                                      </div>
                                    </div>

                                    <div
                                      className="w-fit "
                                      style={{
                                        background:
                                          'linear-gradient(180deg, rgba(2, 3, 8, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                        border:
                                          '0.5px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow:
                                          'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(6px)',
                                        borderRadius: '500px',
                                      }}
                                    >
                                      <div className="text-[6px] leading-[9px]	 text-[#ffffff70] flex items-center gap-1 p-1">
                                        <svg
                                          width="9"
                                          height="9"
                                          viewBox="0 0 9 9"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.6674 5.41667H3.83406C3.6974 5.41667 3.58406 5.30333 3.58406 5.16667C3.58406 5.03 3.6974 4.91667 3.83406 4.91667H4.6674C5.54073 4.91667 6.25073 4.20667 6.25073 3.33333C6.25073 2.46 5.54073 1.75 4.6674 1.75H3.00073C2.1274 1.75 1.4174 2.46 1.4174 3.33333C1.4174 3.7 1.5474 4.05666 1.78073 4.34C1.8674 4.44666 1.85406 4.60333 1.7474 4.69333C1.64073 4.78 1.48406 4.76667 1.39406 4.66C1.08406 4.28667 0.914062 3.81667 0.914062 3.33333C0.914062 2.18333 1.8474 1.25 2.9974 1.25H4.66406C5.81406 1.25 6.7474 2.18333 6.7474 3.33333C6.7474 4.48333 5.8174 5.41667 4.6674 5.41667Z"
                                            fill="white"
                                          />
                                          <path
                                            opacity="0.4"
                                            d="M6 7.74967H4.33333C3.18333 7.74967 2.25 6.81634 2.25 5.66634C2.25 4.51634 3.18333 3.58301 4.33333 3.58301H5.16667C5.30333 3.58301 5.41667 3.69634 5.41667 3.83301C5.41667 3.96967 5.30333 4.08301 5.16667 4.08301H4.33333C3.46 4.08301 2.75 4.79301 2.75 5.66634C2.75 6.53967 3.46 7.24967 4.33333 7.24967H6C6.87333 7.24967 7.58333 6.53967 7.58333 5.66634C7.58333 5.29967 7.45333 4.94301 7.22 4.65968C7.13333 4.55301 7.14667 4.39635 7.25333 4.30635C7.36 4.21635 7.51667 4.233 7.60667 4.33967C7.91667 4.713 8.08667 5.18301 8.08667 5.66634C8.08333 6.81634 7.15 7.74967 6 7.74967Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                ) : null}
              </div>
            </div>

            {/* Кнопки в телефон  */}
            <PhoneButtonBottom
              phoneWRef={phoneWRef}
              isSecondPage={isSecondPage}
              windowWidth={windowWidth}
              swiperRef={swiperRef}
            />
            {/* Кнопки в телефон  */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FirstPage

/* Frame 8 */

export const FirstSection = () => {
  //Анимация Заголовока
  const headerRef = useRef(null)
  const paragraphRef = useRef(null)
  const button1Ref = useRef(null)
  const button2Ref = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    const paragraph = paragraphRef.current

    const headerWords = header.innerText.split(' ')
    const paragraphWords = paragraph.innerText.split(' ')

    header.innerHTML = headerWords
      .map((word) => `<span>${word}</span>`)
      .join(' ')
    paragraph.innerHTML = paragraphWords
      .map((word) => `<span>${word}</span>`)
      .join(' ')

    const headerSpans = header.querySelectorAll('span')
    const paragraphSpans = paragraph.querySelectorAll('span')

    const headerDuration = 2
    const paragraphDuration = 2
    const delayBetweenWords = 0.1

    gsap.fromTo(
      headerSpans,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: headerDuration / headerSpans.length,
        stagger: delayBetweenWords,
      },
    )

    gsap.fromTo(
      paragraphSpans,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: paragraphDuration / paragraphSpans.length,
        stagger: delayBetweenWords,
        delay: headerDuration,
      },
    )

    gsap.from(button1Ref.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1,
    })
    gsap.from(button2Ref.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1,
    })
  }, [])
  //Анимация Заголовока
  return (
    <section id="first-page" className="h-screen min-h-screen   ">
      <GradientBGSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
      <StarsSSSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
      <SetkaSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
      <div className=" max-w-[1240px] w-full m-auto">
        {/*  */}
        <div className="absolute inset-x-0 z-20 px-5 mt-[100px] ">
          <div className="absolute w-full h-[171px] rounded-[150px]" />

          {/* Заголовок  */}
          <div className="w-full justify-center">
            <h1
              ref={headerRef}
              className=" text-[30px] text-white md:text-[40px] lg:text-[50px]  flex justify-center text-center"
            >
              Платформа&nbsp;Онлайн&nbsp;Видеорекламы
            </h1>
            <div className="w-full justify-center flex my-5">
              <p
                ref={paragraphRef}
                className="text-slate-500 text-base font-normal w-[80%] md:w-[50%] text-center"
              >
                Онлайн платформа видеорекламы, разработанная для улучшения
                результатов бренда через привлекательный видеоконтент.
              </p>
            </div>
            <div className="flex gap-5 items-center justify-center">
              <div
                ref={button1Ref}
                style={{
                  background:
                    'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                }}
                className="w-[230px] h-[50px] px-[30px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex"
              >
                <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">
                  Заказать рекламу
                </button>
              </div>
              <div
                ref={button2Ref}
                style={{
                  background:
                    'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                }}
                className="w-[230px] h-[50px] px-[30px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex"
              >
                <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">
                  Монетизировать
                </button>
              </div>
            </div>
          </div>
          {/* Заголовок  */}
        </div>
        <div className="text-white absolute bottom-20 flex items-center justify-between max-w-[1240px] w-full m-auto">
          <div className="flex items-center gap-2">
            <h1 className="">Соц.сети:</h1>
            <FacebookSvg /> <InstagramSvg /> <YoutubeSvg />
          </div>
          <div className="flex gap-2">
            Исследовать <ArrowDownToDot className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
