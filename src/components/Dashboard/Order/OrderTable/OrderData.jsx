import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder, setOrderStatus } from '../../../../redux/order/orderSlice'
import {
  fetchViewStatus,
  finishOrder,
} from '../../../../redux/orderStatus/orderStatusSlice'
import OpenOrderTable from '../OpenOrderTable/index.jsx'
import FormatterBudjet from '../../../Labrery/formatter/FormatterBudjet'
import style from './OrderTable.module.scss'
import { TableCell, TableRow } from 'src/components/ui/table'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import { toastConfig } from 'src/utils/toastConfig'
import { toast } from 'sonner'
import FormatterView from 'src/components/Labrery/formatter/FormatterView'
import CircularTable from 'src/components/Labrery/Circular/CircularTable'
import CircularBadge from 'src/components/Labrery/Circular/CircularBadge'
import { useNavigate } from 'react-router-dom'
import { ChartSvg, OpenSvg } from '../../../../assets/icons-ui.jsx'
import { truncate } from '../../../../utils/other.js'
import PopoverButtons from '../module/PopoverButtons.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { hasRole } from '../../../../utils/roleUtils.js'

function OrderData({ sortedData }) {
  const dispatch = useDispatch()
  const [expandedRows, setExpandedRows] = React.useState('')
  const role = localStorage.getItem('role')
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const [showModalEdit, setShowModalEdit] = React.useState(false)
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const [showKomment, setShowKomment] = React.useState(false)
  const navigate = useNavigate()
  const [activeTooltip, setActiveTooltip] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)
  const { showPayment } = useSelector((state) => state.modal)

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
    const item = sortedData().find((item) => item.id === id)
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

  const handleFinishOrder = (id) => {
    const confirmFinish = window.confirm(
      'Вы уверены, что хотите финишировать заказ?',
    )
    if (confirmFinish) {
      dispatch(finishOrder({ id })).then(() => {
        dispatch(fetchOrder())
      })
    } else {
      toast.info('Операция отменена', toastConfig)
      dispatch(fetchOrder())
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }

  React.useEffect(() => {
    fetchOrder()
  }, [dispatch])
  const redirectToTariffDetails = React.useCallback(
    (advert) => {
      navigate(`/chart-order-table/${advert.id}`, { state: { advert } })
    },
    [navigate],
  )

  return (
    <>
      {/*<AnimatePresence>*/}
      {/*  {showModalEditAdmin && (*/}
      {/*    <MyModal>*/}
      {/*      <EditOrderModal*/}
      {/*        setShowModalEditAdmin={setShowModalEditAdmin}*/}
      {/*        currentOrder={currentOrder}*/}
      {/*      />*/}
      {/*    </MyModal>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}

      {/*<AnimatePresence>*/}
      {/*  {showPayment && (*/}
      {/*    <MyModal>*/}
      {/*      <PaymentOrderModal />*/}
      {/*    </MyModal>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
      {sortedData().map((advert, i) => {
        return (
          <>
            <TableRow key={i}>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <div style={{ display: 'flex' }}>
                  <div>{i + 1}</div>
                  {role === 'advertiser' || role === 'advertising_agency' ? (
                    <>
                      {advert.status === 'in_progress' ? (
                        <CircularTable />
                      ) : null}
                    </>
                  ) : null}

                  {role === 'admin' && (
                    <>{advert.status === 'sent' ? <CircularTable /> : null}</>
                  )}
                </div>
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {role === 'admin' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <div>{truncate(advert.name, 20)}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ID: {advert.id}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div>{truncate(advert.name, 20)}</div>
                )}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <div style={{ display: 'flex' }}>
                  <a
                    href={advert.promo_file}
                    target="_blank"
                    className="text-[#A7CCFF]  underline-offset-2 underline hover:text-[#0767eb]"
                    rel="noreferrer"
                  >
                    Видео
                  </a>
                </div>
              </TableCell>
              <TableCell className="font-normal text-[#FFFFFF] text-sm  ">
                <div className="flex">
                  <div>
                    {(advert.format === 'preroll' && 'Pre-roll') ||
                      ('mixroll' && 'Mix-roll')}
                  </div>

                  <div
                    className={`rounded-[4px] px-1 text-[15px] ml-0.5 ${
                      advert.target_country ? 'bg-[#606afc]' : 'bg-transparent'
                    }`}
                  >
                    {advert.target_country}
                  </div>
                </div>
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {formatDate(advert.expected_start_date)}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {formatDate(advert.expected_end_date)}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {advert.status === 'finished' ? (
                  <FormatterView data={advert.online_views} />
                ) : (
                  <FormatterView data={advert.expected_number_of_views} />
                )}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <div style={{ display: 'flex' }}>
                  <FormatterBudjet
                    budget={advert.budget}
                    data={advert.expected_start_date}
                  />
                </div>
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
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
                                    return '#047f27'
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
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {advert.is_paid === true ? (
                  <div></div>
                ) : (
                  <FormatterView
                    data={advert.expected_number_of_views - advert.online_views}
                  />
                )}
              </TableCell>

              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <div className="flex gap-2">
                  {/*кнопка открыть*/}
                  {role === 'admin' ? (
                    <button
                      onClick={() => handleRowClick(advert.id)}
                      className="relative"
                    >
                      <OpenSvg />

                      <span className={style.arrow}>
                        {/*<Arrow*/}
                        {/*  className={`${style.arrow__icon} ${*/}
                        {/*    expandedRows === advert.id*/}
                        {/*      ? style.arrow__rotate*/}
                        {/*      : ''*/}
                        {/*  }`}*/}
                        {/*/>*/}
                        {advert.inventories.filter(
                          (item) =>
                            item.video_content.link_to_video &&
                            item.status === 'booked',
                        ).length > 0 ? (
                          <CircularBadge
                            style={{
                              backgroundColor: '#d0c9fa',
                              color: '#4833d0',
                              width: '20px',
                              height: '20px',
                            }}
                            count={
                              advert.inventories.filter(
                                (item) =>
                                  item.video_content.link_to_video &&
                                  item.status === 'booked',
                              ).length
                            }
                          />
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
                    <button onClick={() => redirectToTariffDetails(advert)}>
                      <ChartSvg />
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
              {hasRole === 'admin' ? (
                <TableCell className={`font-normal text-${textColor} text-sm `}>
                  <PopoverButtons
                    advert={advert}
                    setShowModalEditAdmin={setShowModalEditAdmin}
                    setCurrentOrder={setCurrentOrder}
                    setShowKomment={setShowKomment}
                    copyToClipboard={copyToClipboard}
                    handleFinishOrder={handleFinishOrder}
                  />
                </TableCell>
              ) : null}
              {/*POPOVER*/}
            </TableRow>

            {expandedRows === advert.id && (
              <tr className={`${style.doprow} `}>
                <td
                  colSpan="12"
                  className="p-3 rounded-b-lg	 bg-white bg-opacity-30 backdrop-blur-md"
                >
                  <OpenOrderTable
                    expandedRows={expandedRows}
                    statusOr={advert.status}
                    advert={advert}
                  />
                </td>
              </tr>
            )}
          </>
        )
      })}
    </>
  )
}

export default OrderData
