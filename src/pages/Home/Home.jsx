import { Outlet, useLocation } from 'react-router-dom'
import Site from '../Site/Site'
import { Route, Routes } from 'react-router-dom'
import Navbar from 'src/components/module/SubHeader/Navbar.jsx'
import Sidebar from 'src/components/module/Sidebar/Sidebar.jsx'
import React from 'react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { gsap } from 'gsap'

function Home() {
  const { pathname } = useLocation()
  const { bgColor, textColor } = React.useContext(ThemeContext)

  const contentRef = React.useRef(null)

  React.useEffect(() => {
    // Анимация изменения фона и текста для контента
    gsap.to(contentRef.current, {
      backgroundColor: bgColor,
      color: textColor,
      duration: 1.5,
    })
    // Анимация изменения фона для боковой панели (если нужно)
  }, [bgColor, textColor])

  return (
    <>
      {pathname === '/' ? (
        <Routes>
          <Route path="/" index element={<Site />}></Route>
        </Routes>
      ) : (
        <>
          <div
            className="p-[14px] h-screen"
            style={{
              display: 'flex',
              backgroundColor: bgColor,
              color: textColor,
            }}
            ref={contentRef}
          >
            <Sidebar />

            <div
              style={{
                width: '100%',
                // height: '100vh',
                overflow: 'auto',
              }}
              className="ml-7"
            >
              <Navbar />

              <div className="wrapper_home">
                <div
                  style={{
                    width: '100%',
                    margin: ' 0 auto',
                  }}
                >
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          {/*<AnimatePresence>*/}
          {/*  {showChangePassword && (*/}
          {/*    <ModalUI>*/}
          {/*      <ChangePasswordModal/>*/}
          {/*    </ModalUI>*/}
          {/*  )}*/}
          {/*</AnimatePresence>*/}
        </>
      )}
    </>
  )
}

export default Home
