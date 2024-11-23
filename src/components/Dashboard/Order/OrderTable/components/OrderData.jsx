import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder, setOrderStatus } from '@/redux/order/orderSlice.js'
import {
  fetchViewStatus,
  finishOrder,
} from '@/redux/orderStatus/orderStatusSlice.js'
import OpenOrderTable from '../../OpenOrder/index.jsx'
import FormatterBudjet from '../../../../Labrery/formatter/FormatterBudjet.jsx'
import { TableCell, TableRow } from '@/components/ui/table'
import m from '../styles/OrderTable.module.scss'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus'
import { Film } from 'lucide-react'

import FormatterView from '@/components/Labrery/formatter/FormatterView'
import CircularTable from '@/components/Labrery/Circular/CircularTable'
import CircularBadge from '@/components/Labrery/Circular/CircularBadge'
import { useNavigate } from 'react-router-dom'
import { ChartSvg, OpenSvg } from '@/assets/icons-ui.jsx'
import { truncate } from '@/utils/other.js'
import PopoverButtons from '@/components/Dashboard/Order/OrderTable/components/PopoverButtons'
import { formatDate } from '@/utils/formatterDate.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function OrderData({ data }) {
  const dispatch = useDispatch()
  const [expandedRows, setExpandedRows] = React.useState('')
  const role = Cookies.get('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const navigate = useNavigate()
  const { textColor } = React.useContext(ThemeContext)
  const { showPayment } = useSelector((state) => state.modal)
  const [finishingOrderId, setFinishingOrderId] = React.useState(null)
  const [isFetchingOrder, setIsFetchingOrder] = React.useState(false)

  //Смена статуса заказа
  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
    const item = data.find((item) => item.id === id)
    if (item && item.status === 'sent') {
      dispatch(fetchViewStatus(id)).then((result) => {
        if (result.type === fetchViewStatus.fulfilled.toString()) {
          dispatch(setOrderStatus({ orderId: id, status: 'accepted' }))
        }
      })
    } else {
      // setTimeout (() => fetchGetOrder (id), 2000); // Fetch the specific order directly after 2 seconds if the status is not "sent"
    }
  }
  //Смена статуса заказа

  const handleFinishOrder = (id) => {
    setFinishingOrderId(id) // Устанавливаем ID заказа, который в процессе завершения
    setIsFetchingOrder(true) // Устанавливаем состояние загрузки

    dispatch(finishOrder({ id }))
      .unwrap()
      .then((result) => {
        toast.success('Заказ успешно завершен')
        // onClose() - если необходимо
        dispatch(
          fetchOrder().finally(() => {
            setIsFetchingOrder(false)
          }),
        )
      })
      .catch((error) => {
        toast.error(`Ошибка завершения заказа: ${error.data.error.detail}`)
        dispatch(
          fetchOrder().finally(() => {
            setIsFetchingOrder(false)
          }),
        )
      })
      .finally(() => {
        setFinishingOrderId(null) // Сбрасываем состояние после завершения или ошибки
      })
  }

  React.useEffect(() => {
    fetchOrder()
  }, [dispatch])
  // const redirectToTariffDetails = React.useCallback(
  //   (advert) => {
  //     navigate(`/chart-order-table/${advert.id}`, { state: { advert } })
  //   },
  //   [navigate],
  // )
  const redirectToTariffDetails = React.useCallback((advert) => {
    const url = `/chart-order-table/${advert.id}`
    window.open(url, '_blank', 'noopener,noreferrer') // Открыть в новом окне
  }, [])

  return (
    <>
      {data?.map((advert, i) => {
        const isFinishing = finishingOrderId === advert.id // Проверяем, завершение или загрузка
        const isOver100Percent =
          (advert.online_views / advert.expected_number_of_views) * 100 >= 100
        console.log (isOver100Percent)
        return (
          <>
            {(isFinishing || isFetchingOrder) && (
              <div className="absolute w-full h-[61px] z-20 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white text-lg font-semibold">
                  В процессе завершения...
                </span>
              </div>
            )}
            <TableRow key={advert.id} className="relative">
              <TableCell
                data-label="ID"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div style={{ display: 'flex', alignItems: "center" }}>
                  <div>{i + 1}</div>
                  {role === 'advertiser' || role === 'advertising_agency' ? (
                    <>
                      {advert.status === 'in_progress' ? (
                        <CircularTable />
                      ) : null}
                    </>
                  ) : null}

                  {role === 'admin' && (
                    <>{advert.status === 'sent' || advert.status === 'accepted' ? <div className='flex'>
                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-[#05c800] text-[14px] ml-2 items-center justify-center"></span>
                    </div> : null}</>
                  )}

                  {role === 'admin' && (
                    <>{advert.inventories.filter(
                      (item) =>
                        item.video_content.link_to_video &&
                        item.status === 'booked',
                    ).length > 0 ? <div className='flex'>
                      <span
                        className=" inline-flex rounded-full h-5 w-2.5 bg-[#aa84ff] text-[14px] ml-2 items-center justify-center"></span>
                    </div> : null}</>
                  )}

                  {advert.status === 'finished' ? null :
                    <>
                      {role === 'admin' && (
                        <>{isOver100Percent ? <div>
                      <span
                        className="relative inline-flex rounded-full h-5 w-2.5 bg-red-600 text-[14px] ml-2 items-center justify-center"></span>
                        </div> : null}</>
                      )}</>

                  }



                </div>
              </TableCell>
              <TableCell
                className={`${m.table_td}font-normal text-${textColor} text-sm `}
                data-label="Кампания"
              >
                {role === 'admin' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <div>{truncate(advert.name, 20)}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ID: {advert.id}</p>
                        <p>Кампания: {advert.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div>{truncate(advert.name, 20)}</div>
                )}
              </TableCell>
              <TableCell
                data-label="Ролик"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div style={{ display: 'flex' }}>
                  <a
                    href={advert.promo_file}
                    target="_blank"
                    className="text-[#A7CCFF]  underline-offset-2 underline hover:text-[#0767eb]"
                    rel="noreferrer"
                  >
                    <Film />
                  </a>
                </div>
              </TableCell>
              <TableCell
                data-label="Формат"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div className="flex items-center h-[15px] gap-1">
                  <div>
                    {(advert.format === 'preroll' && 'Pre-roll') ||
                      ('mixroll' && 'Mix-roll')}
                  </div>
                  <div
                    className={`rounded-[6px] px-1 text-[12px]  ${
                      advert.target_country ? 'bg-[#606afc]' : 'bg-transparent'
                    }`}
                  >
                    {advert.target_country}
                  </div>
                </div>
              </TableCell>
              <TableCell
                data-label="Начало"
                className={`font-normal text-${textColor} text-sm `}
              >
                {formatDate(advert.expected_start_date)}
              </TableCell>
              <TableCell
                data-label="Конец"
                className={`font-normal text-${textColor} text-sm `}
              >
                {formatDate(advert.expected_end_date)}
              </TableCell>
              <TableCell
                data-label="Показы"
                className={`font-normal text-${textColor} text-sm `}
              >
                {advert.status === 'finished' ? (
                  <FormatterView data={advert.online_views} />
                ) : (
                  <FormatterView data={advert.expected_number_of_views} />
                )}
              </TableCell>
              <TableCell
                data-label="Бюджет"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div style={{ display: 'flex' }}>
                  <FormatterBudjet
                    budget={advert.budget}
                    data={advert.expected_start_date}
                  />
                </div>
              </TableCell>
              <TableCell
                data-label="Статус"
                className={`font-normal text-${textColor} text-sm `}
              >
                <AdvertStatus
                  status={advert.status}
                  endDate={advert.actual_end_date}
                >
                  {role === 'admin' ||
                  role === 'advertising_agency' ||
                  role === 'advertiser' ? (
                    <>
                      {role === 'admin' ||
                      role === 'advertising_agency' ||
                      role === 'advertiser' ? (
                        <>
                          {advert.status === 'in_progress' ? (
                            <div
                              style={{
                                display: (() => {
                                  const ratie = Math.floor(
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                      100,
                                  )
                                  if (ratie >= 1) {
                                    return 'initial'
                                  }
                                  return 'none'
                                })(),
                                padding: '1px 5px',
                                borderRadius: '7px',
                                height: '100%',
                                fontWeight: '600',
                                background: (() => {
                                  const ratie = Math.floor(
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                      100,
                                  )

                                  if (ratie >= 100) {
                                    return '#ec2020'
                                  } else if (ratie >= 80) {
                                    return '#fd8b00'
                                  } else if (ratie >= 50) {
                                    return 'rgba(50, 147, 111, 0.16)'
                                  } else if (ratie >= 1) {
                                    return 'rgb(86 112 241)'
                                  }
                                  return 'inherit'
                                })(),

                                color: (() => {
                                  const ratio =
                                    (advert.online_views /
                                      advert.expected_number_of_views) *
                                    100

                                  if (ratio >= 100) {
                                    return '#f8f8f8'
                                  } else if (ratio >= 80) {
                                    return '#764306'
                                  } else if (ratio >= 50) {
                                    return '#0bd244'
                                  } else if (ratio >= 1) {
                                    return 'rgb(228 232 253)'
                                  }
                                  return 'inherit'
                                })(),
                              }}
                            >
                              {advert.online_views > 0 &&
                                Math.floor(
                                  (advert.online_views /
                                    advert.expected_number_of_views) *
                                    100,
                                ) +
                                  ' ' +
                                  '%'}
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  ) : null}
                </AdvertStatus>
              </TableCell>
              <TableCell
                data-label="Остаток"
                className={`font-normal text-${textColor} text-sm `}
              >
                {advert.is_paid === true ? (
                  <div></div>
                ) : (
                  <>
                    {
                      advert.status === 'finished' ? (
                        <FormatterView
                          data={advert.online_views - advert.online_views}
                        />
                      ) :  <FormatterView
                        data={advert.expected_number_of_views - advert.online_views}
                      />
                    }
                  </>

                )}
              </TableCell>

              <TableCell
                data-label="Детали"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div className="flex gap-2">
                  {/*кнопка открыть*/}
                  {role === 'admin' ? (
                    <button
                      onClick={() => handleRowClick(advert.id)}
                      className="relative hover:scale-125 transition-all "
                    >
                      <OpenSvg
                        className={`
                        ${advert.inventories.filter(
                          (item) =>
                            item.video_content.link_to_video &&
                            item.status === 'booked',
                        ).length > 0  && 'text-[#aa84ff]' }
                        hover:text-brandPrimary-1 transition-all ease-in-out ${
                          expandedRows === advert.id
                            ? 'rotate-90 text-brandPrimary-1 scale-125'
                            : 'rotate-0'
                        }`}
                      />

                      <span>
                        {advert.inventories.filter(
                          (item) =>
                            item.video_content.link_to_video &&
                            item.status === 'booked',
                        ).length > 0 ? (
                          <div className="absolute -top-2.5 -right-2.5">
                            <span className="relative flex h-[17px] w-[17px]">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                              <span className="relative inline-flex items-center rounded-full h-[17px] w-[17px] bg-violet-500 justify-center text-[12px]">
                                {
                                  advert.inventories.filter(
                                    (item) =>
                                      item.video_content.link_to_video &&
                                      item.status === 'booked',
                                  ).length
                                }
                              </span>
                            </span>
                          </div>
                        ) : (
                          <>
                            {advert.status === 'in_review' &&
                            advert.inventories.filter(
                              (item) => item.status === 'booked',
                            ).length > 0 ? (
                              <CircularBadge
                                style={{
                                  backgroundColor: '#ff7d00',
                                  width: '15px',
                                  height: '15px',
                                }}
                                count={advert.status === 'booked'}
                              />
                            ) : (
                              ''
                            )}
                          </>
                        )}
                        {advert.status === 'booked' ? (
                          <CircularBadge
                            style={{
                              backgroundColor: '#ff7d00',
                              width: '15px',
                              height: '15px',
                            }}
                            count={advert.status === 'booked'}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </button>
                  ) : null}
                  {/*кнопка открыть*/}

                  {/*Статистика заказа*/}
                  {advert.status === 'in_progress' ||
                  advert.status === 'finished' ? (
                    <button
                      onClick={() => redirectToTariffDetails(advert)}
                      // onClick={() => redirectToTariffDetails(advert)}
                      className="hover:scale-125 transition-all"
                    >
                      <ChartSvg className="hover:text-green-400" />
                    </button>
                  ) : (
                    <>
                      {role === 'advertising_agency' || role === 'advertiser'
                        ? ''
                        : null}
                    </>
                  )}
                  {/*Статистика заказа*/}
                </div>
              </TableCell>

              {/*POPOVER*/}
              {hasRole('admin') ||
              hasRole('advertiser') ||
              hasRole('advertising_agency') ? (
                <TableCell
                  className={`font-normal text-${textColor} text-sm `}
                  data-label="Действия"
                >
                  <PopoverButtons
                    advert={advert}
                    isOver100Percent={isOver100Percent}
                    setShowModalEditAdmin={setShowModalEditAdmin}
                    handleFinishOrder={handleFinishOrder}
                  />
                </TableCell>
              ) : null}
              {/*POPOVER*/}
            </TableRow>

            {expandedRows === advert.id && (
              <TableRow>
                <TableCell
                  colSpan="12"
                  className={`${m.dopTable} p-3 rounded-b-[22px] !h-auto	 bg-white bg-opacity-30 backdrop-blur-md`}
                >
                  <OpenOrderTable
                    expandedRows={expandedRows}
                    statusOr={advert.status}
                    advert={advert}
                  />
                </TableCell>
              </TableRow>
            )}
          </>
        )
      })}
    </>
  )
}

export default OrderData
