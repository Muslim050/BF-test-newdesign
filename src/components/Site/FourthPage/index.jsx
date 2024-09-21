import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Video from './VideoBG.mp4'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import PageTitle from '../module/PageTitle'

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
        { opacity: 0, scale: 6 },
        { opacity: 1, scale: 1 },
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
            // onUpdate: (self) => {
            //   gsap.to(container, {
            //     yPercent: -50 * self.progress, // Move the container upward based on scroll progress
            //     ease: 'none', // No easing, makes the animation linear
            //   })
            // },
          },
        },
      )
      // imagesData.forEach((_, index) => {
      //   const cardClass = `.card`
      //   if (document.querySelector(cardClass)) {
      //     gsap.fromTo(
      //       cardClass,
      //       { opacity: 0, y: 100 }, // Initial state: invisible, with downward offset
      //       {
      //         opacity: 1,
      //         y: 0,
      //         delay: rowIndex * 0.5 + index * 0.2, // Delay per row and card
      //         duration: 1,
      //         scrollTrigger: {
      //           trigger: container,
      //           start: 'top top+=200', // Start the animation after the container appears
      //           end: 'bottom bottom',
      //           scrub: 0.5, // Sync with scroll
      //         },
      //       },
      //     )
      //   }
      // })
      imagesData.forEach((_, index) => {
        const cardClass = `.card`
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
                end: `bottom `,
                scrub: 0.5,
                toggleActions: 'play none none reverse',
              },
            },
          )
        }
      })

      gsap.fromTo(
        '.dog-2 .card',
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom+=200', // Когда контейнер появится в центре экрана, анимация начнется
            end: 'bottom center',
            scrub: 0.5,
            toggleActions: 'play none none reverse',
          },
        },
      )
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

// import React, { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Video from './VideoBG.mp4'
// import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'

// const imagesData = [
//   { id: 1, image: '/FourthPage/1.png' },
//   { id: 2, image: '/FourthPage/2.png' },
//   { id: 3, image: '/FourthPage/3.png' },
//   { id: 4, image: '/FourthPage/4.png' },
//   { id: 5, image: '/FourthPage/5.png' },
//   { id: 6, image: '/FourthPage/6.png' },
//   { id: 7, image: '/FourthPage/7.png' },
//   { id: 8, image: '/FourthPage/8.png' },
//   { id: 9, image: '/FourthPage/9.png' },
//   { id: 10, image: '/FourthPage/10.png' },
//   { id: 11, image: '/FourthPage/11.png' },
//   { id: 12, image: '/FourthPage/12.png' },
//   { id: 13, image: '/FourthPage/13.png' },
//   { id: 14, image: '/FourthPage/14.png' },
//   { id: 15, image: '/FourthPage/15.png' },
//   { id: 16, image: '/FourthPage/16.png' },
//   { id: 17, image: '/FourthPage/17.png' },
//   { id: 18, image: '/FourthPage/18.png' },
// ]

// gsap.registerPlugin(ScrollTrigger)

// const FourthPage = () => {
//   const containerRefImageData = useRef(null)
//   const sectionMainTitle = useRef(null)

//   useEffect(() => {
//     const container = containerRefImageData.current

//     if (container) {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: '.sectionFourthBlue',
//           start: 'top top',
//           end: '+=300%',
//           scrub: 0.5,
//           pin: true,
//         },
//       })

//       tl.fromTo(
//         '.dog-1',
//         { opacity: 0, scale: 6 },
//         { opacity: 1, scale: 1 },
//       ).to('.dog-2', { opacity: 1, duration: 1 })

//       // gsap.to(container, {
//       //   yPercent: -150,
//       //   ease: 'none',
//       //   scrollTrigger: {
//       //     trigger: container,
//       //     start: 'top bottom',
//       //     end: 'bottom+=500%',
//       //     scrub: 0.5,
//       //     pin: true,
//       //   },
//       // })
//       gsap.fromTo(
//         container,
//         { opacity: 0, y: 300 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 2,
//           scrollTrigger: {
//             trigger: container, // Элемент, который будет запускать анимацию
//             start: 'top bottom+=900', // Когда контейнер появится в центре экрана, анимация начнется
//             end: 'bottom+=300%', // Когда контейнер выйдет из центра экрана, анимация завершится
//             scrub: 1, // Анимация будет синхронизирована с прокруткой
//             pin: true, // Закрепляем элемент на экране во время анимации
//             onUpdate: (self) => {
//               gsap.to(container, {
//                 yPercent: -220 * self.progress, // Двигаем элемент вверх по мере прокрутки
//                 ease: 'none',
//               })
//             },
//           },
//         },
//       )
//       gsap.from(sectionMainTitle.current, {
//         scrollTrigger: {
//           trigger: sectionMainTitle.current,
//           start: 'top center+=400', // Когда контейнер появится в центре экрана, анимация начнется
//           end: 'top center+=00', // Когда контейнер появится в центре экрана, анимация начнется
//           scrub: true,
//         },
//         duration: 1.5,
//         opacity: 0,
//         y: -50, // Смещение по горизонтали
//       })
//       imagesData.forEach((_, index) => {
//         const cardClass = `.card`
//         if (document.querySelector(cardClass)) {
//           gsap.fromTo(
//             cardClass,
//             { opacity: 0, y: 100 },
//             {
//               opacity: 1,
//               y: 0,
//               scrollTrigger: {
//                 trigger: container,
//                 start: `top bottom+=${index * 100}`,
//                 end: `bottom+=${(imagesData.length - index) * 100}`,
//                 scrub: 0.5,
//                 toggleActions: 'play none none reverse',
//               },
//             },
//           )
//         }
//       })

//       gsap.fromTo(
//         '.dog-2 .card',
//         { opacity: 0, y: -10 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           stagger: 0.1,
//           scrollTrigger: {
//             trigger: container,
//             start: 'top bottom+=400', // Когда контейнер появится в центре экрана, анимация начнется
//             end: 'bottom center',
//             scrub: 0.5,
//             toggleActions: 'play none none reverse',
//           },
//         },
//       )
//     }
//   }, [])

//   return (
//     <>
//       <section
//         className="sectionFourth sectionFourthGgreen "
//         id="FourthPageP"
//       ></section>
//       <div className="sectionFourth sectionFourthBlue min-h-screen">
//         <video
//           src={Video}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover	"
//         ></video>
//         <div
//           ref={sectionMainTitle}
//           style={{
//             background:
//               'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             textFillColor: 'transparent',
//             letterSpacing: '-0.03em',

//             textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
//           }}
//           className="absolute text-[35px] text-center md:text-[40px] lg:text-[60px]  bottom-40"
//         >
//           По рекламе для успеха на YouTube
//         </div>
//         <div alt="" className="dog-1 absolute w-full h-full bg-[#020308]  ">
//           <GradientBGSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />
//           <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-auto  -z-[5px]" />
//           <SetkaSvg className="absolute top-0 left-0 w-[100%] -z-[5px]" />

//           <div alt="" className="absolute w-full h-full bg-[#020308]  ">
//             <video
//               src={Video}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="absolute top-0 left-0 w-full h-full object-cover	"
//             ></video>
//             <div className="mix-blend-multiply m-auto	font-black	uppercase absolute top-0 left-0 w-full h-full text-white bg-[#020308] text-[6vw] flex justify-center flex-col items-center ">
//               Brandformance
//             </div>
//           </div>
//         </div>
//         <div
//           ref={containerRefImageData}
//           alt=""
//           className="dog-2 imgFourth grid grid-cols-3 gap-4 p-4 max-w-[1240px] w-full m-auto "
//           style={{
//             height: 'auto',
//             opacity: 0,
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: '16px',
//           }}
//         >
//           {imagesData.map((item, index) => (
//             <div
//               key={index}
//               className={`card card-${index} flex items-center justify-center hover:scale-125 transition-all `}
//               style={{
//                 background:
//                   'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
//                 border: '0.5px solid rgba(255, 255, 255, 0.1)',
//                 boxShadow:
//                   '0px 16px 32px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
//                 borderRadius: '20px',
//                 height: 'auto',
//                 width: 'auto',
//               }}
//             >
//               <img
//                 src={item.image}
//                 className="w-auto h-auto object-cover"
//               ></img>
//             </div>
//           ))}
//         </div>
//       </div>

//       <section className="sectionFourth sectionFourthGgreen"></section>
//     </>
//   )
// }

// export default FourthPage
