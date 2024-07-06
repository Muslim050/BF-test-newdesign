import React from 'react';
import FormatterView from '../../../Labrery/formatter/FormatterView';
import FormatterBudjet from '../../../Labrery/formatter/FormatterBudjet';
import { formatDate } from '@/utils/formatterDate.jsx';
import { ThemeContext } from '@/utils/ThemeContext.jsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { truncate } from '@/utils/other.js';
import {
  TableCell, TableRow,
} from 'src/components/ui/table';


function PublisherReportTable({publisherReport}) {
  const { textColor } = React.useContext(ThemeContext);


  return (
    <>
      {publisherReport.map((person, i) => {

        return (
          <TableRow key={person.id}>
            <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{ i + 1}</TableCell>
            <TableCell data-label="Компания" className={`font-normal text-${textColor} text-sm `}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='cursor-pointer'>{truncate(person.order_name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{person.order_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell data-label="Рекламодатель" className={`font-normal text-${textColor} text-sm `}>{person.advertiser_name}</TableCell>
            <TableCell data-label="Канал" className={`font-normal text-[#C9FFB5] text-sm `}>{person.channel_name}</TableCell>
            <TableCell data-label="Название Видео	" className={`font-normal text-${textColor} text-sm `} style={{ width: 'inherit', color: 'blue' }}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='cursor-pointer text-[#A7CCFF] hover:[#277aec] '>{truncate(person.video_content_name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{person.video_content_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell data-label="Формат" className={`font-normal text-${textColor} text-sm `}>{person.format}</TableCell>
            <TableCell data-label="Начало" className={`font-normal text-${textColor} text-sm w-[100px]`}>
              {formatDate(person.order_start_date)}
            </TableCell>
            <TableCell data-label="Конец" className={`font-normal text-${textColor} text-sm w-[100px]`}>
              {formatDate(person.order_end_date)}
            </TableCell>
            <TableCell data-label="Показы факт" className={`font-normal text-${textColor} text-sm `}>
              <FormatterView data={person.recorded_view_count} />
            </TableCell>
            <TableCell data-label="Бюджет компании" className={`font-normal text-${textColor} text-sm `}>
              <div style={{ display: 'flex' }}>
                <FormatterBudjet budget={person.budget_fact} data={person.order_start_date} />
              </div>
            </TableCell>
            <TableCell data-label="Комиссия Агенства" className={`font-normal text-${textColor} text-sm `}>
              <div style={{ display: 'flex' }}>
                <FormatterBudjet budget={person.agency_commission_total} data={person.order_start_date} />
              </div>
            </TableCell>
            <TableCell data-label="Комиссия AdTech Media" className={`font-normal text-${textColor} text-sm `}>
              <div style={{ display: 'flex' }}>
                <FormatterBudjet budget={person.adtechmedia_commission_total} data={person.order_start_date} />
              </div>
            </TableCell>
            <TableCell data-label="Бюджет" className={`font-normal text-${textColor} text-sm `}>
              <div style={{ display: 'flex' }}>
                <FormatterBudjet budget={person.channel_budget_total} data={person.order_start_date} />
              </div>
            </TableCell>
          </TableRow>
        );
      })}

    </>
  );
}

export default PublisherReportTable;
