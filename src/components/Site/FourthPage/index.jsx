import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Video from './VideoBG.mp4'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import PageTitle from '../module/PageTitle'

import image1 from 'src/assets/FourthPage/1.png'
import image2 from 'src/assets/FourthPage/2.png'
import image3 from 'src/assets/FourthPage/3.png'
import image4 from 'src/assets/FourthPage/4.png'
import image5 from 'src/assets/FourthPage/5.png'
import image6 from 'src/assets/FourthPage/6.png'
import image7 from 'src/assets/FourthPage/7.png'
import image8 from 'src/assets/FourthPage/8.png'
import image9 from 'src/assets/FourthPage/9.png'
import image10 from 'src/assets/FourthPage/10.png'
import image11 from 'src/assets/FourthPage/11.png'
import image12 from 'src/assets/FourthPage/12.png'
import image13 from 'src/assets/FourthPage/13.png'
import image14 from 'src/assets/FourthPage/14.png'
import image15 from 'src/assets/FourthPage/15.png'

const imagesData = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image5 },
  { id: 6, image: image6 },
  { id: 7, image: image7 },
  { id: 8, image: image8 },
  { id: 9, image: image9 },
  { id: 10, image: image10 },
  { id: 11, image: image11 },
  { id: 12, image: image12 },
  { id: 13, image: image13 },
  { id: 14, image: image14 },
  { id: 15, image: image15 },
]
gsap.registerPlugin(ScrollTrigger)

const FourthPage = () => {
  const containerRefImageData = useRef(null)

  useEffect(() => {
    const container = containerRefImageData.current

    if (container) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sectionFourthBlue',
          start: 'top top',
          end: '+=250%',
          scrub: 0.5,
          pin: true,
        },
      })

      tl.fromTo(
        '.dog-1',
        { opacity: 0, scale: 6, duration: 1 },
        { opacity: 1, scale: 1, duration: 1 },
      ).to('.dog-2', { opacity: 1, duration: 1 })

      gsap.fromTo(
        container,
        { opacity: 1, y: 1300 }, // Initial state: invisible, with downward offset
        {
          opacity: 1,
          y: 0,
          duration: 2, // Duration for the animation
          scrollTrigger: {
            trigger: container, // Element that triggers the animation
            start: 'top bottom', // Начать анимацию на 200px раньше, чем верх контейнера достигнет нижней части экрана
            end: 'bottom', // Когда контейнер выйдет из центра экрана, анимация завершится
            scrub: 1, // Sync the animation with scrolling
            pin: false, // Don't pin the element
            onUpdate: (self) => {
              gsap.to(container, {
                yPercent: -50 * self.progress, // Move the container upward based on scroll progress
                ease: 'none', // No easing, makes the animation linear
              })
            },
          },
        },
      )

      imagesData.forEach((_, index) => {
        const cardClass = `.card .dog-2`
        if (document.querySelector(cardClass)) {
          gsap.fromTo(
            cardClass,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,

              scrollTrigger: {
                trigger: container,
                start: 'top top+=100', // Start the animation after the container appears
                // end: `bottom `,
                scrub: 0.5,
              },
            },
          )
        }
      })

      // gsap.fromTo(
      //   '.dog-2 .card',
      //   { opacity: 0, y: -10 },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 1,
      //     stagger: 0.1,
      //     scrollTrigger: {
      //       trigger: container,
      //       start: 'top bottom+=200', // Когда контейнер появится в центре экрана, анимация начнется
      //       end: 'bottom center',
      //       scrub: 0.5,
      //     },
      //   },
      // )
    }
  }, [])

  return (
    <>
      <section className="sectionFourth sectionFourthBlue ">
        <video
          src={Video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover	"
        ></video>

        <PageTitle title={'По рекламе для успеха на YouTube'} />
        <div alt="" className="dog-1 absolute w-full h-full bg-[#05060b]  ">
          <GradientBGSvg className="absolute top-0 left-0 w-full h-auto z-10" />
          <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-auto z-10" />
          {/* <SetkaSvg className="absolute top-0 left-0 w-[100%] z-10" /> */}
          <div alt="" className="absolute w-full h-full bg-[#05060b]  ">
            <video
              src={Video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover	"
            ></video>

            <div className="mix-blend-multiply m-auto	font-black	uppercase absolute top-0 left-0 w-full h-full text-white bg-[#020308] text-[80px] flex justify-center flex-col items-center ">
              Brandformance
            </div>
          </div>
        </div>
        <div
          ref={containerRefImageData}
          alt=""
          className="dog-2 imgFourth grid grid-cols-3 gap-4 p-4 max-w-[1240px] w-full m-auto"
          style={{
            height: 'auto',
            opacity: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 колонки
            gridTemplateRows: 'repeat(3, auto)', // Авторазмер для строк
            gap: '16px',
          }}
        >
          {imagesData.map((item, index) => (
            <div
              key={index}
              className={`card card-${index} flex items-center justify-center`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  '0px 16px 32px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                borderRadius: '20px',
                height: 'auto',
                width: 'auto',
              }}
            >
              <img
                loading="lazy"
                src={item.image}
                className="w-auto h-auto max-w-[150px] object-cover"
              ></img>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="sectionFourth sectionFourthGgreen"></section> */}
    </>
  )
}

export default FourthPage
