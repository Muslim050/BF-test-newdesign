
//
// import React, {useEffect, useRef} from 'react'
// import {gsap} from "gsap";
//
// function FifthPage() {
//
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const phoneRef = useRef(null);
//
//   useEffect (() => {
//     gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 });
//     gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 });
//     gsap.from(descriptionRef.current, { duration: 1, opacity: 0, y: 50, delay: 1 });
//     gsap.from(phoneRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 });
//   }, []);
//
//   return (
//     <section ref={sectionRef} className='h-screen pt-24 pb-20 bg-gray-700 flex flex-col items-center justify-between'>
//       <div>
//         <div ref={titleRef}>Реклама которую Увидели Миллионы Людей</div>
//         <div ref={descriptionRef}>Реклама которую Увидели Миллионы Людей</div>
//       </div>
//       <div ref={phoneRef}>
//         Реклама которую Увидели Миллионы Людей
//       </div>
//
//     </section>
//   )
// }
//
// export default FifthPage



import React, {useEffect, useRef} from 'react'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function FifthPage() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      {/* A return function for killing the animation on component unmount */ }
      pin.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      {/* The section up act just as a wrapper. If the trigger (below) is the
      first jsx element in the component, you get an error on route change */}

      {/* The div below act just as a trigger. As the doc suggests, the trigger and
      the animation should alway be two separated refs */}
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          <div className="scroll-section">
            <h3>Section 1</h3>
          </div>
          <div className="scroll-section">
            <h3>Section 2</h3>
          </div>
          <div className="scroll-section">
            <h3>Section 3</h3>
          </div>
          <div className="scroll-section">
            <h3>Section 4</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FifthPage
