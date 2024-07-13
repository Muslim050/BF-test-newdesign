


import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import 'tailwindcss/tailwind.css';
import { FacebookSvg, GradientBGSvg, InstagramSvg, SetkaSvg, StarsSSSvg, YoutubeSvg } from "@/assets/Site/site-svg.jsx";
import Phone from "@/assets/Site/FirstPage/Phone.png";
import Phonebg from "@/components/Site/FirstPage/bgphone.png";
import {ArrowDown} from "lucide-react";
import fImage from "@/assets/Site/FirstPage/1.png";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";


import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import m from "@/components/Site/FirstPage/FirstPage.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);


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

const FirstPage = () => {
  const phoneRef = useRef(null);
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
  // useEffect(() => {
  //   // Assign the navigation buttons only after rendering
  //   const swiperInstance = document.querySelector('.swiper').swiper;
  //   swiperInstance.params.navigation.prevEl = prevRef.current;
  //   swiperInstance.params.navigation.nextEl = nextRef.current;
  //   swiperInstance.navigation.init();
  //   swiperInstance.navigation.update();
  // }, []);
  let sliderCarouselRef = useRef(null);
  const next = () => {
    sliderCarouselRef.slickNext();
  };
  const previous = () => {
    sliderCarouselRef.slickPrev();
  };
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
    gsap.to(phoneRef.current, {
      // y: (window.innerHeight) - 50, // Adjust the value to make the phone move to the bottom of the second page
      y: (window.innerHeight) - 50,
      scale: 1.2,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#second-page',
        start: 'top bottom', // Start when the top of the second page hits the bottom of the viewport
        end: 'bottom bottom', // End when the bottom of the second page is at the bottom of the viewport
        scrub: true,
      }
    });
  }, []);
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
    <div className="relative min-h-screen  ">
      <div id="first-page" className="h-screen ">
        <GradientBGSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <StarsSSSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <SetkaSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <div className='absolute inset-x-0 z-20 px-5 mt-[100px] max-w-[1240px] w-full m-auto'>
          <div className="absolute w-full h-[171px] rounded-[150px]"/>
          <div className='w-full justify-center'>
            <h1
              className='text-[30px] md:text-[50px] lg:text-[50px] text-white flex justify-center text-center'>Платформа
              Онлайн Видеорекламы</h1>
            <div className='w-full justify-center flex mt-5'>
              <p className='text-slate-500 text-base font-normal w-[65%] md:w-[50%] text-center'>
                Онлайн платформа видеорекламы, разработанная для улучшения результатов бренда через привлекательный
                видеоконтент.
              </p>
            </div>
          </div>
          <div className='block lg:flex items-center justify-between mt-10'>
            <div className='items-center gap-2 hidden lg:flex'>
              <div className='text-white'>Соц сети</div>
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
                  className="text-white text-base font-normal font-['Helvetica Neue'] leading-relaxed">Монетизировать
                </button>
              </div>
            </div>
            <div
              className="text-white text-base font-normal lg:mt-0 mt-10 justify-center lg:justify-normal flex items-center gap-1">
              Исследовать
              <ArrowDown className='animate-bounce'/>
            </div>
          </div>
        </div>
      </div>
      <div id="second-page" className="h-screen relative">
        <GradientBGSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <StarsSSSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <SetkaSvg className='absolute top-0 w-[100%] -z-[5px]'/>
        <h1 className="text-white text-4xl">Second Page</h1>
      </div>


      <div ref={phoneRef} className="fixed bottom-[45%] text-white p-4 text-2xl rounded-lg shadow-lg w-full">
        <div className="flex justify-center">
          {/*<div className="absolute z-40 flex gap-1 bottom-[35%] w-[190px] left-[46%]">*/}
          {/*  <div className="custom-swiper-button-prev" ref={prevRef}>Prev</div>*/}
          {/*  <div className="custom-swiper-button-next" ref={nextRef}>Next</div>*/}
          {/*</div>*/}
          <div className="relative z-10  ">
            <img src={Phone} alt="Phone" draggable="false" className="w-auto h-auto"/>
            <div className='bg-[#000000b3] blur-sm w-full h-10 absolute bottom-0'/>
            <img src={Phonebg} alt="Phone Background" className="absolute -z-10 top-[-25px] right-0" draggable="false"/>


            {/*<div className='absolute '>*/}
            {/*  <Slider ref={slider => {*/}
            {/*    sliderCarouselRef = slider;*/}
            {/*  }} {...settings} className="pt-[60px]">*/}
            {/*    {sliderData.map ((slide, index) => (*/}
            {/*      <div*/}
            {/*        key={slide.id}*/}
            {/*        data-slide-id={slide.id}*/}
            {/*        className={`relative w-[205px] h-[120px] ${index === activeSlide ? 'active-slide' : ''}`}*/}
            {/*      >*/}
            {/*        <div className={`*/}
            {/*        flex items-center justify-center slide*/}
            {/*        ${index === (activeSlide + 1) % sliderData.length ? 'border-0 mx-auto bg-transparent' : 'bg-blue-200/opacity-5 rounded-[20px] shadow-inner border border-white/opacity-10'}*/}
            {/*      `}>*/}
            {/*          <img src={slide.image} alt={slide.content} className="w-[185px] h-[100px]"/>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*  </Slider>*/}
            {/*</div>*/}
              {/*<Swiper*/}
              {/*  ref={sliderRef}*/}
              {/*  slidesPerView={5}*/}
              {/*  centeredSlides={true}*/}
              {/*  spaceBetween={30}*/}
              {/*  grabCursor={true}*/}
              {/*  // loop={true}*/}
              {/*  modules={[Navigation]}*/}
              {/*  pagination={{clickable: true}}*/}
              {/*  navigation={{*/}
              {/*    prevEl: prevRef.current,*/}
              {/*    nextEl: nextRef.current,*/}
              {/*  }}*/}
              {/*  onInit={(swiper) => {*/}
              {/*    swiper.params.navigation.prevEl = prevRef.current;*/}
              {/*    swiper.params.navigation.nextEl = nextRef.current;*/}
              {/*    swiper.navigation.update ();*/}
              {/*  }}*/}
              {/*  className='mySwiper'*/}
              {/*>*/}
              {/*  /!*{sliderData.map ((slide, index) => (*!/*/}
              {/*  /!*  <SwiperSlide*!/*/}
              {/*  /!*    key={index}*!/*/}
              {/*  /!*    className={`w-[205px] h-[120px] ${index === activeSlide ? 'active-slide' : ''}`}*!/*/}
              {/*  /!*  >*!/*/}
              {/*  /!*    <div*!/*/}
              {/*  /!*      className={`flex items-center justify-center slide ${*!/*/}
              {/*  /!*        index === (activeSlide + 1) % sliderData.length*!/*/}
              {/*  /!*          ? 'border-0 mx-auto bg-transparent'*!/*/}
              {/*  /!*          : 'bg-blue-200/opacity-5 rounded-[20px] shadow-inner border border-white/opacity-10'*!/*/}
              {/*  /!*      }`}*!/*/}
              {/*  /!*    >*!/*/}
              {/*  /!*      <img className="w-[185px] h-[100px] bg-red-500"/>*!/*/}
              {/*  /!*    </div>*!/*/}
              {/*  /!*  </SwiperSlide>*!/*/}
              {/*  /!*))}*!/*/}

              {/*      <SwiperSlide*/}
              {/*          className={`w-[205px] h-[120px] ${1 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*        >*/}
              {/*      Slide 1*/}
              {/*    </SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${2 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >*/}
              {/*    Slide 2*/}
              {/*  </SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${3 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >Slide 3</SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${4 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >Slide 4</SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${5 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >Slide 5</SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${6 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >Slide 6</SwiperSlide>*/}
              {/*  <SwiperSlide*/}
              {/*   */}
              {/*    className={`w-[205px] h-[120px] ${7 === activeSlide ? 'active-slide' : ''}`}*/}
              {/*  >Slide 7</SwiperSlide>*/}

              {/*</Swiper>*/}


          </div>

        </div>
      </div>
    </div>
);
}
export default FirstPage;
