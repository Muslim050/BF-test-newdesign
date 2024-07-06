import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ModalUI from 'src/components/Labrery/ModalComponents/ModalUI/ModalUI'
import Site from '../Site/Site'
import { Route, Routes } from 'react-router-dom'
import ChangePasswordModal from 'src/pages/Login/ChangePasswordModal.jsx'
import Navbar from 'src/components/module/SubHeader/Navbar.jsx'
import Sidebar from 'src/components/module/Sidebar/Sidebar.jsx'
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

function Home() {
  const { pathname } = useLocation()
  const { showChangePassword } = useSelector((state) => state.modal)

  const { bgColor, textColor } = React.useContext(ThemeContext);
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
              backgroundColor: bgColor, color: textColor            }}
          >
            <Sidebar/>

            <div
              style={{
                width: '100%',
                // height: '100vh',
                overflow: 'auto',
              }}
              className="ml-7"
            >
              <Navbar/>

              <div className="wrapper_home">
                <div
                  style={{
                    width: '100%',
                    margin: ' 0 auto',
                  }}
                >
                  <Outlet/>
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {showChangePassword && (
              <ModalUI>
                <ChangePasswordModal/>
              </ModalUI>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}

export default Home
