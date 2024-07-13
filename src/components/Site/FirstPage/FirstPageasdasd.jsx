import React, {useEffect, useRef, useState} from "react";
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
// import GradientBG from './GradientBG.png'
import m from './FirstPage.module.scss'
import Phone from 'src/assets/Site/FirstPage/Phone.png'
import Phonebg from './bgphone.png'

import { ArrowLeft } from 'lucide-react';

import fImage from 'src/assets/Site/FirstPage/1.png'
import {FacebookSvg, GradientBGSvg, InstagramSvg, SetkaSvg, StarsSSSvg, YoutubeSvg} from "@/assets/Site/site-svg.jsx";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GradientBG from './GradientBG.svg'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Navigation } from 'swiper/modules';


const FirstPage = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialMediaRef = useRef(null);
  const starsRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useEffect (() => {

    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 });
    gsap.from(sliderRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.9 });
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 });
    gsap.from(descriptionRef.current, { duration: 1, opacity: 0, y: 50, delay: 1 });
    gsap.from(buttonsRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 });
    gsap.from(socialMediaRef.current, { duration: 1, opacity: 0, y: 50, delay: 2 });


    gsap.from(starsRef.current, { duration: 1, opacity: 0, y: 0, x: 0, delay: 2 });

  }, []);

  let sliderCarouselRef = useRef(null);
  const next = () => {
    sliderCarouselRef.slickNext();
  };
  const previous = () => {
    sliderCarouselRef.slickPrev();
  };



  useEffect(() => {
    // Assign the navigation buttons only after rendering
    const swiperInstance = document.querySelector('.swiper').swiper;
    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, []);

  useEffect(() => {
    const handleSlideChange = (swiper) => {
      setActiveSlide(swiper.realIndex);
    };

    if (sliderRef.current && sliderRef.current.swiper) {
      const swiperInstance = sliderRef.current.swiper;
      swiperInstance.on('slideChange', () => handleSlideChange(swiperInstance));
    }
  }, [sliderRef.current]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          phoneRef.current.classList.add('fixed');
        } else {
          phoneRef.current.classList.remove('fixed');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
const sliderData = [
  {id: 1, image: fImage},
  {id: 2, image: fImage},
  {id: 3, image: fImage},
  {id: 4, image: fImage},
  {id: 5, image: fImage},
  {id: 6, image: fImage},
  {id: 7, image: fImage},
  {id: 8, image: fImage},
  // {id: 6, image: fImage},
  // {id: 6, image: fImage},

]
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4.95,
    speed: 500,
    arrows: false,
    afterChange: (current) => setActiveSlide(current),
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 4,
    //
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };
  return (
    <>
      {/*  <button className=" h-[38px] w-[55px] border  bg-[#020308] rounded-full" onClick={previous}>*/}
      {/*    <div className='flex justify-center'>*/}
      {/*      <ArrowLeft className='text-white'/>*/}
      {/*    </div>*/}
      {/*  </button>*/}
      {/*  <button className=" h-[38px] w-[115px] border  bg-[#020308] rounded-full" onClick={next}>*/}
      {/*    <div className='flex justify-center text-white text-xs*/}
      {/*'>*/}
      {/*      Next*/}
      {/*    </div>*/}
      {/*  </button>*/}
      <section ref={sectionRef}
               className=' relative h-screen pt-24 pb-20 flex flex-col items-center justify-between bg-[#020308]'>
        <GradientBGSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <StarsSSSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <SetkaSvg className='absolute top-0 w-[100%] -z-[5px]'/>


        <div className='mt-[60px] max-w-[1240px] m-auto relative z-20 w-full'>


          <div ref={sliderRef}>
            {/*<div className="relative">*/}
            {/*  <div className="flex justify-center absolute inset-x-0 left-[-40px]">*/}
            {/*    <div>*/}
            {/*      <img src={Phone} alt="Phone" className="relative z-50" draggable="false"/>*/}

            {/*      <img src={Phonebg} alt="Phone Background" className="absolute -z-10 top-[-20px] "*/}
            {/*           draggable="false"/>*/}
            {/*    </div>*/}

            {/*    <div className='absolute z-10 flex gap-1 bottom-[35%] w-[190px] left-[46%]'>*/}

            {/*      <div className="custom-swiper-button-prev" ref={prevRef}>Prev</div>*/}
            {/*      <div className="custom-swiper-button-next" ref={nextRef}>Next</div>*/}

            {/*    </div>*/}
            {/*  </div>*/}

            {/*</div>*/}

            <div className="relative">
              <div className="flex justify-center absolute inset-x-0 left-[-40px]">
                <div className="phone-frame">
                  <img src={Phone} alt="Phone" className="relative -z-10 h-[500px] md:h-auto" draggable="false"/>
                  <img src={Phonebg} alt="Phone Background" className="absolute -z-10 top-[-20px]" draggable="false"/>
                </div>
                <div className="absolute z-40 flex gap-1 bottom-[35%] w-[190px] left-[46%]">
                  <div className="custom-swiper-button-prev" ref={prevRef}>Prev</div>
                  <div className="custom-swiper-button-next" ref={nextRef}>Next</div>
                </div>
              </div>
            </div>

            <div className={m.Slider}>
              <Swiper
                ref={sliderRef}
                slidesPerView={5}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                modules={[Navigation]}
                pagination={{clickable: true}}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.update ();
                }}
                className="mySwiper"
              >
                {sliderData.map ((slide, index) => (
                  <SwiperSlide
                    key={slide.id}
                    data-slide-id={slide.id}
                    className={`relative z-20 w-[205px] h-[120px] ${index === activeSlide ? 'active-slide' : ''}`}
                  >
                    <div
                      className={`flex items-center justify-center slide ${
                        index === (activeSlide + 1) % sliderData.length
                          ? 'border-0 mx-auto bg-transparent'
                          : 'bg-blue-200/opacity-5 rounded-[20px] shadow-inner border border-white/opacity-10'
                      }`}
                    >
                      <img src={slide.image} alt={slide.content} className="w-[185px] h-[100px]"/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/*<Slider ref={slider => {*/}
              {/*  sliderCarouselRef = slider;*/}
              {/*}} {...settings} className="pt-[60px]">*/}
              {/*  {sliderData.map ((slide, index) => (*/}
              {/*    <div*/}
              {/*      key={slide.id}*/}
              {/*      data-slide-id={slide.id}*/}
              {/*      className={`relative w-[205px] h-[120px] ${index === activeSlide ? 'active-slide' : ''}`}*/}
              {/*    >*/}
              {/*      <div className={`*/}
              {/*      flex items-center justify-center slide*/}
              {/*      ${index === (activeSlide + 1) % sliderData.length ? 'border-0 mx-auto bg-transparent' : 'bg-blue-200/opacity-5 rounded-[20px] shadow-inner border border-white/opacity-10'}*/}
              {/*    `}>*/}
              {/*        <img src={slide.image} alt={slide.content} className="w-[185px] h-[100px]"/>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</Slider>*/}
            </div>

          </div>

        </div>

        <div className='absolute bottom-36 md:bottom-24 lg:bottom-12	z-20 px-5'>
          <div className="absolute w-full h-[171px] rounded-[150px] bg-[#02030840] bg-opacity-30 backdrop-blur-sm "/>

          <div className='w-full justify-center'>
            <h1 ref={titleRef}
                className='text-[30px] md:text-[50px] lg:text-[70px] text-white flex justify-center text-center	'>Платформа
              Онлайн Видеорекламы</h1>
            <div className='w-full justify-center flex mt-5'>
              <p ref={descriptionRef} className='text-slate-500 text-base font-normal w-[65%] md:w-[50%] text-center'>
                Онлайн платформа видеорекламы, разработанная для улучшения результатов бренда через привлекательный
                видеоконтент.
              </p>
            </div>
          </div>
          <div ref={buttonsRef} className='block lg:flex  items-center justify-between mt-10'>
            <div ref={socialMediaRef} className=' items-center gap-2 hidden lg:flex'>
              <div className='text-white '>Соц сети</div>
              <InstagramSvg/>
              <YoutubeSvg/>
              <FacebookSvg/>
            </div>


            <div className='flex gap-5 items-center justify-center'>
              <div
                className="w-[230px] h-[50px] px-[30px] py-[15px] bg-gradient-to-b from-black to-white rounded-[500px] shadow-inner border border-white/opacity-10 backdrop-blur-md justify-center items-center gap-2.5 inline-flex">
                <button className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">Заказать
                  рекламу
                </button>
              </div>
              <div
                className="w-[230px] h-[50px] px-[30px] py-[15px] bg-gradient-to-b from-black to-white rounded-[500px] shadow-inner border border-white/opacity-10 backdrop-blur-md justify-center items-center gap-2.5 inline-flex">
                <button
                  className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">монетезировать
                </button>
              </div>
            </div>

            <div
              className="text-white text-base font-normal lg:mt-0 mt-10 justify-center lg:justify-normal flex items-center gap-1">Исследовать
              <ArrowDown className='animate-bounce'/>
            </div>
          </div>
        </div>

      </section>


      <section className='h-screen' id="secondSection">
      </section>
    </>
  )
}

export default FirstPage;