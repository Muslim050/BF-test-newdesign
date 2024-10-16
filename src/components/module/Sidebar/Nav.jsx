import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils.js'
import { buttonVariants } from '@/components/ui/button'
import Cookies from 'js-cookie'
import {Badge} from "@/components/ui/badge.jsx";
import React from "react";
import axios from "axios";
import backendURL from "@/utils/url.js";
import {fetchInventory} from "@/redux/inventory/inventorySlice.js";
import {fetchChannel} from "@/redux/channel/channelSlice.js";
import {fetchVideos} from "@/redux/video/videoSlice.js";
import {fetchOrder} from "@/redux/order/orderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {menuItems} from "@/components/module/Sidebar/MenuItems.js";
import {hasRole} from "@/utils/roleUtils.js";
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {LogoutSvg} from "@/assets/SidebarsIcons-ui.jsx";
import useMedia from 'use-media';



const Nav = ({ links, isCollapsed, handleLogout }) => {
  const isMobile = useMedia({ maxWidth: 640 });

  const userRole = Cookies.get('role') // Получаем роль из Cookies
  const userRoles = userRole ? [userRole] : [] // Преобразуем строку в массив, если существует роль
  const { order } = useSelector((state) => state.order)
  const { channel } = useSelector((state) => state.channel)
  const { videos } = useSelector((state) => state.video)
  const { сomplitedInventories } = useSelector((state) => state.inventory)
  const { сonfirmedInventories } = useSelector((state) => state.inventory)
  const [filteredOrders, setFilteredOrders] = React.useState('')
  const hasAccess = (roles) => {
    return roles?.some((role) => userRoles.includes(role)) // Проверяем наличие хотя бы одной роли
  }
  const dispatch = useDispatch()
  const user = Cookies.get('role')

  // const hasSubMenuAccess = item.subMenu?.some((subItem) =>
  //   hasRole(subItem.roles),
  // )
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

  // React.useEffect(() => {
  //   if (user === 'admin') {
  //     // dispatch (fetchOrder ())
  //     fetchfilteredOrders({ status: 'sent' })
  //     dispatch(fetchInventory({ status: 'open' }))
  //     dispatch(fetchChannel())
  //     dispatch(fetchVideos())
  //   }
  //
  //   if (user === 'advertiser' || user === 'advertising_agency') {
  //     dispatch(fetchOrder())
  //   }
  //
  //   if (user === 'publisher') {
  //     dispatch(fetchChannel())
  //     dispatch(fetchVideos())
  //   }
  //   if (user === 'channel') {
  //     dispatch(fetchChannel())
  //     dispatch(fetchVideos())
  //   }
  // }, [dispatch])
  React.useEffect(() => {
    const fetchData = async () => {
      if (user === 'admin') {
        await fetchfilteredOrders({ status: 'sent' });
        dispatch(fetchInventory({ status: 'open' }));
        dispatch(fetchChannel());
        dispatch(fetchVideos())
      }

      if (user === 'advertiser' || user === 'advertising_agency') {
        dispatch(fetchOrder());
      }

      if (['publisher', 'channel'].includes(user)) {
        dispatch(fetchChannel());
        dispatch(fetchVideos());
      }
    };

    fetchData();
  }, [dispatch, user]);



  //Заказы
  const filteredOrdersAdvertiser = order.filter(
    (i) => i.status === 'accepted' || i.status === 'in_progress',
  )
  const filteredComplitedI = сomplitedInventories.filter((i) => i.removal_date === null,)
  const filteredConfirmedI = сonfirmedInventories.filter((i) => i)
  //Заказы

  //Каналы
  const filteredChannel = channel.filter((i) => i.is_connected === false)
  const filteredChannelIsActive = channel.filter((i) => i.is_active === false)
  //Каналы

  //Видео
  const filteredVideo = videos.filter((i) => i.link_to_video === null)
  //Видео

  console.log (links)

  const updateMenuItems = (items) => {
    return items.map(item => {
      if (item.title === 'Заказы') {
        if (userRole === 'advertiser' || userRole === 'advertising_agency') {
          return {
            ...item,
            label: filteredOrdersAdvertiser.length.toString(),
          };
        } else if (userRole === 'publisher') {
          return {
            ...item,
            label: (filteredComplitedI.length + filteredConfirmedI.length).toString(),
          };
        }
        else if (userRole === 'channel') {
          return {
            ...item,
            label: (filteredComplitedI.length + filteredConfirmedI.length).toString(),
          };
        } else if (userRole === 'admin') {
          return {
            ...item,
            label: filteredOrders.length,
          };
        }
      }

      if (item.title === 'Каналы') {
        if (userRole === 'publisher' || userRole === 'admin' || userRole === 'channel') {
          return {
            ...item,
            label: filteredChannel.length.toString(),
          };
          // eslint-disable-next-line no-dupe-else-if
        }
      }

      if (item.title === 'Видео' && (userRole === 'publisher' || userRole === 'admin' || userRole === 'channel')) {
        return {
          ...item,
          label: filteredVideo.length.toString(),
        };
      }
      return item;
    });
  };
  const updatedMenuItems = updateMenuItems(menuItems);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false)


  const toggleSubMenu = (title) => {
    // Только если sidebar открыт, позволяем открывать аккордеон
    if (open) {
      setIsSubMenuOpen(prevTitle => (prevTitle === title ? null : title));
    }
  };


  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 sm:py-5 py-3.5   relative z-10"
    >
      <nav
        className="sm:grid flex px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 ">
        {updatedMenuItems
          .filter ((item) => hasAccess (item.roles))
          .map ((link, index) => {
            const isActive = location.pathname === link.to // Проверяем, активна ли ссылка
            //когда меню закрыта
            return isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={link.to}
                    className={cn (
                      buttonVariants ({variant: link.variant, size: 'icon'}),
                      'h-9 w-9',
                      link.variant === 'default' &&
                      'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                      isActive && 'bg-[var(--bg-color)] text-white', // Класс для активного состояния
                      'h-[35px] w-[35px] sm:h-[45px] sm:w-[45px] rounded-[12px] hover:scale-105 transition-all relative ',
                    )}
                  >
                    <link.icon className="h-5 w-5 sm:h-6 sm:w-6"/>
                    <span className="sr-only">{link.title}</span>
                    {link.label > 0 ? (
                      <>


                    <span
                      className='absolute -top-3 -right-2'
                    >
                        <Badge className="bg-red-500 px-0.5 py-0">
                          {link.label}
                          {(link.title === 'Каналы' && userRole === 'admin') &&
                            <span>
                            +{filteredChannelIsActive.length.toString ()}
                          </span>
                          }
                        </Badge>
                      </span></>
                    ) : null}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side={isMobile ? "top" : "right"} className="flex flex-col gap-2">
                  <span>{link.title}</span>
                  {link.accordion && link.subMenu && (
                    <div className="flex flex-col">
                      {link.subMenu.map ((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.to}
                          className={cn (
                            buttonVariants ({variant: link.variant, size: 'sm'}),
                            link.variant === 'ghost' &&
                            'dark:bg-muted dark:text-white dark:hover:bg-red-500 dark:hover:text-white',
                            isActive && 'bg-[var(--bg-color)] text-white', // Класс для активного состояния
                            'justify-start h-[35px] rounded-[12px] hover:scale-105 transition-all border border-transparent hover:border-[var(--bg-color)] glass-background',
                          )}
                          // className="block py-1 text-sm hover:underline"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </TooltipContent>

              </Tooltip>
              //когда меню закрыта


            ) : (
              <>
                <Link
                  key={index}
                  to={link.to}
                  className={cn (
                    buttonVariants ({variant: link.variant, size: 'sm'}),
                    link.variant === 'ghost' &&
                    'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                    isActive && 'bg-[var(--bg-color)] text-white', // Класс для активного состояния
                    'justify-start h-[50px] rounded-[12px] hover:scale-105 transition-all flex justify-between',
                  )}
                  onClick={link.accordion ? () => toggleSubMenu (link.title) : null}

                >
                  <div className='flex items-center'>
                    <link.icon className="mr-2 h-6 w-6"/>
                    {link.title}
                  </div>

                  <div>
                    {link.label && (
                      <>
                    <span
                      className={cn (
                        'ml-auto',
                        link.variant === 'default' &&
                        'text-background dark:text-white',
                      )}
                    >

                    <Badge className="bg-red-500 px-1.5 py-[1.4px]">
                      {link.label} {(link.title === 'Каналы' && userRole === 'admin') &&
                      <span
                        className={cn (
                          'ml-auto',
                          link.variant === 'default' &&
                          'text-background dark:text-white',
                        )}
                      >
                          +{filteredChannelIsActive.length.toString ()}

                      </span>
                    }
                    </Badge>
                  </span></>
                    )}
                    <div className='float-right'>
                      {link.accordion &&
                        (isSubMenuOpen ? (
                          <ChevronUp/>
                        ) : (
                          <ChevronDown/>
                        ))}
                    </div>
                  </div>
                </Link>

                {link.accordion && isCollapsed === false && isSubMenuOpen === link.title && (
                  <div className="pl-9 pb-2 ">
                    {link.subMenu.map ((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.to}
                        className={cn (
                          buttonVariants ({variant: link.variant, size: 'sm'}),
                          link.variant === 'ghost' &&
                          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                          isActive && 'bg-[var(--bg-color)] text-white', // Класс для активного состояния
                          'justify-start h-[40px] rounded-[12px] w-full',
                        )}>
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}


              </>
            )

          })

        }

        <div className='flex  flex-col justify-end px-2 min-h-[50px]'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className=' group py-2    rounded-[12px]  h-full cursor-pointer'

                // className={`hover:scale-105 transition-all ${baseStyles} hover:${inactiveStyles} group hover:text-red-500 hover:bg-red-200 cursor-pointer`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center relative ">
                      <LogoutSvg className="sm:w-[26px] sm:h-[26px] w-[20px] h-[20px] text-red-500"/>
                      {!isCollapsed ? (
                        <span
                          className={`ml-1.5 transition-opacity duration-500 ease-in-out text-white  ${
                            !isCollapsed
                              ? 'opacity-100 visible'
                              : 'opacity-0 invisible'
                          }`}
                          style={{
                            transitionDelay: !isCollapsed ? '0.3s' : '0s',
                          }}
                        >
                            Выход
                          </span>
                      ) : null}
                    </div>
                  </TooltipTrigger>

                </Tooltip>
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
              <AlertDialogFooter className='!flex'>
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

      </nav>
    </div>
  )
}

export default Nav
