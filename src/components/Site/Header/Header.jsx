import React, {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { AlignJustify } from 'lucide-react';

import Logo from 'src/assets/Site/logo.png'
const Header = () => {
  const logoRef = useRef(null);
  const borderRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leftMenuRef = useRef([]);
  const rightMenuRef = useRef([]);
  const mobileMenuRef = useRef(null);

  leftMenuRef.current = [];
  rightMenuRef.current = [];

  useEffect(() => {
    const tl = gsap.timeline();
    // Появление логотипа и рамки
    tl.from(logoRef.current, { opacity: 0, stagger: 0.2, scale: 0, duration: 1.5, ease: "power4.out" })
      .to(borderRef.current, { width: '80px', height: '80px', duration: 1.5, ease: "power4.inOut" }, "-=1.5")
      .to(borderRef.current, { width: '100%', duration: 1.5, ease: "power4.inOut" })
      // Появление элементов меню слева и справа
      .from(leftMenuRef.current, { opacity: 0, x: -20, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "-=0.5")
      .from(rightMenuRef.current, { opacity: 0, x: 20, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "-=1");
  }, []);

  const addToLeftMenuRefs = (el) => {
    if (el && !leftMenuRef.current.includes(el)) {
      leftMenuRef.current.push(el);
    }
  };

  const addToRightMenuRefs = (el) => {
    if (el && !rightMenuRef.current.includes(el)) {
      rightMenuRef.current.push(el);
    }
  };
  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power4.inOut", onComplete: () => setIsMenuOpen(false) });
    } else {
      setIsMenuOpen(true);
      setTimeout(() => {
        gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power4.inOut" });
      }, 0);
    }
  };




  return (
    <section className="flex items-center justify-center">
      <div
        className="w-full max-w-[1240px] px-4 h-[60px] m-auto fixed z-50 top-[30px] flex flex-col items-center rounded-[40px]">
        <div ref={borderRef}
             className="border-2 border-gray-700 px-7 w-0 h-0 flex items-center justify-between rounded-[40px] overflow-hidden bg-[#02030840] bg-opacity-30 backdrop-blur-md">
          <div className="md:flex hidden gap-5">
            <div ref={addToLeftMenuRefs} className='text-base font-bold text-white'>Brandformance</div>
            <div ref={addToLeftMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Технология</div>
            <div ref={addToLeftMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Форматы рекламы</div>
          </div>
          <div ref={logoRef} className="flex items-center justify-center w-10 h-10">
            <img src={Logo} alt="Logo" className="w-7 h-8"/>
          </div>
          <div className="md:flex hidden  gap-7">
            <div ref={addToRightMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Работы</div>
            <div ref={addToRightMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Партнеры</div>
            <div ref={addToRightMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Новости</div>
            <div ref={addToRightMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Войти</div>
            <div ref={addToRightMenuRefs} className='font-normal text-sm text-[#FFFFFFCC]'>Контакты</div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none transition duration-500 ease-in-out">
              {
                isMenuOpen ?
                  <X className="w-6 h-6 text-white"/>
                  :
                  <AlignJustify className="w-6 h-6 text-white"/>

              }
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div ref={mobileMenuRef}
               className="md:hidden fixed inset-0 px-10 mt-[90px] bg-[#02030840] bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-lg z-50">
            <div className="flex flex-col gap-3">
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Технология</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Форматы рекламы</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Работы</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Партнеры</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Новости</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Войти</div>
              <div className='font-normal text-sm text-[#FFFFFFCC]'>Контакты</div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Header;