import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Канал' },
  { key: 'name', label: 'Название Видео' },
  { key: 'category', label: 'Категория' },
  { key: 'publication_time', label: 'Начало' },
  { key: 'duration', label: 'Хрон видео' },
  { key: '', label: 'Ссылка' },
]

function TableVideoRows() {
  const { textColor } = React.useContext(ThemeContext)
  return (
    <>
      <TableRow>
        {headers.map((row) => {
          const user = Cookies.get('role')
          const showStatusColumn = user !== 'admin'
          if (row.key === 'is_connected' && !showStatusColumn) {
            return null
          }
          return (
            <TableHead key={row.key} className={`text-${textColor} `}>
              {row.label}
            </TableHead>
          )
        })}
      </TableRow>
    </>
  )
}

export default TableVideoRows
