import style from '../BindingOrderModal.module.scss'
import AddInventoryData from './AddInventoryData'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import Cookies from 'js-cookie'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'

import { deactivateInventories } from '@/redux/orderStatus/orderStatusSlice.js'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

export default function AddInventory({
  getOrder,
  setSelectedRows,
  selectedRows,
  expandedRows,
  fetchGetOrder,
  onceOrder,
}) {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext)
  const role = Cookies.get('role')
  const [totalOnlineView, setTotalOnlineView] = React.useState(0)
  React.useEffect(() => {
    const total = getOrder.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [getOrder])

  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно завершен')
          fetchGetOrder() // Вызов функции после успешного запроса
        })
        .catch((error) => {
          toast.error(error.message)
          fetchGetOrder() // Вызов функции после успешного запроса
        })
    } else {
      toast.info('Операция отменена')
      dispatch(fetchOrder())
    }
  }

  const [sortOrder, setSortOrder] = React.useState('asc')
  // const [sortedOrder, setSortedOrder] = React.useState([])
  const [sortColumn, setSortColumn] = React.useState('publication_time') // Track the column to sort by

  const sortedOrder = React.useMemo(() => {
    if (getOrder.length === 0) return []

    const sortedData = [...getOrder].sort((a, b) => {
      if (sortColumn === 'publication_time') {
        const dateA = new Date(a.video_content.publication_time)
        const dateB = new Date(b.video_content.publication_time)

        if (dateA - dateB === 0) {
          const channelA = a.channel?.name || ''
          const channelB = b.channel?.name || ''
          return sortOrder === 'asc'
            ? channelA.localeCompare(channelB)
            : channelB.localeCompare(channelA)
        } else {
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        }
      } else if (sortColumn === 'channel_name') {
        const channelA = a.channel?.name || ''
        const channelB = b.channel?.name || ''
        return sortOrder === 'asc'
          ? channelA.localeCompare(channelB)
          : channelB.localeCompare(channelA)
      } else if (sortColumn === 'online_views') {
        const viewsA = a.online_views || 0
        const viewsB = b.online_views || 0
        return sortOrder === 'asc' ? viewsA - viewsB : viewsB - viewsA
      }
      return 0
    })

    return sortedData
  }, [getOrder, sortOrder, sortColumn])

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
    setSortColumn(column)
  }

  const getRotateStyle = (column) => {
    return {
      transform:
        sortColumn === column && sortOrder === 'asc'
          ? 'rotate(0deg)'
          : 'rotate(180deg)',
      transition: 'transform 0.3s ease',
    }
  }

  return (
    <div className={` rounded-[22px] p-[3px]  glass-background`}>
      {getOrder.length && getOrder ? (
        <Table
          className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
        >
          <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
            <TableRow>
              <TableHead className={`text-${textColor}`}>№</TableHead>
              <TableHead className={`text-${textColor} relative`}>
                Канал
                <button
                  onClick={() => handleSort('channel_name')}
                  style={{
                    background: 'transparent',
                    position: 'absolute',
                    top: '30%',
                  }}
                >
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={getRotateStyle('channel_name')}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{' '}
                    </g>
                  </svg>
                </button>
              </TableHead>
              <TableHead className={`text-${textColor}`}>
                Название Видео
              </TableHead>
              <TableHead className={`text-${textColor}`}>Категория</TableHead>
              <TableHead className={`text-${textColor}`}>Формат</TableHead>
              <TableHead className={`text-${textColor}`}>
                Прогноз показов
              </TableHead>

              <TableHead className={`text-${textColor}`}>Ссылка</TableHead>
              <TableHead className={`text-${textColor} relative`}>
                Время публикаций
                <button
                  onClick={() => handleSort('publication_time')}
                  style={{
                    background: 'transparent',
                    position: 'absolute',
                    top: '30%',
                  }}
                >
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={getRotateStyle('publication_time')}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{' '}
                    </g>
                  </svg>
                </button>
              </TableHead>
              <TableHead className={`text-${textColor} relative`}>
                Показы{' '}
                <button
                  onClick={() => handleSort('online_views')}
                  style={{
                    background: 'transparent',
                    position: 'absolute',
                    top: '30%',
                  }}
                >
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={getRotateStyle('online_views')}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{' '}
                    </g>
                  </svg>
                </button>
              </TableHead>
              <TableHead className={`text-${textColor}`}>
                Действия/Статус
              </TableHead>
            </TableRow>
          </TableHeader>

          <AddInventoryData
            inventor={sortedOrder}
            expandedRows={expandedRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleDeactivateInventory={handleDeactivateInventory}
            onceOrder={onceOrder}
          />
        </Table>
      ) : (
        <div className="flex justify-center" style={{ padding: '10px 0' }}>
          Список пустой, добавьте размещение
        </div>
      )}
      {sortedOrder.length > 0 ? (
        <>
          {' '}
          {role === 'admin' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '10px',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #ff991e',
                  borderRadius: '12px',
                  background: '#ffcc9163',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              >
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Итого показы:</div>
                    <FormatterView data={totalOnlineView} />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}> Остаток:</div>
                    {onceOrder.status === 'finished' ? (
                      <FormatterView data="0" />
                    ) : (
                      <FormatterView
                        data={
                          onceOrder.expected_number_of_views -
                          onceOrder.online_views
                        }
                      />
                    )}
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Статус:</div>
                    <AdvertStatus
                      status={onceOrder.status}
                      endDate={onceOrder.expected_end_date}
                    >
                      {role === 'admin' || role === 'advertising_agency' ? (
                        <>
                          {role === 'admin' || role === 'advertising_agency' ? (
                            <>
                              {onceOrder.status === 'in_progress' ? (
                                <div
                                  style={{
                                    display: (() => {
                                      const ratie = Math.floor(
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
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
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
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
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
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
                                  {onceOrder.online_views > 0 &&
                                    Math.floor(
                                      (onceOrder.online_views /
                                        onceOrder.expected_number_of_views) *
                                        100,
                                    ) +
                                      ' ' +
                                      '%'}
                                </div>
                              ) : null}
                              {onceOrder.status === 'finished' ? (
                                <div
                                  style={{
                                    display: 'initial',
                                    padding: '1px 4px',
                                    borderRadius: '7px',
                                    background: 'rgb(156 81 81)',
                                    color: '#eedede',
                                    marginLeft: '10px',
                                  }}
                                >
                                  100%
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </AdvertStatus>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
