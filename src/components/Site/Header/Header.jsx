import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { AlignJustify } from 'lucide-react'
import './header.scss'
import Logo from '@/assets/Logo.png'
const Header = () => {
  const logoRef = useRef(null)
  const borderRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const leftMenuRef = useRef([])
  const rightMenuRef = useRef([])
  const mobileMenuRef = useRef(null)

  leftMenuRef.current = []
  rightMenuRef.current = []

  useEffect(() => {
    const tl = gsap.timeline()
    // Появление логотипа и рамки
    tl.from(logoRef.current, {
      opacity: 0,
      stagger: 0.2,
      scale: 0,
      duration: 1,
      ease: 'power4.out',
    })
      .to(
        borderRef.current,
        { width: '80px', height: '80px', duration: 1.5, ease: 'power4.inOut' },
        '-=1.5',
      )
      .to(borderRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power4.inOut',
      })
      // Появление элементов меню слева и справа
      .from(
        leftMenuRef.current,
        { opacity: 0, x: -20, stagger: 0.2, duration: 1.5, ease: 'power4.out' },
        '-=0.5',
      )
      .from(
        rightMenuRef.current,
        { opacity: 0, x: 20, stagger: 0.2, duration: 1, ease: 'power4.out' },
        '-=0.5',
      )
  }, [])

  const addToLeftMenuRefs = (el) => {
    if (el && !leftMenuRef.current.includes(el)) {
      leftMenuRef.current.push(el)
    }
  }

  const addToRightMenuRefs = (el) => {
    if (el && !rightMenuRef.current.includes(el)) {
      rightMenuRef.current.push(el)
    }
  }
  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => setIsMenuOpen(false),
      })
    } else {
      setIsMenuOpen(true)
      setTimeout(() => {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power4.inOut' },
        )
      }, 0)
    }
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-[1240px] px-4 h-[60px] m-auto fixed z-50 top-[15px] flex flex-col items-center rounded-[40px]">
        <div
          ref={borderRef}
          style={{
            background: 'rgba(2, 3, 8, 0.25)',
            boxShadow:
              'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: ' blur(6px)',
            borderRadius: '500px',
          }}
          className="px-7 w-0 h-0 flex items-center justify-between rounded-[40px] overflow-hidden bg-[#02030840] bg-opacity-30 backdrop-blur-md"
        >
          <div className="headerTextLeft  items-center gap-2 w-1/2">
            <div
              ref={addToLeftMenuRefs}
              className="text-base font-bold	 text-white"
            >
              Brandformance
            </div>
            <a
              href="#ThirdPage"
              ref={addToLeftMenuRefs}
              className="header_button"
            >
              Технология
            </a>

            <a
              href="#second-page"
              ref={addToLeftMenuRefs}
              className="header_button"
            >
              Форматы рекламы
            </a>
          </div>
          <div
            ref={logoRef}
            className="flex items-center justify-center w-10 h-10"
          >
            <img src={Logo} alt="Logo" className="w-7 h-8" />
          </div>

          <div className="headerTextRight justify-end gap-2 w-1/2">
            <a
              href="#FifthPage"
              ref={addToRightMenuRefs}
              className="header_button"
            >
              Работы
            </a>
            {/* <div ref={addToRightMenuRefs} className="header_button">
              Новости
            </div> */}
            <a
              href="#FourthPageP"
              ref={addToRightMenuRefs}
              className="header_button"
            >
              Партнеры
            </a>

            <div ref={addToRightMenuRefs} className="header_button">
              Контакты
            </div>
            <div ref={addToRightMenuRefs} className="header_button">
              Войти
            </div>
          </div>
          <div className="burgerMenu items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none transition duration-500 ease-in-out"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <AlignJustify className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="burgerMenuList fixed inset-0 px-10 mt-[90px] bg-[#02030840] bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex flex-col gap-3">
              <div className="font-normal text-sm text-[#FFFFFFCC]">
                Технология
              </div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">
                Форматы рекламы
              </div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">Работы</div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">
                Партнеры
              </div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">
                Новости
              </div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">Войти</div>
              <div className="font-normal text-sm text-[#FFFFFFCC]">
                Контакты
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Header
