import React from 'react'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet'
import { TableCell } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { ChevronDown } from 'lucide-react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { formatDate } from '../../../utils/formatterDate'

function OrderChartList({ statistic, index, handleRowClick, isExpanded }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {index + 1}
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {statistic.channel_name}
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <a
          target="_blank"
          href={statistic.video_link}
          className="text-[#A7CCFF] underline hover:text-[#4289eb]"
          rel="noreferrer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div>{truncate(statistic.video_name, 20)}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{statistic.video_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {(statistic.order_format === 'preroll' && 'Pre-roll') ||
          ('mixroll' && 'Mix-roll')}
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <div>
          <div style={{ display: 'flex', width: '100px' }}>
            {statistic.publication_date === null ? (
              <div>---</div>
            ) : (
              formatDate(statistic.publication_date)
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <AdvertStatus
          status={statistic.status}
          endDate={statistic.deactivation_date}
        />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        {statistic.video_link ===
        'https://www.youtube.com/watch?v=OcR6AYdiyUo' ? (
          <FormatterView data="59 971" />
        ) : (
          <FormatterView data={statistic.online_view_count} />
        )}
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <FormatterBudjet
          budget={statistic.budget}
          data={'2024-05-10'} //сделал так потому что publication date null прилетает
        />
      </TableCell>
      <TableCell className={`font-normal text-${textColor} text-sm `}>
        <button
          className={`  px-[10px] py-[5px] flex rounded-[12px] hover:bg-white hover:text-[#12173c] ${
            isExpanded ? 'bg-white text-[#12173c]' : 'bg-[#FFFFFF2B] text-white'
          }`}
          onClick={() => handleRowClick(statistic.video_link)}
        >
          {isExpanded ? 'Закрыть' : 'Показать'}
          <ChevronDown className="w-5 h-5" />
        </button>
      </TableCell>
    </>
  )
}

export default OrderChartList
