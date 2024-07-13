import React, {useEffect, useRef} from 'react'
import {gsap} from "gsap";

function SixthPage() {

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect (() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 });
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 });
    gsap.from(descriptionRef.current, { duration: 1, opacity: 0, y: 50, delay: 1 });
    gsap.from(phoneRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 });
  }, []);

  return (
    <section ref={sectionRef} className='h-screen pt-24 pb-20 bg-gray-800 flex flex-col items-center justify-between'>
      <div>
        <div ref={titleRef}>Часто задаваемые вопросы? </div>
        <div ref={descriptionRef}>Часто задаваемые вопросы? </div>
      </div>
      <div ref={phoneRef}>
        Часто задаваемые вопросы?
      </div>

    </section>
  )
}

export default SixthPage
