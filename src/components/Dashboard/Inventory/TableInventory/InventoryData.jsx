import React from 'react'
import style from './TableInventory.module.scss'
import CircularTable from '@/components/Labrery/Circular/CircularTable'
import CircularBadge from '@/components/Labrery/Circular/CircularBadge'
import FormatterView from '../../../Labrery/formatter/FormatterView'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import { formatDate } from '@/utils/formatterDate.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'

function InventoryData({ inventory }) {
  const user = Cookies.get('role')
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {inventory.map((inventor, i) => (
        <>
          <TableRow key={i}>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div className="flex items-center relative">
                <div>{i + 1}</div>
                {user === 'publisher' || user === 'channel' ? (
                  <>
                    {inventor.status === 'pre_booked' ? (
                      <CircularTable />
                    ) : null}
                  </>
                ) : null}

                {user === 'admin' ? (
                  <>
                    {inventor.status === 'open' ? (
                      <div className="w-2 h-6 rounded-[2px] bg-[#05c800] absolute -left-2"></div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </TableCell>
            <TableCell
              data-label="Канал"
              className={`font-normal text-${textColor} text-sm `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>
                      {truncate(
                        inventor.channel === null ? '' : inventor.channel.name,
                        20,
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{inventor?.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell
              data-label="Контент"
              className={`font-normal text-${textColor} text-sm `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>{truncate(inventor.video_content?.name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{inventor.video_content?.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell
              data-label="Формат"
              className={`font-normal text-${textColor} text-sm `}
            >
              {(inventor.format === 'preroll' && 'Pre-roll') ||
                (inventor.format === 'midroll1' && 'Mid-roll 1') ||
                (inventor.format === 'midroll2' && 'Mid-roll 2') ||
                (inventor.format === 'midroll3' && 'Mid-roll 3') ||
                (inventor.format === 'midroll4' && 'Mid-roll 4')}
            </TableCell>
            <TableCell
              data-label="Прогноз"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterView data={inventor.expected_number_of_views} />
            </TableCell>
            <TableCell
              data-label="Категория"
              className={`font-normal text-${textColor} text-sm `}
            >
              {inventor.video_content?.category}
            </TableCell>
            <TableCell
              data-label="Дата начала"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate(inventor.video_content?.publication_time)}
            </TableCell>
            <TableCell
              data-label="Статус"
              className={`font-normal text-${textColor} text-sm `}
            >
              <div>
                <AdvertStatus
                  status={inventor.status}
                  endDate={inventor.deactivation_date}
                />
              </div>
            </TableCell>
            {inventor.online_views > 0 ? (
              <TableCell
                data-label="Показы"
                className={`font-normal text-${textColor} text-sm `}
              >
                <FormatterView data={inventor.online_views} />
              </TableCell>
            ) : (
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {' '}
              </TableCell>
            )}
          </TableRow>
        </>
      ))}
    </>
  )
}

export default InventoryData
