// import React, { useEffect, useState, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Logo from '@/assets/Logo.png'
// import Header from 'src/components/Site/Header/Header'
// import FirstPage from '@/components/Site/FirstPage/FirstPage.jsx'
// import FourthPage from '@/components/Site/FourthPage/index.jsx'
// import FifthPage from '@/components/Site/FifthPage/index.jsx'
// import SixthPage from '@/components/Site/SixthPage/index.jsx'
// import SeventhPage from '@/components/Site/SeventhPage/index.jsx'
// import Footer from '../../components/Site/Footer'
// import ThirdPage from '../../components/Site/ThirdPage'
// import FifthPage2 from '../../components/Site/FifthPage2'
// import {
//   GradientBGSvg,
//   EllipseSvg,
//   EllipseSvg2,
//   StarsSSSvg,
//   SetkaSvg,
// } from '@/assets/Site/site-svg.jsx'

// gsap.registerPlugin(ScrollTrigger)

// const Site = () => {
//   const [loading, setLoading] = useState(true)
//   const containerRef = useRef(null)
//   const textRef = useRef(null)
//   const circleRef = useRef(null)
//   const circleRef2 = useRef(null)
//   const circleRef3 = useRef(null)
//   const contentRef = useRef(null)

//   useEffect(() => {
//     const timeline = gsap.timeline({
//       onComplete: () => {
//         gsap.to(contentRef.current, {
//           opacity: 1,
//           duration: 1,
//           ease: 'power1.inOut',
//         })
//         setLoading(false) // Сначала запускаем анимацию, затем переключаем состояние загрузки
//       },
//     })

//     timeline
//       .fromTo(
//         textRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 1.5, ease: 'circ.inOut' },
//       )
//       .fromTo(
//         circleRef.current,
//         { opacity: 0, rotation: 0 },
//         { opacity: 1, rotation: 360, duration: 1.5, ease: 'circ.inOut' },
//         '-=0.5',
//       )
//       .fromTo(
//         circleRef2.current,
//         { opacity: 0, rotation: 0 },
//         { opacity: 1, rotation: 380, duration: 2, ease: 'circ.inOut' },
//         '-=1',
//       )
//       .to(
//         containerRef.current,
//         { opacity: 0, duration: 1, ease: 'power1.inOut' }, // Плавное исчезновение контейнера
//         '-=0.5', // Добавляем небольшое перекрытие, чтобы анимация началась чуть раньше
//       )
//   }, [])

//   return (
//     <div className="site-wrapper">
//       {loading && (
//         <div ref={containerRef} className="loading-container">
//           <GradientBGSvg className="absolute top-0 w-full z-negative" />
//           <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
//             <div ref={circleRef} className="relative">
//               <EllipseSvg className="absolute top-1/2 transform -translate-y-1/2 w-full z-negative" />
//             </div>
//             <div ref={circleRef2} className="relative" style={{ opacity: 0 }}>
//               <EllipseSvg2 className="absolute top-1/2 transform -translate-y-1/2 w-full z-negative" />
//             </div>
//             <div ref={circleRef3} className="relative" style={{ opacity: 0 }}>
//               <StarsSSSvg className="absolute top-1/2 transform -translate-y-1/2 w-full z-negative" />
//             </div>
//             <div
//               ref={textRef}
//               className="absolute left-0 w-full flex justify-center"
//             >
//               <div className="text-white text-2xl font-bold">
//                 <img
//                   src={Logo}
//                   alt="Логотип"
//                   className="w-14 h-16 absolute -top-20 left-1/2 transform -translate-x-1/2"
//                 />
//                 Brandformance
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div
//         ref={contentRef}
//         style={{
//           opacity: 0,
//         }}
//       >
//         <Header />
//         <FirstPage />
//         <ThirdPage />
//         <FourthPage />
//         <FifthPage />
//         <FifthPage2 />
//         <SixthPage />
//         <SeventhPage />
//         <Footer />
//       </div>
//     </div>
//   )
// }

// export default Site
import React, { useEffect, useRef } from 'react'
import Header from 'src/components/Site/Header/Header'

import style from './site.module.scss'
import FirstPage from '@/components/Site/FirstPage/FirstPage.jsx'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import FourthPage from '@/components/Site/FourthPage/index.jsx'

import FifthPage from '@/components/Site/FifthPage/index.jsx'
import SixthPage from '@/components/Site/SixthPage/index.jsx'
import SeventhPage from '@/components/Site/SeventhPage/index.jsx'
import Footer from '../../components/Site/Footer'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import ThirdPage from '../../components/Site/ThirdPage'
import Loading from './Loading'
import FifthPage2 from '../../components/Site/FifthPage2'
gsap.registerPlugin(ScrollTrigger)

function Site() {
  const [loading, setLoading] = React.useState(true)

  return (
    <div className={`${style.wrapperSite} `}>
      {loading ? (
        <Loading onComplete={() => setLoading(false)} />
      ) : (
        <div>
          <Header />

          <FirstPage />
          <ThirdPage />

          <FourthPage />

          <FifthPage />
          <FifthPage2 />

          <SixthPage />
          <SeventhPage />

          <Footer />
        </div>
      )}
    </div>
  )
}

export default Site
