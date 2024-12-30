import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchOrder } from '@/redux/order/orderSlice.js'

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
import { ChartSvg, OpenSvg } from '@/assets/icons-ui.jsx'
import { truncate } from '@/utils/other.js'
import PopoverButtons from '@/components/Dashboard/Order/OrderTable/components/PopoverButtons'
import { formatDate } from '@/utils/formatterDate.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import Cookies from 'js-cookie'
import {getProgressStyle} from "@/components/Dashboard/Order/OrderTable/components/getProgressStyle.jsx";
import {useOrderHandlers} from "@/components/Dashboard/Order/OrderTable/components/useOrderHandlers.jsx";

function OrderData({ data }) {
  const dispatch = useDispatch()
  const role = Cookies.get('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const { textColor } = React.useContext(ThemeContext)
  const { handleRowClick, handleFinishOrder, redirectToTariffDetails, isFetchingOrder, finishingOrderId, expandedRows } = useOrderHandlers();

  React.useEffect(() => {
    fetchOrder()
  }, [dispatch])



  return (
    <>
      {data?.map((advert, i) => {
        const isFinishing = finishingOrderId === advert.id // Проверяем, завершение или загрузка
        const isOver100Percent =
          (advert.online_views / advert.expected_number_of_views) * 100 >= 100
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
                      (advert.format === 'mixroll' && 'Mix-roll') || (advert.format === 'top_preroll' && 'Top Pre-roll') || (advert.format === 'tv_preroll' && 'Tv Pre-roll')}
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

              {/*Статус*/}
              <TableCell
                data-label="Статус"
                className={`font-normal text-${textColor} text-sm `}
              >
                <AdvertStatus status={advert.status} endDate={advert.actual_end_date}>
                  {hasRole('admin') || hasRole('advertising_agency') || hasRole('advertiser') ? (
                    advert.status === 'in_progress' && (
                      <div
                        className="rounded-lg px-1 font-semibold"
                        style={getProgressStyle(advert.online_views, advert.expected_number_of_views)}
                      >
                        {Math.floor((advert.online_views / advert.expected_number_of_views) * 100)}%
                      </div>
                    )
                  ) : null}
                </AdvertStatus>
              </TableCell>
              {/*Статус*/}


              <TableCell
                data-label="Остаток"
                className={`font-normal text-${textColor} text-sm `}
              >
                {advert.is_paid === true && role === 'admin'  ? (
                  <div></div>
                ) : (
                  <FormatterView
                    data={advert.expected_number_of_views - advert.online_views}
                  />
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
