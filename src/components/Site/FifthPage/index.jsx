import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import 'swiper/css'
import 'swiper/css/pagination'
gsap.registerPlugin(ScrollTrigger)
import HeadeYouTube from './HeadeYouTube.png'
import video2 from 'src/assets/Site/FirstPage/Video/22.mp4'
import video9 from 'src/assets/Site/FirstPage/Video/99.mp4'
import video1 from 'src/assets/Site/FirstPage/Video/11.mp4'

import video3 from 'src/assets/Site/FirstPage/Video/33.mp4'
import video11 from 'src/assets/Site/FirstPage/Video/1011.mp4'
import video4 from 'src/assets/Site/FirstPage/Video/44.mp4'
import PageTitle from '../module/PageTitle'

gsap.registerPlugin(ScrollTrigger)
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
      },
      duration: 1,
      opacity: 0,
      x: -50, // Смещение по горизонтали
    })
  }, [])
  //section2

  return (
    <section className="overflow-hidden" id="FifthPage">
      <div className=" ">
        {/* max-w-[900px] w-full m-auto */}
        <div className="relative  flex-col justify-between  py-20	   overflow-hidden">
          <GradientBGSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
          <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
          <SetkaSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
          <div className="text-center  max-w-[900px] w-full m-auto">
            <PageTitle
              topTitle={'Особенности'}
              title={'Реклама которую Увидели Миллионы Людей'}
            />
          </div>
          <div
            style={{
              background:
                'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
              border: '0.5px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
              borderRadius: '32px',
            }}
            className="max-w-[1000px] w-full m-auto rounded-[32px] p-3 relative z-20 "
          >
            <div className="">
              <img
                src={HeadeYouTube}
                alt=""
                className="w-full rounded-t-[32px]"
              />
            </div>
            <div className="py-5 flex flex-col gap-4 bg-black rounded-b-[32px] ">
              <div className="flex gap-4 justify-around flex-wrap">
                <div className="w-[400px]">
                  <video
                    src={video2}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Coca - Cola Освежающий вкус в каждой капле
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>
                <div className="w-[400px]">
                  <video
                    src={video9}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>{' '}
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Honor 200 Рго инновации и стиль в каждом устройстве.
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-around flex-wrap">
                <div className="w-[400px]">
                  <video
                    src={video1}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>{' '}
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Встречайте обновленый BYD Champion
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>
                <div className="w-[400px] ">
                  <video
                    src={video3}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>{' '}
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Borjomi: природная чистота и свежесть грузинских
                      источников.
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className="flex gap-4 justify-around flex-wrap">
                <div className="w-[400px] ">
                  <video
                    src={video11}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>{' '}
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Cherry Tiggo Pro Max - автомобиль сполным приводом.
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>{' '}
                <div className="w-[400px]">
                  <video
                    src={video4}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[400px] h-[220px] rounded-[14px]"
                  ></video>{' '}
                  <div className="pt-4">
                    <div className="text-white text-[16px]">
                      Artel искусство и инновации в каждом устройстве.
                    </div>
                    <div className="text-[#909090] text-[14px]">
                      3м просмотров
                    </div>
                  </div>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}

export default FifthPage
