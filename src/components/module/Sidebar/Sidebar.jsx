import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { menuItems } from './MenuItems.js'
import style from './Sidebar.module.scss'
import { fetchOrder } from 'src/redux/order/orderSlice.js'
import {
  fetchComplitedInventory,
  fetchConfirmedIInventory,
  fetchInventory,
} from 'src/redux/inventory/inventorySlice.js'
import { fetchChannel } from 'src/redux/channel/channelSlice.js'
import { fetchVideos } from 'src/redux/video/videoSlice.js'
import axios from 'axios'
import backendURL from '../../../utils/url.js'
import { logout } from 'src/redux/auth/authSlice.js'
import { ChevronLeft } from 'lucide-react'
import Background from 'src/assets/Sidebarcopy/background.png'
import Logo from 'src/assets/Sidebarcopy/logo.png'
import NavItem from 'src/components/module/Sidebar/NavItem.jsx'
// eslint-disable-next-line no-unused-vars
import { LogoutSvg, ThemeSvg } from 'src/assets/SidebarsIcons-ui.jsx'
import { Badge } from '@/components/ui/badge'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function Sidebar() {
  const [open, setOpen] = React.useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = React.useState({})
  const { order } = useSelector((state) => state.order)
  const { inventory } = useSelector((state) => state.inventory)
  const { channel } = useSelector((state) => state.channel)
  const { videos } = useSelector((state) => state.video)
  const { сomplitedInventories } = useSelector((state) => state.inventory)
  const { сonfirmedInventories } = useSelector((state) => state.inventory)
  const [filteredOrders, setFilteredOrders] = React.useState('')
  const activeStyles = 'bg-[#FFFFFF0D] border-[1px]'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const user = localStorage.getItem('role')
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user),
  )
  const toggleMenu = () => {
    setOpen(!open)
  }

  const fetchfilteredOrders = async ({ status }) => {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${backendURL}/order/order-count-by-status/?status=${status}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setFilteredOrders(response.data.data.count)
  }
  React.useEffect(() => {})

  React.useEffect(() => {
    if (user === 'admin') {
      // dispatch (fetchOrder ())
      fetchfilteredOrders({ status: 'sent' })
      dispatch(fetchInventory({ status: 'open' }))
      dispatch(fetchChannel())
    }

    if (user === 'advertiser' || user === 'advertising_agency') {
      dispatch(fetchOrder())
    }

    if (user === 'publisher') {
      dispatch(fetchChannel())
      dispatch(fetchVideos())

      dispatch(fetchComplitedInventory())
      dispatch(fetchConfirmedIInventory())
    }
    if (user === 'channel') {
      dispatch(fetchChannel())
      dispatch(fetchVideos())
      dispatch(fetchComplitedInventory())
      dispatch(fetchConfirmedIInventory())
    }
  }, [dispatch])

  // Админ
  const filteredInventory = inventory.filter((i) => i.status === 'open')
  // const filteredOrders = order.filter ((i) => i.status === "sent");
  // Админ

  // Рекломадатели
  const filteredOrdersAdvertiser = order.filter(
    (i) => i.status === 'accepted' || i.status === 'in_progress',
  )
  // Рекломадатели

  // Паблишер
  const filteredComplitedI = сomplitedInventories.filter(
    (i) => i.removal_date === null,
  )
  const filteredConfirmedI = сonfirmedInventories.filter((i) => i)
  const filteredChannel = channel.filter((i) => i.is_connected === false)
  const filteredVideo = videos.filter((i) => i.link_to_video === null)
  // Паблишер

  const filteredInventoryPablisher = inventory.filter(
    (i) => i.status === 'pre_booked',
  )
  const handleScroll = () => {
    setIsTooltipOpen({})
  }

  React.useEffect(() => {
    const scrollListener = () => {
      handleScroll()
    }
    window.addEventListener('scroll', scrollListener, true)
    return () => {
      window.removeEventListener('scroll', scrollListener, true)
    }
  }, [])
  const { bgColor, setBgColor } = React.useContext(ThemeContext)
  const baseStyles =
    'flex items-center text-[#838383] text-base font-medium rounded-xl p-3.5 text-white '
  const inactiveStyles = 'hover:bg-red-500  bg-transparent'

  const handleColorChange = (color) => {
    setBgColor(color.hex)
    localStorage.setItem('selectedBgColor', color.hex)
  }
  return (
    <div className=" border_container rounded-xl glass-background ">
      <div className="border_design rounded-lg ">
        <div
          className={`${
            open ? 'w-[250px] px-[5px] ' : 'w-[55px] px-[0px] '
          }  py-5 relative duration-500  ]`}
        >
          <div
            onClick={() => setOpen(!open)}
            className={`absolute z-40 cursor-pointer  w-7 text-white
            rounded-full  ${
              !open ? 'right-[-37px] top-3 ' : 'right-[-17px] top-3 '
            }`}
          >
            <div
              className={`h-14 w-5 rounded-sm bg-[#FFFFFF4D] ${
                !open ? 'rotate-180' : 'rotate-150'
              }`}
            ></div>
            <ChevronLeft
              className={`w-[25px] h-[25px] top-[15px] left-[-2px] text-white absolute ${
                !open && 'rotate-180 top-[15px]'
              }`}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <img
              src={Background}
              className="relative"
              alt="adsad"
              width={56}
              height={56}
            />
            <img
              src={Logo}
              className={`absolute ${!open ? ' left-[6px]' : ' left-[12px]'}`}
              alt="adsad"
              width={49}
              height={49}
            />
            {open && <div className="font-bold text-[16px]">Brandformance</div>}
          </div>

          <div className="flex flex-col 	justify-between">
            <ul className="pt-[38px] gap-1 flex flex-col relative ">
              {filteredMenuItems.map((item, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger className="relative">
                      <NavItem item={item} open={open} setOpen={setOpen} />
                      {/* Рекломадатели */}
                      {user === 'advertiser' && item.label === 'Заказы' && (
                        <>
                          {filteredOrdersAdvertiser.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                {filteredOrdersAdvertiser.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {user === 'advertising_agency' &&
                        item.label === 'Заказы' && (
                          <>
                            {filteredOrdersAdvertiser.length > 0 && (
                              <div
                                className="absolute top-[-8px]
 right-[-8px]"
                              >
                                <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                  {filteredOrdersAdvertiser.length}
                                </Badge>
                              </div>
                            )}
                          </>
                        )}
                      {/* Рекломадатели */}

                      {/* Паблишер */}
                      {user === 'publisher' && item.label === 'Заказы' && (
                        <>
                          {filteredConfirmedI.length > 0 &&
                            filteredComplitedI.length > 0 && (
                              <div
                                className="absolute top-[-8px]
 right-[-8px]"
                              >
                                <Badge className="bg-orange-400 px-1.5 py-[1.4px]">
                                  {filteredComplitedI.length +
                                    filteredConfirmedI.length}
                                </Badge>
                              </div>
                            )}
                        </>
                      )}
                      {user === 'publisher' && item.label === 'Видео' && (
                        <>
                          {filteredVideo.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-orange-400 px-1.5 py-[1.4px]">
                                {filteredVideo.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {user === 'publisher' && item.label === 'Каналы' && (
                        <>
                          {filteredChannel.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                {filteredChannel.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {/* Паблишер */}

                      {/*Канал*/}
                      {user === 'channel' && item.label === 'Заказы' && (
                        <>
                          {filteredConfirmedI.length > 0 ||
                            (filteredComplitedI.length > 0 && (
                              <div
                                className="absolute top-[-8px]
 right-[-8px]"
                              >
                                <Badge className="bg-orange-400 px-1.5 py-[1.4px]">
                                  {filteredComplitedI.length +
                                    filteredConfirmedI.length}
                                </Badge>
                              </div>
                            ))}
                        </>
                      )}
                      {user === 'channel' && item.label === 'Видео' && (
                        <>
                          {filteredVideo.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-orange-400 px-1.5 py-[1.4px]">
                                {filteredVideo.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {/*Канал*/}

                      {/* админ */}
                      {user === 'admin' && item.label === 'Каналы' && (
                        <>
                          {filteredChannel.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                {filteredChannel.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {user === 'publisher' && item.label === 'Каналы' && (
                        <>
                          {filteredChannel.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                {filteredChannel.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {user === 'channel' && item.label === 'Каналы' && (
                        <>
                          {filteredChannel.length > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                                {filteredChannel.length}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {user === 'admin' && item.label === 'Заказы' && (
                        <>
                          {filteredOrders > 0 && (
                            <div
                              className="absolute top-[-8px]
 right-[-8px]"
                            >
                              <Badge className="bg-orange-400 px-1.5 py-[1.4px]">
                                {filteredOrders}
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                      {/* админ */}
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ul>

            {/*Выход*/}
            <div className="border-t border-[#e5e7eb66] pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className={`${baseStyles} hover:${inactiveStyles} group hover:text-red-500 hover:bg-red-200 cursor-pointer`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center relative">
                            <LogoutSvg className="text-white w-[26px] h-[26px] group-hover:text-red-500" />
                            {open ? (
                              <span
                                className={`ml-3.5 transition-opacity duration-500 ease-in-out ${
                                  open
                                    ? 'opacity-100 visible'
                                    : 'opacity-0 invisible'
                                }`}
                                style={{
                                  transitionDelay: open ? '0.3s' : '0s',
                                }}
                              >
                                Выход
                              </span>
                            ) : null}
                          </div>
                        </TooltipTrigger>
                        {!open && (
                          <TooltipContent
                            side="right"
                            className="ml-2"
                            sideOffset={0}
                          >
                            <p>Выход</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Выйти из системы
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Вы точно хотите выйти?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white w-[100px]">
                      Нет
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-400 w-[100px]"
                    >
                      Да
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {/*Выход*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
