import React from 'react'
import { fetchInventory } from '../../../../redux/inventory/inventorySlice'
import { useDispatch, useSelector } from 'react-redux'
import OpenTableSentOrderData from './OpenTableSentOrderData'
import ModalSentOrder from '../receivedOrders/ModalSentOrder'
import style from '@/components/Dashboard/SentOrder/TableSentsOrder.module.scss'
import {
  TableHead,
  Table,
  TableHeader,
  TableRow,
  TableBody,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { PackagePlus } from 'lucide-react'
import { hasRole } from '../../../../utils/roleUtils'
import Cookies from 'js-cookie'

const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Название Видео	' },
  { key: 'category', label: 'Категория' },

  { key: 'format', label: 'Формат' },
  { key: 'publication_time', label: 'Дата начала' },

  {
    key: 'expected_number_of_views',
    label: 'Показы факт',
  },

  {
    key: 'status',
    label: 'Статус',
  },
  { key: 'status', label: 'Действия' },
  { key: 'status', label: '' },
]

function OpenTableSentOrder({ item }) {
  const { textColor } = React.useContext(ThemeContext)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const data = useSelector((state) => state.inventory.inventory)

  React.useEffect(() => {
    dispatch(fetchInventory({ orderAssignmentId: item.id })).then(() =>
      setLoading(false),
    )
  }, [dispatch])

  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <div className="loaderWrapper" style={{ height: '50px' }}>
          <div style={{ color: 'var(--text-color, )' }}>
            Загрузка инвентарей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {item.order_status === 'in_progress' ? (
            <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <div className="flex justify-end">
                <PopoverTrigger asChild>
                  <button
                    onClick={() => setIsPopoverOpen (true)}
                    className={` hover:scale-105 mb-3 transition-all h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 border border-transparent hover:border-orange-700`}
                  >

                    <PackagePlus/>
                    Добавить размещение
                    {hasRole ('channel') || hasRole ('publisher') ? (
                      <div className="absolute top-0 right-0">
                        {item.order_status === 'in_review' ||
                        item.order_status === 'confirmed' ? (
                          <span className="relative flex h-3 w-3">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </button>
                </PopoverTrigger>
              </div>
              {isPopoverOpen && (
                <PopoverContent
                  side="left"
                  align="start"
                  className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
                >
                  <ModalSentOrder
                    setIsPopoverOpen={setIsPopoverOpen}
                    item={item}
                  />
                </PopoverContent>
              )}
            </Popover>
          ) : null}
          {/*<div className="p-3 rounded-xl	border_container bg-white bg-opacity-30 backdrop-blur-md">*/}

          {data && data.length ? (
            <Table
              style={{ background: ' var(--bg-color)' }}
              className={`${style.responsive_table} border_design rounded-lg overflow-auto `}
            >
              <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                <TableRow>
                  {headers.map((row) => {
                    const user = Cookies.get('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    if (data.status === 'open') {
                      headers.push({ key: 'status', label: 'Действия' })
                    }
                    return (
                      <TableHead key={row.key} className={`text-${textColor} `}>
                        {row.label}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                <OpenTableSentOrderData data={data} />
              </TableBody>
            </Table>
          ) : (
            <div className="text-white flex justify-center">
              Список пустой. Добавьте инвентарь!
            </div>
          )}
          {/*</div>*/}
        </>
      )}
    </div>
  )
}

export default OpenTableSentOrder
