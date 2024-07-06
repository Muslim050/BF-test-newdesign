import React from 'react'
import style from './AdvertStatus.module.scss'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import {formatDate} from "@/utils/formatterDate.jsx";
const statusTexts = {
  sent: 'Отправлено',
  in_review: 'Рассматривается',
  confirmed: 'Подтверждён',
  in_progress: 'Активен',
  accepted: 'Получен',
  confirmed_by_channel: '',
  open: 'Доступный',
  pre_booked: 'Пре_бронь',
  booked: 'Бронь',
  in_use: 'Активный',
  unused: 'Не продан',
  inactive: 'Завершен',
  finished: 'Завершен',
}

const AdvertStatus = ({ status, children, endDate }) => {
  const statusText = statusTexts[status] || 'Неизвестный статус'
  const wrapperStyles = endDate ? { width: 'max-content' } : {}
  return (
    <div
      className={`${style.wrapper__status} ${style[status]} `}
      style={wrapperStyles}
    >
      {status === 'finished' || endDate ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">{statusText}</div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ff67674d] bg-opacity-30 backdrop-blur-md">
              <p className="text-white">
                {formatDate (endDate)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <> {statusText}</>
      )}

      {children}

      {/*{endDate && (*/}
      {/*  <div style={{ color: 'red', fontSize: '11px', marginLeft: '5px' }}>*/}
      {/*    <div>{endDate.split('T')[0]}</div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default AdvertStatus
