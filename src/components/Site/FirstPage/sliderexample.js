import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import m from './FirstPage.module.scss';
import Phone from 'src/assets/Site/FirstPage/Phone.png';
import Phonebg from './bgphone.png';
import fImage from 'src/assets/Site/FirstPage/1.png';
import { FacebookSvg, GradientBGSvg, InstagramSvg, SetkaSvg, StarsSSSvg, YoutubeSvg } from "@/assets/Site/site-svg.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

const FirstPage = () => {
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    // Появление телефона снизу при первом рендере
    gsap.fromTo(phoneRef.current,
      { y: '100vh', opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );

    // Закрепляем телефон в первой секции
    ScrollTrigger.create({
      trigger: sectionRef1.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: phoneRef.current,
      pinSpacing: false,
      markers: true, // маркеры для отладки
    });

    // Перемещение телефона в нижнюю часть второй секции
    gsap.to(phoneRef.current, {
      scrollTrigger: {
        trigger: sectionRef2.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        pinSpacing: false,
        markers: true, // маркеры для отладки
      },
      y: () => window.innerHeight,
    });
  }, []);

  const sliderData = [
    { id: 1, image: fImage },
    { id: 2, image: fImage },
    { id: 3, image: fImage },
    { id: 4, image: fImage },
    { id: 5, image: fImage },
    { id: 6, image: fImage },
    { id: 7, image: fImage },
    { id: 8, image: fImage },
  ];

  return (
    <>
      <section ref={sectionRef1} className='relative h-screen pt-24 pb-20 flex flex-col items-center justify-between bg-[#020308]'>
        <GradientBGSvg className='absolute top-0 w-[100%] -z-[5px]' />
        <StarsSSSvg className='absolute top-0 w-[100%] -z-[5px]' />
        <SetkaSvg className='absolute top-0 w-[100%] -z-[5px]' />
        <div className='absolute z-20 px-5 mt-[100px] max-w-[1240px] w-full m-auto'>
          <div className="absolute w-full h-[171px] rounded-[150px]" />
          <div className='w-full justify-center'>
            <h1 className='text-[30px] md:text-[50px] lg:text-[50px] text-white flex justify-center text-center'>Платформа Онлайн Видеорекламы</h1>
            <div className='w-full justify-center flex mt-5'>
              <p className='text-slate-500 text-base font-normal w-[65%] md:w-[50%] text-center'>
                Онлайн платформа видеорекламы, разработанная для улучшения результатов бренда через привлекательный видеоконтент.
              </p>
            </div>
          </div>
          <div className='block lg:flex items-center justify-between mt-10'>
            <div className='items-center gap-2 hidden lg:flex'>
              <div className='text-white'>Соц сети</div>
              <InstagramSvg />
              <YoutubeSvg />
              <FacebookSvg />
            </div>
            <div className='flex gap-5 items-center justify-center'>
              <div className="w-[230px] h-[50px] px-[30px] py-[15px] bg-gradient-to-b from-black to-white rounded-[500px] shadow-inner border border-white/opacity-10 backdrop-blur-md justify-center items-center gap-2.5 inline-flex">
                <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">Заказать рекламу</button>
              </div>
              <div className="w-[230px] h-[50px] px-[30px] py-[15px] bg-gradient-to-b from-black to-white rounded-[500px] shadow-inner border border-white/opacity-10 backdrop-blur-md justify-center items-center gap-2.5 inline-flex">
                <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">Монетизировать</button>
              </div>
            </div>
            <div className="text-white text-base font-normal lg:mt-0 mt-10 justify-center lg:justify-normal flex items-center gap-1">
              Исследовать
              <ArrowDown className='animate-bounce' />
            </div>
          </div>
        </div>
        <div className='mt-[60px] max-w-[1240px] h-full m-auto absolute bottom-0 z-20 w-full'>
          <div ref={phoneRef} className="relative">
            <div className="flex justify-center absolute inset-x-0 bottom-0">
              <div className="phone-frame">
                <img src={Phone} alt="Phone" className="relative -z-10 h-[500px] md:h-auto" draggable="false" />
                <img src={Phonebg} alt="Phone Background" className="absolute -z-10 top-[-20px]" draggable="false" />
                <div className='bg-red-500 blur-sm' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef2} className='relative h-screen pt-24 pb-20 flex flex-col items-center justify-between bg-[#020308]'>
        <GradientBGSvg className='absolute top-0 w-[100%] -z-[5px]' />
        <StarsSSSvg className='absolute top-0 w-[100%] -z-[5px]' />
        <SetkaSvg className='absolute топ-0 w-[100%] -z-[5px]' />
      </section>
    </>
  );
}

export default FirstPage;

