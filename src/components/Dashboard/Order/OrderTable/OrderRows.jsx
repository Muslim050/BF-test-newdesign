import React from 'react'
import { SortButton } from 'src/utils/SortButton.jsx'
import style from './OrderTable.module.scss'
import { TableHead, TableRow } from 'src/components/ui/table'

function OrderRows({ data, sort, sortKey, changeSort }) {
  const user = localStorage.getItem('role')

  const isAdmin = user === 'admin'

  const porogViews = data.map((i) => i.online_views > 0)

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
          const showStatusColumn = user !== 'admin'
          if (row.key === 'is_connected' && !showStatusColumn) {
            return null
          }

          if (row.key === 'porog' && !row.visible) {
            return null // Пропускать невидимую колонку "порог"
          }

          return (
            <TableHead key={row.key} className="text-white">
              {row.label}
            </TableHead>
          )
        })}
      </TableRow>
    </>
  )
}

export default OrderRows
