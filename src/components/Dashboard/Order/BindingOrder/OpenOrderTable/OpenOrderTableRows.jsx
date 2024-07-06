import React from 'react'
import { TableHead, TableRow } from 'src/components/ui/table'

const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Название Видео' },
  { key: 'format', label: 'Формат' },

  { key: 'expected_number_of_views', label: 'Прогноз показов' },
  { key: 'category', label: 'Категория' },

  { key: 'link_to_video', label: 'Ссылка' },
  { key: 'publication_time', label: 'Время публикаций' },
  { key: 'online_views', label: 'Показы' },

  { key: 'status', label: 'Статусы' },
  { key: 'deistviaB', label: 'Действия' },
]

function OpenOrderTableRows({ getOrder }) {
  const hasInactiveStatus = getOrder.some((item) => item.status === 'inactive')

  return (
    <>
      <TableRow>
        {headers.map((row) => {
          if (row.key === 'deistviaB' && hasInactiveStatus) {
            return null // Пропустить отображение столбца, если есть статус "inactive"
          } else {
            ;<div></div>
          }

          // Проверка для столбца "Показы онлайн"
          if (row.key === 'online_views') {
            // Проверка наличия ненулевых online_views в заказе
            const hasNonZeroOnlineViews = getOrder.some(
              (item) => item.online_views === 0,
            )

            // Если есть ненулевые online_views, отобразить столбец
            if (!hasNonZeroOnlineViews) {
              return null // Пропустить отображение столбца, если все online_views равны 0
            }
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

export default OpenOrderTableRows
