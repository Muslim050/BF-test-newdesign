import React from 'react'
import style from './AdvChartTable.module.scss'
import TheadGender from './components/TheadAgeGeoGender/TheadGender'
import TheadAge from './components/TheadAgeGeoGender/TheadAge'
import TheadGeo from './components/TheadAgeGeoGender/TheadGeo'
import { TableRow, TableHead } from '@/components/ui/table'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

const headers = [
  { key: 'index', label: '№' },
  { key: 'channel_name', label: 'Канал' },
  { key: 'video_name', label: 'Название видео' },
  { key: 'order_format', label: 'Формат' },
  { key: 'publication_date', label: 'Начало' },
  { key: 'publication_date', label: 'Конец' },
  { key: 'online_view_count', label: 'Показы' },
  { key: 'budget', label: 'Бюджет' },
]

function OrderChartRow({ statistic }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableRow>
        {headers.map((header, index) => {
          return (
            <TableHead
              key={header.key}
              className={`text-${textColor} ${
                index === headers.length - 1 ? 'rounded-r-xl' : ''
              }`}
            >
              {header.label}
            </TableHead>
          )
        })}
        <TableHead className="bg-[#2a85ff75] rounded-l-xl">
          <TableHead className="text-white w-full flex justify-center items-center">
            Пол
          </TableHead>
          <TheadGender statistic={statistic} />
        </TableHead>
        <TableHead className="bg-[#2a85ff75]">
          <TableHead className="text-white w-full flex justify-center items-center">
            Возраст
          </TableHead>
          <TheadAge statistic={statistic} />
        </TableHead>

        <TableHead className="bg-[#2a85ff75]">
          <TableHead className="text-white w-full flex justify-center items-center">
            Гео
          </TableHead>
          <TheadGeo statistic={statistic} />
        </TableHead>
      </TableRow>
    </>
  )
}

export default OrderChartRow
