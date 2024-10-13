import React from 'react'
import { TableHead, TableRow } from '@/components/ui/table'
import Cookies from 'js-cookie'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function OrderRows({ data }) {
  const user = Cookies.get('role')
  const { textColor } = React.useContext(ThemeContext)

  const isAdmin = user === 'admin'

  const porogViews = data.map((i) => i.online_views > 0)
  const statusCheck = data.map((i) => i.status === 'sent')

  const headers = [
    { key: 'id', label: '№' },
    { key: 'name', label: 'Кампания' },
    { key: 'promo_file', label: 'Ролик' },

    { key: 'format', label: 'Формат' },
    { key: 'expected_start_date', label: 'Начало' },
    { key: 'expected_end_date', label: 'Конец' },
    { key: 'expected_number_of_views', label: 'Показы' },
    { key: 'budget', label: 'Бюджет' },
    { key: 'status', label: 'Статус' },
    { key: 'ostatok', label: 'Остаток' },
    { key: 'detali', label: 'Детали' },
    { key: 'deistvia', label: 'Действия' },
  ]

  return (
    <>
      <TableRow>
        {headers.map((row) => {
          // const showStatusColumn = user !== 'admin'
          // const showAdvColumn = user !== 'advertising_agency' || 'advertiser'

          // if (row.key === 'is_connected' && !showStatusColumn) {
          //   return null
          // }

          // if (row.key === 'porog' && !row.visible) {
          //   return null // Пропускать невидимую колонку "порог"
          // }
          // if (row.key === 'deistvia' && !showAdvColumn) {
          //   return null // Пропускать невидимую колонку "порог"
          // }

          return (
            <TableHead key={row.key} className={`text-${textColor}`}>
              {row.label}
            </TableHead>
          )
        })}
      </TableRow>
    </>
  )
}

export default OrderRows
