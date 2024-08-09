import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import m from './FourthPage.module.scss'
import Video from './VideoBG.mp4'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'

const imagesData = [
  { id: 1, image: '/FourthPage/1.png' },
  { id: 2, image: '/FourthPage/2.png' },
  { id: 3, image: '/FourthPage/3.png' },
  { id: 4, image: '/FourthPage/4.png' },
  { id: 5, image: '/FourthPage/5.png' },
  { id: 6, image: '/FourthPage/6.png' },
  { id: 7, image: '/FourthPage/7.png' },
  { id: 8, image: '/FourthPage/8.png' },
  { id: 9, image: '/FourthPage/9.png' },
  { id: 10, image: '/FourthPage/10.png' },
  { id: 11, image: '/FourthPage/11.png' },
  { id: 12, image: '/FourthPage/12.png' },
  { id: 13, image: '/FourthPage/13.png' },
  { id: 14, image: '/FourthPage/14.png' },
  { id: 15, image: '/FourthPage/15.png' },
  { id: 16, image: '/FourthPage/16.png' },
  { id: 17, image: '/FourthPage/17.png' },
  { id: 18, image: '/FourthPage/18.png' },
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
          end: '+=500%',
          scrub: true,
          pin: true,
          markers: {
            startColor: 'white',
            endColor: 'white',
          },
        },
      })

      tl.fromTo(
        '.dog-1',
        { opacity: 0, scale: 4 },
        { opacity: 1, scale: 1 },
      ).to('.dog-2', { opacity: 1, duration: 1 })

      gsap.to(container, {
        yPercent: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom+=500%',
          scrub: true,
          pin: true,
        },
      })

      imagesData.forEach((_, index) => {
        gsap.fromTo(
          `.card-${index + 1}`,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: container,
              start: `top bottom+=${index * 100}`,
              end: `bottom+=${(imagesData.length - index) * 100}`,
              scrub: true,
            },
          },
        )
      })
      gsap.fromTo(
        '.dog-2 .card',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      )
    }
  }, [])

  return (
    <>
      <section className="sectionFourth sectionFourthGgreen h-full"></section>
      <div className="sectionFourth sectionFourthBlue min-h-screen">
        <video
          src={Video}
          autoPlay
          muted
          loop
          playsInline
          className="sectionFourth relative"
        ></video>
        <div className="absolute text-[50px] text-white bottom-40">
          По рекламе для успеха на YouTube
        </div>
        <div alt="" className="dog-1 imgFourth bg-[#020308] relative z-20">
          <GradientBGSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <StarsSSSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <SetkaSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
          <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 text-[141px] font-extrabold">
            Brandformance
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {imagesData.map((item, index) => (
            <div
              key={index}
              className={`card card-${
                index + 1
              } flex items-center justify-center`}
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
                src={item.image}
                className="w-auto h-auto object-cover"
              ></img>
            </div>
          ))}
        </div>
      </div>

      <section className="sectionFourth sectionFourthGgreen"></section>
    </>
  )
}

export default FourthPage
