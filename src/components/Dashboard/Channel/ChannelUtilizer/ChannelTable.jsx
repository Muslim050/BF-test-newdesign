import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { googleAuth } from '../../../../redux/googleauth/googleauthSlice.js'
import { Plus } from 'lucide-react'
import { ShieldEllipsis } from 'lucide-react'
import style from './ChannelTable.module.scss'
import { fetchChannel } from '../../../../redux/channel/channelSlice.js'
import { Link } from 'react-router-dom'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import { BarChart3 } from 'lucide-react'
import CircularTable from '@/components/Labrery/Circular/CircularTable.jsx'
import {TableHead, TableRow, Table, TableCell , TableBody, TableHeader} from "@/components/ui/table.jsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import ChannelModal from "@/components/Dashboard/Channel/ChannelUtilizer/ChannelModal.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {ThemeContext} from "@/utils/ThemeContext.jsx";
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
  const {channel, status} = useSelector((state) => state.channel)
  const linkGoogle = useSelector((state) => state.googleAuth.authUrl)
  const [googleAu, setGoogleAu] = React.useState(false)
  const [connectG, setConnectG] = React.useState(channel.is_connected)
  const user = localStorage.getItem('role')
  const { textColor } = React.useContext(ThemeContext);

  React.useEffect(() => {
    dispatch(fetchChannel())
  }, [dispatch])

  const authGoogle = (pubId) => {
    dispatch(googleAuth(pubId))
    setConnectG(false)
    setGoogleAu(true)
  }
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

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
        <div className="tableWrapper">
          <div className="flex justify-end ">

            {user === 'channel' || user === 'publisher' ? (
              ''
            ) : (

              <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="-mt-14 mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
              >
                <Plus className="w-5 h-5 mr-2" />                  Создать канал

              </Button>
            </DialogTrigger>
            {open && <ChannelModal onClose={handleClose}
            />}
          </Dialog>
            )}
          </div>
          <div className={`border_container rounded-xl p-[3px]  glass-background`}>

            {channel && channel.length ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
            >                            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">

            <TableRow>
                  {headers.map((row) => {
                    const user = localStorage.getItem('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    return (
                      <TableHead key={row.key} className={`text-${textColor}`}>
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
                      <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
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
                      <TableCell data-label="Канал" className={style.table_td}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className='cursor-pointer'>{channel.name}</div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>ID:{channel.id}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                      </TableCell>
                      <TableCell data-label="Аналитика" className={`font-normal text-${textColor} text-sm `}>
                        <Link
                          to={`/statistics-channel/${channel.id}`}
                          state={{ channel }}
                          style={{ display: 'contents' }}
                        >
                          <button className={style.dopBtnChart}>
                            <BarChart3
                              style={{ width: '23px', height: '23px' }}
                            />
                          </button>
                        </Link>
                      </TableCell>
                      <TableCell data-label="Паблишер" className={style.table_td}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className='cursor-pointer'>{channel.publisher && channel.publisher.name
                                ? channel.publisher.name
                                : '-------'}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>ID:{channel.publisher?.id}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell data-label="Email" className={`font-normal text-${textColor} text-sm `}>{channel.email}</TableCell>
                      <TableCell data-label="Телефон" className={`font-normal text-${textColor} text-sm `}>
                        <FormatterPhone phoneNumber={channel.phone_number} />
                      </TableCell>
                      <TableCell data-label="ID канала" className={`font-normal text-${textColor} text-sm `}>{channel.channel_id}</TableCell>
                      {user === 'admin' ? (
                        ''
                      ) : (
                        <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: channel.is_connected
                                ? '#DEEEE8'
                                : '#ffcece', // Измените цвет фона в зависимости от channel.is_connected
                              // display: '-webkit-inline-box',
                              padding: '3px',
                              borderRadius: '12px',
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
                                  <button
                                    className={style.btn__connect}
                                    onClick={() => authGoogle(channel.id)}
                                  >
                                    Подключится
                                  </button>
                                ) : (
                                  <button
                                    className={style.btn__connectR}
                                    onClick={() => authGoogle(channel.id)}
                                  >
                                    Переподключиться
                                  </button>
                                )}
                              </div>
                            )}
                            {googleAu && (
                              <a
                                href={linkGoogle}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <button className={style.btn__google}>
                                  <div className={style.btn__google__wrapper}>
                                    <ShieldEllipsis
                                      style={{
                                        width: '30px',
                                        height: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    />
                                  </div>
                                </button>
                              </a>
                            )}
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {channel.is_connected ? (
                                <div className={style.table__status}>
                                  Подключен
                                </div>
                              ) : (
                                <div className={style.table__tr_th_estatus}>
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
