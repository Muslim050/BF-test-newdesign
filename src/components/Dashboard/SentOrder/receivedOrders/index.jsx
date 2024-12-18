import SentOrderList from './SentOrderList'
import React from 'react'
import { fetchOnceListSentToPublisher } from '../../../../redux/order/SentToPublisher'
import { useDispatch, useSelector } from 'react-redux'
import style from '../TableSentsOrder.module.scss'
import {
  TableHead,
  Table,
  TableHeader,
  TableRow,
  TableBody,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Кампания' },

  { key: 'name', label: 'Формат' },

  { key: 'name', label: 'Начало' },
  { key: 'name', label: 'Конец' },
  { key: 'name', label: 'Ролик' },

  { key: 'category', label: 'План показов' },
  // {key: 'category', label: 'Комментарий'},

  { key: 'category', label: 'Статус' },
  { key: 'category', label: 'Действия' },
]
const ReceivedOrders = () => {
  const { textColor } = React.useContext(ThemeContext)

  const dispatch = useDispatch()
  const videos = useSelector((state) => state.video.videos)
  const [loading, setLoading] = React.useState(true)
  const { listsentPublisher } = useSelector((state) => state.sentToPublisher)

  React.useEffect(() => {
    dispatch(fetchOnceListSentToPublisher({ is_deactivated: false })).then(() =>
      setLoading(false),
    )
  }, [dispatch])

  return (
    <>
      {loading ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка заказов'} />

        ) : (
        <div className="tableWrapper" style={{ overflow: 'visible' }}>
          <div
            // style={{ background: ' var(--bg-color)' }}
            className="border_container w-full h-[calc(100vh-150px)]   rounded-[22px]  p-[3px] glass-background flex flex-col"          >

          <div className="h-full overflow-y-auto">
              <Table
                className={`${style.responsive_table} border_design rounded-lg h-full`}
              >
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
                          className={`text-${textColor} `}
                        >
                          {row.label}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <SentOrderList listsentPublisher={listsentPublisher} />
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ReceivedOrders
