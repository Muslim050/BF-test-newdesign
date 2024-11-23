// import React, { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Video from './VideoBG.mp4'
// import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
// import PageTitle from '../module/PageTitle'
// import m from './FourthPage.module.scss'
// import image1 from '@/assets/FourthPage/1.png'
// import image2 from '@/assets/FourthPage/2.png'
// import image3 from '@/assets/FourthPage/3.png'
// import image4 from '@/assets/FourthPage/4.png'
// import image5 from '@/assets/FourthPage/5.png'
// import image6 from '@/assets/FourthPage/6.png'
// import image7 from '@/assets/FourthPage/7.png'
// import image8 from '@/assets/FourthPage/8.png'
// import image9 from '@/assets/FourthPage/9.png'
// import image10 from '@/assets/FourthPage/10.png'
// import image11 from '@/assets/FourthPage/11.png'
// import image12 from '@/assets/FourthPage/12.png'
// import image13 from '@/assets/FourthPage/13.png'
// import image14 from '@/assets/FourthPage/14.png'
// import image15 from '@/assets/FourthPage/15.png'
//
// const imagesData = [
//   { id: 1, image: image1 },
//   { id: 2, image: image2 },
//   { id: 3, image: image3 },
//   { id: 4, image: image4 },
//   { id: 5, image: image5 },
//   { id: 6, image: image6 },
//   { id: 7, image: image7 },
//   { id: 8, image: image8 },
//   { id: 9, image: image9 },
//   { id: 10, image: image10 },
//   { id: 11, image: image11 },
//   { id: 12, image: image12 },
//   { id: 13, image: image13 },
//   { id: 14, image: image14 },
//   { id: 15, image: image15 },
// ]
// gsap.registerPlugin(ScrollTrigger)
//
// const FourthPage = () => {
//   const containerRefImageData = useRef(null)
//
//   useEffect(() => {
//     const container = containerRefImageData.current
//
//     if (container) {
//       const isMobile = window.innerWidth < 768
//       const endValue = isMobile ? '+=400%' : '+=200%'
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: '.sectionFourthBlue',
//           start: 'top top',
//           end: endValue, // Увеличь пространство, чтобы плавно завершить анимацию
//           // Увеличь продолжительность анимации
//           scrub: 1, // slower scrub might make it smoother
//           pinSpacing: true, // Отключаем дополнительное пространство
//           pin: true,
//         },
//       })
//
//       tl.fromTo(
//         '.dog-1',
//         { opacity: 0, scale: 6 },
//         { opacity: 1, scale: 1, duration: 2, ease: 'power1.out' },
//       ).to('.dog-2', { opacity: 1, duration: 2, ease: 'power1.out' })
//
//       gsap.fromTo(
//         container,
//         { opacity: 1, y: 1300 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 2,
//           scrollTrigger: {
//             trigger: container,
//             start: 'top bottom',
//             end: 'bottom',
//             scrub: 1, // slower scrub might make it smoother
//             ease: 'power1.out', // Добавляем easing для плавности
//           },
//         },
//       )
//     }
//   }, [])
//   useEffect(() => {
//     const container = containerRefImageData.current
//
//     if (container) {
//       const rows = gsap.utils.toArray('.card') // Получаем массив всех строк
//
//       gsap.fromTo(
//         rows,
//         { opacity: 0, y: 100 }, // Начальное состояние
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1, // Длительность анимации для каждого ряда
//           stagger: 1, // Задержка между анимациями строк
//           ease: 'power4.out',
//           scrollTrigger: {
//             trigger: container,
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: 1, // Плавное течение анимации во время скролла
//           },
//         },
//       )
//     }
//   }, [])
//   const cardRef = useRef(null)
//   const sparkleRef = useRef(null)
//
//   useEffect(() => {
//     const card = cardRef.current
//     const sparkles = sparkleRef.current
//
//     // Анимация при наведении
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e
//
//       gsap.to(sparkles, {
//         x: clientX - card.getBoundingClientRect().left,
//         y: clientY - card.getBoundingClientRect().top,
//         duration: 0.3,
//         ease: 'power3.out',
//         opacity: 1,
//       })
//     }
//
//     const handleMouseLeave = () => {
//       gsap.to(sparkles, {
//         opacity: 0,
//         duration: 0.3,
//         ease: 'power3.out',
//       })
//     }
//
//     card.addEventListener('mousemove', handleMouseMove)
//     card.addEventListener('mouseleave', handleMouseLeave)
//
//     return () => {
//       card.removeEventListener('mousemove', handleMouseMove)
//       card.removeEventListener('mouseleave', handleMouseLeave)
//     }
//   }, [])
//
//   const [gridStyle, setGridStyle] = React.useState({
//     height: 'auto',
//     opacity: 0,
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)', // По умолчанию 2 колонки
//     gap: '16px',
//   });
//
//   useEffect(() => {
//     const updateGridStyle = () => {
//       if (window.innerWidth >= 768) {
//         setGridStyle((prevStyle) => ({
//           ...prevStyle,
//           gridTemplateColumns: 'repeat(3, 1fr)', // 3 колонки на экранах от 768px
//         }));
//       } else {
//         setGridStyle((prevStyle) => ({
//           ...prevStyle,
//           gridTemplateColumns: 'repeat(2, 1fr)', // 2 колонки на экранах меньше 768px
//         }));
//       }
//     };
//
//     // Устанавливаем начальное значение при загрузке компонента
//     updateGridStyle();
//
//     // Добавляем слушатель события изменения размера экрана
//     window.addEventListener('resize', updateGridStyle);
//
//     // Убираем слушатель при размонтировании компонента
//     return () => {
//       window.removeEventListener('resize', updateGridStyle);
//     };
//   }, []);
//   return (
//     <>
//       <section className="sectionFourth sectionFourthBlue ">
//         <video
//           src={Video}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover	p-[5px]"
//         ></video>
//
//         <PageTitle title={'По рекламе для успеха на YouTube'} />
//         <div alt="" className="dog-1 absolute w-full h-full  ">
//           {/* <SetkaSvg className="absolute top-0 left-0 w-[100%] z-10" /> */}
//           <div alt="" className="absolute w-full h-full    ">
//             <GradientBGSvg className="absolute top-0 left-0 w-full h-auto z-10" />
//             <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-auto z-10 " />
//             <video
//               src={Video}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="absolute top-0 left-0 w-full h-full object-cover	p-[5px]"
//             ></video>
//             <div className="mix-blend-multiply m-auto	font-black	uppercase absolute top-0 left-0 w-full h-full text-white bg-[#05060a] text-[35px] flex justify-center flex-col items-center ">
//               Brandformance
//             </div>
//           </div>
//         </div>
//         <div
//           ref={containerRefImageData}
//           alt=""
//           className={`dog-2 imgFourth grid grid-cols-3 md:grid-cols-2 gap-4 p-4 max-w-[1240px] w-full m-auto`}
//           style={gridStyle}
//         >
//           <div ref={sparkleRef} className={m.sparkles} />
//
//           {imagesData.map((item, index) => (
//             <div
//               key={index}
//               ref={cardRef}
//               className={`card card-${index} ${m.cardWrapper} flex items-center justify-center`}
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
//                 loading="lazy"
//                 src={item.image}
//                 className="w-auto h-auto max-w-[150px] object-cover"
//               ></img>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }
//
// export default FourthPage


import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Video from './VideoBG.mp4';
import { GradientBGSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx';
import PageTitle from '../module/PageTitle';
import m from './FourthPage.module.scss';
import image1 from '@/assets/FourthPage/1.png';
import image2 from '@/assets/FourthPage/2.png';
import image3 from '@/assets/FourthPage/3.png';
import image4 from '@/assets/FourthPage/4.png';
import image5 from '@/assets/FourthPage/5.png';
import image6 from '@/assets/FourthPage/6.png';
import image7 from '@/assets/FourthPage/7.png';
import image8 from '@/assets/FourthPage/8.png';
import image9 from '@/assets/FourthPage/9.png';
import image10 from '@/assets/FourthPage/10.png';
import image11 from '@/assets/FourthPage/11.png';
import image12 from '@/assets/FourthPage/12.png';
import image13 from '@/assets/FourthPage/13.png';
import image14 from '@/assets/FourthPage/14.png';
import image15 from '@/assets/FourthPage/15.png';

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
];

gsap.registerPlugin(ScrollTrigger);

const FourthPage = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const sparkleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const isMobile = window.innerWidth < 768;
      const endValue = isMobile ? '+=400%' : '+=200%';

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sectionFourthBlue',
          start: 'top top',
          end: endValue,
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        '.dog-1',
        { opacity: 0, scale: 6 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power1.out' }
      ).to('.dog-2', { opacity: 1, duration: 2, ease: 'power1.out' });

      gsap.fromTo(
        container,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom',
            scrub: 1,
          },
        }
      );

      const rows = gsap.utils.toArray('.card');
      gsap.fromTo(
        rows,
        { opacity: 0, y: 1000 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const sparkle = sparkleRef.current;

    let animationFrame;

    const handleMouseMove = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        gsap.to(sparkle, {
          x: clientX - card.getBoundingClientRect().left,
          y: clientY - card.getBoundingClientRect().top,
          duration: 0.3,
          ease: 'power3.out',
          opacity: 1,
        });
      });
    };

    const handleMouseLeave = () => {
      gsap.to(sparkle, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="sectionFourth sectionFourthBlue">
      <video
        src={Video}
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <PageTitle title="По рекламе для успеха на YouTube" />
      <div className="dog-1 absolute w-full h-full">
        <GradientBGSvg className="absolute top-0 left-0 w-full h-auto z-10"/>
        <StarsSSSvg className="absolute top-0 left-0 w-full h-auto z-10"/>
        <div
          className="mix-blend-multiply m-auto	font-black	uppercase absolute top-0 left-0 w-full h-full text-white bg-[#05060a] text-[35px] flex justify-center flex-col items-center ">
          Brandformance
        </div>
      </div>
      <div
        ref={containerRef}
        className="dog-2 imgFourth grid grid-cols-3 md:grid-cols-2 gap-4 p-4 max-w-[1240px] w-full m-auto"
      >
        <div ref={sparkleRef} className={m.sparkles}/>
        <div className={m.wrapperCard}>
          {imagesData.map ((item ,index) => (
            <div
              key={item.id}
              ref={cardRef}
              className={`card card-${index} ${m.cardWrapper} flex items-center justify-center`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  '0px 16px 32px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
                borderRadius: '20px',
              }}
            >
              <img
                loading="lazy"
                src={item.image}
                alt={`Image ${item.id}`}
                className="w-auto h-auto max-w-[150px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourthPage;
