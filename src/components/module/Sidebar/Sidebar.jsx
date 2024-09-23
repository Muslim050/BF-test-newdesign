import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { menuItems } from './MenuItems.js'
import { fetchOrder } from 'src/redux/order/orderSlice.js'
import { fetchInventory } from 'src/redux/inventory/inventorySlice.js'
import { fetchChannel } from 'src/redux/channel/channelSlice.js'
import { fetchVideos } from 'src/redux/video/videoSlice.js'
import axios from 'axios'
import backendURL from '../../../utils/url.js'
import { logout } from 'src/redux/auth/authSlice.js'
import { Palette } from 'lucide-react'
import Logo from 'src/assets/Sidebarcopy/logo.png'
import NavItem from 'src/components/module/Sidebar/NavItem.jsx'
import { LogoutSvg } from 'src/assets/SidebarsIcons-ui.jsx'
import { Badge } from '@/components/ui/badge'
import Cookies from 'js-cookie'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ArrowRight } from 'lucide-react'
import { Check } from 'lucide-react'

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
import { CirclePicker } from 'react-color'
import { ButtonSvg } from '../../../assets/SidebarsIcons-ui.jsx'

function Sidebar() {
  const { textColor } = React.useContext(ThemeContext)

  const [open, setOpen] = React.useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = React.useState({})
  const { order } = useSelector((state) => state.order)
  const { channel } = useSelector((state) => state.channel)
  const { videos } = useSelector((state) => state.video)
  const { сomplitedInventories } = useSelector((state) => state.inventory)
  const { сonfirmedInventories } = useSelector((state) => state.inventory)
  const [filteredOrders, setFilteredOrders] = React.useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const user = Cookies.get('role')
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user),
  )

  const fetchfilteredOrders = async ({ status }) => {
    const token = Cookies.get('token')
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
      dispatch(fetchVideos())
    }

    if (user === 'advertiser' || user === 'advertising_agency') {
      dispatch(fetchOrder())
    }

    if (user === 'publisher') {
      dispatch(fetchChannel())
      dispatch(fetchVideos())
    }
    if (user === 'channel') {
      dispatch(fetchChannel())
      dispatch(fetchVideos())
    }
  }, [dispatch])

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

  const handleScroll = () => {
    setIsTooltipOpen({})
  }
  // background: linear-gradient(180deg, #D1CCFF 77.3%, #FCF2F8 118.01%);

  React.useEffect(() => {
    const scrollListener = () => {
      handleScroll()
    }
    window.addEventListener('scroll', scrollListener, true)
    return () => {
      window.removeEventListener('scroll', scrollListener, true)
    }
  }, [])
  const baseStyles =
    'flex items-center text-[#838383] text-base font-medium rounded-[14px] p-3.5 text-white '
  const inactiveStyles = 'hover:bg-red-500  bg-transparent'

  const { bgColor, setBgColor } = React.useContext(ThemeContext)

  const colors = [
    '#172841',
    '#090E35',
    '#353535',
    '#417878',
    '#61936F',
    '#A5A0CF',
  ]

  const handleColorChange = (color) => {
    setBgColor(color.hex)
  }
  return (
    <div className=" border_container rounded-[22px] glass-background ">
      <div className="border_design rounded-[22px]">
        <div
          className={`${
            open ? 'w-[250px] px-[5px] ' : 'w-[55px] px-[0px] '
          }  py-0 relative duration-500  ]`}
        >
          <div
            onClick={() => setOpen(!open)}
            className={`absolute z-40 cursor-pointer  w-7 text-white
            rounded-full  ${
              !open ? 'right-[-37.5px] top-4 ' : '-right-[11.5px] top-4'
            }`}
          >
            <ButtonSvg
              className={` top-0 left-0 text-white absolute ${
                !open
                  ? 'right-[20px] -top-8 rotate-180'
                  : 'right-[25px] -top-8 rotate-0'
              }`}
            />
            <ArrowRight
              style={{ color: textColor }}
              className={` top-0 left-0 text-white absolute ${
                !open
                  ? 'right-[-25px] top-10 rotate-0'
                  : 'right-[-25px] top-10 rotate-180'
              }`}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex items-center">
              <div className="relative w-[56px] h-[56px] rounded-full bg-slate-950"></div>
              <img
                loading="lazy"
                src={Logo}
                className={`absolute ${!open ? ' left-[6px]' : ' left-[12px]'}`}
                alt="adsad"
                width={49}
                height={49}
              />
            </div>

            {open && (
              <div
                className={`font-bold text-[16px]  transition-opacity duration-300 ${
                  open ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Brandformance
              </div>
            )}
          </div>

          <div className="flex flex-col 	justify-between">
            <ul className="pt-[38px] gap-1 flex flex-col relative pb-4">
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
                      {(user === 'publisher' || user === 'admin') &&
                        item.label === 'Видео' && (
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
            <div className="border-t border-[#e5e7eb66] pt-4"></div>
            <div>
              <Popover>
                <PopoverTrigger
                  asChild
                  className={`hover:scale-105 transition-all ${baseStyles} hover:${inactiveStyles} group hover:random-bg cursor-pointer`}
                >
                  <div className="flex items-center relative hover">
                    <Palette style={{ color: textColor }} />
                    {open ? (
                      <span
                        className={`ml-3.5 transition-opacity duration-500 ease-in-out  ${
                          open ? 'opacity-100 visible' : 'opacity-0 invisible '
                        }`}
                        style={{
                          transitionDelay: open ? '0.3s' : '0s',
                          color: textColor,
                        }}
                      >
                        Сменить тему
                      </span>
                    ) : null}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-[22px] bg-white bg-opacity-30 backdrop-blur-md">
                  <h4
                    style={{ color: textColor }}
                    className={`pb-4 font-medium leading-none  border-b-[#F9F9F926] border-b`}
                  >
                    Сменить тему
                  </h4>{' '}
                  <div className="relative">
                    <CirclePicker
                      colors={colors}
                      onChangeComplete={handleColorChange}
                      circleSize={30}
                      circleSpacing={10}
                      width="240px"
                      color={bgColor} // Пропс для выделения выбранного цвета
                      className="pt-4 relative"
                    />
                  </div>
                </PopoverContent>
              </Popover>{' '}
            </div>
            {/*Выход*/}
            <div className=" pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className={`hover:scale-105 transition-all ${baseStyles} hover:${inactiveStyles} group hover:text-red-500 hover:bg-red-200 cursor-pointer`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center relative ">
                            <LogoutSvg className="text-red-500 w-[26px] h-[26px] group-hover:text-red-500" />
                            {open ? (
                              <span
                                className={`ml-3.5 transition-opacity duration-500 ease-in-out text-red-500  ${
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
                      Выйти из системы Brandformance
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
