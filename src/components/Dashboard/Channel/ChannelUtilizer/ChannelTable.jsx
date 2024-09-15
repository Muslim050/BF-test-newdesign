import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { googleAuth } from '../../../../redux/googleauth/googleauthSlice.js'
import style from './ChannelTable.module.scss'
import { fetchChannel } from '../../../../redux/channel/channelSlice.js'
import { Link } from 'react-router-dom'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import CircularTable from '@/components/Labrery/Circular/CircularTable.jsx'
import {
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  TableHeader,
} from '@/components/ui/table.jsx'
import { Button } from '@/components/ui/button.jsx'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'
import { ChartSvg } from '../../../../assets/icons-ui.jsx'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Канал' },
  { key: 'channel', label: 'Аналитика' },
  { key: 'publisher.name', label: 'Паблишер' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Телефон' },
  { key: 'channel_id', label: 'ID канала' },
  { key: 'is_connected', label: 'Статус' },
]

function ChannelTable() {
  const dispatch = useDispatch()
  const { channel, status } = useSelector((state) => state.channel)
  const linkGoogle = useSelector((state) => state.googleAuth.authUrl)
  const [googleAu, setGoogleAu] = React.useState(false)
  const [connectG, setConnectG] = React.useState(channel.is_connected)
  const user = Cookies.get('role')
  const { textColor } = React.useContext(ThemeContext)

  React.useEffect(() => {
    dispatch(fetchChannel())
  }, [dispatch])

  const authGoogle = (pubId) => {
    dispatch(googleAuth(pubId))
    setConnectG(false)
    setGoogleAu(true)
  }

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div style={{ color: 'var(--text-color, )' }}>
            {' '}
            Загрузка каналов &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div
            className={`border_container rounded-[22px] p-[3px]  glass-background`}
          >
            {channel && channel.length ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
              >
                {' '}
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                  <TableRow>
                    {headers.map((row) => {
                      const user = Cookies.get('role')
                      const showStatusColumn = user !== 'admin'
                      if (row.key === 'is_connected' && !showStatusColumn) {
                        return null
                      }
                      return (
                        <TableHead
                          key={row.key}
                          className={`text-${textColor}`}
                        >
                          {row.label}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channel.map((channel, i) => (
                    <>
                      <TableRow key={channel.id}>
                        <TableCell
                          data-label="ID"
                          className={`font-normal text-${textColor} text-sm `}
                        >
                          <div style={{ display: 'flex' }}>
                            <div>{i + 1}</div>
                            {user === 'publisher' ||
                            user === 'admin' ||
                            user === 'channel' ? (
                              <>
                                {channel.is_connected === false ? (
                                  <CircularTable
                                    style={{
                                      backgroundColor: 'red',
                                    }}
                                  />
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell
                          data-label="Канал"
                          className={style.table_td}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-pointer">
                                  {channel.name}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>ID:{channel.id}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell
                          data-label="Аналитика"
                          className={`font-normal text-${textColor} text-sm `}
                        >
                          <Link
                            to={`/statistics-channel/${channel.id}`}
                            state={{ channel }}
                            style={{ display: 'contents' }}
                          >
                            <button className="hover:scale-125 transition-all">
                              <ChartSvg className="hover:text-green-400 " />
                            </button>
                          </Link>
                        </TableCell>
                        <TableCell
                          data-label="Паблишер"
                          className={style.table_td}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-pointer">
                                  {channel.publisher && channel.publisher.name
                                    ? channel.publisher.name
                                    : '-------'}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>ID:{channel.publisher?.id}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell
                          data-label="Email"
                          className={`font-normal text-${textColor} text-sm `}
                        >
                          {channel.email}
                        </TableCell>
                        <TableCell
                          data-label="Телефон"
                          className={`font-normal text-${textColor} text-sm `}
                        >
                          <FormatterPhone phoneNumber={channel.phone_number} />
                        </TableCell>
                        <TableCell
                          data-label="ID канала"
                          className={`font-normal text-${textColor} text-sm `}
                        >
                          {channel.channel_id}
                        </TableCell>
                        {user === 'admin' ? (
                          ''
                        ) : (
                          <TableCell
                            data-label="ID"
                            className={`font-normal text-${textColor} text-sm `}
                          >
                            <div
                              style={{
                                display: 'inline-flex',
                                gap: '10px',
                                alignItems: 'center',
                                background: channel.is_connected
                                  ? '#DEEEE8'
                                  : '#ffcece', // Измените цвет фона в зависимости от channel.is_connected
                                // display: '-webkit-inline-box',
                                padding: '5px',
                                borderRadius: '22px',
                                boxShadow: channel.is_connected
                                  ? '0 0 4px #519C66'
                                  : '0 0 4px #FF0000',
                                border: channel.is_connected
                                  ? '1px solid #519C66'
                                  : '1px solid #FF0000', // Измените цвет границы в зависимости от channel.is_connected
                              }}
                            >
                              {googleAu || (
                                <div>
                                  {channel.is_connected === false ? (
                                    <Button
                                      className="bg-red-400 hover:bg-red-500 h-[25px]"
                                      onClick={() => authGoogle(channel.id)}
                                    >
                                      Подключится
                                    </Button>
                                  ) : (
                                    <Button
                                      className="bg-blue-500 hover:bg-blue-600 rounded-[18px] h-[25px]"
                                      onClick={() => authGoogle(channel.id)}
                                    >
                                      Переподключиться
                                    </Button>
                                  )}
                                </div>
                              )}
                              {googleAu && (
                                <a
                                  href={linkGoogle}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex "
                                >
                                  <button className="relative bg-white p-3 rounded-[12px] border-2 border-blue-400 hover:border-blue-600">
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="-0.5 0 48 48"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {' '}
                                        <title>Google-color</title>{' '}
                                        <desc>Created with Sketch.</desc>{' '}
                                        <defs> </defs>{' '}
                                        <g
                                          id="Icons"
                                          stroke="none"
                                          strokeWidth="1"
                                          fill="none"
                                          fillRule="evenodd"
                                        >
                                          {' '}
                                          <g
                                            id="Color-"
                                            transform="translate(-401.000000, -860.000000)"
                                          >
                                            {' '}
                                            <g
                                              id="Google"
                                              transform="translate(401.000000, 860.000000)"
                                            >
                                              {' '}
                                              <path
                                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                id="Fill-1"
                                                fill="#FBBC05"
                                              >
                                                {' '}
                                              </path>{' '}
                                              <path
                                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                id="Fill-2"
                                                fill="#EB4335"
                                              >
                                                {' '}
                                              </path>{' '}
                                              <path
                                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                id="Fill-3"
                                                fill="#34A853"
                                              >
                                                {' '}
                                              </path>{' '}
                                              <path
                                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                id="Fill-4"
                                                fill="#4285F4"
                                              >
                                                {' '}
                                              </path>{' '}
                                            </g>{' '}
                                          </g>{' '}
                                        </g>{' '}
                                      </g>
                                    </svg>
                                  </button>
                                </a>
                              )}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {channel.is_connected ? (
                                  <div className="text-green-600 pr-2">
                                    Подключен
                                  </div>
                                ) : (
                                  <div
                                    className={`${style.table__tr_th_estatus} text-red-500`}
                                  >
                                    Не Подключен
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="empty_list">Список пустой. Добавьте Канал!</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChannelTable
